<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events;
use Illuminate\Support\Facades\DB;

class EventsController extends Controller
{
    public function index(Request $request){
        if($request->initialDate != 0){
            $fecha_inicial = $request->initialDate." ".$request->initialTime;
            $fecha_final = $request->finalDate." ".$request->finalTime;
        }
        else{
            $fecha_inicial = false;
            $fecha_final = false;
        }
        $events = DB::connection(session('database'))->table('eventos')
            ->where(function($q) use ($fecha_inicial, $fecha_final) {
                if ($fecha_inicial) $q->where('fecha_inicio' ,'>=', $fecha_inicial);
                if ($fecha_final) $q->where('fecha_fin' ,'<=', $fecha_final);
            })
            ->get();
    
        return response()->json($events);
    }
}
