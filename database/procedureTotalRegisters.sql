USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataTotalRegisters;
DELIMITER //
CREATE PROCEDURE dataTotalRegisters (IN nameDatabase VARCHAR(30), idLocation INT, idCampania INT, fechaInicial VARCHAR(100), fechaFinal VARCHAR(100))
BEGIN
	drop table IF exists nameCampaings;
	create temporary table nameCampaings(
	     id int auto_increment primary key,
	     campania varchar(100)
	 ); 
	if idCampania = 0 then
	    SET @querytop = CONCAT('
	        insert into nameCampaings (campania) select campania from ',nameDatabase,'.campania as e where e.id_locacion =',idLocation);
    else
	 	SET @querytop = CONCAT('
	      	insert into nameCampaings (campania) select campania from ',nameDatabase,'.campania as e where e.id =',idCampania);
    end if;
	PREPARE campaingsTable FROM @querytop;
	execute campaingsTable;

   SET @countCampaings = (select count(*) from nameCampaings);
   set @countPrimary = 1;
   set @queryTotal = "";
   
   drop table if exists tableTotalRegisters;
   create temporary table tableTotalRegisters(
        id int auto_increment primary key,
        mac_cliente varchar(255)
    ); 
   
   while @countPrimary <= @countCampaings do
	   set @queryNameCampaing = (select campania from nameCampaings where id=@countPrimary);
		   SET @queryTableTotalRegisters = CONCAT('
		   insert into tableTotalRegisters (mac_cliente) SELECT tr.mac_cliente FROM ',nameDatabase,'.',@queryNameCampaing,' AS tr WHERE (tr.fecha_creacion BETWEEN ',fechaInicial,' AND ',fechaFinal,') GROUP BY tr.mac_cliente'
		);
		PREPARE totalRegisters FROM @queryTableTotalRegisters;
	   execute totalRegisters;
	   SET @countPrimary = @countPrimary+1;
   end while;
   SELECT count(id) AS total FROM tableTotalRegisters;
  
END//
DELIMITER ;