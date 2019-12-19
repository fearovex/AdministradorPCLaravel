<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    protected $fillable = [
        'nombre', 'id_locaciones'
    ];

    public $timestamps = false;

    protected $table = 'zonas';
}
