//require dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var table = require('cli-table');

//ask question
var productQuestion = "";
//create empty array for the products
var products = [];
//create object for the purchase
var orderList = {
  id: "",
  item: "",
  quantity: "",
  total: ""
}
//create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "guy", //Your password
    database: "bamazonDB"
});

function purchase() {
  connection.query('SELECT * FROM Products ORDER BY id', function(err, res){
    //empty array
    products = [];
    //put result in array
    products = res;

    //ask the question
    productQuestion = 'What is the produce you would like to buy: \n';

    //add question with products
    for(var i = 0, l = products.length; i < l; i++) {
      productQuestion += ' (' + (products[i].item_id) + ' / ' + products[i].product_name + ' _ ' + '$' + products[i].price.toFixed(2) + '\n';
    };

    // initiate
    prompt.start();

    //run prompt
    promptOrder();
  });
};
//prompt Order
  function promptOrder() {
    var itemQty = [
      {
        name: 'item',
        description: productQuestion,
        required: true,
        message: 'Choose item from 1' + ' to ' + products.length + '. \n',
        conform: function(value) {
          value = parseInt(value);
          return value > 0 && value <= products.length
        }
      },
      {
        name: 'qty',
        description: "Enter quantity",
        required: true,
      }
    ];
    prompt.get(itemQty, function(err,result){

      //store result
      orderList.id = result.item;
      orderList.item = products[orderList.id - 1].product_name;
      orderList.qty = result.qty;

      console.log ('Your order: ' +
     +'(' + orderList.id + ') / ' +
      orderList.item + ', ' + orderList.qty);

      //get confirmation
      promptConfirm();
    });
  };

  function promptConfirm() {
    var confirmQty = [
      {
        name: 'confirm'
        message: 'Confirm quantity Y/N',
        required: true,
        warning: 'Y or N only!',
        validator: /^(?:|Y|n|N)$/,
      }
    ];
    prompt.get(confirmQty, function(err,result) {
      result.confirm = result.confirm.toUpperCase();

      if (result.confirm == "Y") {
        if (orderList.qty > products[orderList.id - 1].qty){
          console.log('Insuffient quantity. \n');
          promptOrder();
        } else {
          orderList.total = orderList.qty * products[orderList.id - 1].price;
          console.log('Your total: $' + orderList.total.toFixed(2));
          confirmOrder();
        }

      } else if (result.confirm == "N") {
        console.log('Order cancelled. \n');
        promptOrder();
      }
    });
  };

  //prompt to confirm purchase
function confirmOrder() {
  var promptConfirm = [
    {
      name: 'confirm'
      message: 'Confirm purchase Y/N',
      required: true,
      warning: 'Y or N only!'
      validator: /^(?:y|Y|n|N)$/,
    }
  ];
  prompt.get(promptConfirm, function(err,result){
    result.confirm = result.confirm.toUpperCase();
    if (result.confirm == "Y") {
      console.log('Order cancelled! \n');

      promptOrder();
    }
  });
};

// Update database
function makeOrder() {

  // Deduct order quantity
  var remainingQty = products[orderList.id - 1].qty - orderList.qty;

  // Update in database
  connection.query('UPDATE products SET qty = ' + remainingQty + ' WHERE id = ' + orderList.id,

    function(err, res){
      if (err) throw err;

      console.log('Thanks for your order! \n');

      purchase();

  });
};
