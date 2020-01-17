USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataTopZones;
DELIMITER //
CREATE PROCEDURE dataTopZones (IN nameDatabase VARCHAR(30), idLocation INT)
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
   
   drop table if exists tableTopZones;
   create temporary table tableTopZones(
        id int auto_increment primary key,
        zona varchar(100),
        total int
    ); 
   
   while @countPrimary <= @countCampaings do
	   set @queryNameCampaing = (select campania from nameCampaings where id=@countPrimary);
		   SET @queryTableTopZones = CONCAT('
		   insert into tableTopZones (zona,total) SELECT z.nombre AS zona,COUNT(z.id) AS total FROM ',nameDatabase,'.zonas AS z 
			INNER JOIN ',nameDatabase,'.dispositivos AS d ON z.id=d.id_zona
			INNER JOIN ',nameDatabase,'.',@queryNameCampaing,' AS p ON d.mac_dispositivo = p.mac_ap 
			GROUP BY z.nombre'
		);
		PREPARE topZones FROM @queryTableTopZones;
	   execute topZones;
	   SET @countPrimary = @countPrimary+1;
   end while;
   SELECT zona, SUM(total) AS total FROM tableTopZones GROUP BY zona ORDER BY total DESC LIMIT 5;
  
END//
DELIMITER ;