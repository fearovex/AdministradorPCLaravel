USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataLastTen;
DELIMITER //
CREATE PROCEDURE dataLastTen (IN nameDatabase VARCHAR(30), idLocation INT)
BEGIN
 	drop table IF exists nameCampaings;
	create temporary table nameCampaings(
        id int auto_increment primary key,
        campania varchar(100)
    ); 
	 SET @querytop = CONCAT('
	        insert into nameCampaings (campania) select campania from ',nameDatabase,'.campania as e where e.id_locacion =',idLocation
	    ); 
	PREPARE campaingsTable FROM @querytop;
   execute campaingsTable;
   
   SET @countCampaings = (select count(*) from nameCampaings);
   set @countPrimary = 1;
   set @queryTotal = "";
   
   drop table IF exists dataLastTen;
		create temporary table dataLastTen(
		  id int auto_increment primary key,
		  nombre varchar(100),
		  apellidos varchar(100),
		  fecha_creacion VARCHAR(100),
		  ip varchar(100),
		  nombreCampania VARCHAR(100)
		);
		
	while @countPrimary <= @countCampaings do
   	set @queryNameTables = (select campania from nameCampaings where id=@countPrimary); 
   	
		SET @queryTableLastTen = CONCAT('
        insert into dataLastTen (nombre,apellidos,fecha_creacion,ip,nombreCampania) select nombre, apellidos, fecha_creacion, ip_cliente,','"',@queryNameTables,'"',' AS nombreCampania from ',nameDatabase,'.',@queryNameTables
        );
		PREPARE campaings FROM @queryTableLastTen;
   	execute campaings;

   	Set @countPrimary = @countPrimary+1;
   end while;

   SELECT @i := @i + 1 as posTop, nombre AS Nombres, apellidos AS Apellidos, fecha_creacion, ip AS IP, nombreCampania AS 'Campaña' FROM dataLastTen cross join (select @i := 0) d order by fecha_creacion desc LIMIT 10;
END//
DELIMITER ;