<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = [
        'id_locacion','voucher', 'estado', 'fecha_inicio', 'fecha_fin','id_campania','num_usos', 'total_num_usos'
    ];

    public $timestamps = false;

    protected $table = 'vouchers';
}
