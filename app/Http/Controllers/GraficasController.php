<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraficasController extends Controller
{
    public function UltimoEvento(){
        $Evento = DB::table('eventos')
            ->orderBy('fecha_inicio', 'DESC')
            ->limit(1)
            ->first();
        
        return $Evento;
    }

    public function Consulta(Request $request){

        $fecha_inicial = '';
        $fecha_final = '';

        $Evento = GraficasController::UltimoEvento();

        $DatosGraficas['genero'] = array();
        $DatosGraficas['ap'] = array();
        $DatosGraficas['paises'] = array();
        $DatosGraficas['edad'] = array();
        $DatosGraficas['os'] = array();
        $DatosGraficas['fecha'] = array();

        $DatosGraficas['genero'] = DB::table($Evento->campania)
            ->select(DB::raw('genero, COUNT(*) AS personas'))
            // ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('genero')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();
        
        $DatosGraficas['ap'] = DB::table($Evento->campania)
            ->select(DB::raw('ip_ap as ap, COUNT(*) AS personas'))
            // ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('ap')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['paises'] = DB::table($Evento->campania.' as pac')
            ->join('paises', 'pac.id_pais',  '=', 'paises.id')
            ->select(DB::raw('paises.nombre_esp as pais, pac.id_pais, COUNT(*) AS personas'))
            // ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('pac.id_pais', 'pais')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['edad'] = DB::table($Evento->campania)
            ->select(DB::raw('edad, COUNT(*) AS personas'))
            // ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('edad')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['os'] = DB::table($Evento->campania)
            ->select(DB::raw('os, COUNT(*) AS personas'))
            // ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('os')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['fecha'] = DB::table($Evento->campania)
            ->select(DB::raw('date(fecha_creacion) as fecha, COUNT(*) AS personas'))
            // ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('fecha')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();
            
        return response()->json($DatosGraficas, 200);
    }
}
