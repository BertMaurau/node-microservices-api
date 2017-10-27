/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.1.25-MariaDB : Database - nodejs_movies
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodejs_movies` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `nodejs_movies`;

/*Table structure for table `movies` */

DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `format` varchar(28) DEFAULT NULL,
  `plot` varchar(255) DEFAULT NULL,
  `releaseYear` tinyint(4) DEFAULT NULL,
  `releaseMonth` tinyint(2) DEFAULT NULL,
  `releaseDay` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `movies` */
 
insert  into `movies`(`id`,`title`,`runtime`,`format`,`plot`,`releaseYear`,`releaseMonth`,`releaseDay`) values (1,'Assasins Creed',115,'IMAX','Lorem ipsum dolor sit amet',127,1,6),(2,'Aliados',124,'IMAX','Lorem ipsum dolor sit amet',127,1,13),(3,'xXx: Reactivado',107,'IMAX','Lorem ipsum dolor sit amet',127,1,20),(4,'Resident Evil: Capitulo Final',107,'IMAX','Lorem ipsum dolor sit amet',127,1,27),(5,'Moana: Un Mar de Aventuras',114,'IMAX','Lorem ipsum dolor sit amet',127,12,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
