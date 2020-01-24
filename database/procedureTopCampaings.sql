USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataTopCampaings;
DELIMITER //
CREATE PROCEDURE dataTopCampaings (IN nameDatabase VARCHAR(30), idLocation INT, idCampania INT, fechaInicial VARCHAR(100), fechaFinal VARCHAR(100))
BEGIN
 	drop table IF exists nameCampaings;
	create temporary table nameCampaings(
        id int auto_increment primary key,
		nameCampaing varchar(100),
        campania varchar(100)
    ); 
	if idCampania = 0 then
	    SET @querytop = CONCAT('
			insert into nameCampaings (nameCampaing,campania) select nombre,campania from ',nameDatabase,'.campania as e where e.id_locacion =',idLocation);
    else
	 	SET @querytop = CONCAT('
	      	insert into nameCampaings (nameCampaing,campania) select nombre,campania from ',nameDatabase,'.campania as e where e.id =',idCampania);
    end if;
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
		insert into dataTop (nombreCampania,totalRegistros) values((select nameCampaing from nameCampaings where id =',@countPrimary,'),(select count(id) from ',nameDatabase,'.',@queryNameTables,' as p WHERE p.fecha_creacion BETWEEN ',fechaInicial,' AND ',fechaFinal,'))'
		);
		PREPARE campaings1 FROM @queryTableCampaings1;

		execute campaings1;
   		Set @countPrimary = @countPrimary+1;
   	end while;
   	SELECT * FROM dataTop where totalRegistros !=0 order BY totalRegistros desc LIMIT 5;
END//
DELIMITER ;