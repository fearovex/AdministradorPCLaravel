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

        $vouchers = DB::connection(session('database'))
            ->select("select v.voucher as Voucher, v.fecha_inicio as 'Fecha Inicio', v.fecha_fin as 'Fecha Fin', v.estado as Estado, num_usos as 'N° de Usos por Voucher', total_num_usos as 'N° Usos Total' from vouchers as v where v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing");
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
                ->where('id_campania', $request->campaña)
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
                foreach ($vouchersDiferentes as $key => $voucher){
                        $voucher = new Voucher();
                        $voucher->setConnection(session('database'));
                        $voucher->id_locacion = $request->id_location;
                        $voucher->voucher = $vouchersDiferentes[$key];
                        $voucher->estado = "Sin Uso";
                        $voucher->fecha_inicio = date('Y-m-d H:i:00', strtotime($request->fecha_inicio));
                        $voucher->fecha_fin = date('Y-m-d H:i:00', strtotime($request->fecha_fin));
                        $voucher->id_campania = $request->campaña;
                        $voucher->num_usos = $request->numerousos;
                        $voucher->total_num_usos = $request->numerousos;
                        $voucher->save();
                        $creados++;
                }
                $contador = $contador - count($vouchersDiferentes);
            }
            else{
                $contador = 0;
            }
        }

        $vouchersRecienCreados = DB::connection(session('database'))
        ->select("select v.voucher as Voucher, v.fecha_inicio as 'Fecha Inicio', v.fecha_fin as 'Fecha Fin', v.estado as Estado, num_usos as 'N° de Usos por Voucher', total_num_usos as 'N° Usos Total' from vouchers as v where v.id_locacion = $request->id_location and v.id_campania=$request->campaña order by v.id_voucher desc limit $creados");
        
        return response()->json($vouchersRecienCreados);
    }
}
