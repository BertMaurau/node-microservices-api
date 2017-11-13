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
  `releaseDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `movies` */

INSERT INTO `movies` (`id`, `title`, `runtime`, `format`, `plot`, `releaseDate`) VALUES
  ('1','Battle of the Sexes','115','IMAX','Lorem ipsum dolor sit amet','2017-10-01'),
  ('2','Vele Hemels','124','IMAX','Lorem ipsum dolor sit amet','2017-10-25'),
  ('3','The Foreigner','107','IMAX','Lorem ipsum dolor sit amet','2017-11-11'),
  ('4','Weg van Jou','107','IMAX','Lorem ipsum dolor sit amet','2017-11-28'),
  ('5','Jigsaw','114','IMAX','Lorem ipsum dolor sit amet','2017-12-31');
 

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
