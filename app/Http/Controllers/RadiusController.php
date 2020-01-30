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
   
}
