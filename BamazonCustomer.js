//require dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var table = require('cli-table')

//ask question
var productQuestion = "",
//create empty array for the products
var products = []
//create object for the purchase
var purchase = {
  id: "",
  ProductName: "",
  DepartmentName: "",
  Price: "",
  StockQuantity: ""
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
      productQuestion += ' (' + (products[i].item_id) + ' / ' + products[i].product_name + ' _ ' + '$' + products[i].product_price.toFixed(2) + '\n';
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
    ]
  }
