USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataTopCampaings;
DELIMITER //
CREATE PROCEDURE dataTopCampaings (IN nameDatabase VARCHAR(30), idLocation INT)
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
   
   drop table IF exists dataTop;
		create temporary table dataTop(
		  id int auto_increment primary key,
		  nombreCampania varchar(100),
		  totalRegistros int
		);
		
	while @countPrimary <= @countCampaings do
   	set @queryNameTables = (select campania from nameCampaings where id=@countPrimary); 
   	
		SET @queryTableCampaings1 = CONCAT('
        insert into dataTop (nombreCampania,totalRegistros) values(','"',@queryNameTables,'"',',(select count(id) from ',nameDatabase,'.',@queryNameTables,'))'
        );
		PREPARE campaings1 FROM @queryTableCampaings1;
   	execute campaings1;
    
		
   	
   	Set @countPrimary = @countPrimary+1;
   end while;

   SELECT * FROM dataTop order BY totalRegistros desc LIMIT 5;
END//
DELIMITER ;