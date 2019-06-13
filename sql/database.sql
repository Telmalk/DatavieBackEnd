-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: localhost    Database: playernba
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `player` (
  `id_player` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `birth_year` int(11) NOT NULL,
  `college` varchar(70) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_player`),
  UNIQUE KEY `idplayer_UNIQUE` (`id_player`)
) ENGINE=InnoDB AUTO_INCREMENT=47342 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `player_stat`
--

DROP TABLE IF EXISTS `player_stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `player_stat` (
  `id_player_stat` int(11) NOT NULL AUTO_INCREMENT,
  `post` varchar(15) NOT NULL,
  `points` int(11) NOT NULL,
  `three_point_attempts` int(11) NOT NULL,
  `three_points` int(11) NOT NULL,
  `minute_played` int(11) NOT NULL,
  `match_played` int(11) NOT NULL,
  `two_point_attempts` int(11) NOT NULL,
  `two_points` int(11) NOT NULL,
  `field_goal_attempts` int(11) NOT NULL,
  `field_goal` int(11) NOT NULL,
  `free_throw_attempts` int(11) NOT NULL,
  `free_throw` int(11) NOT NULL,
  `offensive_rebound` int(11) NOT NULL,
  `defensive_rebound` int(11) NOT NULL,
  `three_points_percent` int(11) NOT NULL,
  `field_goal_pourcent` int(11) NOT NULL,
  `efficient_field_goal_pourcent` int(11) NOT NULL,
  `two_point_percent` int(11) NOT NULL,
  `turnover` int(11) NOT NULL,
  `personal_fault` int(11) NOT NULL,
  `assist` int(11) NOT NULL,
  `game_started` int(11) NOT NULL,
  `block` int(11) NOT NULL,
  `steal` int(11) NOT NULL,
  `free_throw_percent` int(11) NOT NULL,
  `steal_percent` varchar(10) NOT NULL,
  `defensive_rebound_percent` varchar(10) NOT NULL,
  `block_percent` varchar(10) NOT NULL,
  `id_player` int(11) NOT NULL,
  `id_team` int(11) NOT NULL,
  `id_season` int(11) NOT NULL,
  PRIMARY KEY (`id_player_stat`),
  UNIQUE KEY `id_player_stat_UNIQUE` (`id_player_stat`),
  KEY `fk_player_stat_player_idx` (`id_player`),
  KEY `fk_player_stat_team_idx` (`id_team`),
  KEY `fk_player_stat_season_idx` (`id_season`),
  CONSTRAINT `fk_player_stat_player` FOREIGN KEY (`id_player`) REFERENCES `player` (`id_player`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_player_stat_season` FOREIGN KEY (`id_season`) REFERENCES `season` (`id_season`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_player_stat_team` FOREIGN KEY (`id_team`) REFERENCES `team` (`id_team`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `season` (
  `id_season` int(11) NOT NULL AUTO_INCREMENT,
  `season_year` varchar(10) NOT NULL,
  PRIMARY KEY (`id_season`),
  UNIQUE KEY `idseason_UNIQUE` (`id_season`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `team` (
  `id_team` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `short_name` varchar(4) NOT NULL,
  `logo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_team`),
  UNIQUE KEY `idteam_UNIQUE` (`id_team`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-13 11:13:54
