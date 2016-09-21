var mysql = require('mysql');
var inquirer = require('inquirer');
var table= require('cli-table')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "guy", //Your password
    database: "bamazonDB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})

var start = function() {
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
      connection.query('SELECT StockQuantity, Price FROM Products WHERE ?', {ProductID:response.itemNum}, function(err, res){
