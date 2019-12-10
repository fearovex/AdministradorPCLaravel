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
        $user->database = 'unicentro';
        $user->imgdashboard = 'ipfi.png';
        $user->save();

        $user = new User();
        $user->name = 'Oxohotel';
        $user->email = 'oxohotel@ipwork.com.co';
        $user->password = 'Oxohotel2019';
        $user->database = 'portal_oxohotel';
        $user->imgdashboard = 'oxohotel.png';
        $user->save();

        $user = new User();
        $user->name = 'Unicentro';
        $user->email = 'unicentro@ipwork.com.co';
        $user->password = 'Unicentro2019';
        $user->database = 'unicentro';
        $user->imgdashboard = 'unicentro.png';
        $user->save();

        $user = new User();
        $user->name = 'IPfi Admin';
        $user->email = 'ipfi_admin@ipwork.com.co';
        $user->password = 'IPwork2019.';
        $user->database = 'unicentro';
        $user->imgdashboard = 'ipfi.png';
        $user->save();
    }
}
