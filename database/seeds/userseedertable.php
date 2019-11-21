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
        $user->name = 'Administrador';
        $user->email = 'administrador@ipwork.com.co';
        $user->password = 'IPwork2019.';
        $user->database = 'ipfiadmin';
        $user->imgdashboard = 'Assets/logos/ipfi.png';
        $user->save();

        $user = new User();
        $user->name = 'Administrador';
        $user->email = 'oxohotel@ipwork.com.co';
        $user->password = 'Oxohotel2019';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'Assets/logos/oxohotel.png';
        $user->save();

        $user = new User();
        $user->name = 'Administrador';
        $user->email = 'unicentro@ipwork.com.co';
        $user->password = 'Unicentro2019';
        $user->database = 'unicentro';
        $user->imgdashboard = 'Assets/logos/unicentro.png';
        $user->save();
    }
}
