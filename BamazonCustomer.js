//require dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var table = require('cli-table')
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
