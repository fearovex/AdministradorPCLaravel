<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use App\Log_Login;
use Browser;
use Config;
use App\Http\Controllers\SideBarController;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');

       
    
    }

    public function login (Request $request){

        $user = User::where('email', $request->email)->where('password', $request->password)->first();
        if($user){
            session(['email' => $request->email]);
            session(['password' => $request->password]);
            session(['id_user' => $user->id]);
            session(['browser' => Browser::browserName()]);
            session(['ip_conection' => $request->ip_public]);
            session(['active' => true ]);
            session(['rol' => $user->id_rol]);
            session(['location' => $user->location]);
            session(['campaing' => $user->campaing]);
            session(['DB_USERNAME' => env('DB_USERNAME')]);
            session(['DB_PASSWORD' => env('DB_PASSWORD')]);


            $log = new Log_Login();
            $log->id_user = session('id_user');
            $log->browser = session('browser');
            $log->ip_conection = session('ip_conection');
            $log->action = 'Login';
            $log->save();


            $user->where("id", $user->id)
                ->update(["conexion" => 1]);

            Config::set("database.connections.".$user->database, [
                'driver' => 'mysql',
                "host" => "localhost",
                "database" => $user->database,
                "username" => env('DB_USERNAME'),
                "password" => env('DB_PASSWORD'),
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
            ]);
            
            SideBarController::getSideBarRol($user->id_rol,$user->database);
            session(['emailValidate' => 'CSV']);
            return response()->json($user, 200);

        }else{
            return response()->json($user, 500);

        }
    }

    public function logout (){

        $log = new Log_Login();
        $log->id_user = session('id_user');
        $log->browser = session('browser');
        $log->ip_conection = session('ip_conection');
        $log->action = 'Logout';
        $log->save();

        $user = User::select('id');    
        $user->where('id', session('id_user'))
            ->update(["conexion" => 0]);
        
        session()->forget(['emailValidate','database', 'email', 'password', 'id_user', 'browser', 'ip_conection','active', 'rol','location','campaing']);
        
        return redirect()->route('home', ['/']);
    }
    
}
