//create database
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE Products (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NULL,
  `dept_name` VARCHAR(45) NULL,
  `price` DECIMAL(10,2) NULL,
  `qty` INT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `Products` (`id`, `product_name`, `dept_name`, `price`, `qty`);
VAlUES
  (1, `Apples`, `Produce`, .99, 20),
  (1, `Oranges`, `Produce`, 1.99, 20),
  (1, `Strawberries`, `Produce`, 3.99, 20),
  (1, `Grapes`, `Produce`, 2.99, 20),
  (1, `Grapefruit`, `Produce`, 1.25, 20),
  (1, `Mangos`, `Produce`, 1.50, 20),
  (1, `Pears`, `Produce`, .79, 20),
  (1, `Peaches`, `Produce`, .69, 10),
  (1, `Blueberries`, `Produce`, 1.10, 20),
  (1, `Bananas`, `Produce`, .19, 20),
