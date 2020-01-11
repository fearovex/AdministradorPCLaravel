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
        return response(['message'=> trans('We have e-mailed your CSV file!')]);

    }


    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response(['error'=> trans($response)], 422);

    }

    protected function sendResetLinkEmail(Request $request)
    {
        // session(['validateSendEmails' => 'false']);
        $response = $this->validateEmail($request);
       
        // return $->name_campaing;
        // if(session('emailValidate') == 'CSV'){
// return $request->email;
// return (string)($request->email);
            Notification::route('mail', "$request->email")
                        ->notify(new CsvNotification($request->columns,$request->rows,$request->name_campaing));
        // }

        return $response == null
                    ? $this->sendResetLinkResponse($request, $response)
                    : $this->sendResetLinkFailedResponse($request, $response);
    }

    

}
