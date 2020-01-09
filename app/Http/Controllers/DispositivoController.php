<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Zona;
use App\Dispositivo;
use Illuminate\Support\Facades\DB;

class DispositivoController extends Controller
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
        $dispositivo= new Dispositivo();
        $dispositivo->setConnection(session('database'));
        $dispositivo->nombre_dispositivo = $request->nombre_dispositivo;  
        $dispositivo->mac_dispositivo = $request->mac_dispositivo;  
        $dispositivo->tecnologia = $request->tecnologia;  
        $dispositivo->id_zona = $request->id_zona;       
     

        $dispositivo->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dispositivos = DB::connection(session('database'))
            ->table('dispositivos')
            ->select('nombre_dispositivo as Nombre Dispositivo','mac_dispositivo as Mac Dispositivo','tecnologia as Tecnologia')
            ->where('id_zona', $id)
            ->get();
            
        return response()->json($dispositivos, 200);
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
            $dispositivo = DB::connection(session('database'))
                ->table('dispositivos')
                ->where('id', $id)
                ->first();
                return response()->json($dispositivo, 200);
        } catch (\Throwable $th) {
            return response()->json($dispositivo, 500);
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
        $dispositivo = DB::connection(session('database'))
                ->table('dispositivos')
                ->where('id', $id)
                ->update(['nombre_dispositivo' => $request->nombre_dispositivo,'mac_dispositivo' => $request->mac_dispositivo,'tecnologia' => $request->tecnologia,'id_zona' => $request->id_zona]);
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
