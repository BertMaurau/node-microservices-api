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

/*Table structure for table `cinemas` */

DROP TABLE IF EXISTS `cinemas`;

CREATE TABLE `cinemas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `cinemas` */

insert  into `cinemas`(`id`,`name`,`zip`) values (1,'Kinepolis Gent','9000'),(2,'Kinepolis Oostende','8400'),(3,'Klein Theather','9070');

/*Table structure for table `cinemas_rooms` */

DROP TABLE IF EXISTS `cinemas_rooms`;

CREATE TABLE `cinemas_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cinema_id` int(11) DEFAULT NULL,
  `name` varchar(120) DEFAULT NULL,
  `seats` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `cinemas_rooms` */

insert  into `cinemas_rooms`(`id`,`cinema_id`,`name`,`seats`) values (1,1,'Zaal 1',120),(2,1,'Zaal 2',280),(3,1,'Zaal 3',120),(4,2,'Zaal 1',120),(5,2,'Zaal 2',280),(6,3,'Hoofdzaal',75);

/*Table structure for table `cinemas_schedule` */

DROP TABLE IF EXISTS `cinemas_schedule`;

CREATE TABLE `cinemas_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cinema_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `time` varchar(6) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `cinemas_schedule` */

insert  into `cinemas_schedule`(`id`,`cinema_id`,`room_id`,`movie_id`,`time`,`price`) values (1,1,1,1,'12:30',8),(2,1,3,2,'17:45',10),(3,2,2,1,'20:00',8),(4,3,1,4,'15:30',5),(5,3,1,2,'21:00',7),(6,1,2,1,'13:30',8);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
