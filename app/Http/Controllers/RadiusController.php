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

        $queryRadius=[];
        for ($i=0; $i < count($dataCampaing); $i++) {
                array_push($queryRadius,DB::connection('radius')->select("select username nombreUsuarioRadius, SUM(acctsessiontime) as tiempoConexion from radacct where username="."'".$dataCampaing[$i]->username."' GROUP BY username"));
        }
        $timeConn=0;
        for ($j=0; $j < count(array_filter($queryRadius)); $j++) { 
           $timeConn += $queryRadius[$j][0]->tiempoConexion;
        }
        $usersRadiusCount=count(array_filter($queryRadius));
        $averageTime= $timeConn/$usersRadiusCount;
        return response()->json($averageTime);
    }

    public function getDataRadiusConnected(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select * from $database.users_radius where id_campania = $request->id_campaing";
        $dataCampaing = DB::select($query);

        $queryRadius=[];
        for ($i=0; $i < count($dataCampaing); $i++) {
                array_push($queryRadius,DB::connection('radius')->select("select username nombreUsuarioRadius, count(*) as Conectados from radacct where username="."'".$dataCampaing[$i]->username."' and acctstoptime IS NULL GROUP BY acctstoptime"));
        }
        return response()->json(array_filter($queryRadius));
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
            $connectedPeopleLocation = DB::connection('radius')->select("select count(*) People from radacct r WHERE r.acctstoptime IS NULL AND ($whereUsersQuery)");
            if(!$connectedPeopleLocation){
                $connectedPeopleLocation[0] = [
                    'People' => 0
                ];
            }
        } else {
            $connectedPeopleLocation[0] = [
                'People' => 0
            ];
        }

        return response()->json($connectedPeopleLocation[0], 200);
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
