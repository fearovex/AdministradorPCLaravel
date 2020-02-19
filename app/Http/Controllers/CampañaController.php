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
        $campaña->path_campania = env("APP_URL").$NameTabla;
        $campaña->save();
        
        CampañaController::createTable($request, $NameTabla);
        
        CampañaController::add_Styles_Terms($request, $campaña);
        
        CampañaController::ftp_portal_cautivo($NameTabla);

        CampañaController::sendImages($request, $NameTabla, $campaña);
        
        SideBarController::getSideBarRol(session('rol'),session('database'));
    }

    private function createTable($request, $NameTabla){
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
    }

    private function add_Styles_Terms($request, $campaña){
        DB::connection(session('database'))->table('styles_campania')->insert([
            'id_campania' => $campaña->id,
            'width_logo_web' => $request->sizeLogoWeb.'px',
            'margin_logo_web' => '5%',
            'width_logo_movil' => $request->sizeLogoMobile.'px',
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
            'msg_error_color_background' => 'rgb(160,19,35,0.91)',
            'title_portal' => $request->titlePortal,
            'color_title_portal' => "rgba(".$request->colorTitleForm['r'].", ".$request->colorTitleForm['g'].", ".$request->colorTitleForm['b'].", ".$request->colorTitleForm['a'].")"
        ]);

        DB::connection(session('database'))->table('terms_conditions_campania')->insert([
            'id_campania' => $campaña->id,
            'terms_conditions_es' => $request->terminos_condiciones_esp,
            'terms_conditions_en' => $request->terminos_condiciones_eng         
        ]);
    }

    private function ftp_portal_cautivo($NameTabla){
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
    }

    private function sendImages($request, $NameTabla, $campaña){
        $background = explode(';base64,', $request->fileBackground);
        Storage::disk("ftp_".session('database')."")->put($NameTabla."/img/background.png", base64_decode($background[1]));

        $logo = explode(';base64,', $request->fileLogo);
        Storage::disk("ftp_".session('database')."")->put($NameTabla."/img/logo.png", base64_decode($logo[1]));

        Storage::disk("ftp_".session('database')."")->put($NameTabla."/img/favicon.ico", base64_decode($logo[1]));
        
        DB::connection(session('database'))->table('files_campania')->insert([
            'id_campania' => $campaña->id,
            'id_tipo_archivo_multimedia' => 1,
            'nombre' => '/img/background.png',
            'fecha_creacion' => date('Y-m-d H:i:s')         
        ]);
        DB::connection(session('database'))->table('files_campania')->insert([
            'id_campania' => $campaña->id,
            'id_tipo_archivo_multimedia' => 2,
            'nombre' => '/img/logo.png',
            'fecha_creacion' => date('Y-m-d H:i:s')
        ]);
        DB::connection(session('database'))->table('files_campania')->insert([
            'id_campania' => $campaña->id,
            'id_tipo_archivo_multimedia' => 3,
            'nombre' => '/img/favicon.ico',
            'fecha_creacion' => date('Y-m-d H:i:s')
        ]);
        
        if($request->imgsBannerSwitch && count($request->filesBanner) > 0){
            for($i=0; $i < count($request->filesBanner); $i++){
                $banner = explode(';base64,', $request->filesBanner[$i]);
                Storage::disk("ftp_".session('database')."")->put($NameTabla."/img/banner/banner".($i+1).".png", base64_decode($banner[1]));
                DB::connection(session('database'))->table('banner_files_campania')->insert([
                    'id_campania' => $campaña->id,
                    'nombre_img_web' => "/img/banner/banner".($i+1).".png",
                    'nombre_img_movil' => "/img/banner/banner".($i+1).".png",
                    'fecha_creacion' => date('Y-m-d H:i:s')
                ]);
            }
        }
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $table = DB::connection(session('database'))
            ->table('campania')
            ->select('campania')
            ->where('id_locacion', $id)
            ->first();
        $zonas = DB::connection(session('database'))
            ->select("
                select id, nombre as Nombre, (select fecha_creacion from $table->campania order by fecha_creacion desc limit 1) as 'Ultima Fecha', (select count(*) from $table->campania) as 'Total Registros', fecha_inicio as 'Fecha Inicio', fecha_fin as 'Fecha Fin', campania, vertical_economica as Vertical, path_campania from campania where id_locacion = $id
            ");
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
            $table_name= DB::connection(session('database'))->table('campania')->select('campania')->where('id',$id)->first()->campania;
            $db = session('database');
            $getColumnNames = DB::select("SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = '".$db."' AND TABLE_NAME = '".$table_name."';");

            $dataCampaing = DB::connection(session('database'))
                ->select("SELECT cs.nombre, cs.campania, cs.descripcion, cs.fecha_inicio, cs.fecha_fin, cs.zona_ap, cs.vertical_economica, sc.width_logo_web, sc.container_form_color, sc.container_form_font_color, sc.button_font_color, sc.button_background_color, sc.title_portal, sc.color_title_portal, sc.width_logo_web, sc.width_logo_movil, tcc.terms_conditions_es, tcc.terms_conditions_en, (SELECT fc.nombre FROM files_campania fc WHERE fc.id_tipo_archivo_multimedia = 1 AND fc.id_campania = cs.id) AS background,(SELECT fc.nombre FROM files_campania fc WHERE fc.id_tipo_archivo_multimedia = 2 AND fc.id_campania = cs.id) AS logo, (SELECT fc.nombre FROM files_campania fc WHERE fc.id_tipo_archivo_multimedia = 3 AND fc.id_campania = cs.id) AS favico FROM campania cs 
                INNER JOIN styles_campania sc ON sc.id_campania = cs.id
                INNER JOIN terms_conditions_campania tcc ON tcc.id_campania = cs.id 
                WHERE cs.id = $id");

                return response()->json([$dataCampaing[0],$getColumnNames], 200);
                return response()->json([$dataCampaing[0],$getColumnNames], 200);
        } catch (\Throwable $th) {
            return response()->json($dataCampaing, 500);
        }
    }

    public function deleteFolderFtp($NameTableForDelete){
        Storage::disk("ftp_".session('database'),"")->deleteDirectory($NameTableForDelete);
    }
    
    private function alterTable($NameTabla, $NameTableForDelete){
        Schema::connection(session('database'))->rename($NameTableForDelete, $NameTabla);
    }

    private function update_Styles_Terms($request){
        DB::connection(session('database'))->table('styles_campania')->where('id_campania', $request->id_campaing)->update([
            'width_logo_web' => $request->sizeLogoWeb.'px',
            'margin_logo_web' => '5%',
            'width_logo_movil' => $request->sizeLogoMobile.'px',
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
            'msg_error_color_background' => 'rgb(160,19,35,0.91)',
            'title_portal' => $request->titlePortal,
            'color_title_portal' => "rgba(".$request->colorTitleForm['r'].", ".$request->colorTitleForm['g'].", ".$request->colorTitleForm['b'].", ".$request->colorTitleForm['a'].")"
        ]);

        DB::connection(session('database'))->table('terms_conditions_campania')->where('id_campania', $request->id_campaing)->update([
            'terms_conditions_es' => $request->terminos_condiciones_esp,
            'terms_conditions_en' => $request->terminos_condiciones_eng         
        ]);
    }

    private function sendImagesWithUpdate($request, $NameTable){

        $background = explode(';base64,', $request->fileBackground);
        Storage::disk("ftp_".session('database')."")->put($NameTable."/img/background.png", base64_decode($background[1]));

        $logo = explode(';base64,', $request->fileLogo);
        Storage::disk("ftp_".session('database')."")->put($NameTable."/img/logo.png", base64_decode($logo[1]));

        Storage::disk("ftp_".session('database')."")->put($NameTable."/img/favicon.ico", base64_decode($logo[1]));
        
        DB::connection(session('database'))->table('files_campania')->where('id_campania', $request->id_campaing)->where('id_tipo_archivo_multimedia', 1)->update([
            'id_tipo_archivo_multimedia' => 1,
            'nombre' => '/img/background.png',
            'fecha_creacion' => date('Y-m-d H:i:s')         
        ]);
        DB::connection(session('database'))->table('files_campania')->where('id_campania', $request->id_campaing)->where('id_tipo_archivo_multimedia', 2)->update([
            'id_tipo_archivo_multimedia' => 2,
            'nombre' => '/img/logo.png',
            'fecha_creacion' => date('Y-m-d H:i:s')
        ]);
        DB::connection(session('database'))->table('files_campania')->where('id_campania', $request->id_campaing)->where('id_tipo_archivo_multimedia', 3)->update([
            'id_tipo_archivo_multimedia' => 3,
            'nombre' => '/img/favicon.ico',
            'fecha_creacion' => date('Y-m-d H:i:s')
        ]);
        
        if($request->imgsBannerSwitch && count($request->filesBanner) > 0){
            for($i=0; $i < count($request->filesBanner); $i++){
                $banner = explode(';base64,', $request->filesBanner[$i]);
                Storage::disk("ftp_".session('database')."")->put($NameTable."/img/banner/banner".($i+1).".png", base64_decode($banner[1]));
                DB::connection(session('database'))->table('banner_files_campania')->insert([
                    'id_campania' => $campaña->id,
                    'nombre_img_web' => "/img/banner/banner".($i+1).".png",
                    'nombre_img_movil' => "/img/banner/banner".($i+1).".png",
                    'fecha_creacion' => date('Y-m-d H:i:s')
                ]);
            }
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
        $NameTable = str_replace(["-", " "],"_",$request->nombre_campaña."_".date('Y-m-d', strtotime($request->fecha_inicio)));

        $NameTableForDelete = $request->campaingForDelete;
        
        if($NameTableForDelete != $NameTable){
            CampañaController::alterTable($NameTable, $NameTableForDelete);
            $campania = DB::connection(session('database'))
            ->table('campania')
            ->where('id', $id)
            ->update(['nombre' => $request->nombre_campaña,'fecha_inicio' => $request->fecha_inicio,'fecha_fin' => $request->fecha_fin,'descripcion' => $request->descripcion,'zona_ap' => $request->zona_ap,'ano_evento' => $request->anio, 'campania' => $NameTable,'vertical_economica' => $request->vertical_economica]);
        
            CampañaController::update_Styles_Terms($request);

            CampañaController::deleteFolderFtp($NameTableForDelete);

            CampañaController::ftp_portal_cautivo($NameTable);
            
            CampañaController::sendImagesWithUpdate($request, $NameTable);

            SideBarController::getSideBarRol(session('rol'),session('database'));
        }else{
            $campania = DB::connection(session('database'))
            ->table('campania')
            ->where('id', $id)
            ->update(['nombre' => $request->nombre_campaña,'fecha_inicio' => $request->fecha_inicio,'fecha_fin' => $request->fecha_fin,'descripcion' => $request->descripcion,'zona_ap' => $request->zona_ap,'ano_evento' => $request->anio, 'campania' => $NameTable,'vertical_economica' => $request->vertical_economica]);
        
            CampañaController::update_Styles_Terms($request);

            CampañaController::deleteFolderFtp($NameTableForDelete);

            CampañaController::ftp_portal_cautivo($NameTable);
            
            CampañaController::sendImagesWithUpdate($request, $NameTable);
            
            SideBarController::getSideBarRol(session('rol'),session('database'));
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
