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
Route::post('/login','LoginController@login');

Route::post('/graficas', 'GraficasController@Consulta');
Route::get('/evento', 'GraficasController@UltimoEvento');

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/detailEvents','DetailEventsController@index');

Route::post('/nameColumnNames','DetailEventsController@getColumnNames');

Route::get('/events','EventsController@index');
