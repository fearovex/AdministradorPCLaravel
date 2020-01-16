USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataLastTenCampaing;
DELIMITER //
CREATE PROCEDURE dataLastTenCampaing (IN nameDatabase VARCHAR(30), idLocation INT)
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
   
   drop table if exists tableLastTenCampaing;
   create temporary table tableLastTenCampaing(
        id int auto_increment primary key,
        posTop int,
        nombre VARCHAR(100),
        apellidos VARCHAR(100),
        num_habitacion VARCHAR(100),
        num_voucher VARCHAR(100),
        mac_cliente VARCHAR(100)
    ); 
   
   while @countPrimary <= @countCampaings do
	   set @queryNameCampaing = (select campania from nameCampaings where id=@countPrimary);
		   SET @queryTableTopReasonVisits = CONCAT('
		   insert into tableLastTenCampaing (posTop,nombre,apellidos,num_habitacion,num_voucher,mac_cliente)
           SELECT  ',@countPrimary,'as posTop,nombre, apellidos, num_habitacion, num_voucher, mac_cliente 
           FROM ',nameDatabase,'.',@queryNameCampaing, ' p ORDER BY fecha_creacion desc LIMIT 10'
		);
		PREPARE topReasonVisits FROM @queryTableTopReasonVisits;
	   execute topReasonVisits;
	   SET @countPrimary = @countPrimary+1;
   end while;
   SELECT * from tableLastTenCampaing;
END//
DELIMITER ;