-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla portal_oxohotel.campania
DROP TABLE IF EXISTS `campania`;
CREATE TABLE IF NOT EXISTS `campania` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_locacion` int(11) DEFAULT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `ano_evento` int(11) DEFAULT NULL,
  `campania` varchar(200) DEFAULT NULL,
  `zona_ap` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_locacion` (`id_locacion`),
  CONSTRAINT `id_locacion` FOREIGN KEY (`id_locacion`) REFERENCES `locaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla portal_oxohotel.campania: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `campania` DISABLE KEYS */;
REPLACE INTO `campania` (`id`, `id_locacion`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `ano_evento`, `campania`, `zona_ap`) VALUES
	(1,1,'Portal Cautivo Principal','Portal cautivo que cuenta con un banner con publicidad','2019-10-23 02:13:38','2020-10-31 02:13:38',2019,'portal_cautivo_formulario',1),
	(2,1,'Habitaciones','Portal Cautivo para los huespedes','2019-12-06 00:00:00','2019-12-20 00:00:00',2019,'portal_cautivo_habitaciones',1);
/*!40000 ALTER TABLE `campania` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.diccionario
DROP TABLE IF EXISTS `diccionario`;
CREATE TABLE IF NOT EXISTS `diccionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_column` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `alias_column` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla portal_oxohotel.diccionario: ~17 rows (aproximadamente)
/*!40000 ALTER TABLE `diccionario` DISABLE KEYS */;
REPLACE INTO `diccionario` (`id`, `name_column`, `alias_column`) VALUES
	(1, 'id_evento', 'Campania'),
	(2, 'fecha_creacion', 'Fecha Registro'),
	(3, 'nombre', 'Nombre'),
	(4, 'email', 'Email'),
	(5, 'edad', 'Edad'),
	(6, 'telefono', 'Telefono'),
	(7, 'genero', 'Genero'),
	(8, 'os', 'Sistema Operativo'),
	(9, 'ssid', 'Ssid'),
	(10, 'mac_cliente', 'Mac Cliente'),
	(11, 'ip_cliente', 'Ip Cliente'),
	(12, 'ip_ap', 'Ip Dispositivo'),
	(13, 'mac_ap', 'Mac Dispositivo'),
	(14, 'id_pais', 'Pais'),
	(15, 'piso', 'Piso'),
	(16, 'bloque', 'Bloque'),
	(17, 'num_habitacion', 'N° Habitacion');
/*!40000 ALTER TABLE `diccionario` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.dispositivos
DROP TABLE IF EXISTS `dispositivos`;
CREATE TABLE IF NOT EXISTS `dispositivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_dispositivo` varchar(100) NOT NULL DEFAULT '',
  `mac_dispositivo` varchar(100) NOT NULL DEFAULT '',
  `id_zona` int(11) NOT NULL DEFAULT '0',
  `tecnologia` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla portal_oxohotel.dispositivos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
REPLACE INTO `dispositivos` (`id`, `nombre_dispositivo`, `mac_dispositivo`, `id_zona`, `tecnologia`) VALUES
	(1, 'oxoHotel-Ermita-1', '1c:3a:60:0d:aa:c0', 1, 'Rukus'),
	(2, 'oxoHotel-Ermita-2', '1c:3a:60:31:16:20', 1, 'Rukus'),
	(3, 'oxoHotel-Ermita-3', '1c:3a:60:31:1b:e0', 1, 'Rukus'),
	(4, 'oxoHotel-Ermita-4', '1c:3a:60:31:27:50', 1, 'Rukus'),
	(5, 'oxoHotel-Ermita-5', '1c:3a:60:31:35:50', 1, 'Rukus'),
	(6, 'oxoHotel-Ermita-6', '1c:3a:60:31:42:b0', 1, 'Rukus'),
	(7, 'oxoHotel-Ermita-7', '1c:3a:60:31:58:50', 1, 'Rukus'),
	(8, 'oxoHotel-Ermita-8', '1c:3a:60:31:58:e0', 1, 'Rukus'),
	(9, 'oxoHotel-Ermita-9', '1c:3a:60:31:5b:40', 1, 'Rukus'),
	(10, 'oxoHotel-Ermita-10', '1c:3a:60:31:5b:50', 1, 'Rukus'),
	(11, 'oxoHotel-Ermita-11', '1c:3a:60:31:5b:60', 1, 'Rukus'),
	(12, 'oxoHotel-Ermita-12', '1c:3a:60:31:5c:10', 1, 'Rukus'),
	(13, 'oxoHotel-Ermita-13', '1c:3a:60:31:70:a0', 1, 'Rukus'),
	(14, 'oxoHotel-Ermita-14', '1c:3a:60:31:72:50', 1, 'Rukus'),
	(15, 'oxoHotel-Ermita-15', '1c:3a:60:31:72:60', 1, 'Rukus'),
	(16, 'oxoHotel-Ermita-16', '1c:3a:60:31:72:70', 1, 'Rukus'),
	(17, 'oxoHotel-Ermita-17', '1c:3a:60:31:7b:20', 1, 'Rukus'),
	(18, 'oxoHotel-Ermita-18', '1c:3a:60:31:7c:10', 1, 'Rukus'),
	(19, 'oxoHotel-Ermita-19', '1c:3a:60:31:81:a0', 1, 'Rukus'),
	(20, 'oxoHotel-Ermita-20', '1c:3a:60:31:82:40', 1, 'Rukus'),
	(21, 'oxoHotel-Ermita-21', '1c:3a:60:31:93:60', 1, 'Rukus'),
	(22, 'oxoHotel-Ermita-22', '1c:3a:60:31:95:10', 1, 'Rukus'),
	(23, 'oxoHotel-Ermita-23', '1c:3a:60:3a:5c:00', 1, 'Rukus'),
	(24, 'oxoHotel-Ermita-24', '60d02c2d04f0', 1, 'Rukus'),
	(25, 'oxoHotel-Ermita-25', '60d02c2d054f3', 1, 'Rukus'),
	(26, 'oxoHotel-Ermita-26', '94:bf:c4:16:0e:70', 1, 'Rukus'),
	(27, 'oxoHotel-Ermita-27', '94:bf:c4:16:31:40', 1, 'Rukus'),
	(28, 'oxoHotel-Ermita-28', '94:bf:c4:16:65:40', 1, 'Rukus'),
	(29, 'oxoHotel-Ermita-29', '94:bf:c4:16:a5:f0', 1, 'Rukus'),
	(30, 'oxoHotel-Ermita-30', '94:bf:c4:16:ad:50', 1, 'Rukus'),
	(31, 'oxoHotel-Ermita-31', '94:bf:c4:16:b7:a0', 1, 'Rukus'),
	(32, 'oxoHotel-Ermita-32', '94:bf:c4:16:b8:b0', 1, 'Rukus'),
	(33, 'oxoHotel-Ermita-33', '94:bf:c4:16:c7:70', 1, 'Rukus'),
	(34, 'oxoHotel-Ermita-34', '94:bf:c4:16:ca:60', 1, 'Rukus'),
	(35, 'oxoHotel-Ermita-35', '94:bf:c4:16:f9:80', 1, 'Rukus'),
	(36, 'oxoHotel-Ermita-36', '94:bf:c4:16:fd:70', 1, 'Rukus'),
	(37, 'oxoHotel-Ermita-37', '94:bf:c4:17:05:e0', 1, 'Rukus'),
	(38, 'oxoHotel-Ermita-38', '94:bf:c4:17:17:b0', 1, 'Rukus'),
	(39, 'oxoHotel-Ermita-39', '94:bf:c4:17:18:50', 1, 'Rukus'),
	(40, 'oxoHotel-Ermita-40', '94:bf:c4:17:1b:80', 1, 'Rukus'),
	(41, 'oxoHotel-Ermita-41', '94:bf:c4:17:1f:f0', 1, 'Rukus'),
	(42, 'oxoHotel-Ermita-42', '94:bf:c4:17:20:70', 1, 'Rukus'),
	(43, 'oxoHotel-Ermita-43', '94:bf:c4:17:21:50', 1, 'Rukus'),
	(44, 'oxoHotel-Ermita-44', '94:bf:c4:17:28:50', 1, 'Rukus'),
	(45, 'oxoHotel-Ermita-45', '94:bf:c4:17:2a:60', 1, 'Rukus'),
	(46, 'oxoHotel-Ermita-46', '94:bf:c4:18:1c:70', 1, 'Rukus'),
	(47, 'oxoHotel-Ermita-47', '94:bf:c4:18:33:50', 1, 'Rukus'),
	(48, 'oxoHotel-Ermita-48', '94:bf:c4:18:34:d0', 1, 'Rukus'),
	(49, 'oxoHotel-Ermita-49', '94:bf:c4:18:37:d0', 1, 'Rukus'),
	(50, 'oxoHotel-Ermita-50', '94:bf:c4:18:38:20', 1, 'Rukus'),
	(51, 'oxoHotel-Ermita-51', 'b4:79:c8:29:6f:b0', 1, 'Rukus'),
	(52, 'oxoHotel-Ermita-52', 'b4:79:c8:29:e2:70', 1, 'Rukus'),
	(53, 'oxoHotel-Ermita-53', 'b4:79:c8:29:e2:f0', 1, 'Rukus'),
	(54, 'oxoHotel-Ermita-54', 'b4:79:c8:29:e8:a0', 1, 'Rukus'),
	(55, 'oxoHotel-Ermita-55', 'b4:79:c8:2a:0d:10', 1, 'Rukus'),
	(56, 'oxoHotel-Ermita-56', 'b4:79:c8:2a:11:50', 1, 'Rukus');
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.habitaciones
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

-- Volcando estructura para tabla portal_oxohotel.locaciones
DROP TABLE IF EXISTS `locaciones`;
CREATE TABLE IF NOT EXISTS `locaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `direccion` varchar(50) NOT NULL DEFAULT '',
  `pais` varchar(1000) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `PaginaWeb` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla portal_oxohotel.locaciones: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `locaciones` DISABLE KEYS */;
REPLACE INTO `locaciones` (`id`, `nombre`, `direccion`, `pais`, `ciudad`, `telefono`, `PaginaWeb`) VALUES
	(1, 'Hotel Ermita', 'Av. Santander #41 - 202', 'Colombia', 'Cartagena', '', 'http://www.oxohotel.com/portfolio/ermita-tribute-portfolio/');
