<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Location;
use App\Zona;
use App\Dispositivo;
use Illuminate\Support\Facades\DB;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locations = DB::connection(session('database'))
                        ->table('locaciones')
                        ->get();

        return response()->json($locations, 200);
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
        $location = new Location();
        $location->setConnection(session('database'));
        $location->nombre = $request->nombre;
        $location->direccion = $request->direccion;
        $location->pais = $request->pais;
        $location->ciudad = $request->ciudad;
        $location->telefono = $request->telefono;
        $location->PaginaWeb = $request->PaginaWeb;
        $location->latitud = $request->latitud;
        $location->longitud = $request->longitud;
        $location->save();

        $zona= new Zona();
        $zona->setConnection(session('database'));
        $zona->nombre = 'Zona General';
        $zona->id_locaciones = $location->id;
        $zona->save();

        if($request->mac_dispositivo){
            $dispositivo = new Dispositivo();
            $dispositivo->setConnection(session('database'));
            $dispositivo->nombre_dispositivo = ($request->dispositivo ? $request->dispositivo : 'Dispositivo');
            $dispositivo->mac_dispositivo = $request->mac_dispositivo;
            $dispositivo->tecnologia = $request->tecnologia;
            $dispositivo->id_zona = $zona->id;
            $dispositivo->save();
        }
        
        SideBarController::getSideBarRol(session('rol'),session('database'));

        return $location->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $locaciones = DB::connection(session('database'))
            ->table('locaciones')
            ->where('id', $id)
            ->get();
            
        return response()->json($locaciones, 200);

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
            $locaciones = DB::connection(session('database'))
                ->table('locaciones')
                ->where('id', $id)
                ->first();
                return response()->json($locaciones, 200);
        } catch (\Throwable $th) {
            return response()->json($locaciones, 500);
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
        try {
            $locaciones = DB::connection(session('database'))
            ->table('locaciones')
            ->where('id', $id)
            ->update(['nombre' => $request->nombre,'direccion' => $request->direccion,'pais' => $request->pais,'ciudad' => $request->ciudad,'telefono' => $request->telefono,'PaginaWeb' => $request->PaginaWeb, 'latitud' => $request->latitud, 'longitud'=> $request->longitud]);
            $response = SideBarController::getSideBarRol(session('rol'),session('database'));
            return response()->json($response);
        } catch (\Throwable $th) {
            return response()->json(['message'=>500]);
        }
        
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
