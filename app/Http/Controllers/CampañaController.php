<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Campaña;
use Illuminate\Support\Facades\DB;
use Storage;

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
    public function store(Request $request){
        $NameTabla = str_replace(["-", " "],"_",$request->nombre_campaña."_".date('Y-m-d', strtotime($request->fecha_inicio)));
        $campaña= new Campaña();
        $campaña->setConnection(session('database'));
        $campaña->nombre = $request->nombre_campaña;
        $campaña->fecha_inicio = $request->fecha_inicio;
        $campaña->fecha_fin = $request->fecha_fin;
        $campaña->descripcion = $request->descripcion;
        $campaña->zona_ap = $request->zona_ap;
        $campaña->ano_evento = $request->anio;
        $campaña->id_locacion = $request->id_location;
        $campaña->campania = $NameTabla;
        $campaña->vertical_economica = $request->vertical_economica;
        $campaña->save();
        
        Schema::connection(session('database'))->create($NameTabla, function (Blueprint $table) use ($request) {
            $table->increments('id');
            $table->bigInteger('id_evento');
            $table->dateTime('fecha_creacion');
            if($request->email){
                $table->string('email');
            }            
            if($request->nombre){
                $table->string('nombre');
            }            
            if($request->apellidos){
                $table->string('apellidos');
            }            
            if($request->edad){
                $table->string('edad');
            }            
            if($request->genero){
                $table->string('genero');
            }            
            if($request->telefono){
                $table->string('telefono');
            }            
            if($request->num_voucher){
                $table->string('num_voucher');
            }            
            if($request->num_habitacion){
                $table->string('num_habitacion');
            }            
            if($request->razon_visita){
                $table->string('razon_visita');
            }
            $table->string('os');
            $table->string('ssid');
            $table->string('mac_cliente');
            $table->string('ip_cliente');
            $table->string('ip_ap');
            $table->string('mac_ap');
        });
        
        DB::connection(session('database'))->table('styles_campania')->insert([
            'id_campania' => $campaña->id,
            'width_logo_web' => $request->sizeLogoWeb,
            'margin_logo_web' => '5%',
            'width_logo_movil' => $request->sizeLogoMobile,
            'margin_logo_movil' => '5%',
            'container_form_color' => "rgba(".$request->backgroundColorForm['r'].", ".$request->backgroundColorForm['g'].", ".$request->backgroundColorForm['b'].", ".$request->backgroundColorForm['a'].")",
            'container_form_font_color' => "rgba(".$request->colorFontForm['r'].", ".$request->colorFontForm['g'].", ".$request->colorFontForm['b'].", ".$request->colorFontForm['a'].")",
            'button_font_color' => "rgba(".$request->colorFontForm['r'].", ".$request->colorFontForm['g'].", ".$request->colorFontForm['b'].", ".$request->colorFontForm['a'].")",
            'button_background_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'button_border_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'button_hover_font_color' => '#EEE',
            'button_hover_background_color' => '#000',
            'checkbox_terms_background_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'checkbox_terms_border_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'msg_error_color_font' => '#EEE',
            'msg_error_color_background' => 'rgb(160,19,35,0.91)'
        ]);

        DB::connection(session('database'))->table('terms_conditions_campania')->insert([
            'id_campania' => $campaña->id,
            'terms_conditions_es' => $request->terminos_condiciones_esp,
            'terms_conditions_en' => $request->terminos_condiciones_eng         
        ]);
        
        $portal_cautivo = Storage::disk('public')->allFiles('portal_cautivo');
        $host = env("DB_HOST");
        $userportal = env('DB_USERNAME');
        $password = env('DB_PASSWORD');
        $database = session('database');
        $campania = $NameTabla;
        $config = '[database]
        host = "'.$host.'"
        port = ""
        user = "'.$userportal.'"
        password = "'.$password.'"
        name = "'.$database.'"
        campania = "'.$campania.'"';
        for ($i=0; $i < count($portal_cautivo); $i++) { 
            $new_path[$i] = substr($portal_cautivo[$i], 15);
            Storage::disk("ftp_".session('database')."")->put($NameTabla."/$new_path[$i]", Storage::disk('public')->get($portal_cautivo[$i]));
        }
        Storage::disk("ftp_".session('database')."")->prepend($NameTabla."/db/parameter.ini.dist", $config);

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
            ->select('id','nombre as Nombre','descripcion as Descripcion','fecha_inicio as Fecha Inicio','fecha_fin as Fecha Fin', 'campania','vertical_economica as Vertical')
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
            
        SideBarController::getSideBarRol(session('rol'),session('database'));
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
