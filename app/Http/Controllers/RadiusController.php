<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Config;

class RadiusController extends Controller
{
    public function getDataRadiusInfo(){
        $dataRadius = DB::connection('radius')->table("permanent_users")->get();
        return response()->json($dataRadius);
    }

    public function getPromedyBandwidth(Request $request){
        $database = session('database');
        $users_radius = DB::connection($database)
        ->table('users_radius as ur')
        ->join('campania as c', 'ur.id_campania', '=', 'c.id')
        ->join('locaciones as l', 'c.id_locacion', '=', 'l.id')
        ->select('ur.username')
        ->where('l.id',$request->id_location)
        ->get();

        $whereUsersQuery = "";
        $count = count($users_radius);
        if($count > 0){
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery.= "r.username='".$user->username."'";
                if(($count-1) > $key){
                    $whereUsersQuery.= " OR ";
                }
            }
            $promedy = DB::connection('radius')->select("select round(avg(r.acctoutputoctets+r.acctinputoctets)) Promedio from radacct r WHERE acctstarttime >= '$request->initialDate' AND acctstoptime <= '$request->finalDate' AND ($whereUsersQuery)");
        }
        else{
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
        ->where('l.id',$request->id_location)
        ->get();

        $whereUsersQuery = "";
        $count = count($users_radius);
        if($count > 0){
            foreach ($users_radius as $key => $user) {
                $whereUsersQuery.= "r.username='".$user->username."'";
                if(($count-1) > $key){
                    $whereUsersQuery.= " OR ";
                }
            }
            $promedy = DB::connection('radius')->select("select round(avg(r.acctsessiontime)) Promedio from radacct r WHERE acctstarttime >= '$request->initialDate' AND acctstoptime <= '$request->finalDate' AND ($whereUsersQuery)");
        }
        else{
            $promedy[0] = [
                'Promedio' => 0
            ];
        }

        return response()->json($promedy[0], 200);
    }
}
