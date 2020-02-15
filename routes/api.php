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

        //apis para detalle de campañas
        Route::post('/detailEvents','DetailEventsController@index');   

        Route::post('/nameColumnNames','DetailEventsController@getColumnNames');

        Route::post('/prefferWeekDay','DetailEventsController@prefferWeekDayUser');
        
        Route::post('/visitHistory','DetailEventsController@visitHistoryUser');
        
        Route::post('/userRadius','DetailEventsController@UserRadius');
        
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

        Route::post('/topCampaings', 'GraficasController@TopCampaings');
        
        Route::post('/lastTen', 'GraficasController@LastTenUsersCampaing');

        Route::post('/topZones', 'GraficasController@TopZones');
        
        Route::post('/topVisits', 'GraficasController@TopVisits');

        Route::post('/TotalRecords', 'GraficasController@TotalRecords');

        Route::post('/UsersMoreVisit', 'GraficasController@UsersMoreVisit');

        Route::post('/LastTenUsersListCampaing', 'GraficasController@LastTenUsersListCampaing');
        
        Route::post('/TopTenAgesList', 'GraficasController@TopTenAgesList');
                
        Route::post('/PromedyAge', 'GraficasController@PromedyAge');
        
        Route::post('/VouchersUse', 'GraficasController@VouchersUse');

        Route::post('/TopFiveReasonVisits', 'GraficasController@TopFiveReasonVisits');

        Route::post('/TopFiveRooms', 'GraficasController@TopFiveRooms');

        Route::post('/TopTenUsersCampaing', 'GraficasController@TopTenUsersCampaing');

        Route::post('/userInfoDB', 'GraficasController@UserInfoDB');
        
        Route::post('/userRadiusDB', 'GraficasController@UserRadiusDB');

        Route::post('/prefferWeekDayDB', 'GraficasController@PrefferWeekDayDB');

        Route::post('/radiusApiTimeAverage', 'RadiusController@getDataRadiusTimeAverage');
        
        Route::post('/radiusApiConnected', 'RadiusController@getDataRadiusConnected');
        
        Route::post('/visitHistoryDB','GraficasController@visitHistoryUserDB');

        Route::post('/promedyBandwidth', 'RadiusController@getPromedyBandwidth');

        Route::post('/promedyTimeSession', 'RadiusController@getPromedyTimeSession');

        Route::post('/timeConnect', 'RadiusController@getTimeConnect');
        
        Route::post('/timeConnectDB', 'RadiusController@getTimeConnectDB');
        
        Route::post('/ConnectedPeopleLocation', 'RadiusController@getConnectedPeopleLocation');
        
        Route::post('/ChartBandwidth', 'RadiusController@getChartBandwidth');
        
        Route::post('/ChartTimeConnect', 'RadiusController@getChartTimeConnect');

        Route::post('/uploadImage', 'CMSController@imgUpload');
    });
 });