/*!40000 ALTER TABLE `locaciones` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.paises
DROP TABLE IF EXISTS `paises`;
CREATE TABLE IF NOT EXISTS `paises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_esp` varchar(250) DEFAULT NULL,
  `nombre_en` varchar(250) DEFAULT NULL,
  `nombre_fr` varchar(250) DEFAULT NULL,
  `iso2` varchar(45) DEFAULT NULL,
  `iso3` varchar(45) DEFAULT NULL,
  `indicativo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla portal_oxohotel.paises: ~208 rows (aproximadamente)
/*!40000 ALTER TABLE `paises` DISABLE KEYS */;
REPLACE INTO `paises` (`id`, `nombre_esp`, `nombre_en`, `nombre_fr`, `iso2`, `iso3`, `indicativo`) VALUES
	(1, 'Afganistán', 'Afghanistan', 'Afghanistan', 'AF', 'AFG', 93),
	(2, 'Albania', 'Albania', 'Albanie', 'AL', 'ALB', 355),
	(3, 'Alemania', 'Germany', 'Allemagne', 'DE', 'DEU', 49),
	(4, 'Algeria', 'Algeria', 'Algérie', 'DZ', 'DZA', 213),
	(5, 'Andorra', 'Andorra', 'Andorra', 'AD', 'AND', 376),
	(6, 'Angola', 'Angola', 'Angola', 'AO', 'AGO', 244),
	(7, 'Antártida', 'Antarctica', 'Antarctique', 'AQ', 'ATA', 672),
	(8, 'Arabia Saudita', 'Saudi Arabia', 'Arabie Saoudite', 'SA', 'SAU', 966),
	(9, 'Argentina', 'Argentina', 'Argentine', 'AR', 'ARG', 54),
	(10, 'Armenia', 'Armenia', 'Arménie', 'AM', 'ARM', 374),
	(11, 'Aruba', 'Aruba', 'Aruba', 'AW', 'ABW', 297),
	(12, 'Australia', 'Australia', 'Australie', 'AU', 'AUS', 61),
	(13, 'Austria', 'Austria', 'Autriche', 'AT', 'AUT', 43),
	(14, 'Azerbaiyán', 'Azerbaijan', 'Azerbaïdjan', 'AZ', 'AZE', 994),
	(15, 'Bélgica', 'Belgium', 'Belgique', 'BE', 'BEL', 32),
	(16, 'Bahrein', 'Bahrain', 'Bahreïn', 'BH', 'BHR', 973),
	(17, 'Bangladesh', 'Bangladesh', 'Bangladesh', 'BD', 'BGD', 880),
	(18, 'Belice', 'Belize', 'Belize', 'BZ', 'BLZ', 501),
	(19, 'Benín', 'Benin', 'Bénin', 'BJ', 'BEN', 229),
	(20, 'Bhután', 'Bhutan', 'Le Bhoutan', 'BT', 'BTN', 975),
	(21, 'Bielorrusia', 'Belarus', 'Biélorussie', 'BY', 'BLR', 375),
	(22, 'Birmania', 'Myanmar', 'Myanmar', 'MM', 'MMR', 95),
	(23, 'Bolivia', 'Bolivia', 'Bolivie', 'BO', 'BOL', 591),
	(24, 'Bosnia y Herzegovina', 'Bosnia and Herzegovina', 'Bosnie-Herzégovine', 'BA', 'BIH', 387),
	(25, 'Botsuana', 'Botswana', 'Botswana', 'BW', 'BWA', 267),
	(26, 'Brasil', 'Brazil', 'Brésil', 'BR', 'BRA', 55),
	(27, 'Brunéi', 'Brunei', 'Brunei', 'BN', 'BRN', 673),
	(28, 'Bulgaria', 'Bulgaria', 'Bulgarie', 'BG', 'BGR', 359),
	(29, 'Burkina Faso', 'Burkina Faso', 'Burkina Faso', 'BF', 'BFA', 226),
	(30, 'Burundi', 'Burundi', 'Burundi', 'BI', 'BDI', 257),
	(31, 'Cabo Verde', 'Cape Verde', 'Cap-Vert', 'CV', 'CPV', 238),
	(32, 'Camboya', 'Cambodia', 'Cambodge', 'KH', 'KHM', 855),
	(33, 'Camerún', 'Cameroon', 'Cameroun', 'CM', 'CMR', 237),
	(34, 'Canadá', 'Canada', 'Canada', 'CA', 'CAN', 1),
	(35, 'Chad', 'Chad', 'Tchad', 'TD', 'TCD', 235),
	(36, 'Chile', 'Chile', 'Chili', 'CL', 'CHL', 56),
	(37, 'China', 'China', 'Chine', 'CN', 'CHN', 86),
	(38, 'Chipre', 'Cyprus', 'Chypre', 'CY', 'CYP', 357),
	(39, 'Ciudad del Vaticano', 'Vatican City State', 'Cité du Vatican', 'VA', 'VAT', 39),
	(40, 'Colombia', 'Colombia', 'Colombie', 'CO', 'COL', 57),
	(41, 'Comoras', 'Comoros', 'Comores', 'KM', 'COM', 269),
	(42, 'República del Congo', 'Republic of the Congo', 'République du Congo', 'CG', 'COG', 242),
	(43, 'República Democrática del Congo', 'Democratic Republic of the Congo', 'République démocratique du Congo', 'CD', 'COD', 243),
	(44, 'Corea del Norte', 'North Korea', 'Corée du Nord', 'KP', 'PRK', 850),
	(45, 'Corea del Sur', 'South Korea', 'Corée du Sud', 'KR', 'KOR', 82),
	(46, 'Costa de Marfil', 'Ivory Coast', 'Ivoire', 'CI', 'CIV', 225),
	(47, 'Costa Rica', 'Costa Rica', 'Costa Rica', 'CR', 'CRI', 506),
	(48, 'Croacia', 'Croatia', 'Croatie', 'HR', 'HRV', 385),
	(49, 'Cuba', 'Cuba', 'Cuba', 'CU', 'CUB', 53),
	(50, 'Curazao', 'Curaçao', 'Curaçao', 'CW', 'CWU', 5999),
	(51, 'Dinamarca', 'Denmark', 'Danemark', 'DK', 'DNK', 45),
	(52, 'Ecuador', 'Ecuador', 'Equateur', 'EC', 'ECU', 593),
	(53, 'Egipto', 'Egypt', 'Egypte', 'EG', 'EGY', 20),
	(54, 'El Salvador', 'El Salvador', 'El Salvador', 'SV', 'SLV', 503),
	(55, 'Emiratos Árabes Unidos', 'United Arab Emirates', 'Emirats Arabes Unis', 'AE', 'ARE', 971),
	(56, 'Eritrea', 'Eritrea', 'Erythrée', 'ER', 'ERI', 291),
	(57, 'Eslovaquia', 'Slovakia', 'Slovaquie', 'SK', 'SVK', 421),
	(58, 'Eslovenia', 'Slovenia', 'Slovénie', 'SI', 'SVN', 386),
	(59, 'España', 'Spain', 'Espagne', 'ES', 'ESP', 34),
	(60, 'Estados Unidos de América', 'United States of America', 'États-Unis Amérique', 'US', 'USA', 1),
	(61, 'Estonia', 'Estonia', 'Estonie', 'EE', 'EST', 372),
	(62, 'Etiopía', 'Ethiopia', 'Ethiopie', 'ET', 'ETH', 251),
	(63, 'Filipinas', 'Philippines', 'Philippines', 'PH', 'PHL', 63),
	(64, 'Finlandia', 'Finland', 'Finlande', 'FI', 'FIN', 358),
	(65, 'Fiyi', 'Fiji', 'Fidji', 'FJ', 'FJI', 679),
	(66, 'Francia', 'France', 'France', 'FR', 'FRA', 33),
	(67, 'Gabón', 'Gabon', 'Gabon', 'GA', 'GAB', 241),
	(68, 'Gambia', 'Gambia', 'Gambie', 'GM', 'GMB', 220),
	(69, 'Georgia', 'Georgia', 'Géorgie', 'GE', 'GEO', 995),
	(70, 'Ghana', 'Ghana', 'Ghana', 'GH', 'GHA', 233),
	(71, 'Gibraltar', 'Gibraltar', 'Gibraltar', 'GI', 'GIB', 350),
	(72, 'Grecia', 'Greece', 'Grèce', 'GR', 'GRC', 30),
	(73, 'Groenlandia', 'Greenland', 'Groenland', 'GL', 'GRL', 299),
	(74, 'Guatemala', 'Guatemala', 'Guatemala', 'GT', 'GTM', 502),
	(75, 'Guinea', 'Guinea', 'Guinée', 'GN', 'GIN', 224),
	(76, 'Guinea Ecuatorial', 'Equatorial Guinea', 'Guinée Equatoriale', 'GQ', 'GNQ', 240),
	(77, 'Guinea-Bissau', 'Guinea-Bissau', 'Guinée-Bissau', 'GW', 'GNB', 245),
	(78, 'Guyana', 'Guyana', 'Guyane', 'GY', 'GUY', 592),
	(79, 'Haití', 'Haiti', 'Haïti', 'HT', 'HTI', 509),
	(80, 'Honduras', 'Honduras', 'Honduras', 'HN', 'HND', 504),
	(81, 'Hong kong', 'Hong Kong', 'Hong Kong', 'HK', 'HKG', 852),
	(82, 'Hungría', 'Hungary', 'Hongrie', 'HU', 'HUN', 36),
	(83, 'India', 'India', 'Inde', 'IN', 'IND', 91),
	(84, 'Indonesia', 'Indonesia', 'Indonésie', 'ID', 'IDN', 62),
	(85, 'Irán', 'Iran', 'Iran', 'IR', 'IRN', 98),
	(86, 'Irak', 'Iraq', 'Irak', 'IQ', 'IRQ', 964),
	(87, 'Irlanda', 'Ireland', 'Irlande', 'IE', 'IRL', 353),
	(88, 'Isla de Man', 'Isle of Man', 'Ile de Man', 'IM', 'IMN', 44),
	(89, 'Isla de Navidad', 'Christmas Island', 'Christmas Island', 'CX', 'CXR', 61),
	(90, 'Islandia', 'Iceland', 'Islande', 'IS', 'ISL', 354),
	(91, 'Islas Cocos (Keeling)', 'Cocos (Keeling) Islands', 'Cocos (Keeling', 'CC', 'CCK', 61),
	(92, 'Islas Cook', 'Cook Islands', 'Iles Cook', 'CK', 'COK', 682),
	(93, 'Islas Feroe', 'Faroe Islands', 'Iles Féro', 'FO', 'FRO', 298),
	(94, 'Islas Maldivas', 'Maldives', 'Maldives', 'MV', 'MDV', 960),
	(95, 'Islas Malvinas', 'Falkland Islands (Malvinas)', 'Iles Falkland (Malvinas', 'FK', 'FLK', 500),
	(96, 'Islas Marshall', 'Marshall Islands', 'Iles Marshall', 'MH', 'MHL', 692),
	(97, 'Islas Pitcairn', 'Pitcairn Islands', 'Iles Pitcairn', 'PN', 'PCN', 870),
	(98, 'Islas Salomón', 'Solomon Islands', 'Iles Salomon', 'SB', 'SLB', 677),
	(99, 'Israel', 'Israel', 'Israël', 'IL', 'ISR', 972),
	(100, 'Italia', 'Italy', 'Italie', 'IT', 'ITA', 39),
	(101, 'Japón', 'Japan', 'Japon', 'JP', 'JPN', 81),
	(102, 'Jordania', 'Jordan', 'Jordan', 'JO', 'JOR', 962),
	(103, 'Kazajistán', 'Kazakhstan', 'Le Kazakhstan', 'KZ', 'KAZ', 7),
	(104, 'Kenia', 'Kenya', 'Kenya', 'KE', 'KEN', 254),
	(105, 'Kirguistán', 'Kyrgyzstan', 'Kirghizstan', 'KG', 'KGZ', 996),
	(106, 'Kiribati', 'Kiribati', 'Kiribati', 'KI', 'KIR', 686),
	(107, 'Kuwait', 'Kuwait', 'Koweït', 'KW', 'KWT', 965),
	(108, 'Líbano', 'Lebanon', 'Liban', 'LB', 'LBN', 961),
	(109, 'Laos', 'Laos', 'Laos', 'LA', 'LAO', 856),
	(110, 'Lesoto', 'Lesotho', 'Lesotho', 'LS', 'LSO', 266),
	(111, 'Letonia', 'Latvia', 'La Lettonie', 'LV', 'LVA', 371),
	(112, 'Liberia', 'Liberia', 'Liberia', 'LR', 'LBR', 231),
	(113, 'Libia', 'Libya', 'Libye', 'LY', 'LBY', 218),
	(114, 'Liechtenstein', 'Liechtenstein', 'Liechtenstein', 'LI', 'LIE', 423),
	(115, 'Lituania', 'Lithuania', 'La Lituanie', 'LT', 'LTU', 370),
	(116, 'Luxemburgo', 'Luxembourg', 'Luxembourg', 'LU', 'LUX', 352),
	(117, 'México', 'Mexico', 'Mexique', 'MX', 'MEX', 52),
	(118, 'Mónaco', 'Monaco', 'Monaco', 'MC', 'MCO', 377),
	(119, 'Macao', 'Macao', 'Macao', 'MO', 'MAC', 853),
	(120, 'Macedônia', 'Macedonia', 'Macédoine', 'MK', 'MKD', 389),
	(121, 'Madagascar', 'Madagascar', 'Madagascar', 'MG', 'MDG', 261),
	(122, 'Malasia', 'Malaysia', 'Malaisie', 'MY', 'MYS', 60),
	(123, 'Malawi', 'Malawi', 'Malawi', 'MW', 'MWI', 265),
	(124, 'Mali', 'Mali', 'Mali', 'ML', 'MLI', 223),
	(125, 'Malta', 'Malta', 'Malte', 'MT', 'MLT', 356),
	(126, 'Marruecos', 'Morocco', 'Maroc', 'MA', 'MAR', 212),
	(127, 'Mauricio', 'Mauritius', 'Iles Maurice', 'MU', 'MUS', 230),
	(128, 'Mauritania', 'Mauritania', 'Mauritanie', 'MR', 'MRT', 222),
	(129, 'Mayotte', 'Mayotte', 'Mayotte', 'YT', 'MYT', 262),
	(130, 'Micronesia', 'Estados Federados de', 'Federados Estados de', 'FM', 'FSM', 691),
	(131, 'Moldavia', 'Moldova', 'Moldavie', 'MD', 'MDA', 373),
	(132, 'Mongolia', 'Mongolia', 'Mongolie', 'MN', 'MNG', 976),
	(133, 'Montenegro', 'Montenegro', 'Monténégro', 'ME', 'MNE', 382),
	(134, 'Mozambique', 'Mozambique', 'Mozambique', 'MZ', 'MOZ', 258),
	(135, 'Namibia', 'Namibia', 'Namibie', 'NA', 'NAM', 264),
	(136, 'Nauru', 'Nauru', 'Nauru', 'NR', 'NRU', 674),
	(137, 'Nepal', 'Nepal', 'Népal', 'NP', 'NPL', 977),
	(138, 'Nicaragua', 'Nicaragua', 'Nicaragua', 'NI', 'NIC', 505),
	(139, 'Niger', 'Niger', 'Niger', 'NE', 'NER', 227),
	(140, 'Nigeria', 'Nigeria', 'Nigeria', 'NG', 'NGA', 234),
	(141, 'Niue', 'Niue', 'Niou', 'NU', 'NIU', 683),
	(142, 'Noruega', 'Norway', 'Norvège', 'NO', 'NOR', 47),
	(143, 'Nueva Caledonia', 'New Caledonia', 'Nouvelle-Calédonie', 'NC', 'NCL', 687),
	(144, 'Nueva Zelanda', 'New Zealand', 'Nouvelle-Zélande', 'NZ', 'NZL', 64),
	(145, 'Omán', 'Oman', 'Oman', 'OM', 'OMN', 968),
	(146, 'Países Bajos', 'Netherlands', 'Pays-Bas', 'NL', 'NLD', 31),
	(147, 'Pakistán', 'Pakistan', 'Pakistan', 'PK', 'PAK', 92),
	(148, 'Palau', 'Palau', 'Palau', 'PW', 'PLW', 680),
	(149, 'Panamá', 'Panama', 'Panama', 'PA', 'PAN', 507),
	(150, 'Papúa Nueva Guinea', 'Papua New Guinea', 'Papouasie-Nouvelle-Guinée', 'PG', 'PNG', 675),
	(151, 'Paraguay', 'Paraguay', 'Paraguay', 'PY', 'PRY', 595),
	(152, 'Perú', 'Peru', 'Pérou', 'PE', 'PER', 51),
	(153, 'Polinesia Francesa', 'French Polynesia', 'Polynésie française', 'PF', 'PYF', 689),
	(154, 'Polonia', 'Poland', 'Pologne', 'PL', 'POL', 48),
	(155, 'Portugal', 'Portugal', 'Portugal', 'PT', 'PRT', 351),
	(156, 'Puerto Rico', 'Puerto Rico', 'Porto Rico', 'PR', 'PRI', 1),
	(157, 'Qatar', 'Qatar', 'Qatar', 'QA', 'QAT', 974),
	(158, 'Reino Unido', 'United Kingdom', 'Royaume-Uni', 'GB', 'GBR', 44),
	(159, 'República Centroafricana', 'Central African Republic', 'République Centrafricaine', 'CF', 'CAF', 236),
	(160, 'República Checa', 'Czech Republic', 'République Tchèque', 'CZ', 'CZE', 420),
	(161, 'República de Sudán del Sur', 'South Sudan', 'Soudan du Sud', 'SS', 'SSD', 211),
	(162, 'Ruanda', 'Rwanda', 'Rwanda', 'RW', 'RWA', 250),
	(163, 'Rumanía', 'Romania', 'Roumanie', 'RO', 'ROU', 40),
	(164, 'Rusia', 'Russia', 'La Russie', 'RU', 'RUS', 7),
	(165, 'Samoa', 'Samoa', 'Samoa', 'WS', 'WSM', 685),
	(166, 'San Bartolomé', 'Saint Barthélemy', 'Saint-Barthélemy', 'BL', 'BLM', 590),
	(167, 'San Marino', 'San Marino', 'San Marino', 'SM', 'SMR', 378),
	(168, 'San Pedro y Miquelón', 'Saint Pierre and Miquelon', 'Saint-Pierre-et-Miquelon', 'PM', 'SPM', 508),
	(169, 'Santa Elena', 'Ascensión y Tristán de Acuña', 'Ascensión y Tristan de Acuña', 'SH', 'SHN', 290),
	(170, 'Santo Tomé y Príncipe', 'Sao Tome and Principe', 'Sao Tomé et Principe', 'ST', 'STP', 239),
	(171, 'Senegal', 'Senegal', 'Sénégal', 'SN', 'SEN', 221),
	(172, 'Serbia', 'Serbia', 'Serbie', 'RS', 'SRB', 381),
	(173, 'Seychelles', 'Seychelles', 'Les Seychelles', 'SC', 'SYC', 248),
	(174, 'Sierra Leona', 'Sierra Leone', 'Sierra Leone', 'SL', 'SLE', 232),
	(175, 'Singapur', 'Singapore', 'Singapour', 'SG', 'SGP', 65),
	(176, 'Siria', 'Syria', 'Syrie', 'SY', 'SYR', 963),
	(177, 'Somalia', 'Somalia', 'Somalie', 'SO', 'SOM', 252),
	(178, 'Sri lanka', 'Sri Lanka', 'Sri Lanka', 'LK', 'LKA', 94),
	(179, 'Sudáfrica', 'South Africa', 'Afrique du Sud', 'ZA', 'ZAF', 27),
	(180, 'Sudán', 'Sudan', 'Soudan', 'SD', 'SDN', 249),
	(181, 'Suecia', 'Sweden', 'Suède', 'SE', 'SWE', 46),
	(182, 'Suiza', 'Switzerland', 'Suisse', 'CH', 'CHE', 41),
	(183, 'Surinám', 'Suriname', 'Surinam', 'SR', 'SUR', 597),
	(184, 'Swazilandia', 'Swaziland', 'Swaziland', 'SZ', 'SWZ', 268),
	(185, 'Tayikistán', 'Tajikistan', 'Le Tadjikistan', 'TJ', 'TJK', 992),
	(186, 'Tailandia', 'Thailand', 'Thaïlande', 'TH', 'THA', 66),
	(187, 'Taiwán', 'Taiwan', 'Taiwan', 'TW', 'TWN', 886),
	(188, 'Tanzania', 'Tanzania', 'Tanzanie', 'TZ', 'TZA', 255),
	(189, 'Timor Oriental', 'East Timor', 'Timor-Oriental', 'TL', 'TLS', 670),
	(190, 'Togo', 'Togo', 'Togo', 'TG', 'TGO', 228),
	(191, 'Tokelau', 'Tokelau', 'Tokélaou', 'TK', 'TKL', 690),
	(192, 'Tonga', 'Tonga', 'Tonga', 'TO', 'TON', 676),
	(193, 'Tunez', 'Tunisia', 'Tunisie', 'TN', 'TUN', 216),
	(194, 'Turkmenistán', 'Turkmenistan', 'Le Turkménistan', 'TM', 'TKM', 993),
	(195, 'Turquía', 'Turkey', 'Turquie', 'TR', 'TUR', 90),
	(196, 'Tuvalu', 'Tuvalu', 'Tuvalu', 'TV', 'TUV', 688),
	(197, 'Ucrania', 'Ukraine', 'Ukraine', 'UA', 'UKR', 380),
	(198, 'Uganda', 'Uganda', 'Ouganda', 'UG', 'UGA', 256),
	(199, 'Uruguay', 'Uruguay', 'Uruguay', 'UY', 'URY', 598),
	(200, 'Uzbekistán', 'Uzbekistan', 'Ouzbékistan', 'UZ', 'UZB', 998),
	(201, 'Vanuatu', 'Vanuatu', 'Vanuatu', 'VU', 'VUT', 678),
	(202, 'Venezuela', 'Venezuela', 'Venezuela', 'VE', 'VEN', 58),
	(203, 'Vietnam', 'Vietnam', 'Vietnam', 'VN', 'VNM', 84),
	(204, 'Wallis y Futuna', 'Wallis and Futuna', 'Wallis et Futuna', 'WF', 'WLF', 681),
	(205, 'Yemen', 'Yemen', 'Yémen', 'YE', 'YEM', 967),
	(206, 'Yibuti', 'Djibouti', 'Djibouti', 'DJ', 'DJI', 253),
	(207, 'Zambia', 'Zambia', 'Zambie', 'ZM', 'ZMB', 260),
	(208, 'Zimbabue', 'Zimbabwe', 'Zimbabwe', 'ZW', 'ZWE', 263);
