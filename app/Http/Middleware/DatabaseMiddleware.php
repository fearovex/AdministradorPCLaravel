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

            //pre y producción
            'driver' => env('FTP_DRIVER'),
            'host' => env('FTP_HOST'),
            'port' => env('FTP_PORT'),
            'root' => env('FTP_ROOTPATH'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
            'passive' => true,
            //'visibility' => 'public',
            //'permPublic' => 0777,
            //'directoryPerm' => 0777,

            //local
            // 'driver' => 'ftp',
            // 'host' => '192.168.0.48',
            // 'port' => '21',
            // 'root' => '/public/portales',
            // 'username' =>'Miguel Acevedo',
            // 'password' => 'dogfire1',
            
            // Optional FTP Settings...
            // 'ssl' => true,
            // 'timeout' => 30,
        ]);


        Config::set("filesystems.disks.ftp_unicentro_produccion", [
            'driver' => 'sftp',
            'host' => '157.230.157.246',
            'port' => '22',
            'root' => '/var/www/unicentro.ipwork.io/html/',
            'username' => 'root',
            'password' => 'IPwork2019.',
            'passive' => true,
            'visibility' => 'public',
            'permPublic' => 0777,
            'directoryPerm' => 0777,
        ]);

        Config::set("filesystems.disks.ftp_ermita_produccion", [
            'driver' => 'sftp',
            'host' => '157.230.157.246',
            'port' => '22',
            'root' => '/var/www/oxohotel.ipwork.io/html/',
            'username' => 'root',
            'password' => 'IPwork2019.',
            'passive' => true,
            'visibility' => 'public',
            'permPublic' => 0777,
            'directoryPerm' => 0777,
        ]);

        session(['database' => $user->database]);

        return $next($request);
    }
}
