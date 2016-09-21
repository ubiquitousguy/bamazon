var mysql = require('mysql');
var inquirer = require('inquirer');
var table= require('cli-table')
// require table
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "guy", //Your password
    database: "bamazonDB"
})

function purchase(){
  connection.query('SELECT * FROM Products ORDER BY ProductID', function(err, response){
    for(var i=0; i<response.length; i++){
      console.log(response[i]);
    }
    prompt();
  });
}

function prompt(){
    inquirer.prompt({
        name: "itemnumber",
        type: "input",
        message: "What is the id of the product you would like to buy?",
    }).then(function(response){
    inquirer.prompt([{
      type: 'input',
      message: 'How many would you like to buy?',
      name: 'purchaseQuantity'
    }]).then(function(response){
      connection.query('SELECT StockQuantity, Price FROM Products WHERE ?', {ProductID:response.itemNum}, function(err, res){  if(res.StockQuantity > StockQuantity) {
            console.log("Not enough stock quantity");
          } else {
            console.log("Preparing to do math");
          }
        // =====
      });
    });
  });
}
purchase();
