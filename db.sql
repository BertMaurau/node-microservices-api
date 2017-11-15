/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.1.25-MariaDB : Database - nodejs_products
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodejs_products` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `nodejs_products`;

/*Table structure for table `customers` */

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `loyalty_discount` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `customers` */

insert  into `customers`(`id`,`name`,`email`,`loyalty_discount`) values (1,'Bert Maurau','hello@bertmaurau.be',50.5),(2,'Jane Doe','jane.doe@gmail.com',10),(3,'Alfred Johanson','a.john@yahoo.com',0),(4,'Post User','post.user@outlook.com',0),(5,'Post User','post.user@outlook.com',0);

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `season` varchar(20) DEFAULT NULL,
  `brand` varchar(120) DEFAULT NULL,
  `color` varchar(64) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`season`,`brand`,`color`,`price`) values (1,'Levi Jeans','Winter 2018','Levi','Blue',20),(2,'Branded Hoody','Winter 2018','Branded','Black',30),(3,'Sundress','Summer 2017','Dresses 4 U','Green',50),(4,'Watch','Accessoires','Fossil','Gold',100),(5,'Belt','Accessoires','Jack & Jones','Brown',30),(6,'Pencil','Accessoires','Bic','Yellow',5),(7,'Levi Jeans','Winter 2018','Levi','Blue',20);

/*Table structure for table `products_sizes` */

DROP TABLE IF EXISTS `products_sizes`;

CREATE TABLE `products_sizes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `barcode` int(13) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `products_sizes` */

insert  into `products_sizes`(`id`,`product_id`,`size`,`barcode`,`stock`) values (1,1,'S',123456,2),(2,1,'M',123457,0),(3,3,'Uni',123471,5),(4,4,'No Size',123481,2),(5,5,'No Size',132482,-3),(6,2,'L',123458,2),(7,2,'XL',123459,0),(8,3,'XXL',123460,1);

/*Table structure for table `sales` */

DROP TABLE IF EXISTS `sales`;

CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_id` int(10) unsigned DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `sales` */

insert  into `sales`(`id`,`date`,`customer_id`,`total`) values (1,'2017-11-14 11:40:03',1,NULL),(2,'2017-11-14 11:40:25',1,NULL),(3,'2017-11-14 11:40:41',2,NULL),(4,'2017-11-15 13:43:53',1,150),(5,'2017-11-15 13:45:37',1,150);

/*Table structure for table `tickets` */

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sales_id` int(10) unsigned DEFAULT NULL,
  `body` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tickets` */

insert  into `tickets`(`id`,`sales_id`,`body`) values (1,1,'{\"sale\":{\"total\":150,\"customer_id\":1,\"barcodes\":[{\"barcode\":\"132482\",\"quantity\":2},{\"barcode\":\"123459\",\"quantity\":1}],\"id\":4}}'),(2,4,'{\"sale\":{\"total\":150,\"customer_id\":1,\"barcodes\":[{\"barcode\":\"132482\",\"quantity\":2},{\"barcode\":\"123459\",\"quantity\":1}],\"id\":4}}'),(3,5,'{\"sale\":{\"total\":150,\"customer_id\":1,\"barcodes\":[{\"barcode\":\"132482\",\"quantity\":2},{\"barcode\":\"123459\",\"quantity\":1}],\"id\":5}}');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