/*!40000 ALTER TABLE `paises` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.portal_cautivo_habitaciones
DROP TABLE IF EXISTS `portal_cautivo_habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portal_cautivo_habitaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(250) DEFAULT NULL,
  `num_habitacion` varchar(255) DEFAULT NULL,
  `num_voucher` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `ssid` varchar(250) DEFAULT NULL,
  `mac_cliente` varchar(250) DEFAULT NULL,
  `ip_cliente` varchar(250) DEFAULT NULL,
  `ip_ap` varchar(250) DEFAULT NULL,
  `mac_ap` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portal_cautivo_habitaciones`
--

LOCK TABLES `portal_cautivo_habitaciones` WRITE;
/*!40000 ALTER TABLE `portal_cautivo_habitaciones` DISABLE KEYS */;
INSERT INTO `portal_cautivo_habitaciones` VALUES (1,2,'2019-12-07 02:56:42','juan','pachon','345','jndkdg','Otro','Test_R','34e12d43a922','10.165.0.16','','60d02c2d054f3'),(2,2,'2019-12-07 06:41:06','','','','','Android','','','','',''),(3,2,'2019-12-09 08:52:30','mauricio','pascuas','123','za973j','MacOS','MyWiFi','d0c5f3c5da5a','192.168.0.50','','60d02c2d04f0'),(4,2,'2019-12-10 09:49:55','paula','arango','207','73b5jv','MacOS','Pruebas_Portal','C0:D0:12:86:12:C8','172.16.100.106','10.10.0.73','b4:79:c8:29:6f:b0'),(5,2,'2019-12-10 10:03:40','lina','mongui','324','73b5jv','Android','Pruebas_Portal','88:10:8F:96:C5:C4','172.16.100.112','10.10.0.73','b4:79:c8:29:6f:b0'),(6,2,'2019-12-10 11:52:36','diego','barreiro','201','73b5jv','Android','oxoHotel-Ermita','04:F1:28:28:9B:50','172.16.100.8','10.10.0.73','b4:79:c8:29:6f:b0'),(7,2,'2019-12-10 12:04:34','evelyn','arriahada','218','73b5jv','Android','oxoHotel-Ermita','BC:98:DF:03:3B:09','172.16.100.59','10.10.0.92','b4:79:c8:2a:0d:10'),(8,2,'2019-12-10 12:45:30','edward','catolico','319','73b5jv','MacOS','oxoHotel-Ermita','C8:E0:EB:5F:D3:62','172.16.100.98','10.10.0.118','b4:79:c8:29:e2:f0'),(9,2,'2019-12-10 12:48:30','juan','lineros','205','73b5jv','MacOS','oxoHotel-Ermita','A0:4E:A7:1C:18:7F','172.16.100.174','10.10.0.73','b4:79:c8:29:6f:b0'),(10,2,'2019-12-10 12:48:48','maria fernanda','carrillo nieto','315','73b5jv','MacOS','oxoHotel-Ermita','F0:98:9D:60:DF:66','172.16.100.152','10.10.0.73','b4:79:c8:29:6f:b0'),(11,2,'2019-12-10 12:55:56','alejandro','carvajal','316','73b5jv','MacOS','oxoHotel-Ermita','14:20:5E:56:9A:2F','172.16.100.113','10.10.0.73','b4:79:c8:29:6f:b0'),(12,2,'2019-12-10 01:51:14','humberto','ramos','124','73b5jv','Android','oxoHotel-Ermita','88:40:3B:E7:5D:3C','172.16.100.144','10.10.0.73','b4:79:c8:29:6f:b0'),(13,2,'2019-12-10 01:51:23','pedro','salas','211','73b5jv','Android','oxoHotel-Ermita','84:B5:41:A9:3B:0A','172.16.100.20','10.10.0.73','b4:79:c8:29:6f:b0'),(14,2,'2019-12-10 02:21:26','grimsel','molina','217','73b5jv','Windows','oxoHotel-Ermita','0C:54:15:C6:B0:74','172.16.100.154','10.10.0.92','b4:79:c8:2a:0d:10'),(15,2,'2019-12-10 02:43:07','sergio','delfino','226','73b5jv','Windows','oxoHotel-Ermita','D0:C6:37:B4:96:5F','172.16.100.50','10.10.0.59','1c:3a:60:31:93:60'),(16,2,'2019-12-10 03:06:50','alejandro','carvajal','316','73b5jv','Windows','oxoHotel-Ermita','A4:DB:30:33:2D:4D','172.16.100.138','10.10.0.64','1c:3a:60:31:7c:10'),(17,2,'2019-12-10 03:53:04','jaisson','villamil','215','73b5jv','Android','oxoHotel-Ermita','04:D6:AA:7A:6B:79','172.16.100.31','10.10.0.115','1c:3a:60:31:7b:20'),(18,2,'2019-12-10 03:54:16','andres','gonzalez','317','73b5jv','Android','oxoHotel-Ermita','00:B5:D0:2C:50:17','172.16.100.184','10.10.0.115','1c:3a:60:31:7b:20'),(19,2,'2019-12-10 03:56:39','vanessa','lopez','120','73b5jv','Android','oxoHotel-Ermita','10:44:00:9D:AC:8E','172.16.100.119','10.10.0.88','94:bf:c4:16:31:40'),(20,2,'2019-12-10 04:08:01','laura','rodriguez','220','b5sqka','Windows','oxoHotel-Ermita','D4:25:8B:A6:27:37','172.16.100.44','10.10.0.73','b4:79:c8:29:6f:b0'),(21,2,'2019-12-10 04:18:15','carlos','quesada','319','73b5jv','MacOS','oxoHotel-Ermita','C0:9A:D0:C1:2B:F5','172.16.100.100','10.10.0.118','b4:79:c8:29:e2:f0'),(22,2,'2019-12-10 04:57:30','ana','trujillo','101','73b5jv','MacOS','oxoHotel-Ermita','34:08:BC:3E:E0:1E','172.16.100.85','10.10.0.118','b4:79:c8:29:e2:f0'),(23,2,'2019-12-10 04:58:52','ana','trujillo','101','73b5jv','MacOS','oxoHotel-Ermita','F0:18:98:56:51:1B','172.16.100.33','10.10.0.118','b4:79:c8:29:e2:f0'),(24,2,'2019-12-10 05:06:55','deivi','lambis','119','73b5jv','Android','oxoHotel-Ermita','B0:EB:57:04:5B:CF','172.16.100.104','10.10.0.73','b4:79:c8:29:6f:b0'),(25,2,'2019-12-10 05:15:32','laura','rodriguez','220','b5sqka','MacOS','oxoHotel-Ermita','D8:8F:76:9B:F1:66','172.16.100.45','10.10.0.70','94:bf:c4:17:21:50'),(26,2,'2019-12-10 05:37:59','dioritte','herrera','309','73b5jv','Android','oxoHotel-Ermita','34:79:16:D0:F0:C8','172.16.100.66','10.10.0.73','b4:79:c8:29:6f:b0'),(27,2,'2019-12-10 05:52:26','miguel','bernett','301','73b5jv','Android','','','','',''),(28,2,'2019-12-10 05:54:38','miguel','bernett','301','73b5jv','Android','','','','',''),(29,2,'2019-12-10 06:12:26','ana','salcedo','305','73b5jv','Android','oxoHotel-Ermita','38:37:8B:CE:D3:C6','172.16.100.11','10.10.0.108','94:bf:c4:18:34:d0'),(30,2,'2019-12-10 06:39:44','irina','asprilla','112','73b5jv','Android','oxoHotel-Ermita','8C:E5:C0:3C:17:01','172.16.100.70','10.10.0.98','94:bf:c4:16:ca:60'),(31,2,'2019-12-10 06:43:13','andres','gonzalez','317','hnjes4','Windows','oxoHotel-Ermita','48:D2:24:C2:A0:E7','172.16.100.36','10.10.0.63','94:bf:c4:17:2a:60'),(32,2,'2019-12-10 07:10:41','david','alfaro','122','73b5jv','Android','oxoHotel-Ermita','88:10:8F:08:1C:65','172.16.100.143','10.10.0.79','1c:3a:60:31:35:50'),(33,2,'2019-12-10 07:12:12','sergio','delfino','226','73b5jv','MacOS','oxoHotel-Ermita','18:81:0E:3B:A6:B6','172.16.100.2','10.10.0.73','b4:79:c8:29:6f:b0'),(34,2,'2019-12-10 07:53:22','hanner humberto','hernandez moreno','124','73b5jv','Android','oxoHotel-Ermita','60:A4:D0:E1:77:BC','172.16.100.46','10.10.0.75','94:bf:c4:17:1f:f0'),(35,2,'2019-12-10 08:12:03','carlos andres','sierra amaya','322','73b5jv','Android','oxoHotel-Ermita','D0:D7:83:D6:64:A8','172.16.100.35','10.10.0.118','b4:79:c8:29:e2:f0'),(36,2,'2019-12-10 08:13:09','maria alejandra','guevara sierra','221','73b5jv','Android','oxoHotel-Ermita','D0:FF:98:D9:72:61','172.16.100.162','10.10.0.120','b4:79:c8:29:e2:70'),(37,2,'2019-12-10 08:40:31','mario','salguedo maza','323','73b5jv','Android','oxoHotel-Ermita','DC:BF:E9:EB:7B:1D','172.16.100.156','10.10.0.66','1c:3a:60:31:72:70'),(38,2,'2019-12-10 08:49:07','edward','catolico','219','73b5jv','Windows','oxoHotel-Ermita','94:53:30:73:59:B1','172.16.100.185','10.10.0.71','1c:3a:60:31:5b:50'),(39,2,'2019-12-10 09:05:07','kelly','suarez','312','73b5jv','Android','oxoHotel-Ermita','54:FC:F0:2A:30:93','172.16.100.145','10.10.0.110','94:bf:c4:18:33:50'),(40,2,'2019-12-10 09:14:14','ivianor marichal','marichal','204','73b5jv','Android','oxoHotel-Ermita','60:1D:91:61:3F:52','172.16.100.90','10.10.0.81','94:bf:c4:17:05:e0'),(41,2,'2019-12-10 09:15:56','nicolas','del toro martinez','303','73b5jv','Android','oxoHotel-Ermita','14:96:E5:92:D7:27','172.16.100.97','10.10.0.60','1c:3a:60:31:58:50'),(42,2,'2019-12-10 09:19:37','german','gaviria','301','73b5jv','Windows','oxoHotel-Ermita','00:E1:8C:B1:57:6A','172.16.100.147','10.10.0.60','1c:3a:60:31:58:50'),(43,2,'2019-12-10 09:51:21','sergio','delfino','226','73b5jv','MacOS','oxoHotel-Ermita','48:BF:6B:EF:D5:50','172.16.100.48','10.10.0.89','94:bf:c4:17:20:70'),(44,2,'2019-12-10 10:04:23','miguel','echenique','305','73b5jv','Android','oxoHotel-Ermita','F0:8A:76:38:43:62','172.16.100.68','10.10.0.108','94:bf:c4:18:34:d0'),(45,2,'2019-12-10 10:14:57','kevin','gasca','324','73b5jv','MacOS','oxoHotel-Ermita','B8:C1:11:85:DE:F1','172.16.100.171','10.10.0.68','1c:3a:60:31:82:40'),(46,2,'2019-12-10 10:15:30','maria','cardozo','308','73b5jv','Android','oxoHotel-Ermita','34:2E:B6:52:B5:29','172.16.100.51','10.10.0.73','b4:79:c8:29:6f:b0'),(47,2,'2019-12-10 10:20:54','gladys paola','perez castilla','213','73b5jv','Android','oxoHotel-Ermita','6C:00:6B:79:68:09','172.16.100.176','10.10.0.84','94:bf:c4:16:65:40'),(48,2,'2019-12-10 10:28:15','diana','roa','318','73b5jv','Windows','oxoHotel-Ermita','50:76:AF:38:A4:14','172.16.100.15','10.10.0.62','1c:3a:60:31:27:50'),(49,2,'2019-12-10 10:39:44','luis c','reyes h','108','73b5jv','Android','oxoHotel-Ermita','7C:2E:DD:D6:33:CB','172.16.100.29','10.10.0.101','94:bf:c4:16:ad:50'),(50,2,'2019-12-10 11:01:16','','','','','Android','','','','',''),(51,2,'2019-12-11 12:20:01','miguel','bernett','116','73b5jv','Android','oxoHotel-Ermita','E8:50:8B:DC:1B:FC','172.16.100.7','10.10.0.78','1c:3a:60:31:5c:10'),(52,2,'2019-12-11 12:27:14','wendy','rhenals','302','73b5jv','Android','oxoHotel-Ermita','30:74:96:1F:98:31','172.16.100.19','10.10.0.74','94:bf:c4:18:38:20'),(53,2,'2019-12-11 01:04:47','perez','arturo','202','73b5jv','Android','oxoHotel-Ermita','80:4E:70:46:E8:D2','172.16.100.13','10.10.0.76','1c:3a:60:31:95:10'),(54,2,'2019-12-11 01:13:13','yohira','castro','216','73b5jv','Android','oxoHotel-Ermita','B4:CD:27:1F:A4:39','172.16.100.149','10.10.0.109','94:bf:c4:16:b8:b0'),(55,2,'2019-12-11 08:40:40','carlos','quesada','319','73b5jv','Windows','oxoHotel-Ermita','9A:08:E4:BE:6C:13','172.16.100.115','10.10.0.63','94:bf:c4:17:2a:60'),(56,2,'2019-12-11 08:45:05','elkin','torres','116','73b5jv','Android','oxoHotel-Ermita','7C:38:AD:71:63:40','172.16.100.105','10.10.0.73','b4:79:c8:29:6f:b0'),(57,2,'2019-12-11 09:13:28','arturo','perez','202','73b5jv','Windows','oxoHotel-Ermita','90:32:4B:A8:95:DD','172.16.100.91','10.10.0.73','b4:79:c8:29:6f:b0'),(58,2,'2019-12-11 09:47:50','evelyn','arriagada','218','73b5jv','Windows','oxoHotel-Ermita','5C:C5:D4:4A:54:39','172.16.100.110','10.10.0.102','b4:79:c8:2a:11:50'),(59,2,'2019-12-11 10:05:05','grimsel','molina','217','73b5jv','MacOS','oxoHotel-Ermita','00:5B:94:38:5D:1B','172.16.100.83','10.10.0.102','b4:79:c8:2a:11:50'),(60,2,'2019-12-11 10:10:56','joan','romero','325','73b5jv','Windows','oxoHotel-Ermita','40:49:0F:80:76:41','172.16.100.178','10.10.0.73','b4:79:c8:29:6f:b0'),(61,2,'2019-12-11 10:12:14','joan','romero','325','73b5jv','MacOS','oxoHotel-Ermita','50:82:D5:AB:CF:8D','172.16.100.27','10.10.0.73','b4:79:c8:29:6f:b0'),(62,2,'2019-12-11 10:39:52','david','uribe','120','73b5jv','Windows','oxoHotel-Ermita','B0:52:16:42:6F:1F','172.16.100.122','10.10.0.82','1c:3a:60:31:1b:e0'),(63,2,'2019-12-11 12:06:29','jaisson','villamil','215','73b5jv','Windows','oxoHotel-Ermita','B8:EE:65:EF:3D:0A','172.16.100.167','10.10.0.102','b4:79:c8:2a:11:50'),(64,2,'2019-12-11 12:26:20','diana','roa','318','b5sqka','MacOS','oxoHotel-Ermita','F8:FF:C2:F3:21:E9','172.16.100.142','10.10.0.118','b4:79:c8:29:e2:f0'),(65,2,'2019-12-11 12:28:07','carolina','bernal','203','b5sqka','Windows','oxoHotel-Ermita','94:53:30:19:AB:27','172.16.100.169','10.10.0.118','b4:79:c8:29:e2:f0'),(66,2,'2019-12-11 12:34:58','norma','aleman','209','oxohotel12','Windows','oxoHotel-Ermita','74:DF:BF:AB:E0:71','172.16.100.103','10.10.0.118','b4:79:c8:29:e2:f0'),(67,2,'2019-12-11 12:34:58','norma','aleman','209','oxohotel12','Windows','oxoHotel-Ermita','74:DF:BF:AB:E0:71','172.16.100.103','10.10.0.118','b4:79:c8:29:e2:f0'),(68,2,'2019-12-11 12:35:30','norma','aleman','209','oxohotel12','Windows','oxoHotel-Ermita','74:DF:BF:AB:E0:71','172.16.100.103','10.10.0.118','b4:79:c8:29:e2:f0'),(69,2,'2019-12-11 01:03:46','roberto','gedeon','338','73b5jv','MacOS','oxoHotel-Ermita','8C:85:90:BE:63:27','172.16.100.37','10.10.0.73','b4:79:c8:29:6f:b0'),(70,2,'2019-12-11 01:21:08','roberto','gedeon','338','73b5jv','MacOS','oxoHotel-Ermita','B8:B2:F8:78:C8:53','172.16.100.118','10.10.0.73','b4:79:c8:29:6f:b0'),(71,2,'2019-12-11 01:24:09','edward','catolico','219','oxohotel12','Android','oxoHotel-Ermita','3C:F7:A4:43:1A:B5','172.16.100.78','10.10.0.118','b4:79:c8:29:e2:f0'),(72,2,'2019-12-11 01:58:47','diego','barreiro','201','oxohotel12','Android','oxoHotel-Ermita','B4:F1:DA:CE:11:43','172.16.100.63','192.168.0.1','1c:3a:60:31:81:a0'),(73,2,'2019-12-11 02:15:05','wilson','cardenas','101','73b5jv','Windows','oxoHotel-Ermita','DC:FB:48:7B:0F:66','172.16.100.153','10.10.0.102','b4:79:c8:2a:11:50'),(74,2,'2019-12-11 02:15:29','jose','tercero','115','73b5jv','Android','oxoHotel-Ermita','04:D6:AA:EF:C9:B1','172.16.100.152','10.10.0.79','1c:3a:60:31:35:50'),(75,2,'2019-12-11 02:19:46','kelly','suarez','312','73b5jv','Windows','oxoHotel-Ermita','AC:D5:64:2D:0B:51','172.16.100.181','10.10.0.73','b4:79:c8:29:6f:b0'),(76,2,'2019-12-11 02:38:46','jose','tercero','115','73b5jv','Windows','oxoHotel-Ermita','1C:4D:70:99:9F:26','172.16.100.157','10.10.0.79','1c:3a:60:31:35:50'),(77,2,'2019-12-11 03:50:47','david','uribe','120','73b5jv','Android','','','','',''),(78,2,'2019-12-11 03:59:36','alvaro','cadena','201','oxohotel12','Android','oxoHotel-Ermita','38:37:8B:50:26:37','172.16.100.108','10.10.0.54','94:bf:c4:17:1b:80'),(79,2,'2019-12-11 04:52:48','david','saboya','301','73b5jv','MacOS','oxoHotel-Ermita','9C:64:8B:0F:A1:76','172.16.100.21','10.10.0.60','1c:3a:60:31:58:50'),(80,2,'2019-12-11 04:59:52','david','saboya','301','73b5jv','MacOS','oxoHotel-Ermita','D0:C5:F3:23:7C:84','172.16.100.50','10.10.0.60','1c:3a:60:31:58:50'),(81,2,'2019-12-11 05:14:06','daniel','giraldo saenz','235','73b5jv','MacOS','oxoHotel-Ermita','1C:36:BB:1E:02:A6','172.16.100.163','10.10.0.114','94:bf:c4:18:1c:70'),(82,2,'2019-12-11 05:18:37','daniel','giraldo','235','73b5jv','MacOS','oxoHotel-Ermita','38:53:9C:3E:2D:83','172.16.100.135','10.10.0.114','94:bf:c4:18:1c:70'),(83,2,'2019-12-11 05:25:31','diego','barreiro','201','73b5jv','Windows','oxoHotel-Ermita','AC:E0:10:3A:D3:86','172.16.100.158','10.10.0.72','1c:3a:60:31:72:50'),(84,2,'2019-12-11 05:29:07','ricardo','gonzalez rapalino','116','73b5jv','Android','oxoHotel-Ermita','CC:9F:7A:AA:4B:79','172.16.100.86','10.10.0.102','b4:79:c8:2a:11:50'),(85,2,'2019-12-11 05:48:21','pamela','garcia','338','73b5jv','MacOS','oxoHotel-Ermita','F4:06:16:B5:9B:CA','172.16.100.24','10.10.0.73','b4:79:c8:29:6f:b0'),(86,2,'2019-12-11 06:14:53','gustavo','jauregui','338','73b5jv','MacOS','oxoHotel-Ermita','38:F9:D3:B4:45:16','172.16.100.85','10.10.0.102','b4:79:c8:2a:11:50'),(87,2,'2019-12-11 06:26:27','pamela','garcia','338','73b5jv','MacOS','oxoHotel-Ermita','F0:18:98:11:C5:A7','172.16.100.53','10.10.0.102','b4:79:c8:2a:11:50'),(88,2,'2019-12-11 07:07:27','david','uribe','120','73b5jv','Android','oxoHotel-Ermita','E4:A7:C5:0F:1E:07','172.16.100.120','10.10.0.78','1c:3a:60:31:5c:10'),(89,2,'2019-12-11 07:07:36','elkin','torres','123','73b5jv','Windows','oxoHotel-Ermita','DC:FB:48:5D:FF:C5','172.16.100.73','10.10.0.73','b4:79:c8:29:6f:b0'),(90,2,'2019-12-11 08:03:12','gloria','gedeon','207','73b5jv','MacOS','oxoHotel-Ermita','64:B0:A6:E3:5E:B5','172.16.100.121','10.10.0.118','b4:79:c8:29:e2:f0'),(91,2,'2019-12-11 08:55:48','miguel angel','monsalve guzman','307','73b5jv','MacOS','oxoHotel-Ermita','98:00:C6:5D:67:D6','172.16.100.33','10.10.0.118','b4:79:c8:29:e2:f0'),(92,2,'2019-12-11 08:59:39','ricardo','gonzalez rapalino','116','73b5jv','Android','oxoHotel-Ermita','F4:09:D8:9F:0C:27','172.16.100.16','10.10.0.78','1c:3a:60:31:5c:10'),(93,2,'2019-12-12 07:24:23','wilson','cardenas','101','73b5jv','Android','oxoHotel-Ermita','F0:8A:76:53:0D:12','172.16.100.9','10.10.0.54','94:bf:c4:17:1b:80'),(94,2,'2019-12-12 12:05:54','david','saboya','301','73b5jv','Windows','oxoHotel-Ermita','48:89:E7:6C:56:CE','172.16.100.144','10.10.0.102','b4:79:c8:2a:11:50'),(95,2,'2019-12-12 01:25:21','wil','cardenas','102','73b5jv','Android','oxoHotel-Ermita','8C:E5:C0:3C:17:03','172.16.100.164','10.10.0.92','b4:79:c8:2a:0d:10'),(96,2,'2019-12-12 01:47:14','cristina','uribe','111','oxohotel12','MacOS','oxoHotel-Ermita','88:66:A5:20:DD:79','172.16.100.112','10.10.0.73','b4:79:c8:29:6f:b0'),(97,2,'2019-12-12 02:48:01','nigel','mayne','318','oxohotel12','MacOS','oxoHotel-Ermita','F0:C3:71:79:A7:8A','172.16.100.141','10.10.0.73','b4:79:c8:29:6f:b0'),(98,2,'2019-12-12 03:03:28','nigel','mayne','318','oxohotel12','MacOS','oxoHotel-Ermita','F0:18:98:5E:CA:89','172.16.100.74','10.10.0.62','1c:3a:60:31:27:50'),(99,2,'2019-12-12 03:20:05','alejandro','riascos','338','73b5jv','MacOS','oxoHotel-Ermita','D4:DC:CD:D3:7F:E0','172.16.100.150','10.10.0.73','b4:79:c8:29:6f:b0'),(100,2,'2019-12-12 03:36:06','carlos hernan','gardeazabal','207','oxohotel12','MacOS','oxoHotel-Ermita','D4:A3:3D:F3:4E:C3','172.16.100.84','10.10.0.102','b4:79:c8:2a:11:50'),(101,2,'2019-12-12 03:53:34','nicolas','velez','206','oxohotel12','MacOS','oxoHotel-Ermita','68:FE:F7:EE:85:37','172.16.100.136','10.10.0.81','94:bf:c4:17:05:e0'),(102,2,'2019-12-12 04:18:09','lina maria','moreno de uribe','220','73b5jv','MacOS','oxoHotel-Ermita','34:7C:25:3B:79:A0','172.16.100.156','10.10.0.70','94:bf:c4:17:21:50'),(103,2,'2019-12-12 04:20:07','lina','moreno','220','oxohotel12','Android','oxoHotel-Ermita','FC:87:43:C6:B6:4A','172.16.100.128','10.10.0.80','94:bf:c4:16:f9:80'),(104,2,'2019-12-12 04:20:21','wilson','cardenas','333','73b5jv','Android','oxoHotel-Ermita','D4:AE:05:A8:61:D1','172.16.100.140','10.10.0.93','b4:79:c8:29:e8:a0'),(105,2,'2019-12-12 04:26:18','drew','oliveras','306','oxohotel12','MacOS','oxoHotel-Ermita','7C:A1:AE:BA:6A:8F','172.16.100.91','10.10.0.74','94:bf:c4:18:38:20'),(106,2,'2019-12-12 04:28:23','drew','oliveras','306','oxohotel12','MacOS','oxoHotel-Ermita','B4:F6:1C:7F:69:F7','172.16.100.103','10.10.0.108','94:bf:c4:18:34:d0'),(107,2,'2019-12-12 04:39:03','victor enrique','gedeon juan','109','oxohotel12','Android','oxoHotel-Ermita','30:07:4D:07:0E:03','172.16.100.142','10.10.0.100','94:bf:c4:16:b7:a0'),(108,2,'2019-12-12 04:43:43','carolina','bernal','203','oxohotel12','Android','oxoHotel-Ermita','C4:9F:4C:11:38:3B','172.16.100.160','10.10.0.76','1c:3a:60:31:95:10'),(109,2,'2019-12-12 04:44:46','rocio','molina vizcaino','109','oxohotel12','MacOS','oxoHotel-Ermita','E0:B5:2D:DC:8F:A2','172.16.100.153','10.10.0.100','94:bf:c4:16:b7:a0'),(110,2,'2019-12-12 04:45:54','rafael','cardona','210','oxohotel12','MacOS','oxoHotel-Ermita','F0:C3:71:AE:65:40','172.16.100.26','10.10.0.73','b4:79:c8:29:6f:b0'),(111,2,'2019-12-12 04:54:03','boris','kruijssen','325','oxohotel12','MacOS','oxoHotel-Ermita','34:08:BC:3B:39:59','172.16.100.147','10.10.0.65','1c:3a:60:31:70:a0'),(112,2,'2019-12-12 05:00:30','marisol','echeverria','208','oxohotel12','MacOS','oxoHotel-Ermita','74:42:8B:05:E1:A5','172.16.100.149','10.10.0.86','1c:3a:60:31:5b:60'),(113,2,'2019-12-12 05:06:34','carlos','echeverria','317','oxohotel12','MacOS','oxoHotel-Ermita','44:00:10:61:C3:9F','172.16.100.155','10.10.0.63','94:bf:c4:17:2a:60'),(114,2,'2019-12-12 05:19:25','enrique','velez','126','oxohotel12','MacOS','oxoHotel-Ermita','CC:66:0A:A7:4D:82','172.16.100.184','10.10.0.61','94:bf:c4:18:37:d0'),(115,2,'2019-12-12 06:08:58','juan camilo','ochoa yepes','305','oxohotel12','MacOS','oxoHotel-Ermita','90:DD:5D:50:88:77','172.16.100.94','10.10.0.63','94:bf:c4:17:2a:60'),(116,2,'2019-12-12 06:17:00','janeth','suarez','126','oxohotel12','MacOS','oxoHotel-Ermita','0C:51:01:25:63:85','172.16.100.14','10.10.0.73','b4:79:c8:29:6f:b0'),(117,2,'2019-12-12 06:24:07','stella','gedeon','212','73b5jv','MacOS','oxoHotel-Ermita','84:41:67:B2:F6:71','172.16.100.73','10.10.0.73','b4:79:c8:29:6f:b0'),(118,2,'2019-12-12 06:54:41','joaquin','velez','126','oxohotel12','MacOS','oxoHotel-Ermita','9C:04:EB:90:98:F3','172.16.100.15','10.10.0.119','1c:3a:60:0d:aa:c0'),(119,2,'2019-12-12 06:55:41','gustavo','jauregui','124','oxohotel12','MacOS','oxoHotel-Ermita','F8:87:F1:BD:21:DD','172.16.100.114','10.10.0.119','1c:3a:60:0d:aa:c0'),(120,2,'2019-12-12 06:56:37','juliana','ossa','206','73b5jv','MacOS','oxoHotel-Ermita','FC:2A:9C:96:70:CC','172.16.100.117','10.10.0.79','1c:3a:60:31:35:50'),(121,2,'2019-12-12 07:02:08','sofia','ortiga','307','oxohotel12','MacOS','oxoHotel-Ermita','98:01:A7:BB:0B:D7','172.16.100.179','10.10.0.57','1c:3a:60:31:16:20'),(122,2,'2019-12-12 07:07:44','valentin','velez','126','oxohotel12','Otro','oxoHotel-Ermita','58:2F:40:10:7B:38','172.16.100.161','10.10.0.119','1c:3a:60:0d:aa:c0'),(123,2,'2019-12-12 07:32:21','jose','tercero','115','oxohotel12','Android','oxoHotel-Ermita','10:98:C3:CC:B7:96','172.16.100.69','10.10.0.73','b4:79:c8:29:6f:b0'),(124,2,'2019-12-12 07:43:15','vicente','hurtado','306','oxohotel12','Android','oxoHotel-Ermita','A0:CC:2B:91:96:53','172.16.100.40','10.10.0.73','b4:79:c8:29:6f:b0'),(125,2,'2019-12-12 08:00:55','veronica','trujillo','212','oxohotel12','MacOS','oxoHotel-Ermita','B8:C1:11:D4:DE:12','172.16.100.132','10.10.0.92','b4:79:c8:2a:0d:10'),(126,2,'2019-12-12 08:02:52','ermita','tribute','333','73b5jv','MacOS','oxoHotel-Ermita','40:98:AD:8E:30:52','172.16.100.5','10.10.0.92','b4:79:c8:2a:0d:10'),(127,2,'2019-12-12 08:56:36','alvaro','rincon','338','oxohotel12','Android','oxoHotel-Ermita','A8:DB:03:F7:37:7D','172.16.100.126','10.10.0.118','b4:79:c8:29:e2:f0'),(128,2,'2019-12-12 09:00:46','janet','suarez','126','oxohotel12','MacOS','oxoHotel-Ermita','80:0C:67:31:DA:28','172.16.100.138','10.10.0.61','94:bf:c4:18:37:d0'),(129,2,'2019-12-12 09:04:38','alejandro','velez','311','oxohotel12','MacOS','oxoHotel-Ermita','64:9A:BE:EB:25:F1','172.16.100.181','10.10.0.73','b4:79:c8:29:6f:b0'),(130,2,'2019-12-12 09:06:30','matilde','juan','212','oxohotel12','MacOS','oxoHotel-Ermita','8C:86:1E:39:2E:83','172.16.100.57','10.10.0.118','b4:79:c8:29:e2:f0'),(131,2,'2019-12-12 09:23:16','carlos','mejia','305','oxohotel12','MacOS','oxoHotel-Ermita','58:6B:14:90:59:17','172.16.100.92','10.10.0.118','b4:79:c8:29:e2:f0'),(132,2,'2019-12-12 10:24:32','cristina','gedeon','208','oxohotel12','MacOS','oxoHotel-Ermita','A8:5C:2C:41:F8:40','172.16.100.120','10.10.0.86','1c:3a:60:31:5b:60'),(133,2,'2019-12-12 10:26:26','frank','londono','119','73b5jv','MacOS','oxoHotel-Ermita','DC:A4:CA:A3:77:EC','172.16.100.47','10.10.0.82','1c:3a:60:31:1b:e0'),(134,2,'2019-12-12 10:52:32','frank','londono','119','73b5jv','MacOS','oxoHotel-Ermita','48:BF:6B:17:28:8A','172.16.100.133','10.10.0.82','1c:3a:60:31:1b:e0'),(135,2,'2019-12-12 11:02:09','jose','gedeon','211','oxohotel12','MacOS','oxoHotel-Ermita','E0:33:8E:C1:24:31','172.16.100.87','10.10.0.73','b4:79:c8:29:6f:b0'),(136,2,'2019-12-12 11:31:06','cristina galvez','cristina','303','oxohotel12','MacOS','oxoHotel-Ermita','F0:98:9D:E3:F3:51','172.16.100.96','10.10.0.73','b4:79:c8:29:6f:b0'),(137,2,'2019-12-12 11:49:17','gustavo','rubiano','215','oxohotel12','Android','oxoHotel-Ermita','A8:51:5B:FD:EA:10','172.16.100.23','10.10.0.80','94:bf:c4:16:f9:80'),(138,2,'2019-12-13 06:26:58','george','londono','312','oxohotel12','MacOS','oxoHotel-Ermita','F0:99:B6:62:EF:5D','172.16.100.19','10.10.0.110','94:bf:c4:18:33:50'),(139,2,'2019-12-13 06:41:42','juan','viveros','320','oxohotel12','MacOS','oxoHotel-Ermita','D4:A3:3D:BE:B7:8B','172.16.100.89','10.10.0.62','1c:3a:60:31:27:50'),(140,2,'2019-12-13 06:48:04','samuel','garcia','333','73b5jv','Android','oxoHotel-Ermita','3C:F7:A4:FF:DC:AF','172.16.100.65','10.10.0.118','b4:79:c8:29:e2:f0'),(141,2,'2019-12-13 08:15:52','susana','perez','323','73b5jv','Android','oxoHotel-Ermita','F8:84:F2:37:F2:41','172.16.100.191','10.10.0.120','b4:79:c8:29:e2:70'),(142,2,'2019-12-13 08:17:32','gustavo','rubiano','215','oxohotel12','Android','oxoHotel-Ermita','DC:72:9B:5F:38:D1','172.16.100.119','10.10.0.118','b4:79:c8:29:e2:f0'),(143,2,'2019-12-13 09:00:03','carolina','acevedo','205','oxohotel12','MacOS','oxoHotel-Ermita','74:9E:AF:57:EC:C9','172.16.100.49','10.10.0.73','b4:79:c8:29:6f:b0'),(144,2,'2019-12-13 09:19:03','henry','velez','120','oxohotel12','MacOS','oxoHotel-Ermita','F4:31:C3:8C:2D:6D','172.16.100.154','10.10.0.82','1c:3a:60:31:1b:e0'),(145,2,'2019-12-13 09:21:55','mauricio','alvarez','302','73b5jv','Windows','oxoHotel-Ermita','4C:34:88:52:11:38','172.16.100.95','10.10.0.118','b4:79:c8:29:e2:f0'),(146,2,'2019-12-13 09:52:46','boris','kruijssen','325','oxohotel12','MacOS','oxoHotel-Ermita','38:F9:D3:B0:33:03','172.16.100.12','10.10.0.65','1c:3a:60:31:70:a0'),(147,2,'2019-12-13 09:54:39','nigel','mayne','318','oxohotel12','MacOS','oxoHotel-Ermita','64:C7:53:EF:84:F4','172.16.100.190','10.10.0.62','1c:3a:60:31:27:50'),(148,2,'2019-12-13 10:17:56','never','jarava','125','oxohotel12','Android','oxoHotel-Ermita','90:73:5A:4B:11:1F','172.16.100.139','10.10.0.91','94:bf:c4:17:17:b0'),(149,2,'2019-12-13 10:18:16','jose antonio','utria caraballo','125','oxohotel12','Android','oxoHotel-Ermita','D4:11:A3:62:C8:1B','172.16.100.77','10.10.0.91','94:bf:c4:17:17:b0'),(150,2,'2019-12-13 11:49:41','carlos','echeverria','317','oxohotel12','Windows','oxoHotel-Ermita','D4:3B:04:39:32:DF','172.16.100.90','10.10.0.73','b4:79:c8:29:6f:b0'),(151,2,'2019-12-13 12:01:14','diana','gedeon','221','oxohotel12','MacOS','oxoHotel-Ermita','A4:83:E7:7E:94:71','172.16.100.68','10.10.0.118','b4:79:c8:29:e2:f0'),(152,2,'2019-12-13 01:20:41','','','','','Android','','','','',''),(153,2,'2019-12-13 01:25:22','diego','barreiro','0201','oxohotel12','Android','','','','',''),(154,2,'2019-12-13 01:25:26','diego','barreiro','0201','oxohotel12','Android','','','','',''),(155,2,'2019-12-13 01:25:33','diego','barreiro','0201','oxohotel12','Android','','','','',''),(156,2,'2019-12-13 01:27:14','jose francisco','tercero','115','oxohotel12','MacOS','oxoHotel-Ermita','04:4B:ED:20:A2:4B','172.16.100.126','10.10.0.88','94:bf:c4:16:31:40'),(157,2,'2019-12-13 01:28:24','manuel rico','perez','115','oxohotel12','Android','','','','',''),(158,2,'2019-12-13 01:28:26','manuel rico','perez','115','oxohotel12','Android','','','','',''),(159,2,'2019-12-13 01:28:46','jose francisco','tercero','115','oxohotel12','Android','','','','',''),(160,2,'2019-12-13 01:30:04','carolina','bernal','203','oxohotel12','Android','oxoHotel-Ermita','60:A4:D0:BD:23:69','172.16.100.174','10.10.0.79','1c:3a:60:31:35:50'),(161,2,'2019-12-13 02:18:44','drew','oliveras','306','oxohotel12','MacOS','oxoHotel-Ermita','8C:85:90:6D:4D:AD','172.16.100.40','10.10.0.123','94:bf:c4:16:fd:70'),(162,2,'2019-12-13 02:25:27','catalina','sandoval','119','oxohotel12','Android','oxoHotel-Ermita','DC:EF:CA:EE:3D:03','172.16.100.162','10.10.0.82','1c:3a:60:31:1b:e0'),(163,2,'2019-12-13 03:24:41','sergio','sabogal','119','oxohotel12','MacOS','oxoHotel-Ermita','CC:2D:B7:7C:20:6D','172.16.100.79','10.10.0.102','b4:79:c8:2a:11:50'),(164,2,'2019-12-13 04:15:16','katherine','barreto','219','oxohotel12','MacOS','oxoHotel-Ermita','D4:A3:3D:2E:9B:3C','172.16.100.125','10.10.0.118','b4:79:c8:29:e2:f0'),(165,2,'2019-12-13 04:29:48','eventos','ermita','333','73b5jv','Android','oxoHotel-Ermita','E4:E1:30:10:D0:EE','172.16.100.132','10.10.0.54','94:bf:c4:17:1b:80'),(166,2,'2019-12-13 04:32:48','manuel','pachamoro','220','oxohotel12','MacOS','oxoHotel-Ermita','D4:A3:3D:2E:5B:20','172.16.100.153','10.10.0.70','94:bf:c4:17:21:50'),(167,2,'2019-12-13 04:43:36','handan','metin','326','oxohotel12','MacOS','oxoHotel-Ermita','F0:98:9D:71:66:13','172.16.100.181','10.10.0.122','1c:3a:60:31:72:60'),(168,2,'2019-12-13 04:43:56','tobias','mast','326','oxohotel12','Android','oxoHotel-Ermita','24:18:1D:FF:38:B4','172.16.100.73','10.10.0.122','1c:3a:60:31:72:60'),(169,2,'2019-12-13 06:39:25','jackeline eliana','orjuela bermudez','308','oxohotel12','Android','oxoHotel-Ermita','A4:50:46:24:DB:DF','172.16.100.127','10.10.0.58','1c:3a:60:31:42:b0'),(170,2,'2019-12-13 06:40:48','hilen','puello','123','oxohotel12','Android','oxoHotel-Ermita','80:58:F8:9E:8A:D0','172.16.100.178','10.10.0.88','94:bf:c4:16:31:40'),(171,2,'2019-12-13 06:43:43','stella','sequeda tapia','223','oxohotel12','Android','oxoHotel-Ermita','48:C7:96:0E:95:03','172.16.100.135','10.10.0.72','1c:3a:60:31:72:50'),(172,2,'2019-12-13 06:44:01','marcela','ayazo alvarez','223','oxohotel12','MacOS','oxoHotel-Ermita','BC:9F:EF:24:21:F0','172.16.100.36','10.10.0.72','1c:3a:60:31:72:50'),(173,2,'2019-12-13 06:49:28','susana','naicipa','336','oxohotel12','MacOS','oxoHotel-Ermita','88:6B:6E:3E:EA:F8','172.16.100.47','10.10.0.104','94:bf:c4:17:28:50'),(174,2,'2019-12-13 06:49:29','maria alejandra','toro espitia','336','oxohotel12','MacOS','oxoHotel-Ermita','18:65:90:51:0E:49','172.16.100.133','10.10.0.104','94:bf:c4:17:28:50'),(175,2,'2019-12-13 06:50:34','elena','reyes','108','oxohotel12','Android','oxoHotel-Ermita','AC:5F:3E:64:78:AB','172.16.100.97','10.10.0.101','94:bf:c4:16:ad:50'),(176,2,'2019-12-13 06:50:38','laura','grau','336','oxohotel12','MacOS','oxoHotel-Ermita','84:A1:34:65:8F:CA','172.16.100.156','10.10.0.104','94:bf:c4:17:28:50'),(177,2,'2019-12-13 06:51:29','nelcy','mendoza diaz','108','oxohotel12','Android','oxoHotel-Ermita','B4:86:55:68:40:8A','172.16.100.31','10.10.0.100','94:bf:c4:16:b7:a0'),(178,2,'2019-12-13 06:52:23','vivian','salazar','212','oxohotel12','Android','oxoHotel-Ermita','D0:FC:CC:BB:73:75','172.16.100.119','10.10.0.87','94:bf:c4:17:18:50'),(179,2,'2019-12-13 06:52:42','clary','atencia','121','oxohotel12','Android','oxoHotel-Ermita','DC:74:A8:51:63:62','172.16.100.27','10.10.0.88','94:bf:c4:16:31:40'),(180,2,'2019-12-13 07:02:50','delcy maria','baron agresoth','208','oxohotel12','Android','oxoHotel-Ermita','E4:58:B8:7B:6C:16','172.16.100.120','10.10.0.86','1c:3a:60:31:5b:60'),(181,2,'2019-12-13 07:05:30','mailin isabel','gaitan arroyo','210','oxohotel12','MacOS','oxoHotel-Ermita','44:00:10:45:B4:CC','172.16.100.172','10.10.0.86','1c:3a:60:31:5b:60'),(182,2,'2019-12-13 07:05:35','natalia','cantillo','210','oxohotel12','Android','oxoHotel-Ermita','90:97:F3:74:DA:9E','172.16.100.173','10.10.0.86','1c:3a:60:31:5b:60'),(183,2,'2019-12-13 07:08:07','orlando','quintana agamez','111','oxohotel12','Android','oxoHotel-Ermita','74:EB:80:28:A5:C2','172.16.100.130','10.10.0.99','1c:3a:60:31:58:e0'),(184,2,'2019-12-13 07:13:33','sugey','pajaro rosario','319','oxohotel12','Android','oxoHotel-Ermita','FC:A6:21:0D:74:53','172.16.100.55','10.10.0.63','94:bf:c4:17:2a:60'),(185,2,'2019-12-13 07:13:50','fabian','gonzalez maquilon','111','oxohotel12','MacOS','oxoHotel-Ermita','34:E2:FD:15:25:63','172.16.100.94','10.10.0.99','1c:3a:60:31:58:e0'),(186,2,'2019-12-13 07:17:37','carolina','agamez naar','110','oxohotel12','Android','oxoHotel-Ermita','08:C5:E1:7E:CA:B1','172.16.100.14','10.10.0.101','94:bf:c4:16:ad:50'),(187,2,'2019-12-13 07:21:29','liseth','julio torres','208','oxohotel12','Android','oxoHotel-Ermita','80:4E:70:A4:5E:A0','172.16.100.161','10.10.0.86','1c:3a:60:31:5b:60'),(188,2,'2019-12-13 07:29:32','betzabeth','martinez','112','oxohotel12','Android','oxoHotel-Ermita','14:96:E5:18:7D:51','172.16.100.138','10.10.0.119','1c:3a:60:0d:aa:c0'),(189,2,'2019-12-13 07:32:05','carmen','hernandez','112','oxohotel12','Android','oxoHotel-Ermita','20:32:6C:64:F3:9C','172.16.100.49','10.10.0.73','b4:79:c8:29:6f:b0'),(190,2,'2019-12-13 07:45:45','anderson david','meza medina','124','oxohotel12','Android','oxoHotel-Ermita','C0:17:4D:F1:56:D3','172.16.100.113','10.10.0.75','94:bf:c4:17:1f:f0'),(191,2,'2019-12-13 07:46:46','maria','baron','336','oxohotel12','Android','oxoHotel-Ermita','C0:8C:71:E1:7A:0C','172.16.100.150','10.10.0.104','94:bf:c4:17:28:50'),(192,2,'2019-12-13 07:50:23','luis fernando','perez','213','oxohotel12','Android','oxoHotel-Ermita','1C:CC:D6:1E:05:2E','172.16.100.8','10.10.0.73','b4:79:c8:29:6f:b0'),(193,2,'2019-12-13 07:50:53','julieth','villa','336','oxohotel12','Android','oxoHotel-Ermita','80:58:F8:5F:88:B9','172.16.100.9','10.10.0.104','94:bf:c4:17:28:50'),(194,2,'2019-12-13 07:52:22','eustorgio','porto','225','oxohotel12','Android','oxoHotel-Ermita','90:73:5A:0F:82:13','172.16.100.177','10.10.0.89','94:bf:c4:17:20:70'),(195,2,'2019-12-13 07:53:18','sherly','pitalua','223','oxohotel12','Android','oxoHotel-Ermita','CC:C0:79:89:13:A0','172.16.100.190','10.10.0.89','94:bf:c4:17:20:70'),(196,2,'2019-12-13 07:54:02','esther','pardo','212','oxohotel12','Android','oxoHotel-Ermita','34:29:12:98:1F:2E','172.16.100.12','10.10.0.87','94:bf:c4:17:18:50'),(197,2,'2019-12-13 07:55:14','sindi','castaneda','212','oxohotel12','Android','oxoHotel-Ermita','90:63:3B:05:11:5A','172.16.100.85','10.10.0.87','94:bf:c4:17:18:50'),(198,2,'2019-12-13 08:33:50','richard','bueno','324','oxohotel12','Android','oxoHotel-Ermita','60:AB:67:FC:45:63','172.16.100.149','10.10.0.68','1c:3a:60:31:82:40'),(199,2,'2019-12-13 09:39:23','jorge','londono','312','oxohotel12','MacOS','oxoHotel-Ermita','14:BD:61:B2:0E:66','172.16.100.81','10.10.0.110','94:bf:c4:18:33:50'),(200,2,'2019-12-13 10:22:34','camilo','m','338','oxohotel12','MacOS','oxoHotel-Ermita','F8:62:14:50:7D:1C','172.16.100.78','10.10.0.73','b4:79:c8:29:6f:b0'),(201,2,'2019-12-13 11:31:18','sergio','sabogal','119','oxohotel12','MacOS','oxoHotel-Ermita','AC:E4:B5:34:82:3C','172.16.100.29','10.10.0.82','1c:3a:60:31:1b:e0'),(202,2,'2019-12-13 11:56:19','sergio','sabogal','119','oxohotel12','MacOS','oxoHotel-Ermita','88:E9:FE:64:01:F2','172.16.100.143','10.10.0.82','1c:3a:60:31:1b:e0'),(203,2,'2019-12-13 11:59:31','johana','zapata','121','oxohotel12','Android','oxoHotel-Ermita','60:1D:91:DA:E8:26','172.16.100.59','10.10.0.88','94:bf:c4:16:31:40'),(204,2,'2019-12-14 12:04:38','imera','monterrosa','101','oxohotel12','Android','oxoHotel-Ermita','30:96:FB:4E:D9:67','172.16.100.26','10.10.0.109','94:bf:c4:16:b8:b0'),(205,2,'2019-12-14 01:04:45','francisco javier','marmolejo florez','203','oxohotel12','Android','oxoHotel-Ermita','8C:E5:C0:32:31:59','172.16.100.56','10.10.0.83','1c:3a:60:31:5b:40'),(206,2,'2019-12-14 03:22:54','richard','bueno','324','oxohotel12','Android','oxoHotel-Ermita','60:AB:67:FC:45:63','172.16.100.149','10.10.0.68','1c:3a:60:31:82:40'),(207,2,'2019-12-14 06:57:53','analia','rodriguez','333','73b5jv','Android','oxoHotel-Ermita','60:1D:91:FE:A7:75','172.16.100.185','10.10.0.118','b4:79:c8:29:e2:f0'),(208,2,'2019-12-14 08:12:15','fabio andres','castrillon perez','224','oxohotel12','Android','oxoHotel-Ermita','F0:EE:10:C0:82:84','172.16.100.174','10.10.0.116','94:bf:c4:16:a5:f0'),(209,2,'2019-12-14 08:13:22','rocio','barragan','309','oxohotel12','MacOS','oxoHotel-Ermita','24:F0:94:DF:3F:F8','172.16.100.132','10.10.0.57','1c:3a:60:31:16:20'),(210,2,'2019-12-14 08:13:43','jorge gallego','gallego','224','oxohotel12','Android','oxoHotel-Ermita','A0:10:81:26:59:0B','172.16.100.92','10.10.0.116','94:bf:c4:16:a5:f0'),(211,2,'2019-12-14 08:51:13','juan','viveros','320','oxohotel12','Android','oxoHotel-Ermita','00:9D:6B:3F:26:7F','172.16.100.25','10.10.0.62','1c:3a:60:31:27:50'),(212,2,'2019-12-14 08:55:44','luis f','perez','213','oxohotel12','Android','','','','',''),(213,2,'2019-12-14 08:56:11','luis f','perez','213','oxohotel12','Android','','','','',''),(214,2,'2019-12-14 08:56:23','luis f','perez','213','oxohotel12','Android','','','','',''),(215,2,'2019-12-14 08:56:43','luis f','perez','213','oxohotel12','Android','','','','',''),(216,2,'2019-12-14 08:59:27','javier fernando','ruiz calderon','305','oxohotel12','Android','oxoHotel-Ermita','7C:2E:DD:A5:3F:15','172.16.100.129','10.10.0.73','b4:79:c8:29:6f:b0'),(217,2,'2019-12-14 09:00:24','luis f','perez','213','oxohotel12','MacOS','oxoHotel-Ermita','B0:48:1A:CD:33:18','172.16.100.144','10.10.0.73','b4:79:c8:29:6f:b0'),(218,2,'2019-12-14 12:58:24','katherine','barreto','220','oxohotel12','MacOS','oxoHotel-Ermita','38:53:9C:A9:65:BF','172.16.100.189','10.10.0.70','94:bf:c4:17:21:50'),(219,2,'2019-12-14 01:33:15','jairo','tribino','317','oxohotel12','Android','oxoHotel-Ermita','7C:1C:68:C9:C3:6C','172.16.100.109','10.10.0.118','b4:79:c8:29:e2:f0'),(220,2,'2019-12-14 02:23:23','jhon','cardenas','219','oxohotel12','Android','oxoHotel-Ermita','20:34:FB:B6:86:28','172.16.100.52','10.10.0.118','b4:79:c8:29:e2:f0'),(221,2,'2019-12-14 02:50:40','wilmar','mendieta','219','oxohotel12','Android','oxoHotel-Ermita','1C:CC:D6:1D:C6:EE','172.16.100.163','10.10.0.93','b4:79:c8:29:e8:a0'),(222,2,'2019-12-14 03:29:42','ermita','cartagena','333','73b5jv','MacOS','oxoHotel-Ermita','F0:C3:71:51:C2:A4','172.16.100.107','10.10.0.92','b4:79:c8:2a:0d:10'),(223,2,'2019-12-14 03:51:23','tyson','manering','226','oxohotel12','MacOS','oxoHotel-Ermita','00:56:CD:38:68:95','172.16.100.170','10.10.0.89','94:bf:c4:17:20:70'),(224,2,'2019-12-14 04:16:52','tyson','manering','226','oxohotel12','Android','oxoHotel-Ermita','8C:F5:A3:7E:4C:E1','172.16.100.133','10.10.0.89','94:bf:c4:17:20:70'),(225,2,'2019-12-14 05:08:28','edgar','cuevas','325','oxohotel12','MacOS','oxoHotel-Ermita','34:A8:EB:BA:87:BC','172.16.100.160','10.10.0.93','b4:79:c8:29:e8:a0'),(226,2,'2019-12-14 05:58:36','elizabeth','chinchilla','303','oxohotel12','Android','oxoHotel-Ermita','38:37:8B:F6:AD:00','172.16.100.144','10.10.0.123','94:bf:c4:16:fd:70'),(227,2,'2019-12-14 06:18:29','carlotta','bellucci','312','oxohotel12','MacOS','oxoHotel-Ermita','C0:A6:00:C5:22:92','172.16.100.2','10.10.0.110','94:bf:c4:18:33:50'),(228,2,'2019-12-14 06:21:12','jos antonio','alvarado nieto','217','oxohotel12','Android','oxoHotel-Ermita','D4:62:EA:A0:31:64','172.16.100.128','10.10.0.71','1c:3a:60:31:5b:50'),(229,2,'2019-12-14 06:36:27','jos david','marquez infanzon','213','oxohotel12','Android','oxoHotel-Ermita','B0:EB:57:DB:42:62','172.16.100.129','10.10.0.73','b4:79:c8:29:6f:b0'),(230,2,'2019-12-14 07:07:32','diana','valencia','308','oxohotel12','MacOS','oxoHotel-Ermita','80:B0:3D:3D:3B:C5','172.16.100.69','10.10.0.93','b4:79:c8:29:e8:a0'),(231,2,'2019-12-14 07:24:13','luz','martinez','216','oxohotel12','Android','oxoHotel-Ermita','60:AB:67:83:A4:5F','172.16.100.16','10.10.0.93','b4:79:c8:29:e8:a0'),(232,2,'2019-12-14 11:31:43','elizabeth','chinchilla','303','oxohotel12','Android','oxoHotel-Ermita','14:5F:94:17:7C:D7','172.16.100.98','10.10.0.123','94:bf:c4:16:fd:70'),(233,2,'2019-12-15 05:09:24','javier fernando','ruiz calderon','305','oxohotel12','Android','oxoHotel-Ermita','F4:63:1F:8C:57:31','172.16.100.83','10.10.0.108','94:bf:c4:18:34:d0'),(234,2,'2019-12-15 05:49:42','tyson','manering','226','oxohotel12','Android','oxoHotel-Ermita','FC:42:03:E0:8D:B4','172.16.100.88','10.10.0.89','94:bf:c4:17:20:70'),(235,2,'2019-12-15 06:53:17','tyson','manering','226','oxohotel12','Windows','oxoHotel-Ermita','9C:B6:D0:DB:0E:D1','172.16.100.80','10.10.0.59','1c:3a:60:31:93:60'),(236,2,'2019-12-15 09:04:35','vylma esther','garcia aleman','312','oxohotel12','MacOS','oxoHotel-Ermita','9C:FC:01:49:D3:FC','172.16.100.42','10.10.0.110','94:bf:c4:18:33:50'),(237,2,'2019-12-15 09:06:47','vylma','garcia','312','oxohotel12','Android','oxoHotel-Ermita','A8:81:95:4D:54:D2','172.16.100.5','10.10.0.110','94:bf:c4:18:33:50'),(238,2,'2019-12-15 09:07:45','johana','zapata','121','oxohotel12','Windows','oxoHotel-Ermita','94:DB:C9:01:EE:F2','172.16.100.54','10.10.0.118','b4:79:c8:29:e2:f0'),(239,2,'2019-12-15 09:48:00','tyson','manering','226','oxohotel12','MacOS','oxoHotel-Ermita','B8:E8:56:20:D9:86','172.16.100.106','10.10.0.119','1c:3a:60:0d:aa:c0'),(240,2,'2019-12-15 01:45:00','tobias','mast','326','oxohotel12','Windows','oxoHotel-Ermita','F4:96:34:C0:08:B9','172.16.100.110','10.10.0.65','1c:3a:60:31:70:a0'),(241,2,'2019-12-15 05:05:21','wilmar','mendieta','219','oxohotel12','Android','oxoHotel-Ermita','7C:2E:DD:E1:72:CB','172.16.100.157','10.10.0.71','1c:3a:60:31:5b:50'),(242,2,'2019-12-15 05:40:28','tobias','mast','326','oxohotel12','Linux','oxoHotel-Ermita','74:75:48:65:C5:D6','172.16.100.101','10.10.0.119','1c:3a:60:0d:aa:c0'),(243,2,'2019-12-15 09:45:46','augusto','pineda porto','109','oxohotel12','Android','oxoHotel-Ermita','B8:57:D8:30:5E:C2','172.16.100.45','10.10.0.73','b4:79:c8:29:6f:b0'),(244,2,'2019-12-16 11:54:28','george','leschinsky','203','oxohotel12','MacOS','oxoHotel-Ermita','F8:E9:4E:6F:77:8A','172.16.100.122','10.10.0.73','b4:79:c8:29:6f:b0'),(245,2,'2019-12-16 12:04:28','george','leschinsky','203','oxohotel12','MacOS','oxoHotel-Ermita','DC:D3:A2:D3:A1:D1','172.16.100.29','10.10.0.85','1c:3a:60:3a:5c:00'),(246,2,'2019-12-16 12:04:48','george','leschinsky','203','oxohotel12','MacOS','oxoHotel-Ermita','88:B2:91:C1:DD:0A','172.16.100.95','10.10.0.83','1c:3a:60:31:5b:40'),(247,2,'2019-12-16 12:24:45','george','leschinsky','203','oxohotel12','Android','oxoHotel-Ermita','0E:E7:B2:EF:62:7B','172.16.100.51','10.10.0.85','1c:3a:60:3a:5c:00'),(248,2,'2019-12-16 12:34:09','binoy','cherian','333','73b5jv','MacOS','oxoHotel-Ermita','8C:86:1E:B5:65:A3','172.16.100.33','10.10.0.119','1c:3a:60:0d:aa:c0'),(249,2,'2019-12-16 12:36:01','richard','girdley','325','oxohotel12','Android','oxoHotel-Ermita','D4:4D:A4:50:C6:36','172.16.100.104','10.10.0.65','1c:3a:60:31:70:a0'),(250,2,'2019-12-16 12:54:28','binoy','cherian','120','oxohotel12','Windows','oxoHotel-Ermita','30:24:32:B9:5D:F7','172.16.100.150','10.10.0.82','1c:3a:60:31:1b:e0'),(251,2,'2019-12-16 02:54:23','julieth tatiana','jimenez obando','120','oxohotel12','Android','oxoHotel-Ermita','CC:46:4E:06:B3:6A','172.16.100.134','10.10.0.73','b4:79:c8:29:6f:b0'),(252,2,'2019-12-16 04:40:32','carmen','pedraza','226','oxohotel12','MacOS','oxoHotel-Ermita','D8:BB:2C:68:36:15','172.16.100.111','10.10.0.73','b4:79:c8:29:6f:b0'),(253,2,'2019-12-16 05:06:16','enis','lunan','320','oxohotel12','Android','oxoHotel-Ermita','E8:93:09:9B:F6:C4','172.16.100.187','10.10.0.73','b4:79:c8:29:6f:b0'),(254,2,'2019-12-16 05:32:23','marcos','salas','333','73b5jv','Android','oxoHotel-Ermita','48:3C:0C:5F:BA:60','172.16.100.131','10.10.0.118','b4:79:c8:29:e2:f0'),(255,2,'2019-12-16 05:45:41','ernesto','duran','226','oxohotel12','MacOS','oxoHotel-Ermita','98:00:C6:30:7C:A0','172.16.100.10','10.10.0.89','94:bf:c4:17:20:70'),(256,2,'2019-12-16 06:44:19','judith','paniza','221','oxohotel12','MacOS','oxoHotel-Ermita','44:00:10:5E:A1:85','172.16.100.185','10.10.0.102','b4:79:c8:2a:11:50'),(257,2,'2019-12-16 08:05:12','gretel','gerdts porto','231','oxohotel12','MacOS','oxoHotel-Ermita','C0:A6:00:3E:2C:A8','172.16.100.49','10.10.0.102','b4:79:c8:2a:11:50'),(258,2,'2019-12-16 08:23:40','louis','cadavid','322','oxohotel12','MacOS','oxoHotel-Ermita','BC:FE:D9:4F:A3:76','172.16.100.116','10.10.0.68','1c:3a:60:31:82:40'),(259,2,'2019-12-16 08:32:17','louis','cadavid','322','oxohotel12','Android','oxoHotel-Ermita','A0:CC:2B:93:55:B9','172.16.100.2','10.10.0.68','1c:3a:60:31:82:40'),(260,2,'2019-12-16 08:42:33','cindy','quintanilla','207','oxohotel12','MacOS','oxoHotel-Ermita','00:5B:94:28:A2:D4','172.16.100.48','10.10.0.73','b4:79:c8:29:6f:b0'),(261,2,'2019-12-16 09:31:50','ernesto','duran','111','oxohotel12','MacOS','oxoHotel-Ermita','14:D0:0D:58:D0:2E','172.16.100.190','10.10.0.102','b4:79:c8:2a:11:50'),(262,2,'2019-12-16 09:40:10','louis','cadavid','322','oxohotel12','MacOS','oxoHotel-Ermita','90:E1:7B:F4:0B:9B','172.16.100.86','10.10.0.68','1c:3a:60:31:82:40'),(263,2,'2019-12-16 10:30:20','george','leschinsky','203','oxohotel12','Windows','oxoHotel-Ermita','74:40:BB:09:05:EB','172.16.100.53','10.10.0.83','1c:3a:60:31:5b:40'),(264,2,'2019-12-16 11:20:56','louis','cadavid','322','oxohotel12','MacOS','oxoHotel-Ermita','AC:BC:32:C4:F5:8D','172.16.100.101','10.10.0.68','1c:3a:60:31:82:40'),(265,2,'2019-12-17 12:00:03','susana','martinez','242','oxohotel12','Windows','oxoHotel-Ermita','F8:34:41:3D:BC:10','172.16.100.171','10.10.0.107','94:bf:c4:16:0e:70'),(266,2,'2019-12-17 12:07:23','darling','perez','242','oxohotel12','Windows','oxoHotel-Ermita','74:DF:BF:11:29:4F','172.16.100.145','10.10.0.107','94:bf:c4:16:0e:70'),(267,2,'2019-12-17 12:08:37','susana','martinez','242','oxohotel12','Android','oxoHotel-Ermita','B0:6F:E0:B4:F8:D4','172.16.100.55','10.10.0.107','94:bf:c4:16:0e:70'),(268,2,'2019-12-17 02:56:46','jonatan','osorio','113','oxohotel12','MacOS','oxoHotel-Ermita','F8:27:93:36:C5:CD','172.16.100.157','10.10.0.73','b4:79:c8:29:6f:b0'),(269,2,'2019-12-17 04:58:02','don','bell','215','oxohotel12','MacOS','oxoHotel-Ermita','3C:2E:FF:E9:F3:0A','172.16.100.88','10.10.0.73','b4:79:c8:29:6f:b0'),(270,2,'2019-12-17 04:59:08','donald','bell','205','oxohotel12','MacOS','oxoHotel-Ermita','C0:9A:D0:4B:D9:99','172.16.100.9','10.10.0.73','b4:79:c8:29:6f:b0'),(271,2,'2019-12-17 04:59:17','harry','aubrey de lavenu','219','oxohotel12','MacOS','oxoHotel-Ermita','70:EF:00:97:7F:EB','172.16.100.158','10.10.0.73','b4:79:c8:29:6f:b0'),(272,2,'2019-12-17 06:03:18','katherine','sizov','316','73b5jv','MacOS','oxoHotel-Ermita','3C:2E:FF:0A:57:31','172.16.100.83','10.10.0.64','1c:3a:60:31:7c:10'),(273,2,'2019-12-17 09:57:37','jacob','jordan','316','73b5jv','MacOS','oxoHotel-Ermita','D0:2B:20:70:1C:FB','172.16.100.143','10.10.0.64','1c:3a:60:31:7c:10'),(274,2,'2019-12-17 10:00:18','don','bell','205','oxohotel12','MacOS','oxoHotel-Ermita','08:E6:89:F1:69:37','172.16.100.47','10.10.0.85','1c:3a:60:3a:5c:00'),(275,2,'2019-12-17 10:17:35','jeffrey','tanzola','119','oxohotel12','Android','oxoHotel-Ermita','A0:C9:A0:A5:97:F0','172.16.100.36','10.10.0.73','b4:79:c8:29:6f:b0'),(276,2,'2019-12-17 10:19:49','donald','bell','219','oxohotel12','MacOS','oxoHotel-Ermita','88:E9:FE:71:D1:4E','172.16.100.130','10.10.0.71','1c:3a:60:31:5b:50'),(277,2,'2019-12-17 11:02:29','jacob','jordan','316','73b5jv','MacOS','oxoHotel-Ermita','A0:99:9B:07:01:A9','172.16.100.175','10.10.0.64','1c:3a:60:31:7c:10'),(278,2,'2019-12-17 11:03:12','jeffrey','tanzola','119','oxohotel12','Android','oxoHotel-Ermita','90:06:28:AB:51:AF','172.16.100.105','10.10.0.82','1c:3a:60:31:1b:e0'),(279,2,'2019-12-17 11:55:15','ariana','torres','321','oxohotel12','MacOS','oxoHotel-Ermita','C0:A6:00:58:5D:16','172.16.100.12','10.10.0.73','b4:79:c8:29:6f:b0'),(280,2,'2019-12-18 02:28:52','argenis','contreras','120','oxohotel12','MacOS','oxoHotel-Ermita','30:D9:D9:EE:F6:D1','172.16.100.35','10.10.0.73','b4:79:c8:29:6f:b0'),(281,2,'2019-12-18 02:41:02','argenis','contreras','119','oxohotel12','MacOS','oxoHotel-Ermita','88:64:40:3C:29:13','172.16.100.144','10.10.0.82','1c:3a:60:31:1b:e0'),(282,2,'2019-12-18 03:14:36','katherin','sizov','316','73b5jv','Windows','oxoHotel-Ermita','48:A4:72:2B:DE:82','172.16.100.125','10.10.0.64','1c:3a:60:31:7c:10'),(283,2,'2019-12-18 06:45:36','daniel','perez','333','73b5jv','Android','oxoHotel-Ermita','50:C8:E5:9D:F7:7B','172.16.100.70','10.10.0.73','b4:79:c8:29:6f:b0'),(284,2,'2019-12-18 07:12:23','susana','lopez','226','oxohotel12','Android','oxoHotel-Ermita','24:46:C8:06:E4:CA','172.16.100.55','10.10.0.73','b4:79:c8:29:6f:b0'),(285,2,'2019-12-18 07:12:27','maria cecilia','montero','226','oxohotel12','MacOS','oxoHotel-Ermita','14:C2:13:A7:A6:F9','172.16.100.112','10.10.0.73','b4:79:c8:29:6f:b0'),(286,2,'2019-12-18 08:35:26','anamaria','velez','108','oxohotel12','MacOS','oxoHotel-Ermita','64:70:33:A1:83:56','172.16.100.11','10.10.0.73','b4:79:c8:29:6f:b0'),(287,2,'2019-12-18 08:42:55','gabriela','puente','108','oxohotel12','MacOS','oxoHotel-Ermita','58:6B:14:68:C6:63','172.16.100.81','10.10.0.73','b4:79:c8:29:6f:b0'),(288,2,'2019-12-18 09:06:34','emilio','yidios','108','oxohotel12','MacOS','oxoHotel-Ermita','CC:D2:81:46:7B:6D','172.16.100.117','10.10.0.73','b4:79:c8:29:6f:b0'),(289,2,'2019-12-18 10:15:49','manpreet','suri','302','oxohotel12','MacOS','oxoHotel-Ermita','38:89:2C:47:E3:AE','172.16.100.48','10.10.0.62','1c:3a:60:31:27:50'),(290,2,'2019-12-18 10:25:05','manpreet','suri','320','oxohotel12','Android','oxoHotel-Ermita','B0:72:BF:5A:68:BA','172.16.100.146','10.10.0.62','1c:3a:60:31:27:50'),(291,2,'2019-12-19 12:00:18','maria cecilia','montero','226','oxohotel12','MacOS','oxoHotel-Ermita','CC:78:5F:ED:FE:EB','172.16.100.19','10.10.0.89','94:bf:c4:17:20:70'),(292,2,'2019-12-19 12:19:57','angel felipe','jimenez silva','122','oxohotel12','Android','oxoHotel-Ermita','A8:DB:03:56:21:10','172.16.100.133','10.10.0.73','b4:79:c8:29:6f:b0'),(293,2,'2019-12-19 12:23:31','cesar','jimenez','121','oxohotel12','Android','oxoHotel-Ermita','8C:45:00:0B:76:45','172.16.100.103','10.10.0.75','94:bf:c4:17:1f:f0'),(294,2,'2019-12-19 12:25:27','cesar','jimenez','121','oxohotel12','Android','oxoHotel-Ermita','88:29:9C:07:F7:CB','172.16.100.170','10.10.0.75','94:bf:c4:17:1f:f0'),(295,2,'2019-12-19 08:12:06','jose','feria','119','oxohotel12','Android','oxoHotel-Ermita','20:32:6C:67:4B:E8','172.16.100.22','10.10.0.73','b4:79:c8:29:6f:b0'),(296,2,'2019-12-19 09:16:30','manpreet','suri','320','oxohotel12','MacOS','oxoHotel-Ermita','7C:A1:AE:C1:A7:FB','172.16.100.131','10.10.0.118','b4:79:c8:29:e2:f0'),(297,2,'2019-12-19 12:05:15','jago','martinez','112','oxohotel12','Android','oxoHotel-Ermita','8C:E5:C0:3C:16:F1','172.16.100.151','10.10.0.109','94:bf:c4:16:b8:b0'),(298,2,'2019-12-19 12:17:19','edward','chu','120','oxohotel12','Android','oxoHotel-Ermita','44:91:60:EA:7C:89','172.16.100.174','10.10.0.82','1c:3a:60:31:1b:e0'),(299,2,'2019-12-19 12:56:32','edward','chu','120','oxohotel12','Android','oxoHotel-Ermita','20:D3:90:EC:E7:67','172.16.100.113','10.10.0.82','1c:3a:60:31:1b:e0'),(300,2,'2019-12-19 02:00:44','geoff','langford','220','oxohotel12','MacOS','oxoHotel-Ermita','AC:E4:B5:A1:9D:75','172.16.100.49','10.10.0.70','94:bf:c4:17:21:50'),(301,2,'2019-12-19 02:00:59','geoff','langford','220','oxohotel12','MacOS','oxoHotel-Ermita','F4:5C:89:A0:C4:C9','172.16.100.190','10.10.0.70','94:bf:c4:17:21:50'),(302,2,'2019-12-19 03:55:24','simin','yu','311','oxohotel12','MacOS','oxoHotel-Ermita','00:5B:94:4F:4D:49','172.16.100.59','10.10.0.110','94:bf:c4:18:33:50'),(303,2,'2019-12-19 03:56:25','simin','yu','311','oxohotel12','MacOS','oxoHotel-Ermita','C0:9A:D0:51:4C:CD','172.16.100.108','10.10.0.110','94:bf:c4:18:33:50'),(304,2,'2019-12-19 04:00:30','simin','yu','311','oxohotel12','MacOS','oxoHotel-Ermita','44:18:FD:7D:78:45','172.16.100.129','10.10.0.110','94:bf:c4:18:33:50'),(305,2,'2019-12-19 04:11:48','adriana','pena','125','oxohotel12','MacOS','oxoHotel-Ermita','74:B5:87:09:5C:21','172.16.100.56','10.10.0.73','b4:79:c8:29:6f:b0'),(306,2,'2019-12-19 04:14:15','carlos','quesada','217','oxohotel12','Android','oxoHotel-Ermita','60:1D:91:48:C0:3F','172.16.100.29','10.10.0.102','b4:79:c8:2a:11:50'),(307,2,'2019-12-19 05:36:51','carlos','garcia','205','oxohotel12','MacOS','oxoHotel-Ermita','DC:08:0F:7A:FD:22','172.16.100.139','10.10.0.85','1c:3a:60:3a:5c:00'),(308,2,'2019-12-19 06:25:21','glynis','webster','220','oxohotel12','MacOS','oxoHotel-Ermita','F8:2D:7C:18:C2:E6','172.16.100.2','10.10.0.70','94:bf:c4:17:21:50'),(309,2,'2019-12-19 08:12:47','shyna','zhang','302','oxohotel12','MacOS','oxoHotel-Ermita','70:70:0D:D4:87:BB','172.16.100.94','10.10.0.74','94:bf:c4:18:38:20'),(310,2,'2019-12-19 10:42:40','shyna','zhang','302','oxohotel12','Windows','oxoHotel-Ermita','F8:34:41:00:18:97','172.16.100.24','10.10.0.60','1c:3a:60:31:58:50'),(311,2,'2019-12-20 08:21:04','oxohotel','ermita','102','oxohotel12','MacOS','oxoHotel-Ermita','38:F9:D3:3A:BF:FB','172.16.100.111','10.10.0.102','b4:79:c8:2a:11:50'),(312,2,'2019-12-20 08:22:28','susana','caldas','102','oxohotel12','MacOS','oxoHotel-Ermita','38:F9:D3:D5:2D:49','172.16.100.23','10.10.0.102','b4:79:c8:2a:11:50'),(313,2,'2019-12-20 11:03:15','julio','herrera','325','oxohotel12','MacOS','oxoHotel-Ermita','C8:3C:85:27:45:78','172.16.100.184','10.10.0.73','b4:79:c8:29:6f:b0'),(314,2,'2019-12-20 11:22:54','julio','herrera','325','oxohotel12','Windows','oxoHotel-Ermita','50:76:AF:9B:02:76','172.16.100.105','10.10.0.65','1c:3a:60:31:70:a0'),(315,2,'2019-12-20 11:38:24','madeline','timmmins','305','oxohotel12','Windows','oxoHotel-Ermita','F0:1D:BC:8A:35:5C','172.16.100.99','10.10.0.102','b4:79:c8:2a:11:50'),(316,2,'2019-12-20 11:55:07','felipe','gedeon','338','oxohotel12','MacOS','oxoHotel-Ermita','F0:24:75:69:F4:87','172.16.100.131','10.10.0.119','1c:3a:60:0d:aa:c0'),(317,2,'2019-12-20 11:58:23','felipe','gedeon','338','oxohotel12','MacOS','oxoHotel-Ermita','38:F9:D3:35:91:A7','172.16.100.48','10.10.0.119','1c:3a:60:0d:aa:c0'),(318,2,'2019-12-20 12:03:03','julio','herrera','325','oxohotel12','MacOS','oxoHotel-Ermita','6C:72:E7:BA:8B:28','172.16.100.188','10.10.0.73','b4:79:c8:29:6f:b0'),(319,2,'2019-12-20 03:42:11','mac','steele','219','oxohotel12','Android','oxoHotel-Ermita','8C:45:00:21:FD:CC','172.16.100.85','10.10.0.71','1c:3a:60:31:5b:50'),(320,2,'2019-12-20 04:04:17','mac','steele','219','oxohotel12','MacOS','oxoHotel-Ermita','D4:61:DA:42:BF:6F','172.16.100.176','10.10.0.71','1c:3a:60:31:5b:50'),(321,2,'2019-12-20 04:06:25','geoff','langford','220','oxohotel12','MacOS','oxoHotel-Ermita','14:10:9F:9F:56:4A','172.16.100.138','10.10.0.102','b4:79:c8:2a:11:50'),(322,2,'2019-12-20 04:11:58','drake','williams','218','oxohotel12','Android','oxoHotel-Ermita','DA:80:EB:BB:6C:8E','172.16.100.44','10.10.0.70','94:bf:c4:17:21:50'),(323,2,'2019-12-20 04:13:21','carlos','garcia','205','oxohotel12','Android','oxoHotel-Ermita','EC:1F:72:C1:13:14','172.16.100.148','10.10.0.119','1c:3a:60:0d:aa:c0'),(324,2,'2019-12-20 04:14:41','edward','chu','120','oxohotel12','Android','oxoHotel-Ermita','00:9D:6B:38:CA:AC','172.16.100.165','10.10.0.73','b4:79:c8:29:6f:b0'),(325,2,'2019-12-20 05:07:14','taranna','rahman','108','oxohotel12','Android','oxoHotel-Ermita','A0:CC:2B:B9:CE:B7','172.16.100.80','10.10.0.101','94:bf:c4:16:ad:50'),(326,2,'2019-12-20 06:17:24','drake','williams','218','oxohotel12','Android','oxoHotel-Ermita','BA:98:32:D6:EC:A4','172.16.100.97','10.10.0.70','94:bf:c4:17:21:50'),(327,2,'2019-12-20 07:20:53','steve','herczeg','306','oxohotel12','MacOS','oxoHotel-Ermita','C0:B6:58:57:E2:EF','172.16.100.98','10.10.0.102','b4:79:c8:2a:11:50'),(328,2,'2019-12-20 07:21:45','jodi','herczeg','306','oxohotel12','MacOS','oxoHotel-Ermita','C8:3C:85:E7:7B:2D','172.16.100.89','10.10.0.102','b4:79:c8:2a:11:50'),(329,2,'2019-12-20 08:07:29','julio','herrera','325','oxohotel12','Windows','oxoHotel-Ermita','C2:96:C3:0E:3E:2B','172.16.100.107','10.10.0.65','1c:3a:60:31:70:a0'),(330,2,'2019-12-20 08:28:54','carlos','garcia','205','oxohotel12','Windows','oxoHotel-Ermita','00:F4:8D:BE:1C:89','172.16.100.14','10.10.0.85','1c:3a:60:3a:5c:00'),(331,2,'2019-12-20 08:48:42','madeline','timmins','305','oxohotel12','MacOS','oxoHotel-Ermita','B8:C1:11:09:31:A6','172.16.100.52','10.10.0.108','94:bf:c4:18:34:d0'),(332,2,'2019-12-20 09:26:27','drake','williams','218','oxohotel12','MacOS','oxoHotel-Ermita','F0:18:98:49:59:A3','172.16.100.5','10.10.0.70','94:bf:c4:17:21:50'),(333,2,'2019-12-20 09:36:17','laura','ling','115','oxohotel12','MacOS','oxoHotel-Ermita','70:3E:AC:1F:EF:6A','172.16.100.20','10.10.0.124','94:bf:c4:16:c7:70'),(334,2,'2019-12-20 09:43:57','shyna','zhang','302','oxohotel12','Linux','oxoHotel-Ermita','10:AE:60:66:62:84','172.16.100.126','10.10.0.60','1c:3a:60:31:58:50'),(335,2,'2019-12-20 10:50:50','laura','ling','115','oxohotel12','MacOS','oxoHotel-Ermita','D0:2B:20:7B:83:5E','172.16.100.77','10.10.0.73','b4:79:c8:29:6f:b0'),(336,2,'2019-12-20 11:05:15','matthew','gaydos','320','oxohotel12','MacOS','oxoHotel-Ermita','74:B5:87:3A:01:3E','172.16.100.191','10.10.0.63','94:bf:c4:17:2a:60'),(337,2,'2019-12-20 11:41:11','sarah','gaydos','317','oxohotel12','MacOS','oxoHotel-Ermita','FC:18:3C:22:EE:22','172.16.100.156','10.10.0.63','94:bf:c4:17:2a:60'),(338,2,'2019-12-21 01:05:44','matthew','gaydos','317','oxohotel12','MacOS','oxoHotel-Ermita','38:F9:D3:4C:72:DC','172.16.100.87','10.10.0.63','94:bf:c4:17:2a:60'),(339,2,'2019-12-21 03:12:12','hyungbin','yoo','126','oxohotel12','Android','oxoHotel-Ermita','A8:DB:03:E6:70:92','172.16.100.29','10.10.0.102','b4:79:c8:2a:11:50'),(340,2,'2019-12-21 03:55:58','christopher','cabaldon','120','oxohotel12','MacOS','oxoHotel-Ermita','04:52:F3:E3:CE:A6','172.16.100.117','10.10.0.82','1c:3a:60:31:1b:e0'),(341,2,'2019-12-21 04:18:42','christopher','cabaldon','120','oxohotel12','MacOS','oxoHotel-Ermita','14:D0:0D:DF:29:AE','172.16.100.62','10.10.0.82','1c:3a:60:31:1b:e0'),(342,2,'2019-12-21 04:51:10','hyungbin','yoo','126','oxohotel12','Windows','oxoHotel-Ermita','00:C2:C6:BF:43:39','172.16.100.182','10.10.0.61','94:bf:c4:18:37:d0'),(343,2,'2019-12-21 05:00:43','pedro','tapia','220','oxohotel12','MacOS','oxoHotel-Ermita','94:B0:1F:2B:BF:6D','172.16.100.101','10.10.0.102','b4:79:c8:2a:11:50'),(344,2,'2019-12-22 01:10:56','byron brewernational','director','323','oxohotel12','Windows','oxoHotel-Ermita','D0:7E:35:0F:A9:F1','172.16.100.170','10.10.0.66','1c:3a:60:31:72:70'),(345,2,'2019-12-22 01:13:47','byron','brewer','323','oxohotel12','Windows','oxoHotel-Ermita','D0:7E:35:0F:A9:F1','172.16.100.170','10.10.0.66','1c:3a:60:31:72:70'),(346,2,'2019-12-22 03:14:36','steven','morris','221','oxohotel12','MacOS','oxoHotel-Ermita','8C:85:90:04:EB:52','172.16.100.190','10.10.0.72','1c:3a:60:31:72:50'),(347,2,'2019-12-22 03:16:42','steven','morris','221','oxohotel12','MacOS','oxoHotel-Ermita','C4:98:80:84:F8:7E','172.16.100.137','10.10.0.72','1c:3a:60:31:72:50'),(348,2,'2019-12-22 03:20:00','steven','morris','221','oxohotel12','MacOS','oxoHotel-Ermita','F0:C3:71:21:1C:2A','172.16.100.73','10.10.0.72','1c:3a:60:31:72:50'),(349,2,'2019-12-22 04:23:02','dawn','gee','319','oxohotel12','Android','oxoHotel-Ermita','B8:D7:AF:65:B5:5C','172.16.100.153','10.10.0.73','b4:79:c8:29:6f:b0'),(350,2,'2019-12-22 04:35:56','jessica','ehlin','206','oxohotel12','MacOS','oxoHotel-Ermita','D0:C5:F3:CC:7C:BF','172.16.100.188','10.10.0.81','94:bf:c4:17:05:e0'),(351,2,'2019-12-22 04:36:45','jessica','ehlin','206','oxohotel12','MacOS','oxoHotel-Ermita','4C:57:CA:DD:28:90','172.16.100.110','10.10.0.81','94:bf:c4:17:05:e0'),(352,2,'2019-12-22 05:07:03','jessica','ehlin','206','oxohotel12','MacOS','oxoHotel-Ermita','C0:B6:58:44:9B:9E','172.16.100.189','10.10.0.119','1c:3a:60:0d:aa:c0'),(353,2,'2019-12-22 05:32:57','moises','djaddah','322','oxohotel12','MacOS','oxoHotel-Ermita','14:D0:0D:A1:18:60','172.16.100.100','10.10.0.58','1c:3a:60:31:42:b0'),(354,2,'2019-12-22 05:32:57','estrella','jafif','308','oxohotel12','MacOS','oxoHotel-Ermita','74:B5:87:3B:A0:87','172.16.100.135','10.10.0.58','1c:3a:60:31:42:b0'),(355,2,'2019-12-22 10:16:07','elaine','shapiro','220','oxohotel12','MacOS','oxoHotel-Ermita','C4:98:80:1B:AF:7A','172.16.100.134','10.10.0.70','94:bf:c4:17:21:50'),(356,2,'2019-12-22 10:22:30','sebastian','buitrago','235','oxohotel12','MacOS','oxoHotel-Ermita','84:41:67:C4:E4:17','172.16.100.154','10.10.0.114','94:bf:c4:18:1c:70'),(357,2,'2019-12-23 12:10:54','eduardo','metral','305','oxohotel12','MacOS','oxoHotel-Ermita','9C:F4:8E:4B:AC:BA','172.16.100.174','10.10.0.108','94:bf:c4:18:34:d0'),(358,2,'2019-12-23 02:37:23','madeleine','meeker','110','oxohotel12','MacOS','oxoHotel-Ermita','CC:2D:B7:A4:1F:F8','172.16.100.124','10.10.0.101','94:bf:c4:16:ad:50'),(359,2,'2019-12-23 02:44:40','andrea','meeker','111','oxohotel12','MacOS','oxoHotel-Ermita','F8:FF:C2:D6:7C:1D','172.16.100.114','10.10.0.99','1c:3a:60:31:58:e0'),(360,2,'2019-12-23 02:46:12','andrea','meeker','111','oxohotel12','MacOS','oxoHotel-Ermita','F8:FF:C2:D6:7C:1D','172.16.100.114','10.10.0.99','1c:3a:60:31:58:e0'),(361,2,'2019-12-23 02:57:48','nicolas','emiliani','219','oxohotel12','MacOS','oxoHotel-Ermita','F0:99:B6:58:8E:5E','172.16.100.116','10.10.0.71','1c:3a:60:31:5b:50'),(362,2,'2019-12-23 02:58:01','nicolas','emiliani','219','oxohotel12','MacOS','oxoHotel-Ermita','D8:8F:76:A2:C3:E0','172.16.100.40','10.10.0.71','1c:3a:60:31:5b:50'),(363,2,'2019-12-24 09:41:37','bruce','baird','303','oxohotel12','Windows','oxoHotel-Ermita','9C:B6:D0:FF:EF:11','172.16.100.176','10.10.0.108','94:bf:c4:18:34:d0'),(364,2,'2019-12-24 01:48:51','alicia','barrett','216','oxohotel12','MacOS','oxoHotel-Ermita','88:64:40:7D:61:25','172.16.100.175','10.10.0.80','94:bf:c4:16:f9:80'),(365,2,'2019-12-24 02:19:33','alicia','barret','216','oxohotel12','MacOS','oxoHotel-Ermita','74:B5:87:45:81:5E','172.16.100.152','10.10.0.119','1c:3a:60:0d:aa:c0'),(366,2,'2019-12-24 03:48:09','dan','spradling','215','oxohotel12','MacOS','oxoHotel-Ermita','E0:33:8E:C1:62:D5','172.16.100.49','10.10.0.80','94:bf:c4:16:f9:80'),(367,2,'2019-12-24 04:13:43','sunjay','gorawara','302','oxohotel12','MacOS','oxoHotel-Ermita','54:33:CB:AB:E7:CA','172.16.100.127','10.10.0.73','b4:79:c8:29:6f:b0'),(368,2,'2019-12-25 02:44:13','ludden','michael','312','oxohotel12','Android','oxoHotel-Ermita','DE:C3:74:18:95:24','172.16.100.121','10.10.0.110','94:bf:c4:18:33:50'),(369,2,'2019-12-25 02:48:07','michael','ludden','312','oxohotel12','Android','oxoHotel-Ermita','B6:D6:09:37:3E:BB','172.16.100.41','10.10.0.110','94:bf:c4:18:33:50'),(370,2,'2019-12-25 02:48:11','michael','ludden','312','oxohotel12','Android','oxoHotel-Ermita','DE:C3:74:18:95:24','172.16.100.121','10.10.0.110','94:bf:c4:18:33:50'),(371,2,'2019-12-28 12:46:29','justen','coleman','224','oxohotel12','MacOS','oxoHotel-Ermita','B8:5D:0A:A0:54:54','172.16.100.234','10.10.0.59','1c:3a:60:31:93:60'),(372,2,'2019-12-30 03:49:28','perri','blitz','319','oxohotel12','MacOS','oxoHotel-Ermita','EC:2C:E2:10:B0:79','172.16.100.168','10.10.0.102','b4:79:c8:2a:11:50'),(373,2,'2019-12-30 07:56:06','becky','lee','323','oxohotel12','MacOS','oxoHotel-Ermita','14:C2:13:D5:FF:80','172.16.101.98','10.10.0.66','1c:3a:60:31:72:70'),(374,2,'2020-01-01 01:57:50','ingrid','cordon','121','oxohotel12','MacOS','oxoHotel-Ermita','AC:88:FD:65:23:09','172.16.100.236','10.10.0.102','b4:79:c8:2a:11:50'),(375,2,'2020-01-07 10:59:37','javier','solis','302','oxohotel12','Windows','Test_R','Mactest12354','10.165.0.16','','60d02c2d054f3');
/*!40000 ALTER TABLE `portal_cautivo_habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portal_cautivo_formulario`
--

DROP TABLE IF EXISTS `portal_cautivo_formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portal_cautivo_formulario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(250) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `edad` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `ssid` varchar(250) DEFAULT NULL,
  `mac_cliente` varchar(250) DEFAULT NULL,
  `ip_cliente` varchar(250) DEFAULT NULL,
  `ip_ap` varchar(250) DEFAULT NULL,
  `mac_ap` varchar(250) DEFAULT NULL,
  `id_pais` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portal_cautivo_formulario`
--

LOCK TABLES `portal_cautivo_formulario` WRITE;
/*!40000 ALTER TABLE `portal_cautivo_formulario` DISABLE KEYS */;
INSERT INTO `portal_cautivo_formulario` VALUES (69,1,'2019-11-28 03:14:26','Diego','Barreiro','tekoflow666@hotmail.com','29','3124542739','Hombre','Android','oxoHotel_Ermita','04:F1:28:28:9B:50','10.156.10.139','10.10.0.76','1c:3a:60:31:95:10','40'),(70,1,'2019-11-28 03:55:38','Wendy','Rhenals','pao.Rhenals@Hotmail.com','26','3004062741','Mujer','Android','oxoHotel_Ermita','30:74:96:1F:98:31','10.156.10.216','10.10.0.57','1c:3a:60:31:16:20','40'),(71,1,'2019-11-28 04:02:00','franks','orostegui','forostegui@gseit.com.co','32','3156726860','Hombre','Android','oxoHotel_Ermita','18:F0:E4:E2:11:55','10.156.10.180','10.10.0.76','1c:3a:60:31:95:10','3'),(72,1,'2019-11-28 04:55:47','JOSE','FERIA','hkermita@oxohotel.com','31','+13107862583','Hombre','Android','oxoHotel_Ermita','20:32:6C:67:4B:E8','10.156.10.110','10.10.0.76','1c:3a:60:31:95:10','40'),(73,1,'2019-11-28 06:03:40','Roberto','Gedeon','roberto.gedeon@gmail.com','26','3165284370','Hombre','MacOS','oxoHotel_Ermita','8C:85:90:BE:63:27','10.156.10.231','10.10.0.93','b4:79:c8:29:e8:a0','40'),(74,1,'2019-11-28 06:09:19','Juan','Villa','jvilla@ora.com','62','3012243521','Hombre','MacOS','oxoHotel_Ermita','84:41:67:C1:17:CE','10.156.10.181','10.10.0.62','1c:3a:60:31:27:50','60'),(75,1,'2019-11-28 06:19:49','Diego','Barreiro','tekoflow666@hotmail.com','29','3124542739','Hombre','Windows','oxoHotel_Ermita','D4:25:8B:A6:27:6E','10.156.10.235','10.10.0.71','1c:3a:60:31:5b:50','40'),(76,1,'2019-11-28 06:23:13','Harold Leonardo','Riano Quintero','haroldria@gmail.com','35','3103443452','Hombre','Android','oxoHotel_Ermita','A8:C8:3A:23:97:84','10.156.10.130','10.10.0.66','1c:3a:60:31:72:70','40'),(77,1,'2019-11-28 07:41:36','Omar','Sanchez','gomar8102@hotmail.com','38','1310572829','Hombre','Windows','oxoHotel_Ermita','94:B8:6D:F6:A7:07','10.156.10.134','10.10.0.66','1c:3a:60:31:72:70','40'),(78,1,'2019-11-29 07:28:13','Maria','Asprilla','mariax944@gmail.com','25','3024356487','Mujer','Android','oxoHotel_Ermita','BC:FF:EB:B9:39:11','10.156.10.209','10.10.0.88','94:bf:c4:16:31:40','40'),(79,1,'2019-11-29 08:52:08','Ricardo','Gonzalez','ricardogr7@gmail.com','41','3162344021','Hombre','Android','oxoHotel_Ermita','CC:9F:7A:AA:4B:79','10.156.10.196','10.10.0.70','94:bf:c4:17:21:50','40'),(80,1,'2019-11-29 08:57:52','Diego hernan','Amaya','diegoher1971@hotmail.com','48','3177731458','Hombre','Android','oxoHotel_Ermita','8C:E5:C0:2E:55:1D','10.156.10.240','10.10.0.71','1c:3a:60:31:5b:50','40'),(81,1,'2019-11-29 10:03:44','julio','marichales','bstcjm@gmail.com','24','3164431865','Hombre','MacOS','oxoHotel_Ermita','60:30:D4:60:43:AE','10.156.10.242','10.10.0.76','1c:3a:60:31:95:10','40'),(82,1,'2019-11-29 10:13:17','Kelly','Cervantes','kandj2010forever@hormail.com','29','3016373099','Mujer','Android','oxoHotel_Ermita','F0:8A:76:3B:D7:86','10.156.10.168','10.10.0.82','1c:3a:60:31:1b:e0','40'),(83,1,'2019-11-29 10:54:57','Alexander','Tordecilla','alex_tor_1791@hotmail.com','28','3012729852','Hombre','Android','oxoHotel_Ermita','90:73:5A:44:1D:8B','10.156.10.221','10.10.0.70','94:bf:c4:17:21:50','40'),(84,1,'2019-11-29 10:57:44','Janner humberto','Hernandez moreno','hanner0819@hotmail.com','41','3182936159','Hombre','Android','oxoHotel_Ermita','60:A4:D0:E1:77:BC','10.156.10.192','10.10.0.88','94:bf:c4:16:31:40','40'),(85,1,'2019-11-29 11:29:25','Julio','Marichales','bstcjm@gmail.com','24','3164431865','Hombre','Android','oxoHotel_Ermita','84:B5:41:A9:3B:0A','10.56.10.19','10.10.0.54','94:bf:c4:17:1b:80','40'),(86,1,'2019-11-29 11:33:31','Deimer','Estrada','destesju@gmail.com','27','1047443555','Hombre','Android','oxoHotel_Ermita','48:27:EA:B0:69:FA','10.56.10.17','10.10.0.54','94:bf:c4:17:1b:80','40'),(87,1,'2019-11-29 11:42:18','Ivan Andres','Arrieta Alvarez','arrietaalvarezivanandres@gmail.com','25','3013937394','Hombre','Android','oxoHotel_Ermita','F4:F5:24:8B:B9:83','172.16.100.16','10.10.0.79','1c:3a:60:31:35:50','40'),(88,1,'2019-11-29 11:42:42','Livan Andres','Franco Nunez','lifranco_25@hotmail.com','22','3122649145','Hombre','Android','oxoHotel_Ermita','AC:07:5F:B3:E1:C4','172.16.100.17','10.10.0.79','1c:3a:60:31:35:50','40'),(89,1,'2019-11-29 12:20:13','Guillermo','Zapata','gzapatas@gmail.com','36','3182821957','Hombre','MacOS','oxoHotel_Ermita','F0:18:98:D0:CF:70','172.16.100.23','10.10.0.92','b4:79:c8:2a:0d:10','40'),(90,1,'2019-11-29 12:49:53','Yordys','Franco','yhordys_1201@hotmail.com','24','3116815210','Hombre','Android','oxoHotel_Ermita','2C:0E:3D:73:85:30','172.16.100.26','10.10.0.54','94:bf:c4:17:1b:80','40'),(91,1,'2019-11-29 01:36:47','Victor','Grimaldo','noreply@noreply.com','32','4773715060','Hombre','Android','oxoHotel_Ermita','28:16:7F:E8:D1:61','172.16.100.31','10.10.0.80','94:bf:c4:16:f9:80','117'),(93,1,'2019-11-29 02:24:11','Jago','Martinez','ticermita@oxohotel.com','33','3008332721','Hombre','Android','oxoHotel_Ermita','8C:E5:C0:3C:16:F1','172.16.200.53','10.10.0.93','b4:79:c8:29:e8:a0','40'),(94,1,'2019-11-29 02:44:56','Omar','Sanchez','gomar8104@hotmail.com','38','3105728228','Hombre','Android','oxoHotel_Ermita','98:9C:57:A6:98:CB','10.56.10.4','10.10.0.54','94:bf:c4:17:1b:80','40'),(95,1,'2019-11-29 04:38:33','Kevin Alejandro','Gasca de la Rosa','kevin9513@hotmail.com','24','3186036018','Hombre','MacOS','oxoHotel_Ermita','B8:C1:11:85:DE:F1','172.16.200.64','10.10.0.92','b4:79:c8:2a:0d:10','40'),(96,1,'2019-11-29 04:41:11','Jago','Martinez','jg_martinezc@hotmail.com','33','3008332721','Hombre','Android','oxoHotel_Ermita','80:58:F8:14:E6:F0','172.16.200.25','10.10.0.76','1c:3a:60:31:95:10','40'),(97,1,'2019-11-29 04:42:38','Jhon','sanchez','sanchezjhon362@gmail.com','46','3126489969','Hombre','Android','oxoHotel_Ermita','94:27:90:2F:32:95','172.16.200.71','10.10.0.92','b4:79:c8:2a:0d:10','40'),(98,1,'2019-11-29 04:46:28','Maria Alejandra','Guevara Sierra','guevarasierramariaalejandra@gmail.com','20','3013777584','Mujer','Android','oxoHotel_Ermita','D0:FF:98:D9:72:61','172.16.200.67','10.10.0.92','b4:79:c8:2a:0d:10','40'),(99,1,'2019-11-29 09:48:50','Melissa','Londono','londonomelissa@gmail.com','34','3157262896','Mujer','MacOS','oxoHotel_Ermita','F8:FF:C2:F2:A4:61','10.56.10.41','10.10.0.82','1c:3a:60:31:1b:e0','40'),(100,1,'2019-11-29 10:56:58','Cristina','Uribe vejarano','cristinauribevejarano@hotmail.com','65','3102314533','Mujer','MacOS','oxoHotel_Ermita','88:66:A5:20:DD:79','10.56.10.3','10.10.0.70','94:bf:c4:17:21:50','40'),(101,1,'2019-11-30 04:49:16','Wilder','Castro Gonzalez','greywil181118@hotmail.com','30','3007214234','Hombre','Android','oxoHotel_Ermita','DC:BF:E9:83:27:4E','172.16.100.25','10.10.0.92','b4:79:c8:2a:0d:10','40'),(102,1,'2019-11-30 06:26:52','Juan','Romero','jromerolo@hotmail.com','42','3188187677','Hombre','Android','oxoHotel_Ermita','6C:C7:EC:47:44:5B','172.16.100.24','10.10.0.92','b4:79:c8:2a:0d:10','40'),(103,1,'2019-12-02 09:01:52','Melissa','Baloco Silgado','melibaloco97@gmail.com','22','3024382827','Mujer','Android','oxoHotel_Ermita','00:B5:D0:59:E6:C1','172.16.100.16','10.10.0.73','b4:79:c8:29:6f:b0','40'),(104,1,'2019-12-02 09:16:29','Hilda Rosa','Lozano Julio','mfrontermita@oxohotel.com','30','3126610316','Mujer','Android','oxoHotel_Ermita','D4:62:EA:3C:3D:8F','172.16.100.15','10.10.0.73','b4:79:c8:29:6f:b0','40'),(105,1,'2019-12-02 09:17:52','Osvaldo','Ortega','osvaldosd_1011@hotmail.com','33','3146203038','Hombre','Android','oxoHotel_Ermita','30:6A:85:A1:35:02','172.16.100.10','10.10.0.73','b4:79:c8:29:6f:b0','40'),(106,1,'2019-12-02 09:40:43','Juan','Romero','jromero@oxohotel.com','42','3188187677','Hombre','Windows','oxoHotel_Ermita','DC:FB:48:5D:FE:94','172.16.100.23','10.10.0.92','b4:79:c8:2a:0d:10','40'),(107,1,'2019-12-02 11:56:48','CRISTIAN','PERILLA','crisperillaserratto@gmail.com','25','3105839887','Hombre','Windows','oxoHotel_Ermita','74:DE:2B:36:48:18','172.16.100.3','10.10.0.65','1c:3a:60:31:70:a0','40'),(108,1,'2019-12-02 09:07:51','pepita','perez','pepito@oxo.com','24','3059838383','Otro','MacOS','oxoHotel_Ermita','F0:18:98:07:F5:29','172.16.100.29','10.10.0.71','1c:3a:60:31:5b:50','34'),(109,1,'2019-12-02 09:54:07','Sebastin','Moscoso','smoscoso44@gmail.com','46','3136237982','Hombre','Android','oxoHotel_Ermita','8C:B8:4A:47:9B:6D','172.16.100.28','10.10.0.70','94:bf:c4:17:21:50','40'),(110,1,'2019-12-03 08:31:38','Kelly','Suarez','comprasermita@oxohotel.com','30','1047387974','Mujer','Android','oxoHotel_Ermita','54:FC:F0:2A:30:93','172.16.100.7','10.10.0.102','b4:79:c8:2a:11:50','40'),(111,1,'2019-12-03 09:26:04','EDWARD JAVIER','CATOLICO ESPINEL','edwardcatolico@hotmail.com','44','3144069602','Hombre','Android','oxoHotel_Ermita','3C:F7:A4:43:1A:B5','172.16.100.49','10.10.0.73','b4:79:c8:29:6f:b0','40'),(112,1,'2019-12-03 09:56:13','Wilmer','Acosta Bejarano','wilmeracosta342@gmal.com','40','3128323300','Hombre','Android','oxoHotel_Ermita','0C:8F:FF:A2:DA:8A','172.16.100.51','10.10.0.113','94:bf:c4:16:20:a0','40'),(113,1,'2019-12-03 10:04:53','Wilmer','Villalba','wilmerchiquillo@gmail.com','30','1047399837','Hombre','Android','oxoHotel_Ermita','88:BF:E4:88:3F:C0','172.16.100.48','10.10.0.60','1c:3a:60:31:58:50','40'),(114,1,'2019-12-03 10:32:02','Arley','Arevalo Smith','arleyarevalosmith@gmail.com','54','3217551452','Hombre','Android','oxoHotel_Ermita','88:10:8F:56:D1:7B','172.16.100.53','10.10.0.113','94:bf:c4:16:20:a0','40'),(115,1,'2019-12-03 11:05:13','Jose','Miranda','jmirandabuelvas@gmail.com','22','3123178059','Hombre','Android','oxoHotel_Ermita','BC:FF:EB:E3:7E:1B','172.16.100.56','10.10.0.113','94:bf:c4:16:20:a0','40'),(116,1,'2019-12-03 11:06:45','Adaulfo','Miranda','adaulfo.m@gmail.com','43','3052371888','Hombre','Android','oxoHotel_Ermita','A4:6C:F1:A1:2B:BD','172.16.100.25','10.10.0.113','94:bf:c4:16:20:a0','40'),(117,1,'2019-12-03 02:25:56','Gladys paola','Perez Castilla','paolacastilla2704@hotmail.com','24','3108331809','Mujer','Android','oxoHotel_Ermita','6C:00:6B:79:68:09','172.16.100.30','10.10.0.103','94:bf:c4:17:1f:30','40'),(118,1,'2019-12-03 03:49:04','Dioritte','Herrera','doris.ieoga@gmail.com','20','3137972844','Mujer','Android','oxoHotel_Ermita','34:79:16:D0:F0:C8','172.16.100.66','10.10.0.114','94:bf:c4:18:1c:70','40'),(119,1,'2019-12-03 11:07:30','EDWARD JAVIER','CATOLICO ESPINEL','edwardcatolico@hotmail.com','44','3144069602','Hombre','MacOS','oxoHotel_Ermita','C8:E0:EB:5F:D3:62','172.16.100.3','10.10.0.71','1c:3a:60:31:5b:50','40'),(120,1,'2019-12-04 12:36:24','Deivis','Lambis','deivixdlam@gmail.com','20','3144252258','Hombre','Android','oxoHotel_Ermita','B0:EB:57:04:5B:CF','172.16.100.55','10.10.0.73','b4:79:c8:29:6f:b0','40');
/*!40000 ALTER TABLE `portal_cautivo_formulario` ENABLE KEYS */;
UNLOCK TABLES;

