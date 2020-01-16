USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataTopReasonVisits;
DELIMITER //
CREATE PROCEDURE dataTopReasonVisits (IN nameDatabase VARCHAR(30), idLocation INT)
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
   
   drop table if exists tableTopReasonVisits;
   create temporary table tableTopReasonVisits(
        id int auto_increment primary key,
        razon VARCHAR(255),
        registros int
    ); 
   
   while @countPrimary <= @countCampaings do
	   set @queryNameCampaing = (select campania from nameCampaings where id=@countPrimary);
		   SET @queryTableTopReasonVisits = CONCAT('
		   insert into tableTopReasonVisits (razon,visitas) 
           SELECT COUNT(*) registros, p.razon 
            FROM (select mac_cliente, razon_visita AS razon 
            FROM ',nameDatabase,'.',@queryNameCampaing,
            ' GROUP BY mac_cliente,razon_visita 
            ORDER BY COUNT(*) DESC) 
            AS p GROUP BY p.razon'
		);
		PREPARE topReasonVisits FROM @queryTableTopReasonVisits;
	   execute topReasonVisits;
	   SET @countPrimary = @countPrimary+1;
   end while;
   SELECT * from tableTopReasonVisits ORDER BY visitas desc LIMIT 5;
  
END//
DELIMITER ;