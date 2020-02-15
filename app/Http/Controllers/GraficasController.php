<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraficasController extends Controller
{
    public function Consulta(Request $request){

        $fecha_inicial = '"'.date('Y-m-d H:i:00', strtotime($request->initialDate)).'"';
        $fecha_final = '"'.date('Y-m-d H:i:00', strtotime($request->finalDate)).'"';
        $campania =$request->id_event;
        $locaccion =$request->id_location;
        $database = session('database');
        $columns = $request->column;
        $columnsQuery = '["'.implode('","',$columns).'"]';

        $dataColumns = DB::select(
            "call dataColumnsCampaings('".$database."','".$locaccion."','".$campania."','".$columnsQuery."','".$fecha_inicial."','".$fecha_final."')"
        );
        
        for($i = 0; $i < count($columns); $i++){
            $DatosGraficas[$columns[$i]] = array();
        }

        $countData = 0;
        $countColumns = 0;
        foreach ($dataColumns as $key){
            do{
                if($key->nameColumn ==  $columns[$countColumns]){
                    $DatosGraficas[$key->nameColumn][$countData] = array();
                    if($key->nameColumn === "mac_ap"){
                        $nombre_dispositivo = DB::connection(session('database'))->table('dispositivos')->select('nombre_dispositivo')->where('mac_dispositivo', $key->dataColumn)->first();
                        if($nombre_dispositivo){
                            $key->dataColumn = $nombre_dispositivo->nombre_dispositivo; 
                        }
                    }
                    $DatosGraficas[$key->nameColumn][$countData] = array(
                        "personas" => $key->people,
                        $key->nameColumn => $key->dataColumn
                    );
                    $countData++;
                    $repitetir = false;
                }
                else{
                    $countData = 0;
                    $repitetir = true;
                    $countColumns++;
                }
            }while ($repitetir);
        }
        // $DatosGraficas['genero'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('genero, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('genero')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();
        
        // $DatosGraficas['ap'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('ip_ap as ap, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('ap')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();

        // $DatosGraficas['paises'] = DB::connection(session('database'))
        //     ->table($Evento->campania.' as pac')
        //     ->join('paises', 'pac.id_pais',  '=', 'paises.id')
        //     ->select(DB::raw('paises.nombre_esp as pais, pac.id_pais, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('pac.id_pais', 'pais')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();


        // $DatosGraficas['os'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('os, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('os')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();

        // $DatosGraficas['fecha'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('date(fecha_creacion) as fecha, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('fecha')
        //     ->orderBy('fecha', 'ASC')
        //     ->get();
            
        return response()->json($DatosGraficas, 200);
    }

    public function TopCampaings(Request $request){
        $database = session('database');
        $fecha_inicial = '"'.date('Y-m-d H:i:00', strtotime($request->initialDate)).'"';
        $fecha_final = '"'.date('Y-m-d H:i:00', strtotime($request->finalDate)).'"';
        $campania =$request->id_event;
        $locacion = $request->id_location;
        
        $dataTop = DB::select(
            "call dataTopCampaings('".$database."','".$locacion."','".$campania."','".$fecha_inicial."','".$fecha_final."')"
        );
        return $dataTop;
    }

    public function LastTenUsersCampaing(Request $request){
        $database = session('database');
        $locacion = $request->id_location;
        $dataUsers = DB::select(
            "call dataLastTen('".$database."','".$locacion."')"
        );
        return $dataUsers;
    }

    public function TopZones(Request $request){
        $database = session('database');
        $fecha_inicial = '"'.date('Y-m-d H:i:00', strtotime($request->initialDate)).'"';
        $fecha_final = '"'.date('Y-m-d H:i:00', strtotime($request->finalDate)).'"';
        $campania =$request->id_event;

        $locacion = $request->id_location;

        $dataZones = DB::select(
            "call dataTopZones('".$database."','".$locacion."','".$campania."','".$fecha_inicial."','".$fecha_final."')"
        );
        return $dataZones;
    }

    public function TopVisits(Request $request){
        $database = session('database');
        $locacion = $request->id_location;
        $dataVisits = DB::select(
            "call dataTopVisits('".$database."','".$locacion."')"
        );
        return $dataVisits;
    }

    public function TotalRecords(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select count(*) as TotalRecords from $database.$tabla->campania where fecha_creacion BETWEEN '$request->initialDate' and '$request->finalDate'";
        $TotalRecords = DB::select($query);
        return $TotalRecords;
    }
    
    public function UsersMoreVisit(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $radiusUsersMoreVisit = RadiusController::getUsersMoreVisit($request);
        if($radiusUsersMoreVisit == 0){
            return response()->json("",500);
        }
        if(count($radiusUsersMoreVisit) > 0){
            $contador = count($radiusUsersMoreVisit) <= 10 ? count($radiusUsersMoreVisit) : 10;
            $query = "";
            for($i=0; $i < $contador;$i++){
                $query .= "select tc.nombre as 'Nombre', tc.apellidos as 'Apellido', tc.email as 'Email', tc.telefono as 'Celular', tc.genero as 'Sexo', tc.os as 'Sistema_Operativo', ".$radiusUsersMoreVisit[$i]->visitas." as 'N_Visitas', tc.mac_cliente FROM $database.$tabla->campania tc inner join users_radius as ur on ur.id_cliente = tc.id where ur.username = '".$radiusUsersMoreVisit[$i]->username."'";
                if($i <> ($contador-1)){
                    $query .= " UNION ALL ";
                }
            }
            $UsersMoreVisit = DB::connection($database)->select($query);
        }
        else{
            $UsersMoreVisit = [];
        }
        return $UsersMoreVisit;
    }

    public function LastTenUsersListCampaing(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        if($request->vertical=='Centros Comerciales'){
            $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
            $query = "select nombre as 'Nombre', apellidos as 'Apellido', email as 'Email', telefono as 'Celular', genero as 'Sexo', os as 'Sistema_Operativo', fecha_creacion as 'Fecha_Creacion', id FROM $database.$tabla->campania ORDER BY fecha_creacion desc limit 10";
            $LastTenUsersListCampaing = DB::select($query);
            return $LastTenUsersListCampaing;
        }else{
            $ifExistColumnRoom= "select * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '".$database."' AND TABLE_NAME = '".$tabla->campania."' AND COLUMN_NAME = 'num_habitacion'";
            $ifExistColumnVoucher= "select * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '".$database."' AND TABLE_NAME = '".$tabla->campania."' AND COLUMN_NAME = 'num_voucher'";
            $existColumnRoom = DB::select($ifExistColumnRoom);
            $existColumnVoucher = DB::select($ifExistColumnVoucher);

            if((!empty($existColumnRoom)) && (!empty($existColumnVoucher))){
                $query = "select nombre as 'Nombre', apellidos as 'Apellido', num_habitacion as 'Habitacion', num_voucher as 'Voucher', mac_cliente as 'MAC', fecha_creacion as 'Fecha_Creacion', id 
                FROM $database.$tabla->campania ORDER BY fecha_creacion DESC LIMIT 10";
                $LastTenUsersListCampaing = DB::select($query);
                return $LastTenUsersListCampaing;
            }else{
                $query = "select nombre as 'Nombre', apellidos as 'Apellido', mac_cliente as 'MAC', fecha_creacion as 'Fecha_Creacion', id 
                FROM $database.$tabla->campania  ORDER BY fecha_creacion DESC LIMIT 10";
                $LastTenUsersListCampaing = DB::select($query);
                return $LastTenUsersListCampaing;
            }
        }
    }

    public function TopTenAgesList(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select edad as 'Edad', count(edad) as 'N_Registros' FROM $database.$tabla->campania where fecha_creacion BETWEEN '$request->initialDate' and '$request->finalDate' GROUP BY Edad ORDER BY N_Registros desc limit 10";
        $TopTenAgesList = DB::select($query);
        return $TopTenAgesList;
    }

    public function PromedyAge(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select round(avg(edad)) as Promedio FROM $database.$tabla->campania where fecha_creacion BETWEEN '$request->initialDate' and '$request->finalDate'";
        $PromedyAge = DB::select($query);
        return $PromedyAge;
    }

    public function VouchersUse(Request $request){
        $database = session('database');
        $VouchersUse = [];
        $SinUso = DB::select("SELECT COUNT(estado) AS 'Sin_Uso' FROM $database.vouchers WHERE estado='Sin Uso' and id_campania=$request->id_campaing");
        $EnUso = DB::select("SELECT COUNT(estado) AS 'En_Uso' FROM $database.vouchers WHERE estado='En Uso'  and id_campania=$request->id_campaing");
        $VouchersUse = [
            'Sin_Uso' => $SinUso[0]->Sin_Uso,
            'En_Uso' => $EnUso[0]->En_Uso
        ];
        return $VouchersUse;
    }
    
    public function TopFiveReasonVisits(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select COUNT(*) registros, p.razon FROM (select mac_cliente, razon_visita AS razon 
        FROM $database.$tabla->campania GROUP BY mac_cliente,razon_visita ORDER BY COUNT(*) DESC) AS p GROUP BY p.razon order by registros desc LIMIT 5 ";
        $topFiveReasonVisits = DB::select($query);
        return $topFiveReasonVisits;
    }

    public function TopFiveRooms(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $ifExistColumnQuery= "select * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '".$database."' AND TABLE_NAME = '".$tabla->campania."' AND COLUMN_NAME = 'num_habitacion'" ;
        $existColumn = DB::select($ifExistColumnQuery);
        if(!empty($existColumn)){
            $query = "select COUNT(num_habitacion) AS usos, num_habitacion as habitacion FROM $database.$tabla->campania GROUP BY num_habitacion order by usos desc LIMIT 5";
            $topFiveRooms = DB::select($query);
            return $topFiveRooms;
        }else{
            $topFiveRooms = [(object)([
                'usos' => '0',
                'habitacion' => 'No posee habitaciones'
            ])];
            return response()->json($topFiveRooms);
        }
    }

    public function TopTenUsers(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
       
        $ifExistColumnQuery= "select * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '".$database."' AND TABLE_NAME = '".$tabla->campania."' AND COLUMN_NAME = 'num_habitacion'" ;
        $existColumn = DB::select($ifExistColumnQuery);

        if(!empty($existColumn)){
            $query = "select @i := @i + 1 AS posTop, nombre, apellidos, num_habitacion, num_voucher, mac_cliente 
            FROM $database.$tabla->campania cross join (select @i := 0) p ORDER BY fecha_creacion DESC LIMIT 10";
            $topTenUsers = DB::select($query);
            return $topTenUsers;
        }else{
            $query = "select @i := @i + 1 AS posTop, nombre, apellidos, num_voucher, mac_cliente 
            FROM $database.$tabla->campania cross join (select @i := 0) p ORDER BY fecha_creacion DESC LIMIT 10";
            $topTenUsers = DB::select($query);
            return $topTenUsers;
        }
    }
    
    public function UserInfoDB(Request $request){
        $database = session('database');
        if(isset($request->macUsuario)){
            $queryDataUser= "select * FROM $database.$request->nombreCampania WHERE mac_cliente = '$request->macUsuario'";
            $dataUser = DB::select($queryDataUser);
            return response()->json($dataUser);
        }
        if(isset($request->idUsuario)){
            $queryDataUser= "select * FROM $database.$request->nombreCampania WHERE id = $request->idUsuario";
            $dataUser = DB::select($queryDataUser);
            return response()->json($dataUser);
        }
    }

    public function PrefferWeekDayDB(Request $request){
        $database = session('database');
        if(isset($request->rowData[0]["num_voucher"])){
            $queryChangeEs = "SET @@lc_time_names = 'es_CO'";
            $query = "select COUNT(*) AS cantidad, DAYNAME(fecha_creacion) AS dia_preferido FROM $database.$request->nombreCampania WHERE num_voucher = "."'".$request->rowData[0]["num_voucher"]."'"." GROUP BY dia_preferido ORDER BY cantidad desc LIMIT 1";
            
            DB::select($queryChangeEs);
            $prefferWeekDayUser = DB::select($query);
            $queryChangeEn= "SET @@lc_time_names = 'en_US'";
            DB::select($queryChangeEn);
            return  response()->json($prefferWeekDayUser);
        }
        if(isset($request->rowData[0]["email"])){
            $queryChangeEs= "SET @@lc_time_names = 'es_CO'";
            $query = "select COUNT(*) AS cantidad, DAYNAME(fecha_creacion) AS dia_preferido FROM $database.$request->nombreCampania WHERE email = "."'".$request->rowData[0]["email"]."'"." GROUP BY dia_preferido ORDER BY cantidad desc LIMIT 1";
            
            DB::select($queryChangeEs);
            $prefferWeekDayUser = DB::select($query);
            $queryChangeEn= "SET @@lc_time_names = 'en_US'";
            DB::select($queryChangeEn);
            return  response()->json($prefferWeekDayUser);
        }
    }
    
    public function visitHistoryUserDB(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->rowData[0]["id_evento"])->first();

        if(isset($request->rowData[0]["num_voucher"])){
            $userRadius = DB::connection($database)->select("select ur.username from users_radius ur inner join $tabla->campania tc on ur.id_cliente = tc.id WHERE num_voucher = '".$request->rowData[0]["num_voucher"]."'");
            if(count($userRadius) > 0){
                $visitHistory = RadiusController::getVisitHistory($userRadius[0]);
            }
            else{
                $visitHistory = [];
            }
            return  response()->json($visitHistory);
        }
        if(isset($request->rowData[0]["email"])){
            $userRadius = DB::connection($database)->select("select ur.username from users_radius ur inner join $tabla->campania tc on ur.id_cliente = tc.id WHERE email = '".$request->rowData[0]["email"]."'");
            if(count($userRadius) > 0){
                $visitHistory = RadiusController::getVisitHistory($userRadius[0]);
            }
            else{
                $visitHistory = [];
            }
            return  response()->json($visitHistory);
        }
    }

    public function UserRadiusDB(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->rowData[0]["id_evento"])->first();

        if(isset($request->rowData[0]["num_voucher"])){
            $userRadius = DB::connection($database)->select("select ur.username from users_radius ur inner join $tabla->campania tc on ur.id_cliente = tc.id WHERE num_voucher = '".$request->rowData[0]["num_voucher"]."'");
            if(count($userRadius) > 0){
                $visitHistory = $userRadius[0]->username;
            }
            else{
                $visitHistory = [];
            }
            return  response()->json($visitHistory);
        }
        if(isset($request->rowData[0]["email"])){
            $userRadius = DB::connection($database)->select("select ur.username from users_radius ur inner join $tabla->campania tc on ur.id_cliente = tc.id WHERE email = '".$request->rowData[0]["email"]."'");
            if(count($userRadius) > 0){
                $visitHistory = $userRadius[0]->username;
            }
            else{
                $visitHistory = [];
            }
            return  response()->json($visitHistory);
        }
    }
}
