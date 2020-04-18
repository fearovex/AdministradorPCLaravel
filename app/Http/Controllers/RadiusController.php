<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Config;

class RadiusController extends Controller
{
    public function getUsersRadius(Request $request){
        $database = session('database');
        $fecha_inicial =  $request->initialDate;  
        $fecha_final   =  $request->finalDate;
        $usersRadius = [];
        if($request->id_event == 0 && $request->id_location){
            $tables = DB::connection($database)->select('select campania from campania where id_locacion ='.$request->id_location);
            foreach($tables as $table){
                $users = DB::connection($database)->select("select ur.username from users_radius ur inner join $table->campania t on ur.id_cliente = t.id where t.fecha_creacion between '$fecha_inicial' and '$fecha_final'");
                array_push($usersRadius, $users);
            } 
            return $usersRadius;
        }
        else if($request->id_campaing){
            $table = DB::connection($database)->select('select campania from campania where id ='.$request->id_campaing)[0];
            $users = DB::connection($database)->select("select ur.username from users_radius ur inner join $table->campania t on ur.id_cliente = t.id where t.fecha_creacion between '$fecha_inicial' and '$fecha_final'");
            array_push($usersRadius, $users);
            return $usersRadius[0];
        }
        else{
            $usersRadius = [];
            return $usersRadius;
        }
    }

    public function getDataRadiusTimeAverage(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select * from $database.users_radius where id_campania = $request->id_campaing";
        $dataCampaing = DB::select($query);
        $countUsers = count($dataCampaing);
        $whereQueryCampaing = "";
        
        if($countUsers > 0){
            for($i=0; $i < $countUsers;$i++){
                $whereQueryCampaing .= "r.username = '".$dataCampaing[$i]->username."'";
                if(($countUsers - 1) > $i){
                    $whereQueryCampaing .= " OR ";
                }
            }
            $queryRadiusPromedy =  DB::connection('radius')->select("select ROUND(AVG(acctsessiontime)) as tiempoConexion from rd.radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereQueryCampaing)");
            if(!$queryRadiusPromedy){
                $queryRadiusPromedy[0] = [
                    'tiempoConexion' => 0
                ];
            }
        }
        else {
            $queryRadiusPromedy[0] = [
                'tiempoConexion' => 0
            ];
        }
        return response()->json($queryRadiusPromedy[0], 200);
    }

    public function getDataRadiusTimeTotal(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select * from $database.users_radius where id_campania = $request->id_campaing";
        $dataCampaing = DB::select($query);
        $countUsers = count($dataCampaing);
        $whereQueryCampaing = "";
        
        if($countUsers > 0){
            for($i=0; $i < $countUsers;$i++){
                $whereQueryCampaing .= "r.username = '".$dataCampaing[$i]->username."'";
                if(($countUsers - 1) > $i){
                    $whereQueryCampaing .= " OR ";
                }
            }
            $queryRadiusTotal =  DB::connection('radius')->select("select ROUND(SUM(acctsessiontime)) as tiempoConexionTotal from rd.radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereQueryCampaing)");
            if(!$queryRadiusTotal){
                $queryRadiusTotal[0] = [
                    'tiempoConexionTotal' => 0
                ];
            }
        }
        else {
            $queryRadiusTotal[0] = [
                'tiempoConexionTotal' => 0
            ];
        }
        return response()->json($queryRadiusTotal[0], 200);
    }

    public function getDataRadiusConnected(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select * from $database.users_radius where id_campania = $request->id_campaing";
        $dataCampaing = DB::select($query);
       
        $countUsers = count($dataCampaing);
        $whereQueryCampaing = "";
        if($countUsers > 0){
            for($i=0; $i < $countUsers;$i++){
                $whereQueryCampaing .= "r.username = '".$dataCampaing[$i]->username."'";
                if(($countUsers - 1) > $i){
                    $whereQueryCampaing .= " OR ";
                }
            }
            $queryRadius = DB::connection('radius')->select("select count(*) as Conectados from radacct as r where r.acctstoptime IS NULL and ($whereQueryCampaing)");
            if(!$queryRadius){
                $queryRadius[0] = [
                    'Conectados' => 0
                ];
            }
        }
        else {
            $queryRadius[0] = [
                'Conectados' => 0
            ];
        }
        return response()->json($queryRadius[0],200);
    }

