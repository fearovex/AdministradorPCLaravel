<?php

use Illuminate\Database\Seeder;
use App\User;

class userseedertable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'IPwork';
        $user->email = 'administrador@ipwork.com.co';
        $user->password = 'IPwork2019.';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'ipfi.png';
        $user->dashboard = "/app/locations/Hotel AC Cartagena";
        $user->id_rol = 2;
        $user->save();

        $user = new User();
        $user->name = 'Oxohotel';
        $user->email = 'admin@ermita.com';
        $user->password = '3rm1t42019';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'Unicentro';
        $user->email = 'admin@unicentro.com';
        $user->password = 'Un1c3ntr0.2019';
        $user->database = 'unicentro';
        $user->imgdashboard = 'unicentro.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'IPfi Admin';
        $user->email = 'ipfi_admin@ipwork.com.co';
        $user->password = 'IPwork2019.';
        $user->database = 'unicentro';
        $user->imgdashboard = 'ipfi.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'IPfi Admin';
        $user->email = 'mauricio.pascuas@ipwork.com.co';
        $user->password = 'IPwork2019.';
        $user->database = 'unicentro';
        $user->imgdashboard = 'ipfi.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 1;
        $user->save();
    }
}
