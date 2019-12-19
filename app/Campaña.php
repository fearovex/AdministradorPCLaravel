<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaña extends Model
{
    protected $fillable = [
        'id_locacion','nombre', 'descripcion', 'fecha_inicio', 'fecha_fin','ano_evento','campania'
    ];

    public $timestamps = false;

    protected $table = 'campania';
}
