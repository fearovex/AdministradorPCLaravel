use ipfiadmin;

DROP PROCEDURE IF EXISTS dataCampaings;

DELIMITER //
CREATE PROCEDURE dataCampaings(
    IN nameDataBase VARCHAR(100),
    IN locationId INT
)
BEGIN
    drop table IF exists nameTables;

	create temporary table nameTables (
        i int auto_increment primary key,
        campania varchar(100)
    );

    SET @querylocation = CONCAT('
        insert into nameTables (campania) select campania from ',nameDataBase,'.campania as e where e.id_locacion =',locationId
    );

    PREPARE location FROM @querylocation;
    execute location;

    SET @countOne = (select count(*) from nameTables);
    set @var1 = 1;
    set @queryTotal = "";
    while @var1 <= @countOne do
        set @var2 = (select campania from nameTables where i=@var1);
        set @queryTotal = concat(@queryTotal,'
            select c.id, c.nombre as "Nombre", (select fecha_creacion from ',nameDataBase,'.',@var2,' order by fecha_creacion desc limit 1) as "Ultima Fecha", (select count(*) from ',nameDataBase,'.',@var2,') as "Total Registros", c.fecha_inicio as "Fecha Inicio", c.fecha_fin as "Fecha Fin", c.vertical_economica as "Vertical", c.campania, c.path_campania from ',nameDataBase,'.campania c where c.campania = "',@var2,'" group by c.id'
        );
        if @var1 <> @countOne then
            set @queryTotal = concat(@queryTotal,' union all ');
        end if;
        set @var1 = @var1+1;
    end while;
    prepare queryTotal from @queryTotal;
    execute queryTotal;
END//

DELIMITER ;