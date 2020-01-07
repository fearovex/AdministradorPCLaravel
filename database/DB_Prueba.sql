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
	(12, 1, 'campania_uno', 'Portal cautivo que cuenta con un banner con publicidad', '2019-12-14', '2019-12-18', 3451, 'publicidad_a_2019_campania', '10'),
	(13, 1, 'campania_dos', 'Portal cautivo que cuenta con un banner con publicidad', '2019-12-13', '2019-12-27', 2435, 'publicidad_b_2019_campania', '10'),
	(14, 1, 'Habitaciones', 'Portal Cautivo para los huespedes', '2019-12-06', '2019-12-20', 2019, 'portal_cautivo_habitaciones', '10');
/*!40000 ALTER TABLE `campania` ENABLE KEYS */;

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
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.habitaciones
DROP TABLE IF EXISTS `habitaciones`;
CREATE TABLE IF NOT EXISTS `habitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `piso` varchar(45) DEFAULT NULL,
  `bloque` varchar(45) DEFAULT NULL,
  `num_habitacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla portal_oxohotel.habitaciones: ~99 rows (aproximadamente)
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
REPLACE INTO `habitaciones` (`id`, `piso`, `bloque`, `num_habitacion`) VALUES
	(1, '1', 'B', '101'),
	(2, '1', 'B', '102'),
	(3, '1', 'B', '105'),
	(4, '1', 'B', '106'),
	(5, '1', 'B', '107'),
	(6, '1', 'B', '108'),
	(7, '1', 'B', '109'),
	(8, '1', 'B', '110'),
	(9, '1', 'B', '111'),
	(10, '1', 'B', '112'),
	(11, '1', 'B', '113'),
	(12, '1', 'C', '115'),
	(13, '1', 'C', '116'),
	(14, '1', 'C', '119'),
	(15, '1', 'C', '120'),
	(16, '1', 'C', '121'),
	(17, '1', 'C', '122'),
	(18, '1', 'C', '123'),
	(19, '1', 'C', '124'),
	(20, '1', 'C', '125'),
	(21, '1', 'C', '126'),
	(22, '2', 'A', '227'),
	(23, '2', 'A', '228'),
	(24, '2', 'A', '229'),
	(25, '2', 'A', '230'),
	(26, '2', 'A', '231'),
	(27, '2', 'A', '233'),
	(28, '2', 'A', '234'),
	(29, '2', 'A', '235'),
	(30, '2', 'A', '236'),
	(31, '2', 'A', '237'),
	(32, '2', 'A', '238'),
	(33, '2', 'A', '239'),
	(34, '2', 'A', '240'),
	(35, '2', 'A', '241'),
	(36, '2', 'A', '242'),
	(37, '2', 'A', '243'),
	(38, '2', 'A', '245'),
	(39, '2', 'B', '201'),
	(40, '2', 'B', '202'),
	(41, '2', 'B', '203'),
	(42, '2', 'B', '204'),
	(43, '2', 'B', '205'),
	(44, '2', 'B', '206'),
	(45, '2', 'B', '207'),
	(46, '2', 'B', '208'),
	(47, '2', 'B', '209'),
	(48, '2', 'B', '210'),
	(49, '2', 'B', '211'),
	(50, '2', 'B', '212'),
	(51, '2', 'B', '213'),
	(52, '2', 'C', '215'),
	(53, '2', 'C', '216'),
	(54, '2', 'C', '217'),
	(55, '2', 'C', '218'),
	(56, '2', 'C', '219'),
	(57, '2', 'C', '220'),
	(58, '2', 'C', '221'),
	(59, '2', 'C', '222'),
	(60, '2', 'C', '223'),
	(61, '2', 'C', '224'),
	(62, '2', 'C', '225'),
	(63, '2', 'C', '226'),
	(64, '3', 'A', '333'),
	(65, '3', 'A', '334'),
	(66, '3', 'A', '335'),
	(67, '3', 'A', '336'),
	(68, '3', 'A', '337'),
	(69, '3', 'A', '338'),
	(70, '3', 'A', '339'),
	(71, '3', 'A', '340'),
	(72, '3', 'A', '341'),
	(73, '3', 'A', '342'),
	(74, '3', 'A', '343'),
	(75, '3', 'A', '345'),
	(76, '3', 'B', '301'),
	(77, '3', 'B', '302'),
	(78, '3', 'B', '303'),
	(79, '3', 'B', '304'),
	(80, '3', 'B', '305'),
	(81, '3', 'B', '306'),
	(82, '3', 'B', '307'),
	(83, '3', 'B', '308'),
	(84, '3', 'B', '309'),
	(85, '3', 'B', '310'),
	(86, '3', 'B', '311'),
	(87, '3', 'B', '312'),
	(88, '3', 'C', '315'),
	(89, '3', 'C', '316'),
	(90, '3', 'C', '317'),
	(91, '3', 'C', '318'),
	(92, '3', 'C', '319'),
	(93, '3', 'C', '320'),
	(94, '3', 'C', '321'),
	(95, '3', 'C', '322'),
	(96, '3', 'C', '323'),
	(97, '3', 'C', '324'),
	(98, '3', 'C', '325'),
	(99, '3', 'C', '326');
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;

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