    public function getPromedyBandwidth(Request $request){
        $database = session('database');

            if($request->id_event == 0){
                $users_radius = DB::connection($database)
                ->table('users_radius as ur')
                ->join('campania as c', 'ur.id_campania', '=', 'c.id')
                ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
                ->select('ur.username')
                ->where('l.id', $request->id_location)
                ->get();
            }else{
                $users_radius = DB::connection($database)
                ->table('users_radius as ur')
                ->join('campania as c', 'ur.id_campania', '=', 'c.id')
                ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
                ->select('ur.username')
                ->where('l.id', $request->id_location)
                ->where('c.id', $request->id_event)
                ->get();
            }
            

        $whereUsersQuery = "";
        $count = count($users_radius);
        if ($count > 0) {
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery .= "r.username='" . $user->username . "'";
                if (($count - 1) > $key) {
                    $whereUsersQuery .= " OR ";
                }
            }
            $promedy = DB::connection('radius')->select("select round(avg(r.acctoutputoctets+r.acctinputoctets)) Promedio from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery)");
            if(!$promedy){
                $promedy[0] = [
                    'Promedio' => 0
                ];
            }
        } else {
            $promedy[0] = [
                'Promedio' => 0
            ];
        }

        return response()->json($promedy[0], 200);
    }

    public function getTotalBandwidth(Request $request){
        $database = session('database');
        if($request->id_event == 0){
            $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('l.id', $request->id_location)
            ->get();
        }else{
            $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('l.id', $request->id_location)
            ->where('c.id', $request->id_event)
            ->get();
        }
        

        $whereUsersQuery = "";
        $count = count($users_radius);
        if ($count > 0) {
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery .= "r.username='" . $user->username . "'";
                if (($count - 1) > $key) {
                    $whereUsersQuery .= " OR ";
                }
            }
            $total = DB::connection('radius')->select("select round(sum(r.acctoutputoctets+r.acctinputoctets)) Total from radacct r WHERE ($whereUsersQuery) and (r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate')");
            if(!$total){
                $total[0] = [
                    'Total' => 0
                ];
            }
        } else {
            $total[0] = [
                'Total' => 0
            ];
        }

        return response()->json($total[0], 200);
    }

    public function getPromedyTimeSession(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('l.id', $request->id_location)
            ->get();

        $whereUsersQuery = "";
        $count = count($users_radius);
        if ($count > 0) {
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery .= "r.username='" . $user->username . "'";
                if (($count - 1) > $key) {
                    $whereUsersQuery .= " OR ";
                }
            }
            $promedy = DB::connection('radius')->select("select round(avg(r.acctsessiontime)) Promedio from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery)");
            if(!$promedy){
                $promedy[0] = [
                    'Promedio' => 0
                ];
            }
        } else {
            $promedy[0] = [
                'Promedio' => 0
            ];
        }

        return response()->json($promedy[0], 200);
    }

    public function getTotalTimeSession(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('l.id', $request->id_location)
            ->get();

        $whereUsersQuery = "";
        $count = count($users_radius);
        if ($count > 0) {
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery .= "r.username='" . $user->username . "'";
                if (($count - 1) > $key) {
                    $whereUsersQuery .= " OR ";
                }
            }
            $total = DB::connection('radius')->select("select round(sum(r.acctsessiontime)) Total from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery)");
            if(!$total){
                $total[0] = [
                    'Total' => 0
                ];
            }
        } else {
            $total[0] = [
                'Total' => 0
            ];
        }

        return response()->json($total[0], 200);
    }

    public function getTimeConnect(Request $request){

        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();

        if (isset($request->objectDataUser["Numero de Vouchers"])) {
            $users_radius = DB::connection($database)
                ->table('users_radius as ur')
                ->join($tabla->campania . ' as c', 'ur.id_cliente', '=', 'c.id')
                ->select('ur.username')
                ->where('c.num_voucher', $request->objectDataUser["Numero de Vouchers"])
                ->first();
        }
        if (isset($request->objectDataUser["Email"])) {
            $users_radius = DB::connection($database)
                ->table('users_radius as ur')
                ->join($tabla->campania . ' as c', 'ur.id_cliente', '=', 'c.id')
                ->select('ur.username')
                ->where('c.email', $request->objectDataUser["Email"])
                ->first();
        }

        if ($users_radius) {
            $Time = DB::connection('radius')->select("select round(sum(r.acctsessiontime)) Time from radacct r WHERE r.username='" . $users_radius->username . "'");
            if(!$Time){
                $Time[0] = [
                    'Time' => 0
                ];
            }
        } else {
            $Time[0] = [
                'Time' => 0
            ];
        }

        return response()->json($Time[0], 200);
    }

    public function getTimeConnectDB(Request $request){

        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->rowData[0]["id_evento"])->first();

        if(isset($request->rowData[0]["num_voucher"])){
            $users_radius = DB::connection($database)
                ->table('users_radius as ur')
                ->join($tabla->campania . ' as c', 'ur.id_cliente', '=', 'c.id')
                ->select('ur.username')
                ->where('c.num_voucher', $request->rowData[0]["num_voucher"])
                ->first();
        }
        if(isset($request->rowData[0]["email"])){
            $users_radius = DB::connection($database)
                ->table('users_radius as ur')
                ->join($tabla->campania . ' as c', 'ur.id_cliente', '=', 'c.id')
                ->select('ur.username')
                ->where('c.email', $request->rowData[0]["email"])
                ->first();
        }

        if ($users_radius) {
            $Time = DB::connection('radius')->select("select round(sum(r.acctsessiontime)) Time from radacct r WHERE r.username='" . $users_radius->username . "'");
            if(!$Time){
                $Time[0] = [
                    'Time' => 0
                ];
            }
        } else {
            $Time[0] = [
                'Time' => 0
            ];
        }

        return response()->json($Time[0], 200);
    }

    public function getChartBandwidth(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('l.id', $request->id_location)
            ->get();

        $whereUsersQuery = "";
        $count = count($users_radius);
        if ($count > 0) {
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery .= "r.username='" . $user->username . "'";
                if (($count - 1) > $key) {
                    $whereUsersQuery .= " OR ";
                }
            }
            $bandWidth = DB::connection('radius')->select("select round(sum(r.acctoutputoctets+r.acctinputoctets)) Quantity, date(r.acctstarttime) as DateRegister from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery) GROUP BY DateRegister");
        } else {
            $bandWidth = [];
        }

        return response()->json($bandWidth, 200);
    }
    
    public function getConnectedPeopleLocation(Request $request){

        $database = session('database');
        $fecha_inicial = '"'.date('Y-m-d H:i:00', strtotime($request->initialDate)).'"';
        $fecha_final = '"'.date('Y-m-d H:i:00', strtotime($request->finalDate)).'"';
        $campania = $request->id_event;

        $locacion = $request->id_location;

        $dataTotalRegisters = DB::select(
            "call dataTotalRegisters('".$database."','".$locacion."','".$campania."','".$fecha_inicial."','".$fecha_final."')"
        );
        return response()->json($dataTotalRegisters[0]);
        // $database = session('database');
        // $users_radius = RadiusController::getUsersRadius($request);
        // $whereUsersQuery = "";
        // $count = count($users_radius[0]);
        // if ($count > 0) {
        //     foreach ($users_radius as $users) {
        //         foreach ($users as $user){
        //             $whereUsersQuery .= "'" . $user->username . "',";
        //         }
        //     }
        //     $whereUsersQuery = substr($whereUsersQuery, 0, -1);
        //     $connectedNewPeopleLocation = DB::connection('radius')->select(
        //         "select count(s.cantidad) newPeople from (select count(*) cantidad, r.username FROM radacct as r where r.username in ($whereUsersQuery) and (r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate') GROUP BY r.username having cantidad = 1) s");
        //     if(!$connectedNewPeopleLocation){
        //         $connectedNewPeopleLocation[0] = [
        //             'newPeople' => 0
        //         ];
        //     }
        // } else {
        //     $connectedNewPeopleLocation[0] = [
        //         'newPeople' => 0
        //     ];
        // }

        // return response()->json($connectedNewPeopleLocation[0], 200);
    }

    // public function getConnectedOldPeopleLocation(Request $request){
    //     $database = session('database');
    //     $users_radius = RadiusController::getUsersRadius($request);
    //     $whereUsersQuery = "";
    //     $count = count($users_radius);
    //     if ($count > 0) {
    //         foreach ($users_radius as $users) {
    //             foreach ($users as $user){
    //                 $whereUsersQuery .= "'" . $user->username . "',";
    //             }
    //         }
    //         $whereUsersQuery = substr($whereUsersQuery, 0, -1);
    //         $connectedOldPeopleLocation = DB::connection('radius')->select(
    //             "select count(s.cantidad) oldPeople from (select count(*) cantidad, r.username FROM radacct as r where r.username in ($whereUsersQuery) and (r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate') GROUP BY r.username having cantidad > 1) s");
    //         if(!$connectedOldPeopleLocation){
    //             $connectedOldPeopleLocation[0] = [
    //                 'oldPeople' => 0
    //             ];
    //         }
    //     } else {
    //         $connectedOldPeopleLocation[0] = [
    //             'oldPeople' => 0
    //         ];
    //     }

    //     return response()->json($connectedOldPeopleLocation[0], 200);
    // }

    public function getConnectedOldPeopleCampaing(Request $request){
        $database = session('database');
        $fecha_inicial = '"'.date('Y-m-d H:i:00', strtotime($request->initialDate)).'"';
        $fecha_final = '"'.date('Y-m-d H:i:00', strtotime($request->finalDate)).'"';
        $campania = $request->id_event;

        $locacion = $request->id_location;

        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $campania)->first();
        $registers = DB::connection($database)->select("select tr.mac_cliente FROM $tabla->campania AS tr WHERE (tr.fecha_creacion BETWEEN $fecha_inicial AND $fecha_final) GROUP BY tr.mac_cliente");

        return response()->json($connectedOldPeopleCampaing[0]=[
            'traditionalPeople' => count($registers)
        ], 200);

        // $count = count($users_radius);
        // if ($count > 0) {
        //     foreach ($users_radius as $user) {
        //         $whereUsersQuery .= "'" . $user->username . "',";
        //     }
        //     $whereUsersQuery = substr($whereUsersQuery, 0, -1);
        //     $connectedOldPeopleCampaing = DB::connection('radius')->select(
        //         "select count(s.cantidad) traditionalPeople from (select count(*) cantidad, r.username FROM radacct as r where r.username in ($whereUsersQuery) and (r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate') GROUP BY r.username having cantidad > 1) s");
        //     if(!$connectedOldPeopleCampaing){
        //         $connectedOldPeopleCampaing[0] = [
        //             'traditionalPeople' => 0
        //         ];
        //     }
        // } else {
        //     $connectedOldPeopleCampaing[0] = [
        //         'traditionalPeople' => 0
        //     ];
        // }
       
    }

    // public function getConnectedNewPeopleCampaing(Request $request){
    //     $database = session('database');
    //     $users_radius = RadiusController::getUsersRadius($request);

    //     $whereUsersQuery = "";
        
    //     $count = count($users_radius);
    //     if ($count > 0) {
    //         foreach ($users_radius as $key => $user) {
    //             $whereUsersQuery .= "'" . $user->username . "',";
    //         }
    //         $whereUsersQuery = substr($whereUsersQuery, 0, -1);
    //         $connectedNewPeopleCampaing = DB::connection('radius')->select(
    //             "select count(s.cantidad) newPeople from (select count(*) cantidad, r.username FROM radacct as r where r.username in ($whereUsersQuery) and (r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate') GROUP BY r.username having cantidad = 1) s");
    //         if(!$connectedNewPeopleCampaing){
    //             $connectedNewPeopleCampaing[0] = [
    //                 'newPeople' => 0
    //             ];
    //         }
    //     } else {
    //         $connectedNewPeopleCampaing[0] = [
    //             'newPeople' => 0
    //         ];
    //     }
    //     return response()->json($connectedNewPeopleCampaing[0], 200);
    // }



    
    
    public function getChartTimeConnect(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('l.id', $request->id_location)
            ->get();

        $whereUsersQuery = "";
        $count = count($users_radius);
        if ($count > 0) {
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery .= "r.username='" . $user->username . "'";
                if (($count - 1) > $key) {
                    $whereUsersQuery .= " OR ";
                }
            }
            $timeConnect = DB::connection('radius')->select("select round(avg(r.acctsessiontime)) Quantity, date(r.acctstarttime) as DateRegister from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery) GROUP BY DateRegister");
        } else {
            $timeConnect = [];
        }

        return response()->json($timeConnect, 200);
    }

    public static function getUsersMoreVisit(Request $request){
        $database = session('database');
        $query = "select * from $database.users_radius where id_campania = $request->id_campaing";
        $dataUsersRadius = DB::select($query);
        $countUsers = count($dataUsersRadius);
        $QueryWhere = "";

        if($countUsers > 0){
            for($i=0; $i < $countUsers;$i++){
                for($i=0; $i < $countUsers;$i++){
                    $QueryWhere .= "r.username = '".$dataUsersRadius[$i]->username."'";
                    if(($countUsers - 1) > $i){
                        $QueryWhere .= " OR ";
                    }
                }
            }
            $QueryRadius = "select r.username, COUNT(*) as visitas from radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($QueryWhere) GROUP BY r.username HAVING  COUNT(*) > 1 ORDER BY visitas DESC";
            $UsersRadius = DB::connection('radius')->select($QueryRadius);
        }
        else {
            $UsersRadius = 0;
        }
        return $UsersRadius;
    }

    public static function getVisitHistory($userRadius){
        $QueryRadius = "select r.acctstarttime as Fecha_Registro, r.acctsessiontime as Tiempo_Conexion, r.acctoutputoctets as Data_Bajada, r.acctinputoctets as Data_Subida from radacct as r where r.username = '".$userRadius->username."' ORDER BY Fecha_Registro DESC";
        $UsersRadius = DB::connection('radius')->select($QueryRadius);
        return $UsersRadius;
    }

    public static function getPrefferWeekDayUser($userRadius){
        $queryChangeEs = "SET @@lc_time_names = 'es_CO'";
        $QueryRadius = "select COUNT(*) AS cantidad, DAYNAME(r.acctstarttime) AS dia_preferido FROM radacct as r where r.username = '".$userRadius->username."' GROUP BY dia_preferido ORDER BY cantidad desc LIMIT 1";

        DB::connection('radius')->select($queryChangeEs);
        $prefferWeekDayUser = DB::connection('radius')->select($QueryRadius);
        $queryChangeEn= "SET @@lc_time_names = 'en_US'";
        DB::connection('radius')->select($queryChangeEn);

        return $prefferWeekDayUser;
    }
}
