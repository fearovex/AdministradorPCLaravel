<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Voucher;

class VouchersController extends Controller
{
    public function index(Request $request){
        $vouchers = DB::connection(session('database'))
                    ->select(DB::raw("select c.id, c.id_locacion, c.nombre as Campaña, c.fecha_inicio as 'Fecha Inicio', c.fecha_fin as 'Fecha Fin', (select count(v.id_voucher) from vouchers as v where (c.id = v.id_campania and c.id_locacion = $request->id_locacion) and v.id_caducidad != 4) as '# Vouchers' from campania as c where id_locacion = $request->id_locacion"));
        return response()->json($vouchers);
    }

    public function indexPasswords(Request $request){
        $passwords = DB::connection(session('database'))
                    ->select(DB::raw("select c.id, c.id_locacion, c.nombre as Campaña, c.fecha_inicio as 'Fecha Inicio', c.fecha_fin as 'Fecha Fin', (select count(v.id_voucher) from vouchers as v where (c.id = v.id_campania and c.id_locacion = $request->id_locacion) and v.id_caducidad = 4) as '# Contraseñas' from campania as c where id_locacion = $request->id_locacion"));
        return response()->json($passwords);
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
        DB::connection(session('database'))->select("update vouchers set estado = 'En Uso' where num_usos > 0  and id_caducidad != 4");

        DB::connection(session('database'))->select("update vouchers set estado = 'Sin Usos Disponibles' where num_usos = total_num_usos and id_caducidad !=4");
        
        DB::connection(session('database'))->select("update vouchers set estado = 'Sin Uso' where (num_usos = 0 and id_caducidad != 4) and (fecha_inicio >= $fecha_inicialC OR (fecha_fin >= $fecha_finC and id_caducidad = 1))");

        DB::connection(session('database'))->select("update vouchers set estado = 'Caducado' 
        where ((id_campania = $request->id_campaing and id_caducidad !=4) and fecha_fin < $fecha_actual OR (fecha_inicio < $fecha_inicialC) OR (fecha_inicio > $fecha_finC) OR (fecha_fin > $fecha_finC and id_caducidad = 2) OR (fecha_fin < $fecha_inicialC))");

        $vouchers = DB::connection(session('database'))
            ->select("select v.voucher as Voucher, v.etiqueta as 'Etiqueta', v.fecha_inicio as 'Fecha Inicio', IF(v.id_caducidad=1, 'Nunca Expira',IF(v.id_caducidad=3, IF(v.num_usos=0, 'Aun no se activa', v.fecha_fin),  IF(v.id_caducidad=4,'Nunca Expira', v.fecha_fin))) as 'Fecha Fin', v.estado as Estado, IF(v.id_caducidad=4,'Indefinido',num_usos) as 'N° de Usos por Voucher', IF(v.id_caducidad=4,'Indefinido',total_num_usos) as 'N° Usos Total' from vouchers as v where (v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing) and v.id_caducidad != 4");  
        return response()->json($vouchers);
    }

    public function passwordInfo(Request $request){

        $campania = DB::connection(session('database'))
            ->table('campania')
            ->where('id_locacion',$request->id_location)
            ->where('id',$request->id_campaing)
            ->first();

        $fecha_inicialC = '"'.date('Y-m-d 00:00:00', strtotime($campania->fecha_inicio)).'"';
        $fecha_finC = '"'.date('Y-m-d 00:00:00', strtotime($campania->fecha_fin)).'"';
        $fecha_actual =  '"'.date('Y-m-d H:i:s').'"';


        $vouchers = DB::connection(session('database'))
            ->select("select v.id_voucher as id_password, v.voucher as 'Contraseña', v.etiqueta as 'Etiqueta', v.fecha_inicio as 'Fecha Inicio', IF(v.id_caducidad=1, 'Nunca Expira',IF(v.id_caducidad=3, IF(v.num_usos=0, 'Aun no se activa', v.fecha_fin),  IF(v.id_caducidad=4,'Nunca Expira', v.fecha_fin))) as 'Fecha Fin', v.estado as Estado, IF(v.id_caducidad=4,'Indefinido',num_usos) as 'N° de Usos por Voucher', IF(v.id_caducidad=4,'Indefinido',total_num_usos) as 'N° Usos Total' from vouchers as v where (v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing) and v.id_caducidad = 4");  
        return response()->json($vouchers);
    }

    public function store(Request $request){
        $contador = $request->numerovouchers;
        $creados = 0;
        if($request->personalizado){
            $voucherDB = DB::connection(session('database'))
                ->table('vouchers')
                ->select('voucher')
                ->where('id_campania', $request->id_campaing)
                ->where('id_locacion', $request->id_location)
                ->where('voucher', $request->voucherPersonalizado)
                ->where('id_caducidad','!=', 4)
                ->first();
            if($voucherDB){
                return response()->json(500);
            }
                // dd($request->voucherDB);
            $voucher = new Voucher();
            $voucher->setConnection(session('database'));
            $voucher->id_locacion = $request->id_location;
            $voucher->voucher = $request->voucherPersonalizado;
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

            $vouchersRecienCreados = DB::connection(session('database'))
            ->select("select v.voucher as Voucher, v.fecha_inicio as 'Fecha Inicio', IF(v.id_caducidad=1, 'Nunca Expira', IF(v.id_caducidad=3, IF(v.num_usos=0, 'Aun no se activa', v.fecha_fin), v.fecha_fin)) as 'Fecha Fin', total_num_usos as 'N° Usos Total', etiqueta as 'Etiqueta' from vouchers as v where v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing order by v.id_voucher desc limit 1");
            
            return response()->json($vouchersRecienCreados, 200);
        }
        while($contador <> 0){
            $vouchersArray = array();
            $vouchersCreados = array();
            $vouchersDiferentes = array();

            $vouchers = DB::connection(session('database'))
                ->table('vouchers')
                ->select('voucher')
                ->where('id_campania', $request->id_campaing)
                ->where('id_locacion', $request->id_location)
                ->where('id_caducidad','!=', 4)
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
                    if(is_null($request->diasDisponibles)){
                        $request->diasDisponibles = 0; 
                    }
                    if(is_null($request->horasDisponibles)){
                        $request->horasDisponibles = 0;
                    }
                    if(is_null($request->minutosDisponibles)){
                        $request->minutosDisponibles = 0;
                    }
                    foreach ($vouchersDiferentes as $key => $voucher){
                        $voucher = new Voucher();
                        $voucher->setConnection(session('database'));
                        $voucher->id_locacion = $request->id_location;
                        $voucher->voucher = $vouchersDiferentes[$key];
                        $voucher->estado = "Sin Uso";
                        $voucher->fecha_inicio = date('Y-m-d H:i:00', strtotime($request->fecha_inicio));
                        $voucher->fecha_fin = date('Y-m-d 00:00:00', strtotime($request->finalDateCampaing));
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
        ->select("select v.voucher as Voucher, v.fecha_inicio as 'Fecha Inicio', IF(v.id_caducidad=1, 'Nunca Expira', IF(v.id_caducidad=3, IF(v.num_usos=0, 'Aun no se activa', v.fecha_fin), v.fecha_fin)) as 'Fecha Fin', total_num_usos as 'N° Usos Total', etiqueta as 'Etiqueta' from vouchers as v where v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing order by v.id_voucher desc limit $creados");
        
        return response()->json($vouchersRecienCreados);
    }

    public function storePassword(Request $request){
        $contador = $request->numerovouchers;
        $creados = 0;
        $contraseniaDB = DB::connection(session('database'))
            ->table('vouchers')
            ->select('voucher')
            ->where('id_campania', $request->id_campaing)
            ->where('id_locacion', $request->id_location)
            ->where('voucher', $request->passwordPersonalizado)
            ->where('id_caducidad', 4)
            ->first();
        if($contraseniaDB){
            return response()->json(500);
        }
            // dd($request->voucherDB);
        $contrasenia = new Voucher();
        $contrasenia->setConnection(session('database'));
        $contrasenia->id_locacion = $request->id_location;
        $contrasenia->voucher = $request->passwordPersonalizado;
        $contrasenia->estado = "Disponible";
        $contrasenia->fecha_inicio = date('Y-m-d 00:00:00');
        $contrasenia->fecha_fin = date('3000-01-01 00:00:00');
        $contrasenia->id_campania = $request->id_campaing;
        $contrasenia->num_usos = 0;
        $contrasenia->total_num_usos = 0;
        $contrasenia->etiqueta = $request->etiqueta;
        $contrasenia->dias_disponibles = 0; 
        $contrasenia->horas_disponibles = 0; 
        $contrasenia->minutos_disponibles = 0;
        $contrasenia->id_caducidad = 4;
        $contrasenia->save();

        $contraseniasRecienCreadas = DB::connection(session('database'))
            ->select("select v.voucher as Contraseña, v.fecha_inicio as 'Fecha Inicio', IF(v.id_caducidad=1, 'Nunca Expira', IF(v.id_caducidad=3, IF(v.num_usos=0, 'Aun no se activa', v.fecha_fin), IF(v.id_caducidad=4,'Nunca Expira', v.fecha_fin))) as 'Fecha Fin', IF(v.id_caducidad=4,'Indefinido',total_num_usos) as 'N° Usos Total', etiqueta as 'Etiqueta' from vouchers as v where (v.id_locacion = $request->id_location and v.id_campania=$request->id_campaing) and v.id_caducidad = 4 order by v.id_voucher desc limit 1");
        return response()->json($contraseniasRecienCreadas, 200);
    }

    // function voucherValidateCampaing(){
    //     $campania = DB::connection(session('database'))
    //         ->table('campania')
    //         ->where('id_locacion',$request->id_location)
    //         ->where('id',$request->id_campaing)
    //         ->first();

    //     $fecha_inicialC = '"'.date('Y-m-d 00:00:00', strtotime($campania->fecha_inicio)).'"';
    //     $fecha_finC = '"'.date('Y-m-d 00:00:00', strtotime($campania->fecha_fin)).'"';
    //     $fecha_actual =  '"'.date('Y-m-d h:m:s').'"';
    // }
    public function editPassword(Request $request)
    {
        try {
            $contraseniaDB = DB::connection(session('database'))
            ->table('vouchers')
            ->select('voucher as password','etiqueta','estado')
            ->where('id_campania', $request->id_campaing)
            ->where('id_locacion', $request->id_location)
            ->where('id_voucher', $request->id_password)
            ->where('id_caducidad', 4)
            ->first();
            return response()->json($contraseniaDB, 200);
        } catch (\Throwable $th) {
            return response()->json($contraseniaDB, 500);
        }
        
    }
    public function updatePassword(Request $request){
        $estado = "";
        if($request->statePassword){
            $estado = "Disponible";
        }
        if(!$request->statePassword){
            $estado = "No Disponible";
        }
        try {
            $update = DB::connection(session('database'))
            ->table('vouchers')
            ->where('id_campania', $request->id_campaing)
            ->where('id_locacion', $request->id_location)
            ->where('id_voucher', $request->id_password)
            ->where('id_caducidad', 4)
            ->update(['voucher' => $request->password,'etiqueta' => $request->etiqueta, 'estado' => $estado]);
            return response()->json(['code'=> 200]);
        } catch (\Throwable $th) {
            return response()->json(['code'=> 500]);
        }
    }
}
