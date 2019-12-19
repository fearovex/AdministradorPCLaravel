use ipfiadmin;

DROP PROCEDURE IF EXISTS dataColumnsCampaings;

DELIMITER //
CREATE PROCEDURE dataColumnsCampaings(
    IN nameDataBase VARCHAR(100),
    IN locationId INT,
	IN campaniaId INT,
    IN columnsNames JSON,
    IN fechainicial VARCHAR(50),
    IN fechafinal VARCHAR(50)
)
BEGIN
    drop table IF exists nameTables;

	create temporary table nameTables (
        i int auto_increment primary key,
        campania varchar(100)
    );

    if campaniaId = 0 then
	    SET @querylocation = CONCAT('
	        insert into nameTables (campania) select campania from ',nameDataBase,'.campania as e where e.id_locacion =',locationId
	    );
    else
	 	SET @querylocation = CONCAT('
	      	insert into nameTables (campania) select campania from ',nameDataBase,'.campania as e where e.id =',campaniaId
	    );
    end if;

    PREPARE location FROM @querylocation;
    execute location;

    SET @countOne = (select count(*) from nameTables);
    set @var1 = 1;
    set @queryTotal = "";
    while @var1 <= @countOne do
        drop table IF exists nameColumns;
        set @var2 = (select campania from nameTables where i=@var1);
        set @queryCampains = concat ('
            create temporary table nameColumns (
                select column_name from information_schema.columns where table_schema = "',nameDataBase,'"and table_name = "',@var2,'"
            )'
        );
        prepare campains from @queryCampains;
        execute campains;
        set @varCoutnColumns = (select Json_length(columnsNames));
        set @var3 = 0;
        set @columsSelect = "";
        while @var3 < @varCoutnColumns do
            set @columnName = (select json_extract(columnsNames, concat('$[',@var3,']')));
            set @columnName = (select replace(@columnName, '"', ''));
            set @existe = (select exists (select * from nameColumns t where t.column_name = @columnName));
            if @existe = 1 then 
                set @columsSelect = concat(@columsSelect,@columnName);
                if @var3 <> (@varCoutnColumns -1) then 
                    set @columsSelect = concat(@columsSelect,",");
                end if;
            else
                set @columsSelect = concat(@columsSelect,'null as ',@columnName);
                if @var3 <> (@varCoutnColumns -1) then 
                    set @columsSelect = concat(@columsSelect,",");
                end if;
            end if;
            set @var3 = @var3+1;
        end while;
        set @queryTotal = concat(@queryTotal,'
            select ',@columsSelect,' from ',nameDataBase,'.',@var2,' WHERE fecha_creacion BETWEEN  ',fechainicial,' AND ',fechafinal
        );
        if @var1 <> @countOne then
            set @queryTotal = concat(@queryTotal,' union ');
        end if;
        set @var1 = @var1+1;
    end while;
    
 	set @varCoutnColumns = (select Json_length(columnsNames));
	set @var4 = 0;
    set @dataColumn = "";
    drop table IF exists dataColumns;
    create temporary table dataColumns(
        people varchar(10),
        dataColumn varchar(100),
        nameColumn varchar(100)
	);
	
   while @var4 < @varCoutnColumns do
        set @columnName = (select json_extract(columnsNames, concat('$[',@var4,']')));
        set @columnName = (select replace(@columnName, '"', ''));
        if @columnName = 'id_pais' then
        		set @insertData = concat('
	            insert into dataColumns (people, dataColumn, nameColumn) SELECT COUNT(t.',@columnName,') AS people, paises.nombre_esp as dataColumn, "',@columnName,'" as nameColumn FROM (',@queryTotal,') as t inner join ',nameDataBase,'.paises on t.id_pais = paises.id GROUP BY dataColumn ORDER BY people DESC LIMIT 5
	        ');
		   else
		   	if @columnName = 'fecha_creacion' then 
		   		set @insertData = concat('
	            	insert into dataColumns (people, dataColumn, nameColumn) SELECT COUNT(t.',@columnName,') AS people, date(t.',@columnName,') as dataColumn, "',@columnName,'" as nameColumn FROM (',@queryTotal,') as t GROUP BY dataColumn ORDER BY people DESC LIMIT 5
	        		');
		   	else
			   	set @insertData = concat('
	            	insert into dataColumns (people, dataColumn, nameColumn) SELECT COUNT(t.',@columnName,') AS people, t.',@columnName,' as dataColumn, "',@columnName,'" as nameColumn FROM (',@queryTotal,') as t GROUP BY dataColumn ORDER BY people DESC LIMIT 5
	        		');
	        	end if;
		   end if;
		   
        prepare insertData from @insertData;
   	 	execute insertData;
    		
        set @var4 = @var4+1;
    end while;

    select * from dataColumns;
END//

DELIMITER ;