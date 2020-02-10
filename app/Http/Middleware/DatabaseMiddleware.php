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

        $usuario = session('DB_USERNAME');
        $password = session('DB_PASSWORD');

        Config::set("database.connections.".$user->database, [
            'driver' => 'mysql',
            "host" => "localhost",
            "database" => $user->database,
            "username" => $usuario,
            "password" => $password,
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
        ]);

        Config::set("filesystems.disks.ftp_".$user->database, [
            //Habilitar/Instalar la extension de ftp para php
            'driver' => 'ftp',
            'host' => '192.168.1.79',
            'username' => 'IPwork-Dev-2',
            'password' => 'IPwork2019',
            'port' => 21,
            'passive' => true,
            
            // Optional FTP Settings...
            // 'root' => '',
            // 'ssl' => true,
            // 'timeout' => 30,
        ]);

        session(['database' => $user->database]);

        return $next($request);
    }
}
