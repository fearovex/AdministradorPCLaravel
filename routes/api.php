<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'cors'], function() {

    Route::post('/login','Auth\LoginController@login');

    Route::post('/password/email','Api\ForgotPasswordController@sendResetLinkEmail');
    
    Route::post('/password/reset','Api\ResetPasswordController@reset');

    Route::get('/hidden','Api\GeneralController@index');

    Route::group(['middleware' => 'connection'], function() {
        
        Route::get('/events','EventsController@index');

        Route::post('/graficas', 'GraficasController@Consulta');
        
        Route::post('/detailEvents','DetailEventsController@index');
        
        Route::post('/nameColumnNames','DetailEventsController@getColumnNames');
        
        Route::resource('/locations','LocationsController');
        
        
        
        Route::get('/logout', 'Auth\LoginController@logout');

         Route::resource('/campanias','CampañaController');

         Route::resource('/zonas','ZonaController');

         Route::resource('/dispositivos','DispositivoController');

         Route::resource('/editzona','ZonaController');

         Route::resource('/editdispositivo','DispositivoController');

         Route::post("/vouchers/create","VouchersController@create");

         Route::post("/vouchers/store","VouchersController@store");

         Route::post("/vouchers","VouchersController@index");

         Route::post("/vouchers/voucherInfo","VouchersController@voucherInfo");

         Route::post('/csvEmail', 'Api\CsvEmail@sendResetLinkEmail');
    });
 });
