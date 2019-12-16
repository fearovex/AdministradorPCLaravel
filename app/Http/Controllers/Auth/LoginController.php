<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use App\Log_Login;
use Browser;
use Config;
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
                "username" => 'root',
                "password" => '',
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
            ]);

            $locationsCampaings=DB::connection($user->database)
                ->select("select locaciones.id AS id_locacion, id_ciudad, locaciones.nombre AS nombreLocacion, locaciones.descripcion AS descripcionLocacion, locaciones.fecha_creacion AS locacionFechaCreacion, eventos.nombre AS nombreEvento, eventos.descripcion AS descripcionEvento, fecha_inicio, fecha_fin, eventos.fecha_creacion AS eventoFechaCreacion, campania  FROM locaciones  INNER JOIN eventos ON eventos.id_locacion = locaciones.id");
            
            $locations = [];
                foreach ($locationsCampaings as $count => $location){

                        $locations[$count] = (object) array('menu_title'=>$location->nombreLocacion,
                                                            "new_item"=> false,
                                                            'path'=>'/app/location');
                }
            $sidebarJSON = (object) array('category1' => [
                (object) array('menu_title' => 'sidebar.locations',
                               'menu_icon' => 'zmdi zmdi-map',
                               'path' => '/app/locations',
                               'child_routes' => $locations)]);


            return response()->json([$user,$sidebarJSON], 200);

        }else{
            return response()->json([$user], 500);

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
        

        session()->forget(['database', 'email', 'password', 'id_user', 'browser', 'ip_conection','active']);
        
        return redirect()->route('home', ['/']);
    }
    
}
