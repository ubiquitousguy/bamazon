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
  (2, `Oranges`, `Produce`, 1.99, 20),
  (3, `Strawberries`, `Produce`, 3.99, 20),
  (4, `Grapes`, `Produce`, 2.99, 20),
  (5, `Grapefruit`, `Produce`, 1.25, 20),
  (6, `Mangos`, `Produce`, 1.50, 20),
  (7, `Pears`, `Produce`, .79, 20),
  (8, `Peaches`, `Produce`, .69, 10),
  (9, `Blueberries`, `Produce`, 1.10, 20),
  (10, `Bananas`, `Produce`, .19, 20),
