<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'nombre', 'direccion', 'pais', 'ciudad','telefono','PaginaWeb'
    ];

    public $timestamps = false;

    protected $table = 'locaciones';
}
