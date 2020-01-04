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
        
        return response()->json(($getColumnNames), 200);
    }

    public function index(Request $request){

        $totalInitialDate = $request->initialDate;
        $totalFinalDate = $request->finalDate;

        $table_name= DB::connection(session('database'))->table('campania')->select('campania')->where('id',$request->id_event)->first()->campania;

        $detailEvents = DB::connection(session('database'))->table($table_name)->whereBetween('fecha_creacion',[$totalInitialDate, $totalFinalDate])->get();

        return response()->json($detailEvents, 200);
    }
}
