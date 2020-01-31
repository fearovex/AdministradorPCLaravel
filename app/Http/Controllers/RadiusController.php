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
   
}
