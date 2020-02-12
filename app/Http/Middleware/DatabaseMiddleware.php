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
            //Configurar para redireccionar al ftp deseado
            'driver' => env('FTP_DRIVER'),
            'host' => env('FTP_HOST'),
            'port' => env('FTP_PORT'),
            'root' => env('FTP_ROOTPATH'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
            'visibility' => 'public',
            'permPublic' => 0777,
            'directoryPerm' => 0777,
        ]);

        session(['database' => $user->database]);

        return $next($request);
    }
}
