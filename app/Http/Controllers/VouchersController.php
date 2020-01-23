<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Voucher;

class VouchersController extends Controller
{
    public function index(Request $request){
        $vouchers = DB::connection(session('database'))
                    ->select(DB::raw("select c.id, c.id_locacion, c.nombre as Campaña, c.fecha_inicio as 'Fecha Inicio', c.fecha_fin as 'Fecha Fin', (select count(v.id_voucher) from vouchers as v where c.id = v.id_campania and c.id_locacion = $request->id_locacion) as '# Vouchers' from campania as c where id_locacion = $request->id_locacion"));
        return response()->json($vouchers);
    }

    public function voucherInfo(Request $request){

        $campania = DB::connection(session('database'))
            ->table('campania')
            ->where('id_locacion',$request->id_location)
            ->where('id',$request->id_campaing)
            ->first();

        $fecha_inicialC = '"'.date('Y-m-d 00:00:00', strtotime($campania->fecha_inicio)).'"';
        $fecha_finC = '"'.date('Y-m-d 00:00:00', strtotime($campania->fecha_fin)).'"';
        $fecha_actual =  '"'.date('Y-m-d H:i:s').'"';

        DB::connection(session('database'))->select("update vouchers set estado = 'En Uso' where num_usos > 0");

        DB::connection(session('database'))->select("update vouchers set estado = 'Sin Usos Disponibles' where num_usos = total_num_usos");
        
        DB::connection(session('database'))->select("update vouchers set estado = 'Sin Uso' where num_usos = 0 and (fecha_inicio >= $fecha_inicialC OR (fecha_fin >= $fecha_finC and id_caducidad = 1))");

        DB::connection(session('database'))->select("update vouchers set estado = 'Caducado' 
        where (id_campania = $request->id_campaing and fecha_fin < $fecha_actual OR (fecha_inicio < $fecha_inicialC) OR (fecha_inicio > $fecha_finC) OR (fecha_fin > $fecha_finC and id_caducidad = 2) OR (fecha_fin < $fecha_inicialC))");

        $vouchers = DB::connection(session('database'))
            ->select("select v.voucher as Voucher, v.etiqueta as 'Etiqueta', v.fecha_inicio as 'Fecha Inicio', 
            v.fecha_fin as 'Fecha Fin', v.estado as Estado, num_usos as 'N° de Usos por Voucher', 
            total_num_usos as 'N° Usos Total' from vouchers as v where v.id_locacion = 
            $request->id_location and v.id_campania=$request->id_campaing");  
        return response()->json($vouchers);
    }

    // public function create(Request $request){
    //     $campanias = DB::connection(session('database'))
    //         ->table('campania')
    //         ->where('id_locacion', $request->id_location)
    //         ->get();

    //     return response()->json($campanias);
    // }

    public function store(Request $request){
            $contador = $request->numerovouchers;
            $creados = 0;
            while($contador <> 0){
                $vouchersArray = array();
                $vouchersCreados = array();
                $vouchersDiferentes = array();

                $vouchers = DB::connection(session('database'))
                    ->table('vouchers')
                    ->select('voucher')
                    ->where('id_campania', $request->id_campaing)
                    ->where('id_locacion', $request->id_location)
                    ->get();

                foreach($vouchers as $key => $voucher){
                    $vouchersCreados[$key] = $voucher->voucher;
                }

                $i=0;
                while($i < $contador){
                    $voucher = substr(md5(microtime()),rand(0,26),6);
                    if(!in_array($voucher, $vouchersArray)){
                        $vouchersArray[$i] = $voucher;
                        $i++;
                    }
                }
                $vouchersDiferentes = array_diff($vouchersArray, $vouchersCreados);
                if(count($vouchersDiferentes) <> 0){
                    if($request->nuncaExpira){
                        foreach ($vouchersDiferentes as $key => $voucher){
                            $voucher = new Voucher();
                            $voucher->setConnection(session('database'));
                            $voucher->id_locacion = $request->id_location;
                            $voucher->voucher = $vouchersDiferentes[$key];
                            $voucher->estado = "Sin Uso";
                            $voucher->fecha_inicio = date('Y-m-d 00:00:00');
                            $voucher->fecha_fin = date('Y-m-d 00:00:00', strtotime("3000-01-01"));
                            $voucher->id_campania = $request->id_campaing;
                            $voucher->num_usos = 0;
                            $voucher->total_num_usos = $request->numerousos;
                            $voucher->etiqueta = $request->etiqueta;
                            $voucher->dias_disponibles = 0; 
                            $voucher->horas_disponibles = 0; 
                            $voucher->minutos_disponibles = 0;
                            $voucher->id_caducidad = 1;
                            $voucher->save();
                            $creados++;
                        }
                    }
                    if($request->expira){
                        foreach ($vouchersDiferentes as $key => $voucher){
                            $voucher = new Voucher();
                            $voucher->setConnection(session('database'));
                            $voucher->id_locacion = $request->id_location;
                            $voucher->voucher = $vouchersDiferentes[$key];
                            $voucher->estado = "Sin Uso";
                            $voucher->fecha_inicio = date('Y-m-d H:i:00', strtotime($request->fecha_inicio));
                            $voucher->fecha_fin = date('Y-m-d H:i:00', strtotime($request->fecha_fin));
                            $voucher->id_campania = $request->id_campaing;
                            $voucher->num_usos = 0;
                            $voucher->total_num_usos = $request->numerousos;
                            $voucher->etiqueta = $request->etiqueta;
                            $voucher->dias_disponibles = 0; 
                            $voucher->horas_disponibles = 0; 
                            $voucher->minutos_disponibles = 0;
                            $voucher->id_caducidad = 2;
                            $voucher->save();
                            $creados++;
                        }
                    }
                    if($request->activarUso){
                        foreach ($vouchersDiferentes as $key => $voucher){
                            $voucher = new Voucher();
                            $voucher->setConnection(session('database'));
                            $voucher->id_locacion = $request->id_location;
                            $voucher->voucher = $vouchersDiferentes[$key];
                            $voucher->estado = "Sin Uso";
                            $voucher->fecha_inicio = date('Y-m-d H:i:00', strtotime($request->fecha_inicio));
                            $voucher->fecha_fin = date('Y-m-d H:i:00', strtotime($request->fecha_inicio));
                            $voucher->id_campania = $request->id_campaing;
                            $voucher->num_usos = 0;
                            $voucher->total_num_usos = $request->numerousos;
                            $voucher->etiqueta = $request->etiqueta;
                            $voucher->dias_disponibles = $request->diasDisponibles; 
                            $voucher->horas_disponibles = $request->horasDisponibles; 
                            $voucher->minutos_disponibles = $request->minutosDisponibles;
                            $voucher->id_caducidad = 3;
                            $voucher->save();
                            $creados++;
                        }
                    }

                    $contador = $contador - count($vouchersDiferentes);
                }
                else{
                    $contador = 0;
                }
            }

        $vouchersRecienCreados = DB::connection(session('database'))
        ->select("select v.voucher as Voucher, v.fecha_inicio as 'Fecha Inicio', v.fecha_fin as 'Fecha Fin', total_num_usos as 'N° Usos Total', etiqueta as 'Etiqueta' from vouchers as v where v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing order by v.id_voucher desc limit $creados");
        
        return response()->json($vouchersRecienCreados);
    }
}
