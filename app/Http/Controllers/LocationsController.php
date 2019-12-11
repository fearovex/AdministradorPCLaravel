<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocationsController extends Controller
{
    public function getLocations(){
        // return (session('database'));
        $locations = DB::connection(session('database'))
                        ->table('locaciones')
                        ->get();

    return response()->json($locations, 200);
    }
}
