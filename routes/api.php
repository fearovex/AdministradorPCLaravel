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

    Route::group(['middleware' => 'connection'], function() {
        Route::get('/logout', 'Auth\LoginController@logout');

        Route::post('/graficas', 'GraficasController@Consulta');
        
        Route::get('/evento', 'GraficasController@UltimoEvento');

        Route::post('/detailEvents','DetailEventsController@index');

        Route::post('/nameColumnNames','DetailEventsController@getColumnNames');

        Route::post('/events','EventsController@index');
    });
 });
