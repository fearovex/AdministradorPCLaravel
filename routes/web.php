<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\User;

Route::get('{any}', function () {
    
    $sidebarJSON = (object) array('category1' => [
    (object) array('menu_title' => 'sidebar.events',
                    'menu_icon' => '',
                    'path' => '',
                    'child_routes' => [
                        (object) array(
                            'menu_title' => 'sidebar.ecommerce',
                            'new_item' => false,
                            'path'=> '')
                    ])]);

    return view('welcome',['navLinks' => $sidebarJSON]);
})->where('any','.*')->name('home');

