<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Password;
use App\Notifications\CsvNotification;
// use Illuminate\Notifications\Notification;
use Notification;

class CsvEmail extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;
   
    
    // public function __construct()
    // {
    //     $this->middleware('guest');
    // }


    protected function sendResetLinkResponse(Request $request, $response)
    {
        return response(['message'=> trans('Se ha enviado el archivo CSV al correo electrónico!')]);

    }


    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response(['error'=> trans($response)], 422);

    }

    protected function sendResetLinkEmail(Request $request)
    {
        
        $response = $this->validateEmail($request);
        if($request->columns[1] == 'Contraseña'){
            date_default_timezone_set('America/Bogota');
            $filename = 'Contraseñas'.date("Y-m-d-His").'.csv';
                Notification::route('mail', "$request->email")
                            ->notify(new CsvNotification($request->columns,$request->rows,$request->name_campaing, $filename));
            unlink($filename);
        }
        else{
            date_default_timezone_set('America/Bogota');
            $filename = 'Vouchers'.date("Y-m-d-His").'.csv';
                Notification::route('mail', "$request->email")
                            ->notify(new CsvNotification($request->columns,$request->rows,$request->name_campaing, $filename));
            unlink($filename);
        }

        

        return $response == null
                    ? $this->sendResetLinkResponse($request, $response)
                    : $this->sendResetLinkFailedResponse($request, $response);
    }

}