-- Volcando datos para la tabla portal_oxohotel.locaciones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `locaciones` DISABLE KEYS */;
REPLACE INTO `locaciones` (`id`, `nombre`, `direccion`, `pais`, `ciudad`, `telefono`, `PaginaWeb`) VALUES
	(1, 'Primera Locacion ', 'direccion', 'colombia', 'cartagena', '3212243289', 'paginaWeb');
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
CREATE TABLE IF NOT EXISTS `portal_cautivo_habitaciones` (
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla portal_oxohotel.portal_cautivo_habitaciones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `portal_cautivo_habitaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `portal_cautivo_habitaciones` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.publicidad_a_2019_campania
DROP TABLE IF EXISTS `publicidad_a_2019_campania`;
CREATE TABLE IF NOT EXISTS `publicidad_a_2019_campania` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nombre` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla portal_oxohotel.publicidad_a_2019_campania: ~24 rows (aproximadamente)
/*!40000 ALTER TABLE `publicidad_a_2019_campania` DISABLE KEYS */;
REPLACE INTO `publicidad_a_2019_campania` (`id`, `id_evento`, `fecha_creacion`, `nombre`, `email`, `edad`, `telefono`, `genero`, `os`, `ssid`, `mac_cliente`, `ip_cliente`, `ip_ap`, `mac_ap`, `id_pais`) VALUES
	(1, 1, '2020-01-07 14:20:00', 'Juan David pachon Suzunaga', 'juan.suzunaga@gmail.com', '32', '3223650805', 'Mujer', 'Android', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', NULL, '1'),
	(2, 1, '2020-01-07 14:20:00', 'Juan david', 'juan.suzunaga@email.com', '21', '3223650805', 'Hombre', 'Windows', 'oxohotel_1', '30074d8595f0', '192.168.0.12', '192.168.0.23', '60d02c2d04f0', '2'),
	(3, 1, '2020-01-07 14:20:00', 'Soporte', 'soport@soporte.com', '66', '2131472580', 'Hombre', 'MacOS', 'oxohotel_1', 'd0c5f3c5da5a', '192.168.0.14', '192.168.0.23', '60d02c2d04f0', '2'),
	(4, 1, '2020-01-07 14:20:00', 'Hola', 'hoq@gsjd.xon', '77', '2312536325', 'Hombre', 'Windows', 'oxohotel_1', 'd0c5f3c5da5a', '192.168.0.14', '192.168.0.23', '60d02c2d04f0', '4'),
	(5, 1, '2020-01-07 14:20:00', 'Juan', 'juan.suzunaga@gmail.com', '23', '2345678654321', 'Hombre', 'Windows', 'oxohotel_1', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0', '5'),
	(6, 1, '2020-01-07 14:20:00', 'Hola', 'ge@gsjd.com', '66', '3214569807', 'Mujer', 'Android', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '20'),
	(7, 1, '2020-01-07 14:20:00', 'Gerardo Mendoza', 'ger@correo.com.co', '34', '1231234565', 'Hombre', 'MacOS', 'oxohotel_1', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0', '30'),
	(8, 1, '2020-01-07 14:20:00', 'Gerardp Mendoza', 'ger@correo.com', '32', '32222121212', 'Hombre', 'Windows', 'oxohotel_1', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0', '50'),
	(9, 1, '2020-01-07 14:20:00', 'Gerardo Mendoza', 'ger@correo.com', '35', '3445633432', 'Hombre', 'Windows', 'oxohotel_1', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0', '13'),
	(10, 1, '2020-01-07 14:20:00', 'sdjflsd sdjfsdkjf', 'sdsds@gmail.com', '34', '3156726860', 'Otro', 'Linux', '', '', '', '', '', '22'),
	(11, 1, '2020-01-07 14:20:00', 'Juan David', 'juan.suzunaga@gmail.com', '30', '3223650805', 'Hombre', 'MacOS', 'oxohotel_1', '34e12d43a922', '192.168.0.11', '192.168.0.13', '60d02c2d04f0', '15'),
	(12, 1, '2020-01-07 14:20:00', 'Juan', 'juan.suzunaga@gmail.com', '23', '1234567654321', 'Mujer', 'Android', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '12'),
	(13, 1, '2020-01-07 14:20:00', '', '', '', '', '', '', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '50'),
	(14, 1, '2020-01-07 14:20:00', '', '', '', '', '', '', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '208'),
	(15, 1, '2020-01-07 14:20:00', 'pedro', 'pepe@hotmail.com', '12', '12345234124', 'Mujer', '', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '22'),
	(16, 1, '2020-01-07 14:20:00', 'Juan David', 'juan.suzunaga@gmail.com', '12', '123456712345', 'Hombre', 'Windows', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '5'),
	(17, 1, '2020-01-07 14:20:00', 'Juan David', 'juan.suzunaga@gmail.com', '12', '1234567890', 'Hombre', 'Windows', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '1'),
	(18, 1, '2020-01-07 14:20:00', 'QWERTY', 'juan.suzunaga@gmail.com', '12', '23452345676543', 'Hombre', 'Windows', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '1'),
	(19, 1, '2020-01-07 14:20:00', 'Juan David', 'juan.suzunaga@gmail.com', '32', '12345623452', 'Hombre', 'Windows', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '2'),
	(20, 1, '2020-01-07 14:20:00', 'Juan David', 'juan.suzunaga@gmail.com', '12', '1234567890', 'Hombre', 'Windows', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '1'),
	(21, 1, '2020-01-07 14:20:00', 'Juan David', 'juan.suzunaga@gmail.com', '23', '1234567812', 'Hombre', 'Windows', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '1'),
	(22, 1, '2020-01-07 14:20:00', 'Jorge Eduardo', 'jpqjp@com', '34', '3223453456', 'Hombre', 'Otro', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0', '10'),
	(23, 1, '2020-01-07 14:20:00', 'dccsd', 'dsf@email.com', '23', '3213424234324', 'Mujer', 'Windows', '', '', '', '', '', NULL),
	(24, 1, '2020-01-07 14:20:00', 'dsads', 'sfds@email.com', '22', '3212234335', 'Mujer', 'Windows', '', '', '', '', '', '40');
/*!40000 ALTER TABLE `publicidad_a_2019_campania` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.publicidad_b_2019_campania
DROP TABLE IF EXISTS `publicidad_b_2019_campania`;
CREATE TABLE IF NOT EXISTS `publicidad_b_2019_campania` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `ssid` varchar(250) DEFAULT NULL,
  `mac_cliente` varchar(250) DEFAULT NULL,
  `ip_cliente` varchar(250) DEFAULT NULL,
  `ip_ap` varchar(250) DEFAULT NULL,
  `mac_ap` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla portal_oxohotel.publicidad_b_2019_campania: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `publicidad_b_2019_campania` DISABLE KEYS */;
REPLACE INTO `publicidad_b_2019_campania` (`id`, `id_evento`, `fecha_creacion`, `ssid`, `mac_cliente`, `ip_cliente`, `ip_ap`, `mac_ap`) VALUES
	(1, 1, '2019-10-24 10:19:09', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', NULL),
	(2, 1, '2019-10-25 10:25:44', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0'),
	(3, 1, '2019-10-30 11:36:21', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0'),
	(4, 1, '2019-10-25 11:39:59', 'Test_R', '34e12d43a922', '10.165.0.16', '10.165.0.8', '60d02c2d04f0'),
	(5, 1, '2019-10-24 11:58:36', 'oxohotel_2', '30074d8595f0', '192.168.0.12', '192.168.0.23', '60d02c2d04f0'),
	(6, 1, '2019-10-28 11:59:29', 'oxohotel_2', 'd0c5f3c5da5a', '192.168.0.14', '192.168.0.23', '60d02c2d04f0'),
	(7, 1, '2019-10-24 12:01:43', 'oxohotel_2', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0'),
	(8, 1, '2019-10-31 12:04:28', 'oxohotel_2', '30074d8595f0', '192.168.0.12', '192.168.0.23', '60d02c2d04f0'),
	(9, 1, '2019-10-24 12:05:33', 'oxohotel_2', '30074d8595f0', '192.168.0.12', '192.168.0.23', '60d02c2d04f0'),
	(10, 1, '2019-10-25 12:07:28', 'oxohotel_2', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0'),
	(11, 1, '2019-10-24 12:11:04', 'oxohotel_2', '30074d8595f0', '192.168.0.12', '192.168.0.23', '60d02c2d04f0'),
	(12, 1, '2019-10-31 12:12:35', 'oxohotel_2', 'd0c5f3c5da5a', '192.168.0.14', '192.168.0.23', '60d02c2d04f0'),
	(13, 1, '2019-10-24 02:51:40', 'oxohotel_2', '34e12d43a922', '192.168.0.13', '192.168.0.23', '60d02c2d04f0');
/*!40000 ALTER TABLE `publicidad_b_2019_campania` ENABLE KEYS */;

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

-- Volcando datos para la tabla portal_oxohotel.vouchers: ~15 rows (aproximadamente)
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
REPLACE INTO `vouchers` (`id_voucher`, `voucher`, `fecha_inicio`, `fecha_fin`, `estado`, `id_campania`, `num_usos`, `total_num_usos`, `id_locacion`) VALUES
	(1, 'f05de4', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(2, '3064b9', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(3, '497ee4', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(4, '9d62d5', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(5, 'dcc4f5', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(6, '9d0a11', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(7, 'a5a3fe', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(8, 'a3db30', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(9, '177c4e', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(10, '93aa3b', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 'Sin Uso', 12, 3, 3, 1),
	(11, 'c270ff', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(12, '2224df', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(13, 'ef4f64', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(14, 'ef9866', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(15, 'f1e576', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(16, '66610e', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(17, '94573d', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(18, '3f29f7', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(19, 'dcc805', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(20, 'ffedfc', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(21, '193fe6', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1),
	(22, '846d32', '2020-01-08 00:00:00', '2020-02-01 00:00:00', 'Sin Uso', 13, 3, 3, 1);
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;

-- Volcando estructura para tabla portal_oxohotel.zonas
DROP TABLE IF EXISTS `zonas`;
CREATE TABLE IF NOT EXISTS `zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL DEFAULT '',
  `id_locaciones` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla portal_oxohotel.zonas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
