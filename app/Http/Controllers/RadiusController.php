<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Config;

class RadiusController extends Controller
{
    public function getDataRadiusInfo()
    {
        $dataRadius = DB::connection('radius')->table("permanent_users")->get();
        return response()->json($dataRadius);
    }

    public function getPromedyBandwidth(Request $request)
    {
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
            $promedy = DB::connection('radius')->select("select round(avg(r.acctoutputoctets+r.acctinputoctets)) Promedio from radacct r WHERE acctstarttime >= '$request->initialDate' AND acctstoptime <= '$request->finalDate' AND ($whereUsersQuery)");
        } else {
            $promedy[0] = [
                'Promedio' => 0
            ];
        }

        return response()->json($promedy[0], 200);
    }

    public function getPromedyTimeSession(Request $request)
    {
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
            $promedy = DB::connection('radius')->select("select round(avg(r.acctsessiontime)) Promedio from radacct r WHERE acctstarttime >= '$request->initialDate' AND acctstoptime <= '$request->finalDate' AND ($whereUsersQuery)");
        } else {
            $promedy[0] = [
                'Promedio' => 0
            ];
        }

        return response()->json($promedy[0], 200);
    }

    public function getTimeConect(Request $request){

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
        } else {
            $Time[0] = [
                'Time' => 0
            ];
        }

        return response()->json($Time[0], 200);
    }

    public function getTimeConectDB(Request $request){

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
        } else {
            $Time[0] = [
                'Time' => 0
            ];
        }

        return response()->json($Time[0], 200);
    }
}
