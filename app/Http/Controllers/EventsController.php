<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events;

class EventsController extends Controller
{
    public function index(){
        $events = Events::firstOrFail()->get();
    
        return response()->json($events);
    }
}
