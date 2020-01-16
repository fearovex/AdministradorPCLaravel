USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataTopVisits;
DELIMITER //
CREATE PROCEDURE dataTopVisits (IN nameDatabase VARCHAR(30), idLocation INT)
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
   
   drop table if exists tableTopVisits;
   create temporary table tableTopVisits(
        id int auto_increment primary key,
        visitas int,
        registros int
    ); 
   
   while @countPrimary <= @countCampaings do
	   set @queryNameCampaing = (select campania from nameCampaings where id=@countPrimary);
		   SET @queryTableTopVisits = CONCAT('
		   insert into tableTopVisits (registros,visitas) 
			SELECT COUNT(*) registros, p.visitas 
			FROM (SELECT mac_cliente, COUNT(*) visitas 
			FROM ',nameDatabase,'.',@queryNameCampaing,
			' GROUP BY mac_cliente ORDER BY COUNT(*) DESC) 
			AS p GROUP BY p.visitas'
		);
		PREPARE topVisits FROM @queryTableTopVisits;
	   execute topVisits;
	   SET @countPrimary = @countPrimary+1;
   end while;
   SELECT * from tableTopVisits ORDER BY visitas desc LIMIT 5;
  
END//
DELIMITER ;