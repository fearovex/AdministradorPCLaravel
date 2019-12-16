<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    
    protected $fillable = [
        'id_ciudad', 'nombre', 'descripcion','fecha_creacion'
    ];



    protected $table = 'locaciones';
}
