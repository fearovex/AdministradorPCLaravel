-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: portal_oxohotel
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banner_files_campania`
--

DROP TABLE IF EXISTS `banner_files_campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banner_files_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `nombre_img_web` varchar(255) NOT NULL DEFAULT 'Untitled.txt',
  `mime_img_web` varchar(100) DEFAULT NULL,
  `tamano_img_web` bigint(20) DEFAULT NULL,
  `datos_img_web` mediumblob,
  `nombre_img_movil` varchar(255) NOT NULL DEFAULT 'Untitled.txt',
  `mime_img_movil` varchar(100) DEFAULT NULL,
  `tamano_img_movil` bigint(20) DEFAULT NULL,
  `datos_img_movil` mediumblob,
  `estado` tinyint(4) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner_files_campania`
--

LOCK TABLES `banner_files_campania` WRITE;
/*!40000 ALTER TABLE `banner_files_campania` DISABLE KEYS */;
INSERT INTO `banner_files_campania` VALUES (1,2,'/img/banner/banner1.png',NULL,NULL,NULL,'/img/banner/banner1.png',NULL,NULL,NULL,NULL,'2020-01-24 18:30:37'),(2,2,'/img/banner/banner2.png',NULL,NULL,NULL,'/img/banner/banner2.png',NULL,NULL,NULL,NULL,'2020-01-24 18:30:37'),(3,2,'/img/banner/banner3.png',NULL,NULL,NULL,'/img/banner/banner1.png',NULL,NULL,NULL,NULL,'2020-01-24 18:30:37'),(4,2,'/img/banner/banner4.png',NULL,NULL,NULL,'/img/banner/banner2.png',NULL,NULL,NULL,NULL,'2020-01-24 18:30:37');
/*!40000 ALTER TABLE `banner_files_campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caducidad_voucher`
--

DROP TABLE IF EXISTS `caducidad_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caducidad_voucher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caducidad_voucher`
--

LOCK TABLES `caducidad_voucher` WRITE;
/*!40000 ALTER TABLE `caducidad_voucher` DISABLE KEYS */;
INSERT INTO `caducidad_voucher` VALUES (1,'No Expira'),(2,'Expira'),(3,'Activar Una Vez Usado');
/*!40000 ALTER TABLE `caducidad_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campania`
--

DROP TABLE IF EXISTS `campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campania` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_locacion` int(11) DEFAULT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `ano_evento` int(11) DEFAULT NULL,
  `campania` varchar(200) DEFAULT NULL,
  `zona_ap` varchar(100) DEFAULT NULL,
  `vertical_economica` varchar(100) DEFAULT 'Hoteles',
  PRIMARY KEY (`id`),
  KEY `id_locacion` (`id_locacion`),
  CONSTRAINT `id_locacion` FOREIGN KEY (`id_locacion`) REFERENCES `locaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campania`
--

