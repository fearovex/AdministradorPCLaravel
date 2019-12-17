<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events;
use Illuminate\Support\Facades\DB;

class EventsController extends Controller
{
    public function index(){
        $events = DB::connection(session('database'))
            ->table('eventos')
            ->get();
    
        return response()->json($events);
    }

    public function UltimoEvento(){

        $Evento = DB::connection(session('database'))
            ->table('eventos')
            ->orderBy('fecha_inicio', 'DESC')
            ->limit(1)
            ->first();

        return response()->json($Evento, 200);
    }
}
