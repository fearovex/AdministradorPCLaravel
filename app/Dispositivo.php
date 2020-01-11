<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dispositivo extends Model
{
    protected $fillable = [
        'nombre_dispositivo', 'mac_dispositivo', 'id_zona','tecnologia'
    ];

    public $timestamps = false;

    protected $table = 'dispositivos';
}
