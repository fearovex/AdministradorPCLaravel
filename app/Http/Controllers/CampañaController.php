<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;
use App\Zona;
use App\Campaña;
use Illuminate\Support\Facades\DB;

class CampañaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $campaña= new Campaña();
        $campaña->setConnection(session('database'));
        $campaña->nombre = $request->nombre_campaña;
        $campaña->fecha_inicio = $request->fecha_inicio;
        $campaña->fecha_fin = $request->fecha_fin;
        $campaña->descripcion = $request->descripcion;
        $campaña->zona_ap = $request->zona_ap;
        $campaña->ano_evento = $request->anio;
        $campaña->id_locacion = $request->id_location;
        $campaña->campania= $request->nombre_campaña.$request->fecha_inicio;

        $campaña->save();

        SideBarController::getSideBarRol(session('rol'),session('database'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $zonas = DB::connection(session('database'))
            ->table('campania')
            ->where('id_locacion', $id)
            ->get();
            
        return response()->json($zonas, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $campania = DB::connection(session('database'))
                ->table('campania')
                ->where('id', $id)
                ->first();
                return response()->json($campania, 200);
        } catch (\Throwable $th) {
            return response()->json($campania, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $campania = DB::connection(session('database'))
                ->table('campania')
                ->where('id', $id)
                ->update(['nombre' => $request->nombre_campaña,'fecha_inicio' => $request->fecha_inicio,'fecha_fin' => $request->fecha_fin,'descripcion' => $request->descripcion,'zona_ap' => $request->zona_ap,'ano_evento' => $request->anio]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
