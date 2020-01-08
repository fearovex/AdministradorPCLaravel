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
}
