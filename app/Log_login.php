<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log_Login extends Model
{
    protected $fillable = [
        'id_user', 'browser', 'ip_conection', 'action'
    ];



    protected $table = 'log_login';
}
