<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    protected $fillable = [
        'id', 'rol'
    ];
    protected $table = 'roles';
}
