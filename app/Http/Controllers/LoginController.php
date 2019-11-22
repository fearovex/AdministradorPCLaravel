<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class LoginController extends Controller
{
    public function login (Request $request){
        $user = User::where('email', $request->email)->where('password', $request->password)->first();
        if($user){
            $path = base_path('.env');
            file_put_contents($path, str_replace(
                "DB_DATABASE=".env('DB_DATABASE'), "DB_DATABASE=".$user->database, file_get_contents($path)
            ));
            return response()->json($user, 200);
        }else{
            return response()->json($user, 500);
        }
    }

    public function logout (){
        $path = base_path('.env');
        file_put_contents($path, str_replace(
            "DB_DATABASE=".env('DB_DATABASE'), "DB_DATABASE=ipfiadmin", file_get_contents($path)
        ));

        return env('DB_DATABASE');
    }
}