LOCK TABLES `campania` WRITE;
/*!40000 ALTER TABLE `campania` DISABLE KEYS */;
INSERT INTO `campania` VALUES (2,1,'Ermita-Cartagena','Portal Cautivo para los huespedes','2019-12-06','2020-12-31',2019,'portal_cautivo_habitaciones','1','Hoteles');
/*!40000 ALTER TABLE `campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diccionario`
--

DROP TABLE IF EXISTS `diccionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diccionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_column` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `alias_column` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diccionario`
--

LOCK TABLES `diccionario` WRITE;
/*!40000 ALTER TABLE `diccionario` DISABLE KEYS */;
INSERT INTO `diccionario` VALUES (1,'id_evento','Campania'),(2,'fecha_creacion','Fecha Registro'),(3,'nombre','Nombre'),(4,'email','Email'),(5,'edad','Edad'),(6,'telefono','Telefono'),(7,'genero','Genero'),(8,'os','Sistema Operativo'),(9,'ssid','Ssid'),(10,'mac_cliente','Mac Cliente'),(11,'ip_cliente','Ip Cliente'),(12,'ip_ap','Ip Dispositivo'),(13,'mac_ap','Mac Dispositivo'),(14,'id_pais','Pais'),(15,'piso','Piso'),(16,'bloque','Bloque'),(17,'num_habitacion','N° Habitacion'),(18,'apellidos','Apellidos'),(19,'razon_visita','Razon Visita'),(20,'num_voucher','Numero de Vouchers');
/*!40000 ALTER TABLE `diccionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivos`
--

DROP TABLE IF EXISTS `dispositivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dispositivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_dispositivo` varchar(100) NOT NULL DEFAULT '',
  `mac_dispositivo` varchar(100) NOT NULL DEFAULT '',
  `id_zona` int(11) NOT NULL DEFAULT '0',
  `tecnologia` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivos`
--

LOCK TABLES `dispositivos` WRITE;
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
INSERT INTO `dispositivos` VALUES (1,'oxoHotel-Ermita-1','1c:3a:60:0d:aa:c0',1,'Rukus'),(2,'oxoHotel-Ermita-2','1c:3a:60:31:16:20',1,'Rukus'),(3,'oxoHotel-Ermita-3','1c:3a:60:31:1b:e0',1,'Rukus'),(4,'oxoHotel-Ermita-4','1c:3a:60:31:27:50',1,'Rukus'),(5,'oxoHotel-Ermita-5','1c:3a:60:31:35:50',1,'Rukus'),(6,'oxoHotel-Ermita-6','1c:3a:60:31:42:b0',1,'Rukus'),(7,'oxoHotel-Ermita-7','1c:3a:60:31:58:50',1,'Rukus'),(8,'oxoHotel-Ermita-8','1c:3a:60:31:58:e0',1,'Rukus'),(9,'oxoHotel-Ermita-9','1c:3a:60:31:5b:40',1,'Rukus'),(10,'oxoHotel-Ermita-10','1c:3a:60:31:5b:50',1,'Rukus'),(11,'oxoHotel-Ermita-11','1c:3a:60:31:5b:60',1,'Rukus'),(12,'oxoHotel-Ermita-12','1c:3a:60:31:5c:10',1,'Rukus'),(13,'oxoHotel-Ermita-13','1c:3a:60:31:70:a0',1,'Rukus'),(14,'oxoHotel-Ermita-14','1c:3a:60:31:72:50',1,'Rukus'),(15,'oxoHotel-Ermita-15','1c:3a:60:31:72:60',1,'Rukus'),(16,'oxoHotel-Ermita-16','1c:3a:60:31:72:70',1,'Rukus'),(17,'oxoHotel-Ermita-17','1c:3a:60:31:7b:20',1,'Rukus'),(18,'oxoHotel-Ermita-18','1c:3a:60:31:7c:10',1,'Rukus'),(19,'oxoHotel-Ermita-19','1c:3a:60:31:81:a0',1,'Rukus'),(20,'oxoHotel-Ermita-20','1c:3a:60:31:82:40',1,'Rukus'),(21,'oxoHotel-Ermita-21','1c:3a:60:31:93:60',1,'Rukus'),(22,'oxoHotel-Ermita-22','1c:3a:60:31:95:10',1,'Rukus'),(23,'oxoHotel-Ermita-23','1c:3a:60:3a:5c:00',1,'Rukus'),(24,'oxoHotel-Ermita-24','60d02c2d04f0',1,'Rukus'),(25,'oxoHotel-Ermita-25','60d02c2d054f3',1,'Rukus'),(26,'oxoHotel-Ermita-26','94:bf:c4:16:0e:70',1,'Rukus'),(27,'oxoHotel-Ermita-27','94:bf:c4:16:31:40',1,'Rukus'),(28,'oxoHotel-Ermita-28','94:bf:c4:16:65:40',1,'Rukus'),(29,'oxoHotel-Ermita-29','94:bf:c4:16:a5:f0',1,'Rukus'),(30,'oxoHotel-Ermita-30','94:bf:c4:16:ad:50',1,'Rukus'),(31,'oxoHotel-Ermita-31','94:bf:c4:16:b7:a0',1,'Rukus'),(32,'oxoHotel-Ermita-32','94:bf:c4:16:b8:b0',1,'Rukus'),(33,'oxoHotel-Ermita-33','94:bf:c4:16:c7:70',1,'Rukus'),(34,'oxoHotel-Ermita-34','94:bf:c4:16:ca:60',1,'Rukus'),(35,'oxoHotel-Ermita-35','94:bf:c4:16:f9:80',1,'Rukus'),(36,'oxoHotel-Ermita-36','94:bf:c4:16:fd:70',1,'Rukus'),(37,'oxoHotel-Ermita-37','94:bf:c4:17:05:e0',1,'Rukus'),(38,'oxoHotel-Ermita-38','94:bf:c4:17:17:b0',1,'Rukus'),(39,'oxoHotel-Ermita-39','94:bf:c4:17:18:50',1,'Rukus'),(40,'oxoHotel-Ermita-40','94:bf:c4:17:1b:80',1,'Rukus'),(41,'oxoHotel-Ermita-41','94:bf:c4:17:1f:f0',1,'Rukus'),(42,'oxoHotel-Ermita-42','94:bf:c4:17:20:70',1,'Rukus'),(43,'oxoHotel-Ermita-43','94:bf:c4:17:21:50',1,'Rukus'),(44,'oxoHotel-Ermita-44','94:bf:c4:17:28:50',1,'Rukus'),(45,'oxoHotel-Ermita-45','94:bf:c4:17:2a:60',1,'Rukus'),(46,'oxoHotel-Ermita-46','94:bf:c4:18:1c:70',1,'Rukus'),(47,'oxoHotel-Ermita-47','94:bf:c4:18:33:50',1,'Rukus'),(48,'oxoHotel-Ermita-48','94:bf:c4:18:34:d0',1,'Rukus'),(49,'oxoHotel-Ermita-49','94:bf:c4:18:37:d0',1,'Rukus'),(50,'oxoHotel-Ermita-50','94:bf:c4:18:38:20',1,'Rukus'),(51,'oxoHotel-Ermita-51','b4:79:c8:29:6f:b0',1,'Rukus'),(52,'oxoHotel-Ermita-52','b4:79:c8:29:e2:70',1,'Rukus'),(53,'oxoHotel-Ermita-53','b4:79:c8:29:e2:f0',1,'Rukus'),(54,'oxoHotel-Ermita-54','b4:79:c8:29:e8:a0',1,'Rukus'),(55,'oxoHotel-Ermita-55','b4:79:c8:2a:0d:10',1,'Rukus'),(56,'oxoHotel-Ermita-56','b4:79:c8:2a:11:50',1,'Rukus'),(57,'Ap-Prueba','BB:BB:BB:BB',2,'Ruckus');
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files_campania`
--

DROP TABLE IF EXISTS `files_campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `id_tipo_archivo_multimedia` int(10) unsigned NOT NULL,
  `nombre` varchar(255) NOT NULL DEFAULT 'Untitled.txt',
  `mime` varchar(50) DEFAULT 'image/png',
  `tamano` bigint(20) DEFAULT NULL,
  `datos` mediumblob,
  `estado` tinyint(4) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files_campania`
--

LOCK TABLES `files_campania` WRITE;
/*!40000 ALTER TABLE `files_campania` DISABLE KEYS */;
INSERT INTO `files_campania` VALUES (1,2,1,'/img/background.png','image/png',NULL,NULL,NULL,'2020-01-24 18:30:37'),(2,2,2,'/img/logo.png','image/png',NULL,NULL,NULL,'2020-01-24 18:30:37');
/*!40000 ALTER TABLE `files_campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `piso` varchar(45) DEFAULT NULL,
  `bloque` varchar(45) DEFAULT NULL,
  `num_habitacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES (1,'1','B','101'),(2,'1','B','102'),(3,'1','B','105'),(4,'1','B','106'),(5,'1','B','107'),(6,'1','B','108'),(7,'1','B','109'),(8,'1','B','110'),(9,'1','B','111'),(10,'1','B','112'),(11,'1','B','113'),(12,'1','C','115'),(13,'1','C','116'),(14,'1','C','119'),(15,'1','C','120'),(16,'1','C','121'),(17,'1','C','122'),(18,'1','C','123'),(19,'1','C','124'),(20,'1','C','125'),(21,'1','C','126'),(22,'2','A','227'),(23,'2','A','228'),(24,'2','A','229'),(25,'2','A','230'),(26,'2','A','231'),(27,'2','A','233'),(28,'2','A','234'),(29,'2','A','235'),(30,'2','A','236'),(31,'2','A','237'),(32,'2','A','238'),(33,'2','A','239'),(34,'2','A','240'),(35,'2','A','241'),(36,'2','A','242'),(37,'2','A','243'),(38,'2','A','245'),(39,'2','B','201'),(40,'2','B','202'),(41,'2','B','203'),(42,'2','B','204'),(43,'2','B','205'),(44,'2','B','206'),(45,'2','B','207'),(46,'2','B','208'),(47,'2','B','209'),(48,'2','B','210'),(49,'2','B','211'),(50,'2','B','212'),(51,'2','B','213'),(52,'2','C','215'),(53,'2','C','216'),(54,'2','C','217'),(55,'2','C','218'),(56,'2','C','219'),(57,'2','C','220'),(58,'2','C','221'),(59,'2','C','222'),(60,'2','C','223'),(61,'2','C','224'),(62,'2','C','225'),(63,'2','C','226'),(64,'3','A','333'),(65,'3','A','334'),(66,'3','A','335'),(67,'3','A','336'),(68,'3','A','337'),(69,'3','A','338'),(70,'3','A','339'),(71,'3','A','340'),(72,'3','A','341'),(73,'3','A','342'),(74,'3','A','343'),(75,'3','A','345'),(76,'3','B','301'),(77,'3','B','302'),(78,'3','B','303'),(79,'3','B','304'),(80,'3','B','305'),(81,'3','B','306'),(82,'3','B','307'),(83,'3','B','308'),(84,'3','B','309'),(85,'3','B','310'),(86,'3','B','311'),(87,'3','B','312'),(88,'3','C','315'),(89,'3','C','316'),(90,'3','C','317'),(91,'3','C','318'),(92,'3','C','319'),(93,'3','C','320'),(94,'3','C','321'),(95,'3','C','322'),(96,'3','C','323'),(97,'3','C','324'),(98,'3','C','325'),(99,'3','C','326');
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locaciones`
--

DROP TABLE IF EXISTS `locaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `direccion` varchar(50) NOT NULL DEFAULT '',
  `pais` varchar(1000) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `PaginaWeb` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locaciones`
--

LOCK TABLES `locaciones` WRITE;
/*!40000 ALTER TABLE `locaciones` DISABLE KEYS */;
INSERT INTO `locaciones` VALUES (1,'Hotel Ermita','Av. Santander #41 - 202','Colombia','Cartagena',NULL,'http://www.oxohotel.com/portfolio/ermita-tribute-portfolio/');
/*!40000 ALTER TABLE `locaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paises`
--

DROP TABLE IF EXISTS `paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_esp` varchar(250) DEFAULT NULL,
  `nombre_en` varchar(250) DEFAULT NULL,
  `nombre_fr` varchar(250) DEFAULT NULL,
  `iso2` varchar(45) DEFAULT NULL,
  `iso3` varchar(45) DEFAULT NULL,
  `indicativo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paises`
--

LOCK TABLES `paises` WRITE;
/*!40000 ALTER TABLE `paises` DISABLE KEYS */;
INSERT INTO `paises` VALUES (1,'Afganistán','Afghanistan','Afghanistan','AF','AFG',93),(2,'Albania','Albania','Albanie','AL','ALB',355),(3,'Alemania','Germany','Allemagne','DE','DEU',49),(4,'Algeria','Algeria','Algérie','DZ','DZA',213),(5,'Andorra','Andorra','Andorra','AD','AND',376),(6,'Angola','Angola','Angola','AO','AGO',244),(7,'Antártida','Antarctica','Antarctique','AQ','ATA',672),(8,'Arabia Saudita','Saudi Arabia','Arabie Saoudite','SA','SAU',966),(9,'Argentina','Argentina','Argentine','AR','ARG',54),(10,'Armenia','Armenia','Arménie','AM','ARM',374),(11,'Aruba','Aruba','Aruba','AW','ABW',297),(12,'Australia','Australia','Australie','AU','AUS',61),(13,'Austria','Austria','Autriche','AT','AUT',43),(14,'Azerbaiyán','Azerbaijan','Azerbaïdjan','AZ','AZE',994),(15,'Bélgica','Belgium','Belgique','BE','BEL',32),(16,'Bahrein','Bahrain','Bahreïn','BH','BHR',973),(17,'Bangladesh','Bangladesh','Bangladesh','BD','BGD',880),(18,'Belice','Belize','Belize','BZ','BLZ',501),(19,'Benín','Benin','Bénin','BJ','BEN',229),(20,'Bhután','Bhutan','Le Bhoutan','BT','BTN',975),(21,'Bielorrusia','Belarus','Biélorussie','BY','BLR',375),(22,'Birmania','Myanmar','Myanmar','MM','MMR',95),(23,'Bolivia','Bolivia','Bolivie','BO','BOL',591),(24,'Bosnia y Herzegovina','Bosnia and Herzegovina','Bosnie-Herzégovine','BA','BIH',387),(25,'Botsuana','Botswana','Botswana','BW','BWA',267),(26,'Brasil','Brazil','Brésil','BR','BRA',55),(27,'Brunéi','Brunei','Brunei','BN','BRN',673),(28,'Bulgaria','Bulgaria','Bulgarie','BG','BGR',359),(29,'Burkina Faso','Burkina Faso','Burkina Faso','BF','BFA',226),(30,'Burundi','Burundi','Burundi','BI','BDI',257),(31,'Cabo Verde','Cape Verde','Cap-Vert','CV','CPV',238),(32,'Camboya','Cambodia','Cambodge','KH','KHM',855),(33,'Camerún','Cameroon','Cameroun','CM','CMR',237),(34,'Canadá','Canada','Canada','CA','CAN',1),(35,'Chad','Chad','Tchad','TD','TCD',235),(36,'Chile','Chile','Chili','CL','CHL',56),(37,'China','China','Chine','CN','CHN',86),(38,'Chipre','Cyprus','Chypre','CY','CYP',357),(39,'Ciudad del Vaticano','Vatican City State','Cité du Vatican','VA','VAT',39),(40,'Colombia','Colombia','Colombie','CO','COL',57),(41,'Comoras','Comoros','Comores','KM','COM',269),(42,'República del Congo','Republic of the Congo','République du Congo','CG','COG',242),(43,'República Democrática del Congo','Democratic Republic of the Congo','République démocratique du Congo','CD','COD',243),(44,'Corea del Norte','North Korea','Corée du Nord','KP','PRK',850),(45,'Corea del Sur','South Korea','Corée du Sud','KR','KOR',82),(46,'Costa de Marfil','Ivory Coast','Ivoire','CI','CIV',225),(47,'Costa Rica','Costa Rica','Costa Rica','CR','CRI',506),(48,'Croacia','Croatia','Croatie','HR','HRV',385),(49,'Cuba','Cuba','Cuba','CU','CUB',53),(50,'Curazao','Curaçao','Curaçao','CW','CWU',5999),(51,'Dinamarca','Denmark','Danemark','DK','DNK',45),(52,'Ecuador','Ecuador','Equateur','EC','ECU',593),(53,'Egipto','Egypt','Egypte','EG','EGY',20),(54,'El Salvador','El Salvador','El Salvador','SV','SLV',503),(55,'Emiratos Árabes Unidos','United Arab Emirates','Emirats Arabes Unis','AE','ARE',971),(56,'Eritrea','Eritrea','Erythrée','ER','ERI',291),(57,'Eslovaquia','Slovakia','Slovaquie','SK','SVK',421),(58,'Eslovenia','Slovenia','Slovénie','SI','SVN',386),(59,'España','Spain','Espagne','ES','ESP',34),(60,'Estados Unidos de América','United States of America','États-Unis Amérique','US','USA',1),(61,'Estonia','Estonia','Estonie','EE','EST',372),(62,'Etiopía','Ethiopia','Ethiopie','ET','ETH',251),(63,'Filipinas','Philippines','Philippines','PH','PHL',63),(64,'Finlandia','Finland','Finlande','FI','FIN',358),(65,'Fiyi','Fiji','Fidji','FJ','FJI',679),(66,'Francia','France','France','FR','FRA',33),(67,'Gabón','Gabon','Gabon','GA','GAB',241),(68,'Gambia','Gambia','Gambie','GM','GMB',220),(69,'Georgia','Georgia','Géorgie','GE','GEO',995),(70,'Ghana','Ghana','Ghana','GH','GHA',233),(71,'Gibraltar','Gibraltar','Gibraltar','GI','GIB',350),(72,'Grecia','Greece','Grèce','GR','GRC',30),(73,'Groenlandia','Greenland','Groenland','GL','GRL',299),(74,'Guatemala','Guatemala','Guatemala','GT','GTM',502),(75,'Guinea','Guinea','Guinée','GN','GIN',224),(76,'Guinea Ecuatorial','Equatorial Guinea','Guinée Equatoriale','GQ','GNQ',240),(77,'Guinea-Bissau','Guinea-Bissau','Guinée-Bissau','GW','GNB',245),(78,'Guyana','Guyana','Guyane','GY','GUY',592),(79,'Haití','Haiti','Haïti','HT','HTI',509),(80,'Honduras','Honduras','Honduras','HN','HND',504),(81,'Hong kong','Hong Kong','Hong Kong','HK','HKG',852),(82,'Hungría','Hungary','Hongrie','HU','HUN',36),(83,'India','India','Inde','IN','IND',91),(84,'Indonesia','Indonesia','Indonésie','ID','IDN',62),(85,'Irán','Iran','Iran','IR','IRN',98),(86,'Irak','Iraq','Irak','IQ','IRQ',964),(87,'Irlanda','Ireland','Irlande','IE','IRL',353),(88,'Isla de Man','Isle of Man','Ile de Man','IM','IMN',44),(89,'Isla de Navidad','Christmas Island','Christmas Island','CX','CXR',61),(90,'Islandia','Iceland','Islande','IS','ISL',354),(91,'Islas Cocos (Keeling)','Cocos (Keeling) Islands','Cocos (Keeling','CC','CCK',61),(92,'Islas Cook','Cook Islands','Iles Cook','CK','COK',682),(93,'Islas Feroe','Faroe Islands','Iles Féro','FO','FRO',298),(94,'Islas Maldivas','Maldives','Maldives','MV','MDV',960),(95,'Islas Malvinas','Falkland Islands (Malvinas)','Iles Falkland (Malvinas','FK','FLK',500),(96,'Islas Marshall','Marshall Islands','Iles Marshall','MH','MHL',692),(97,'Islas Pitcairn','Pitcairn Islands','Iles Pitcairn','PN','PCN',870),(98,'Islas Salomón','Solomon Islands','Iles Salomon','SB','SLB',677),(99,'Israel','Israel','Israël','IL','ISR',972),(100,'Italia','Italy','Italie','IT','ITA',39),(101,'Japón','Japan','Japon','JP','JPN',81),(102,'Jordania','Jordan','Jordan','JO','JOR',962),(103,'Kazajistán','Kazakhstan','Le Kazakhstan','KZ','KAZ',7),(104,'Kenia','Kenya','Kenya','KE','KEN',254),(105,'Kirguistán','Kyrgyzstan','Kirghizstan','KG','KGZ',996),(106,'Kiribati','Kiribati','Kiribati','KI','KIR',686),(107,'Kuwait','Kuwait','Koweït','KW','KWT',965),(108,'Líbano','Lebanon','Liban','LB','LBN',961),(109,'Laos','Laos','Laos','LA','LAO',856),(110,'Lesoto','Lesotho','Lesotho','LS','LSO',266),(111,'Letonia','Latvia','La Lettonie','LV','LVA',371),(112,'Liberia','Liberia','Liberia','LR','LBR',231),(113,'Libia','Libya','Libye','LY','LBY',218),(114,'Liechtenstein','Liechtenstein','Liechtenstein','LI','LIE',423),(115,'Lituania','Lithuania','La Lituanie','LT','LTU',370),(116,'Luxemburgo','Luxembourg','Luxembourg','LU','LUX',352),(117,'México','Mexico','Mexique','MX','MEX',52),(118,'Mónaco','Monaco','Monaco','MC','MCO',377),(119,'Macao','Macao','Macao','MO','MAC',853),(120,'Macedônia','Macedonia','Macédoine','MK','MKD',389),(121,'Madagascar','Madagascar','Madagascar','MG','MDG',261),(122,'Malasia','Malaysia','Malaisie','MY','MYS',60),(123,'Malawi','Malawi','Malawi','MW','MWI',265),(124,'Mali','Mali','Mali','ML','MLI',223),(125,'Malta','Malta','Malte','MT','MLT',356),(126,'Marruecos','Morocco','Maroc','MA','MAR',212),(127,'Mauricio','Mauritius','Iles Maurice','MU','MUS',230),(128,'Mauritania','Mauritania','Mauritanie','MR','MRT',222),(129,'Mayotte','Mayotte','Mayotte','YT','MYT',262),(130,'Micronesia','Estados Federados de','Federados Estados de','FM','FSM',691),(131,'Moldavia','Moldova','Moldavie','MD','MDA',373),(132,'Mongolia','Mongolia','Mongolie','MN','MNG',976),(133,'Montenegro','Montenegro','Monténégro','ME','MNE',382),(134,'Mozambique','Mozambique','Mozambique','MZ','MOZ',258),(135,'Namibia','Namibia','Namibie','NA','NAM',264),(136,'Nauru','Nauru','Nauru','NR','NRU',674),(137,'Nepal','Nepal','Népal','NP','NPL',977),(138,'Nicaragua','Nicaragua','Nicaragua','NI','NIC',505),(139,'Niger','Niger','Niger','NE','NER',227),(140,'Nigeria','Nigeria','Nigeria','NG','NGA',234),(141,'Niue','Niue','Niou','NU','NIU',683),(142,'Noruega','Norway','Norvège','NO','NOR',47),(143,'Nueva Caledonia','New Caledonia','Nouvelle-Calédonie','NC','NCL',687),(144,'Nueva Zelanda','New Zealand','Nouvelle-Zélande','NZ','NZL',64),(145,'Omán','Oman','Oman','OM','OMN',968),(146,'Países Bajos','Netherlands','Pays-Bas','NL','NLD',31),(147,'Pakistán','Pakistan','Pakistan','PK','PAK',92),(148,'Palau','Palau','Palau','PW','PLW',680),(149,'Panamá','Panama','Panama','PA','PAN',507),(150,'Papúa Nueva Guinea','Papua New Guinea','Papouasie-Nouvelle-Guinée','PG','PNG',675),(151,'Paraguay','Paraguay','Paraguay','PY','PRY',595),(152,'Perú','Peru','Pérou','PE','PER',51),(153,'Polinesia Francesa','French Polynesia','Polynésie française','PF','PYF',689),(154,'Polonia','Poland','Pologne','PL','POL',48),(155,'Portugal','Portugal','Portugal','PT','PRT',351),(156,'Puerto Rico','Puerto Rico','Porto Rico','PR','PRI',1),(157,'Qatar','Qatar','Qatar','QA','QAT',974),(158,'Reino Unido','United Kingdom','Royaume-Uni','GB','GBR',44),(159,'República Centroafricana','Central African Republic','République Centrafricaine','CF','CAF',236),(160,'República Checa','Czech Republic','République Tchèque','CZ','CZE',420),(161,'República de Sudán del Sur','South Sudan','Soudan du Sud','SS','SSD',211),(162,'Ruanda','Rwanda','Rwanda','RW','RWA',250),(163,'Rumanía','Romania','Roumanie','RO','ROU',40),(164,'Rusia','Russia','La Russie','RU','RUS',7),(165,'Samoa','Samoa','Samoa','WS','WSM',685),(166,'San Bartolomé','Saint Barthélemy','Saint-Barthélemy','BL','BLM',590),(167,'San Marino','San Marino','San Marino','SM','SMR',378),(168,'San Pedro y Miquelón','Saint Pierre and Miquelon','Saint-Pierre-et-Miquelon','PM','SPM',508),(169,'Santa Elena','Ascensión y Tristán de Acuña','Ascensión y Tristan de Acuña','SH','SHN',290),(170,'Santo Tomé y Príncipe','Sao Tome and Principe','Sao Tomé et Principe','ST','STP',239),(171,'Senegal','Senegal','Sénégal','SN','SEN',221),(172,'Serbia','Serbia','Serbie','RS','SRB',381),(173,'Seychelles','Seychelles','Les Seychelles','SC','SYC',248),(174,'Sierra Leona','Sierra Leone','Sierra Leone','SL','SLE',232),(175,'Singapur','Singapore','Singapour','SG','SGP',65),(176,'Siria','Syria','Syrie','SY','SYR',963),(177,'Somalia','Somalia','Somalie','SO','SOM',252),(178,'Sri lanka','Sri Lanka','Sri Lanka','LK','LKA',94),(179,'Sudáfrica','South Africa','Afrique du Sud','ZA','ZAF',27),(180,'Sudán','Sudan','Soudan','SD','SDN',249),(181,'Suecia','Sweden','Suède','SE','SWE',46),(182,'Suiza','Switzerland','Suisse','CH','CHE',41),(183,'Surinám','Suriname','Surinam','SR','SUR',597),(184,'Swazilandia','Swaziland','Swaziland','SZ','SWZ',268),(185,'Tayikistán','Tajikistan','Le Tadjikistan','TJ','TJK',992),(186,'Tailandia','Thailand','Thaïlande','TH','THA',66),(187,'Taiwán','Taiwan','Taiwan','TW','TWN',886),(188,'Tanzania','Tanzania','Tanzanie','TZ','TZA',255),(189,'Timor Oriental','East Timor','Timor-Oriental','TL','TLS',670),(190,'Togo','Togo','Togo','TG','TGO',228),(191,'Tokelau','Tokelau','Tokélaou','TK','TKL',690),(192,'Tonga','Tonga','Tonga','TO','TON',676),(193,'Tunez','Tunisia','Tunisie','TN','TUN',216),(194,'Turkmenistán','Turkmenistan','Le Turkménistan','TM','TKM',993),(195,'Turquía','Turkey','Turquie','TR','TUR',90),(196,'Tuvalu','Tuvalu','Tuvalu','TV','TUV',688),(197,'Ucrania','Ukraine','Ukraine','UA','UKR',380),(198,'Uganda','Uganda','Ouganda','UG','UGA',256),(199,'Uruguay','Uruguay','Uruguay','UY','URY',598),(200,'Uzbekistán','Uzbekistan','Ouzbékistan','UZ','UZB',998),(201,'Vanuatu','Vanuatu','Vanuatu','VU','VUT',678),(202,'Venezuela','Venezuela','Venezuela','VE','VEN',58),(203,'Vietnam','Vietnam','Vietnam','VN','VNM',84),(204,'Wallis y Futuna','Wallis and Futuna','Wallis et Futuna','WF','WLF',681),(205,'Yemen','Yemen','Yémen','YE','YEM',967),(206,'Yibuti','Djibouti','Djibouti','DJ','DJI',253),(207,'Zambia','Zambia','Zambie','ZM','ZMB',260),(208,'Zimbabue','Zimbabwe','Zimbabwe','ZW','ZWE',263);
/*!40000 ALTER TABLE `paises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portal_cautivo_habitaciones`
--

DROP TABLE IF EXISTS `portal_cautivo_habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portal_cautivo_habitaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellidos` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_habitacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_voucher` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ssid` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mac_cliente` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_cliente` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_ap` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mac_ap` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razon_visita` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT 'Ninguna',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=394 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portal_cautivo_habitaciones`
--

LOCK TABLES `portal_cautivo_habitaciones` WRITE;
/*!40000 ALTER TABLE `portal_cautivo_habitaciones` DISABLE KEYS */;
INSERT INTO `portal_cautivo_habitaciones` VALUES (393,2,'2020-02-20 10:47:50','jhikk','rrdd','320','05bd6b','Windows','Ermita-Cartagena','DC:FB:48:7A:B2:EB','172.16.100.120','10.10.0.78','1c:3a:60:31:5c:10','Vacaciones');
/*!40000 ALTER TABLE `portal_cautivo_habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles_campania`
--

DROP TABLE IF EXISTS `styles_campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `styles_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `width_logo_web` varchar(255) NOT NULL DEFAULT '400px',
  `margin_logo_web` varchar(255) NOT NULL DEFAULT '5%',
  `width_logo_movil` varchar(255) NOT NULL DEFAULT '250px',
  `margin_logo_movil` varchar(255) NOT NULL DEFAULT '5%',
  `container_form_color` varchar(255) NOT NULL DEFAULT '#005153ad',
  `container_form_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_hover_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_hover_background_color` varchar(255) NOT NULL DEFAULT '#1a2b50',
  `checkbox_terms_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `checkbox_terms_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `msg_error_color_font` varchar(255) NOT NULL DEFAULT '#EEE',
  `msg_error_color_background` varchar(255) NOT NULL DEFAULT 'rgb(160,19,35,0.91)',
  `title_portal` varchar(100) DEFAULT NULL,
  `color_title_portal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles_campania`
--

LOCK TABLES `styles_campania` WRITE;
/*!40000 ALTER TABLE `styles_campania` DISABLE KEYS */;
INSERT INTO `styles_campania` VALUES (1,2,'400px','5%','250px','5%','rgba(0, 80, 82, 0.8)','rgba(238, 238, 238, 1)','rgba(238, 238, 238, 1)','rgba(32, 57, 111, 1)','rgba(32, 57, 111, 1)','rgba(238, 238, 238, 1)','rgba(26, 43, 80, 1)','rgba(32, 57, 111, 1)','rgba(32, 57, 111, 1)','rgba(238, 238, 238, 1)','rgb(160,19,35,0.91)','Portal Cautivo Ermita','rgba(0,0,0,1)');
/*!40000 ALTER TABLE `styles_campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms_conditions_campania`
--

DROP TABLE IF EXISTS `terms_conditions_campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terms_conditions_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `terms_conditions_es` longtext NOT NULL,
  `terms_conditions_en` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms_conditions_campania`
--

LOCK TABLES `terms_conditions_campania` WRITE;
/*!40000 ALTER TABLE `terms_conditions_campania` DISABLE KEYS */;
INSERT INTO `terms_conditions_campania` VALUES (1,2,'<p style=\"text-align: center;\"><strong>BIENVENIDO AL SERVICIO DE ACCESO A INTERNET DE BANDA ANCHA!!</strong></p><p><br><strong>Antes de continuar, tenga en cuenta que:</strong></p><ol><li>Puede haber interrupciones en el servicio debido a razones técnicas que escapan a nuestro control.</li><li>No somos responsables de la precisión y adecuación de la información o el material contenido en los sitios web que se pueden ver o descargar de Internet utilizando el servicio.</li><li>Internet es inherente mente inseguro, y puede estar expuesto a virus y otras amenazas dependiendo de los sitios visitados por usted y las acciones tomadas por usted sobre las cuales no tenemos control. No podemos garantizar la confidencialidad de ninguna información que elija transmitir por Internet. <strong>EL USO DEL SERVICIO ES TOTALMENTE BAJO SU PROPIO RIESGO</strong>. No seremos responsables de ninguna pérdida, daños, costos y / u otros reclamos directos e indirectos, especiales o consecuentes que puedan surgir como resultado de su uso del servicio.</li><li>Se le recuerda que debe cumplir con todas las leyes, normas y reglamentos locales, y usted será el único responsable de cualquier incumplimiento de la ley. También tenga en cuenta que las autoridades locales pueden requerir que sus actividades en línea sean registradas. Además, algunos sitios web pueden no estar disponibles de conformidad con las leyes, normas y / o regulaciones locales.</li><li><strong>HABEAS DATA Y PROTECCIÓN DE DATOS PERSONALES.</strong> Según la ley 1581 de 2012 y su decreto reglamentario 1377 de 2013 declaro que mediante la firma del presente documento autorizo a HOTEL, a su operador hotelero y a la cadena del hotel al que pertenezca y a quienes representen sus derechos, a para que recolectar, almacenar, usar, conocer, consultar, manipular, transferir y/o transmitir los mis datos personales que entrego en este formato, para: (i) Proporcionarme la totalidad de los servicios hoteleros solicitados; (ii) Contactarme directamente, o por medio de terceros contratados para el efecto, en cualquier momento, y por medio escrito, telefónico y/o electrónico, en el desarrollo de actividades de mercadeo y publicidad, incluyendo ofertas promocionales, investigación de mercado y prospección comercial; (iii) Contactarme, en mi calidad de huésped/cliente, para mayor conocimiento, actualización de datos, realizar encuestas de satisfacción, y creación de mi perfil como cliente; (iv) Enviarme información relacionada con productos, servicios, eventos, alianzas y ofertas por cualquier medio; (v) Atención de requerimientos de autoridades; (vi) Compartirla con aliados comerciales; (vii) Atención y trámite de peticiones, quejas y reclamos. Declaro conocer que el HOTEL podrá solicitar al momento de mi registro, como garantía, un Voucher/Pagaré el cual será devuelto y/o destruido al momento de mi Check Out; y que, en caso que el Voucher/pagaré no sea devuelto o destruido en ese momento, el HOTEL se reserva el derecho de destruirlo pasado un mes, desde mi retiro sin que lo hubiera solicitado, dejando constancia de la destrucción. Conozco que para mayor información sobre el uso de mis datos personales y mi facultad de solicitar su corrección o eliminación, podré consultar la política de tratamiento de datos personales del HOTEL publicada en la página web <a data-fr-linked=\"true\" href=\"//www.oxohotel.com//politicas-de-privacidad-de-datos/\">www.oxohotel.com//politicas-de-privacidad-de-datos/</a>.</li></ol><p><br></p><p>Esperamos que disfrute del servicio de internet que le brindamos. Si ha leído y acepta los términos y condiciones anteriores y desea continuar para acceder al Servicio, haga clic en el enlace a continuación.</p><p>&nbsp;</p>','<p style=\"text-align: center;\"><strong>WELCOME TO BROADBAND INTERNET ACCESS SERVICE!</strong></p><p><br><br><strong>Before you proceed, please acknowledge that:</strong>&nbsp;</p><ol><li>There may be interruptions to the service due to technical reasons beyond our control.</li><li>We are not responsible for the accuracy and appropriateness of the information or material contained on any web sites viewed on or downloaded from the Internet using the service.</li><li>The Internet is inherently insecure, and you may be exposed to viruses and other threats depending on the sites visited by you and the actions taken by you over which we have no control. We cannot guarantee the confidentiality of any information which you choose to transmit over the Internet. USING THE SERVICE IS ENTIRELY AT YOUR OWN RISK. We shall not be liable for any direct and indirect, special or consequential loss, damages, costs and/or other claims that may arise as a result of your use of the service.</li><li>You are reminded to comply with all local laws, rules and regulations, and you will be solely responsible for any breaches of the law. Please also be informed that your online activities may be required to be logged by local authorities. Furthermore, some web sites may be unavailable pursuant to local laws, rules and/or regulations.</li><li>HABEAS DATA AND PROTECTION OF PERSONAL DATA. According to Law 1581 of 2012 and its regulatory decree 1377 of 2013, I declare that by signing this document I authorize HOTEL, its hotel operator and the hotel chain to which it belongs and who represent their rights, to collect, store, use, know, consult, manipulate, transfer and / or transmit the personal data that I deliver in this format, to: (i) Provide me with all the requested hotel services; (ii) Contact me directly, or through third parties contracted for the purpose, at any time, and by written, telephone and / or electronic means, in the development of marketing and advertising activities, including promotional offers, market research and prospecting commercial; (iii) Contact me, as a guest / client, for more knowledge, data updates, satisfaction surveys, and creation of my profile as a client; (iv) Send me information related to products, services, events, alliances and offers by any means; (v) Attention of requirements of authorities; (vi) Share with business allies; (vii) Attention and processing of requests, complaints and claims. I declare to know that the HOTEL may request at the time of my registration, as a guarantee, a Voucher / I will pay which will be returned and / or destroyed at the time of my Check Out; and that, in the event that the Voucher / promissory note is not returned or destroyed at that time, the HOTEL reserves the right to destroy it after one month, from my withdrawal without request, leaving proof of the destruction. I know that for more information about the use of my personal data and my ability to request its correction or deletion, I can consult the policy of personal data treatment of the HOTEL published on the website <a style=\"font-weight: bold; color: black;\"href=\"http://www.oxohotel.com/politicas-de-privacidad\">www.oxohotel.com//politicas-de-privacidad</a> -of data/.<br>&nbsp;</li></ol><p>We hope you enjoy the internet service provided by us. If you have read and agree to the above terms and conditions and wish to proceed to access the Service, kindly click on the link below.</p><p>&nbsp;</p>');
/*!40000 ALTER TABLE `terms_conditions_campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_archivos_multimedia`
--

DROP TABLE IF EXISTS `tipos_archivos_multimedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_archivos_multimedia` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_archivos_multimedia`
--

LOCK TABLES `tipos_archivos_multimedia` WRITE;
/*!40000 ALTER TABLE `tipos_archivos_multimedia` DISABLE KEYS */;
INSERT INTO `tipos_archivos_multimedia` VALUES (1,'Background'),(2,'Logo'),(3,'Favicon');
/*!40000 ALTER TABLE `tipos_archivos_multimedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_radius`
--

DROP TABLE IF EXISTS `users_radius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_radius` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_campania` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_radius`
--

LOCK TABLES `users_radius` WRITE;
/*!40000 ALTER TABLE `users_radius` DISABLE KEYS */;
INSERT INTO `users_radius` VALUES (5,2,393,'ivA6xL29','ivA6xL29','2020-02-20 10:47:50');
/*!40000 ALTER TABLE `users_radius` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vouchers` (
  `id_voucher` int(11) NOT NULL AUTO_INCREMENT,
  `voucher` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `estado` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `id_campania` int(11) NOT NULL,
  `num_usos` int(11) NOT NULL,
  `total_num_usos` int(11) NOT NULL,
  `id_locacion` int(11) NOT NULL,
  `etiqueta` varchar(250) COLLATE latin1_spanish_ci NOT NULL,
  `dias_disponibles` int(11) NOT NULL,
  `horas_disponibles` int(11) NOT NULL,
  `minutos_disponibles` int(11) NOT NULL,
  `id_caducidad` int(11) NOT NULL,
  PRIMARY KEY (`id_voucher`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (208,'1545bd','2020-02-13 00:00:00','3000-01-01 00:00:00','Sin Uso',2,0,5,1,'ERMITA-CTG HUESPEDES',0,0,0,1),(209,'b226dd','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(210,'539042','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(211,'bae6d6','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(212,'9fbe58','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(213,'84082e','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(214,'1ba0fa','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(215,'7a0c38','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(216,'483736','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(217,'04e19c','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(218,'14c8a7','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(219,'e33402','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(220,'8dcb29','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(221,'d83bd6','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(222,'c1cade','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(223,'77a459','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(224,'9af82b','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(225,'d4df0a','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(226,'426965','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(227,'4d611b','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(228,'59db44','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(229,'3b2d79','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(230,'68fa51','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(231,'e1225e','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(232,'e3b972','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(233,'c1b5ae','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(234,'0c7f84','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(235,'d1e8aa','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(236,'675711','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(237,'44fa89','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(238,'761a4f','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(239,'ec908f','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(240,'1a12df','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(241,'2866cb','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(242,'3e0dfa','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(243,'ea6616','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(244,'243dda','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(245,'6df5bd','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(246,'1c89e7','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(247,'f01db4','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(248,'890a54','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(249,'d3d315','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(250,'3f04d7','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(251,'74ba19','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(252,'1b13a1','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(253,'d75af0','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(254,'13c044','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(255,'69e70e','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(256,'9827f9','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(257,'a0eaaf','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(258,'eb5f38','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(259,'3f95a6','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(260,'4ab02a','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(261,'5abb4c','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(262,'4243cf','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(263,'c92fdf','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(264,'51db12','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(265,'358f29','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(266,'4ef294','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(267,'c04cb5','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(268,'233e87','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(269,'362e95','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(270,'659591','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(271,'d61544','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(272,'d1248f','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(273,'8cb27a','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(274,'afb0b6','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(275,'e4e6ec','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(276,'5005a3','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(277,'bf2f89','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(278,'f61fb2','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(279,'4cc92a','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(280,'21e1ea','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(281,'9a7fae','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(282,'6294dc','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(283,'016e32','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(284,'78e637','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(285,'f70fee','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(286,'4cfb6a','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(287,'c0040f','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(288,'d03e7c','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(289,'dcf382','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(290,'556f86','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(291,'5d39e3','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(292,'49516a','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(293,'826d4e','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(294,'330e68','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(295,'881ac0','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(296,'0ded50','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(297,'183743','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(298,'5c971f','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(299,'b3bdf4','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(300,'4516b7','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(301,'f8f641','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(302,'48b2fa','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(303,'7a8062','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(304,'4a3471','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(305,'345574','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(306,'359b46','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(307,'e9039e','2020-02-13 11:16:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(308,'930cf9','2020-02-19 11:42:51','2020-03-05 11:42:51','Sin Uso',2,0,5,1,'Ermita-CTG-Huespedes',15,0,0,3),(309,'05bd6b','2020-02-20 10:47:50','2020-02-20 12:47:50','En Uso',2,1,5,1,'Ermita-20-02-2020',0,2,0,3),(310,'34e0a7','2020-02-20 10:39:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-20-02-2020',0,2,0,3),(311,'6a12ab','2020-02-20 10:39:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-20-02-2020',0,2,0,3),(312,'a84213','2020-02-20 10:39:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-20-02-2020',0,2,0,3),(313,'4ed300','2020-02-20 10:39:00','2020-12-31 00:00:00','Sin Uso',2,0,5,1,'Ermita-20-02-2020',0,2,0,3);
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonas`
--

DROP TABLE IF EXISTS `zonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL DEFAULT '',
  `id_locaciones` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonas`
--

LOCK TABLES `zonas` WRITE;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
INSERT INTO `zonas` VALUES (1,'Ermita_CTG_Huespedes',1),(2,'Zona-Prueba',1);
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-23 22:01:25
