<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $primaryKey = 'id_rol';

    protected $fillable = [
        'id', 'rol'
    ];
    protected $table = 'roles';
}
