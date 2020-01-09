<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Zona;
use Illuminate\Support\Facades\DB;

class ZonaController extends Controller
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
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $zona= new Zona();
        $zona->setConnection(session('database'));
        $zona->nombre = $request->nombre;       
        $zona->id_locaciones = $request->id_location;
        

        $zona->save();
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
            ->table('zonas')
            ->select('id', 'nombre as Nombre', 'id_locaciones')
            ->where('id_locaciones', $id)
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
            $zona = DB::connection(session('database'))
                ->table('zonas')
                ->where('id', $id)
                ->first();
                return response()->json($zona, 200);
        } catch (\Throwable $th) {
            return response()->json($zona, 500);
        }
        
       

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $zona = DB::connection(session('database'))
                ->table('zonas')
                ->where('id', $id)
                ->update(['nombre' => $request->nombre]);
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
