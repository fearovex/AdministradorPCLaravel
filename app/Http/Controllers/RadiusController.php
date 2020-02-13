<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Config;

class RadiusController extends Controller
{
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
            $queryRadiusPromedy =  DB::connection('radius')->select("select ROUND(SUM(acctsessiontime)) as tiempoConexion from rd.radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereQueryCampaing)");
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
            $total = DB::connection('radius')->select("select round(sum(r.acctoutputoctets+r.acctinputoctets)) Total from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery)");
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
    
    public function getConnectedNewPeopleLocation(Request $request){
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
            $connectedNewPeopleLocation = DB::connection('radius')->select(
                "select count(connected) as newPeople FROM (SELECT COUNT(*) connected, username FROM radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereUsersQuery) GROUP BY username ORDER BY connected ASC) AS rd WHERE rd.connected = 1 GROUP BY rd.connected");
            if(!$connectedNewPeopleLocation){
                $connectedNewPeopleLocation[0] = [
                    'newPeople' => 0
                ];
            }
        } else {
            $connectedNewPeopleLocation[0] = [
                'newPeople' => 0
            ];
        }

        return response()->json($connectedNewPeopleLocation[0], 200);
    }

    public function getConnectedOldPeopleLocation(Request $request){
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
            $connectedOldPeopleLocation = DB::connection('radius')->select(
                "select count(connected) as oldPeople FROM (SELECT COUNT(*) connected, username FROM radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereUsersQuery) GROUP BY username ORDER BY connected ASC) AS rd WHERE rd.connected > 1 GROUP BY rd.connected");
            if(!$connectedOldPeopleLocation){
                $connectedOldPeopleLocation[0] = [
                    'oldPeople' => 0
                ];
            }
        } else {
            $connectedOldPeopleLocation[0] = [
                'oldPeople' => 0
            ];
        }

        return response()->json($connectedOldPeopleLocation[0], 200);
    }

    public function getConnectedOldPeopleCampaing(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('c.id', $request->id_campaing)
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
            $connectedOldPeopleCampaing = DB::connection('radius')->select(
                "select count(connected) as traditionalPeople FROM (SELECT COUNT(*) connected, username FROM radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereUsersQuery) GROUP BY username ORDER BY connected ASC) AS rd WHERE rd.connected > 1 GROUP BY rd.connected");
            if(!$connectedOldPeopleCampaing){
                $connectedOldPeopleCampaing[0] = [
                    'traditionalPeople' => 0
                ];
            }
        } else {
            $connectedOldPeopleCampaing[0] = [
                'traditionalPeople' => 0
            ];
        }
        return response()->json($connectedOldPeopleCampaing[0], 200);
    }

    public function getConnectedNewPeopleCampaing(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
            ->table('users_radius as ur')
            ->join('campania as c', 'ur.id_campania', '=', 'c.id')
            ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
            ->select('ur.username')
            ->where('c.id', $request->id_campaing)
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
            $connectedNewPeopleCampaing = DB::connection('radius')->select(
                "select count(connected) as newPeople FROM (SELECT COUNT(*) connected, username FROM radacct as r where r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' and ($whereUsersQuery) GROUP BY username ORDER BY connected ASC) AS rd WHERE rd.connected = 1 GROUP BY rd.connected");
            if(!$connectedNewPeopleCampaing){
                $connectedNewPeopleCampaing[0] = [
                    'newPeople' => 0
                ];
            }
        } else {
            $connectedNewPeopleCampaing[0] = [
                'newPeople' => 0
            ];
        }
        return response()->json($connectedNewPeopleCampaing[0], 200);
    }



    
    
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
            $timeConnect = DB::connection('radius')->select("select round(sum(r.acctsessiontime)) Quantity, date(r.acctstarttime) as DateRegister from radacct r WHERE r.acctstarttime BETWEEN '$request->initialDate' AND '$request->finalDate' AND ($whereUsersQuery) GROUP BY DateRegister");
        } else {
            $timeConnect = [];
        }

        return response()->json($timeConnect, 200);
    }
}
