<?php

namespace App\Http\Middleware;

use App\User; 
use Closure;
use Config;

class DatabaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = User::where('email', session('email'))->where('password', session('password'))->first();

        Config::set("database.connections.".$user->database, [
            'driver' => 'mysql',
            "host" => "localhost",
            "database" => $user->database,
            "username" => env('DB_USERNAME'),
            "password" => env('DB_PASSWORD'),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
        ]);

        session(['database' => $user->database]);

        return $next($request);
    }
}
