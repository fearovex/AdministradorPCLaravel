<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class DetailEventsController extends Controller
{
    public function getColumnNames(Request $request){
        $table_name= DB::connection(session('database'))->table('campania')->select('campania')->where('id',$request->id_event)->first()->campania;
        $db = session('database');
        $getColumnNames = DB::select("SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = '".$db."' AND TABLE_NAME = '".$table_name."';");
        foreach ($getColumnNames as $column){
            $diccionario = DB::connection(session('database'))->table('diccionario')->select('alias_column')->where('name_column',$column->COLUMN_NAME)->first();
            if($diccionario){
                $column->COLUMN_NAME = $diccionario->alias_column;
            }
        }
        
        return response()->json(($getColumnNames), 200);
    }

    public function index(Request $request){
        $select = "";
        foreach ($request->nameColumns as $column){
            $diccionario = DB::connection(session('database'))->table('diccionario')->select('name_column')->where('alias_column',$column)->first();
            if($diccionario){
                $select .= $diccionario->name_column."' ".$column."',";
            }
            else{
                $select .= $column.",";
            }
        }        
        $select = substr($select, 0, -1);
        $totalInitialDate = $request->initialDate;
        $totalFinalDate = $request->finalDate;
        
        $table_name= DB::connection(session('database'))->table('campania')->select('campania')->where('id',$request->id_event)->first()->campania;
        
        $selectCompleto = "select ".$select." from ".$table_name." where fecha_creacion Between '".$totalInitialDate."' and '".$totalFinalDate."'";
        
        $detailEvents = DB::connection(session('database'))->select($selectCompleto);
        
        return response()->json($detailEvents, 200);
    }

    public function prefferWeekDayUser(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();

        // return response()->json($request->objectDataUser["Email"]);
        if(isset($request->objectDataUser["Numero de Vouchers"])){
            $queryChangeEs = "SET @@lc_time_names = 'es_CO'";
            $query = "select COUNT(*) AS cantidad, DAYNAME(fecha_creacion) AS dia_preferido FROM $database.$tabla->campania WHERE num_voucher = "."'".$request->objectDataUser["Numero de Vouchers"]."'"." GROUP BY dia_preferido ORDER BY cantidad desc LIMIT 1";
            
            DB::select($queryChangeEs);
            $prefferWeekDayUser = DB::select($query);
            $queryChangeEn= "SET @@lc_time_names = 'en_US'";
            DB::select($queryChangeEn);
            return  response()->json($prefferWeekDayUser);
        }
        if(isset($request->objectDataUser["Email"])){
            $queryChangeEs= "SET @@lc_time_names = 'es_CO'";
            $query = "select COUNT(*) AS cantidad, DAYNAME(fecha_creacion) AS dia_preferido FROM $database.$tabla->campania WHERE email = "."'".$request->objectDataUser["Email"]."'"." GROUP BY dia_preferido ORDER BY cantidad desc LIMIT 1";
            
            DB::select($queryChangeEs);
            $prefferWeekDayUser = DB::select($query);
            $queryChangeEn= "SET @@lc_time_names = 'en_US'";
            DB::select($queryChangeEn);
            return  response()->json($prefferWeekDayUser);
        }
    }

    public function visitHistoryUser(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();

        // return response()->json($request->objectDataUser["Email"]);
        if(isset($request->objectDataUser["Numero de Vouchers"])){
            $queryChangeEs = "SET @@lc_time_names = 'es_CO'";
            $query = "select fecha_creacion as 'Fecha_Registro' FROM $database.$tabla->campania WHERE num_voucher = '".$request->objectDataUser["Numero de Vouchers"]."' ORDER BY Fecha_Registro desc";
            
            DB::select($queryChangeEs);
            $visitHistory = DB::select($query);
            $queryChangeEn= "SET @@lc_time_names = 'en_US'";
            DB::select($queryChangeEn);
            return  response()->json($visitHistory);
        }
        if(isset($request->objectDataUser["Email"])){
            $queryChangeEs= "SET @@lc_time_names = 'es_CO'";
            $query = "select fecha_creacion as 'Fecha_Registro' FROM $database.$tabla->campania WHERE email = '".$request->objectDataUser["Email"]."' ORDER BY Fecha_Registro desc";
            
            DB::select($queryChangeEs);
            $visitHistory = DB::select($query);
            $queryChangeEn= "SET @@lc_time_names = 'en_US'";
            DB::select($queryChangeEn);
            return  response()->json($visitHistory);
        }
    }
}
