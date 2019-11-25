<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events;
use Illuminate\Support\Facades\DB;

class EventsController extends Controller
{
    public function index(){
        $events = DB::connection(session('database'))->table('eventos')->get();
    
        return response()->json($events);
    }
}
