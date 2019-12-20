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

            if($user->id_rol == 2){
                Config::set("database.connections.".$user->database, [
                    'driver' => 'mysql',
                    "host" => "localhost",
                    "database" => $user->database,
                    "username" => env('DB_USERNAME'),
                    "password" => env('DB_PASSWORD'),
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                ]);
                
                    $idLocacion = 1;
                    $locations=DB::connection($user->database)
                    ->select("select * from locaciones where id=".$idLocacion);
                    $locationsArray = [];
                        $campaings=DB::connection($user->database)
                                        ->select("select * from campania where id_locacion =".$idLocacion);
                        foreach($campaings as $countC => $campaing){
                            $locationsArray[0] = (object) array(
                                                      'menu_title'=>$locations[0]->nombre,
                                                      'child_routes'=>[
                                                            (object) array(
                                                            'menu_title'=>$campaing->campania,
                                                            'path'=>'/app/locations/'.$locations[0]->nombre.'/campañas/'.$campaing->campania)]
                                                           );
                            }
                    $sidebarJSON = (object) array('category1' => $locationsArray); 
                   
                    session(['sideBar' => $sidebarJSON]);
                    return response()->json($user, 200);
            }if($user->id_rol == 1){
                Config::set("database.connections.".$user->database, [
                    'driver' => 'mysql',
                    "host" => "localhost",
                    "database" => $user->database,
                    "username" => env('DB_USERNAME'),
                    "password" => env('DB_PASSWORD'),
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                ]);

              

                $locations=DB::connection($user->database)
                ->select("select * from locaciones");
            
                $locationsArray = [];
                $campaingsArray =[];
                foreach ($locations as $count => $location){
                    $campaings=DB::connection($user->database)
                                    ->select("select * from campania where id_locacion =".$location->id);
                    foreach($campaings as $countC => $campaing){
                        
                        $campaingsArray[$countC] =  (object) array( 
                                                    'menu_title'=>$campaing->campania,
                                                    'id_campain'=> $campaing->id,
                                                    'tb' => $campaing->campania,
                                                    'id_location' => $location->id,
                                                    'path'=>'/app/locations/'.$location->nombre.'/campañas/'.$campaing->campania);
                        $locationsArray[$count] = (object) array(
                                                    'menu_title'=>$location->nombre,
                                                    'id_campain'=> '',
                                                    'tb' => '',
                                                    'id_location' => $location->id,
                                                    'type_multi'=>true,
                                                    'child_routes'=>[
                                                        (object) array(
                                                            'menu_title'=>'DetailCampaings',
                                                            'type_multi'=> false,
                                                            'id_campain'=> '',
                                                            'tb' => '',
                                                            'id_location' => $location->id,
                                                            'path'=>'/app/locations/'.$location->nombre.'/campañas'
                                                        ),
                                                        (object) array(
                                                            'menu_title'=>'Campaings',
                                                            'type_multi'=>true,
                                                            'menu_icon'=>'zmdi zmdi-view-compact',
                                                            'child_routes'=>
                                                               $campaingsArray),
                                                        (object) array(
                                                                'menu_title'=>'Zonas',
                                                                'id_campain'=> '',
                                                                'tb' => '',
                                                                'id_location' => $location->id,
                                                                'type_multi'=> false,
                                                                'path'=>'/app/locations/'.$location->nombre.'/zonas'
                                                        ),
                                                        (object) array(
                                                            'menu_title'=>'Dispositivos',
                                                            'id_campain'=> '',
                                                            'tb' => '',
                                                            'id_location' => $location->id,
                                                            'type_multi'=> false,
                                                            'path'=>'/app/locations/'.$location->nombre.'/dispositivos'
                                                        )
                                                        ]);
                        }
                        
                }
                $sidebarJSON = (object) array('category1' => $locationsArray);
                session(['sideBar' => $sidebarJSON]);
                return response()->json($user, 200);

            }if($user->id_rol == 3){
                Config::set("database.connections.".$user->database, [
                    'driver' => 'mysql',
                    "host" => "localhost",
                    "database" => $user->database,
                    "username" => env('DB_USERNAME'),
                    "password" => env('DB_PASSWORD'),
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                ]);
                $idLocacion = 1;
                $campania = 'publicidad_a_2019_campania';
                $campaingArray = [];
                $campaing=DB::connection($user->database)
                                ->select('select * from campania where campania = "'.$campania.'" and id_locacion='.$idLocacion);
                $campaingArray[0] = (object) array(
                                            'menu_title'=>$campaing[0]->campania,
                                            'path'=> '/app/locations/'.$idLocacion.'/campañas/campaña'
                                    );

                $sidebarJSON = (object) array('category1' => $campaingArray); 
                
                session(['sideBar' => $sidebarJSON]);
                return response()->json($user, 200);
            }
               
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
        

        session()->forget(['database', 'email', 'password', 'id_user', 'browser', 'ip_conection','active']);
        
        return redirect()->route('home', ['/']);
    }
    
}
