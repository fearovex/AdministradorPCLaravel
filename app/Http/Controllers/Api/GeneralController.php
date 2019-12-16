<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\User;

class GeneralController extends Controller
{
    public function index(){
        $allUser = User::get();
        return $allUser;
    }
}