-- Volcando estructura para tabla portal_oxohotel.vouchers
DROP TABLE IF EXISTS `vouchers`;
CREATE TABLE IF NOT EXISTS `vouchers` (
  `id_voucher` int(11) NOT NULL AUTO_INCREMENT,
  `voucher` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `estado` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `id_campania` int(11) NOT NULL,
  `num_usos` int(11) NOT NULL,
  `total_num_usos` int(11) NOT NULL,
  `id_locacion` int(11) NOT NULL,
  PRIMARY KEY (`id_voucher`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla portal_oxohotel.vouchers: ~22 rows (aproximadamente)
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
REPLACE INTO `vouchers` (`id_voucher`, `voucher`, `fecha_inicio`, `fecha_fin`, `estado`, `id_campania`, `num_usos`, `total_num_usos`, `id_locacion`) VALUES
	(1,'jndkdg','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(2,'73b5jv','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(3,'o3n5dw','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(4,'pzxpur','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(5,'5x32jp','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(6,'b5sqka','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(7,'85ov9h','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(8,'hnjes4','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(9,'g5f2xm','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(10,'fsxru9','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(11,'gifv2n','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(12,'3jn3uc','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(13,'rvj7ff','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(14,'vphqpq','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(15,'j8kn2k','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(16,'kq6yzp','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(17,'8ayahs','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(18,'f287rg','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(19,'tkmhr5','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(20,'cgefdu','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(21,'g95scb','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(22,'nbg2o5','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(23,'zdi6b5','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(24,'ef6i4y','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(25,'4apf4p','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(26,'wurdy2','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(27,'2aui6b','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(28,'j452xg','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(29,'4byuu9','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(30,'6budq5','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(31,'cfze97','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(32,'v3cvji','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(33,'z6synb','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(34,'y9krjg','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(35,'d5yurk','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(36,'pv9ugx','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(37,'y4c2jz','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(38,'8bbyez','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(39,'fr8ou7','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(40,'98zbje','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(41,'fj6pkv','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(42,'cz2nfb','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(43,'4novvu','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(44,'sxvwxw','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(45,'jb2fru','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(46,'za973j','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(47,'s6woro','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(48,'qfypec','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(49,'4n7b8w','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(50,'uo4dh9','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1),
	(51,'oxohotel12','2019-12-06 00:00:00','2019-12-20 00:00:00', 'Sin Uso', 1, 100, 100, 1);
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.zonas
DROP TABLE IF EXISTS `zonas`;
CREATE TABLE IF NOT EXISTS `zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL DEFAULT '',
  `id_locaciones` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

REPLACE INTO `zonas` (`id`, `nombre`, `id_locaciones`) VALUES
	(1, 'Zona Principal', 1);
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;

-- Volcando datos para la tabla portal_oxohotel.zonas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
