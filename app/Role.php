<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Role extends Model
{

    protected $fillable = [
        'id', 'rol'
    ];
    protected $table = 'roles';



}
