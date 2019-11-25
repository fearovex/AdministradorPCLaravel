<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use Config;

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

            return response()->json($user, 200);

        }else{

            return response()->json($user, 500);

        }
    }

    public function logout (){
        session(['database' => '']);
        return redirect()->route('home', ['/']);
    }
}
