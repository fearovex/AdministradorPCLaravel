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
        
        
        
        $validation = CampañaController::createTable($request, $NameTabla);

        if($validation == 500){
            return response()->json(['message' => 500]);
        }

        $campaña = new Campaña();
        $campaña->setConnection(session('database'));
        $campaña->nombre = $request->nombre_campaña;
        $campaña->fecha_inicio = $request->fecha_inicio;
        $campaña->fecha_fin = $request->fecha_fin;
        $campaña->descripcion = $request->descripcion;
        $campaña->zona_ap = $request->zona_ap;
        $campaña->ano_evento = $request->anio;
        $campaña->id_locacion = $request->id_location;
        $campaña->campania = $NameTabla;
        $campaña->vertical_economica = "";
        // $campaña->vertical_economica = $request->vertical_economica;
        $campaña->path_campania = env("APP_URL").'portales/'.$NameTabla;
        $campaña->save();

        CampañaController::add_Styles_Terms($request, $campaña);
        
        CampañaController::ftp_portal_cautivo($NameTabla, $request);

        CampañaController::sendImages($request, $NameTabla, $campaña);
        
        SideBarController::getSideBarRol(session('rol'),session('database'));

        return response()->json(['message' => 200]);
    }

    private function createTable($request, $NameTabla){
        try {
            Schema::connection(session('database'))->create($NameTabla, function (Blueprint $table) use ($request) {
                $table->increments('id');
                $table->bigInteger('id_evento');
                $table->dateTime('fecha_creacion');
    
                if($request->nombre){
                    $table->string('estado_nombre')->nullable();
                }            
                if($request->apellidos){
                    $table->string('estado_apellidos')->nullable();
                }
                if($request->email){
                    $table->string('estado_email')->nullable();
                }              
                if($request->edad){
                    $table->string('estado_edad')->nullable();
                }            
                if($request->genero){
                    $table->string('estado_genero')->nullable();
                }            
                if($request->telefono){
                    $table->string('estado_telefono')->nullable();
                }            
                if($request->num_voucher){
                    $table->string('estado_num_voucher')->nullable();
                }            
                if($request->num_habitacion){
                    $table->string('estado_num_habitacion')->nullable();
                }            
                if($request->razon_visita){
                    $table->string('estado_razon_visita')->nullable();
                }
                $table->string('email')->nullable();
                $table->string('nombre')->nullable();
                $table->string('apellidos')->nullable();
                $table->string('edad')->nullable();
                $table->string('genero')->nullable();
                $table->string('telefono')->nullable();
                $table->string('num_voucher')->nullable();
                $table->string('num_habitacion')->nullable();
                $table->string('razon_visita')->nullable();
                $table->string('os')->nullable();
                $table->string('ssid')->nullable();
                $table->string('mac_cliente')->nullable();
                $table->string('ip_cliente')->nullable();
                $table->string('ip_ap')->nullable();
                $table->string('mac_ap')->nullable();
            });
            return 200;
        } catch (\Throwable $th) {
            return 500;
        }
        
    }

    private function add_Styles_Terms($request, $campaña){
        $type_form = 0;
        $type_banner = 0;
        $static_form = 0;
        $weather_widget = 0;

        if($request->type_form_one){
            $type_form = 1;
        }
        if($request->type_form_two){
            $type_form = 2;
        }
        if($request->type_form_three){
            $type_form = 3;
        }

        if($request->imgsBannerSwitch){
            $type_banner = 1;
        }

        if($request->static_form){
            $static_form = 1;
        }

        if($request->type_banner_one){
            $type_banner = 1;
        }
        if($request->type_banner_two){
            $type_banner = 2;
        }

        if($request->weather_widget){
            $weather_widget = 1;
        }

        DB::connection(session('database'))->table('styles_campania')->insert([
            'id_campania' => $campaña->id,
            'width_logo_web' => $request->sizeLogoWeb.'px',
            'margin_logo_web' => '1px',
            'width_logo_movil' => $request->sizeLogoMobile.'px',
            'margin_logo_movil' => '1px',
            'container_form_color' => "rgba(".$request->backgroundColorForm['r'].", ".$request->backgroundColorForm['g'].", ".$request->backgroundColorForm['b'].", ".$request->backgroundColorForm['a'].")",
            'container_form_font_color' => "rgba(".$request->colorFontForm['r'].", ".$request->colorFontForm['g'].", ".$request->colorFontForm['b'].", ".$request->colorFontForm['a'].")",
            'button_font_color' => "rgba(".$request->buttonColorsFont['r'].", ".$request->buttonColorsFont['g'].", ".$request->buttonColorsFont['b'].", ".$request->buttonColorsFont['a'].")",
            'button_background_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'button_border_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'button_hover_font_color' => '#EEE',
            'button_hover_background_color' => '#000',
            'checkbox_terms_background_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'checkbox_terms_border_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'msg_error_color_font' => '#EEE',
            'msg_error_color_background' => 'rgb(160,19,35,0.91)',
            'title_portal' => $request->titlePortal,
            'color_title_portal' => "rgba(".$request->colorTitleForm['r'].", ".$request->colorTitleForm['g'].", ".$request->colorTitleForm['b'].", ".$request->colorTitleForm['a'].")",
            'color_background' => "rgba(".$request->backgroundColor['r'].", ".$request->backgroundColor['g'].", ".$request->backgroundColor['b'].", ".$request->backgroundColor['a'].")",
            'type_form' => $type_form,
            'type_banner' => $type_banner,
            'static_form' => $static_form,
            'weather_widget' => $weather_widget
        ]);

        DB::connection(session('database'))->table('terms_conditions_campania')->insert([
            'id_campania' => $campaña->id,
            'terms_conditions_es' => $request->terminos_condiciones_esp,
            'terms_conditions_en' => $request->terminos_condiciones_eng         
        ]);
    }

    private function ftp_portal_cautivo($NameTabla, $request = ''){
        $db = session('database');
        $portal_cautivo = Storage::disk('public')->allFiles('portal_cautivo');
        $host = env("DB_HOST");
        $userportal = env('DB_USERNAME');
        $password = env('DB_PASSWORD');
        $database = session('database');
        $campania = $NameTabla;
        
        $type_form = 0;

        if($request->type_form_one){
            $type_form = 1;
        }
        if($request->type_form_two){
            $type_form = 2;
        }
        if($request->type_form_three){
            $type_form = 3;
        }

        $config = '[database]
        host = "'.$host.'"
        port = ""
        user = "'.$userportal.'"
        password = "'.$password.'"
        name = "'.$database.'"
        campania = "'.$campania.'"
        id_locacion = "'.$request->user_location.'"
        id_campania = "'.$request->id_campaing.'"
        type_form = "'.$type_form.'"';

        if(($db == 'unicentro' && ($request->id_campaing == 1 || $request->id_campaing == 2))){
            for ($i=0; $i < count($portal_cautivo); $i++) { 
                $new_path[$i] = substr($portal_cautivo[$i], 15);
                Storage::disk("ftp_".session('database')."")->put($NameTabla."/$new_path[$i]", Storage::disk('public')->get($portal_cautivo[$i]));
            }
            Storage::disk("ftp_".session('database')."")->prepend($NameTabla."/db/parameter.ini.dist", $config);

            // descomentar al pasar a produccion

            // for ($i=0; $i < count($portal_cautivo); $i++) { 
            //     $new_path[$i] = substr($portal_cautivo[$i], 15);
            //     Storage::disk("ftp_unicentro_produccion"."")->put($NameTabla."/$new_path[$i]", Storage::disk('public')->get($portal_cautivo[$i]));
            // }
            // Storage::disk("ftp_unicentro_produccion"."")->prepend($NameTabla."/db/parameter.ini.dist", $config);
            
        }
        if(($db == 'portal_oxohotel' && $request->id_campaing == 2)){
            for ($i=0; $i < count($portal_cautivo); $i++) { 
                $new_path[$i] = substr($portal_cautivo[$i], 15);
                Storage::disk("ftp_".session('database')."")->put($NameTabla."/$new_path[$i]", Storage::disk('public')->get($portal_cautivo[$i]));
            }
            Storage::disk("ftp_".session('database')."")->prepend($NameTabla."/db/parameter.ini.dist", $config);

            // descomentar al pasar a produccion

            // for ($i=0; $i < count($portal_cautivo); $i++) { 
            //     $new_path[$i] = substr($portal_cautivo[$i], 15);
            //     Storage::disk("ftp_ermita_produccion"."")->put($NameTabla."/$new_path[$i]", Storage::disk('public')->get($portal_cautivo[$i]));
            // }
            // Storage::disk("ftp_ermita_produccion"."")->prepend($NameTabla."/db/parameter.ini.dist", $config);
            
        }
        if(($db == 'portal_oxohotel' && $request->id_campaing != 2) || ($db == 'unicentro' &&  ($request->id_campaing != 1 && $request->id_campaing != 2)) || ($db !='unicentro' && $db !='portal_oxohotel')){
            for ($i=0; $i < count($portal_cautivo); $i++) { 
                $new_path[$i] = substr($portal_cautivo[$i], 15);
                Storage::disk("ftp_".session('database')."")->put($NameTabla."/$new_path[$i]", Storage::disk('public')->get($portal_cautivo[$i]));
            }
            Storage::disk("ftp_".session('database')."")->prepend($NameTabla."/db/parameter.ini.dist", $config);
        }
        

       
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
        $zonas = DB::select("CALL dataCampaings ('".session('database')."', '$id')");
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
                ->select("SELECT cs.id as id_campaing, cs.nombre, cs.campania, cs.descripcion, cs.fecha_inicio, cs.fecha_fin, cs.zona_ap, cs.vertical_economica, sc.*, tcc.terms_conditions_es, tcc.terms_conditions_en, (SELECT fc.nombre FROM files_campania fc WHERE fc.id_tipo_archivo_multimedia = 1 AND fc.id_campania = cs.id) AS background,(SELECT fc.nombre FROM files_campania fc WHERE fc.id_tipo_archivo_multimedia = 2 AND fc.id_campania = cs.id) AS logo, (SELECT fc.nombre FROM files_campania fc WHERE fc.id_tipo_archivo_multimedia = 3 AND fc.id_campania = cs.id) AS favico FROM campania cs 
                INNER JOIN styles_campania sc ON sc.id_campania = cs.id
                INNER JOIN terms_conditions_campania tcc ON tcc.id_campania = cs.id 
                WHERE cs.id = $id");

                return response()->json([$dataCampaing[0],$getColumnNames], 200);
        } catch (\Throwable $th) {
            return response()->json($dataCampaing, 500);
        }
    }

    public function alterTableWithNewColumns($request, $id, $NameTable){
            Schema::connection(session('database'))->table($NameTable, function (Blueprint $table) use ($request,$NameTable) {
                if($request->email && !Schema::connection(session('database'))->hasColumn($NameTable,'estado_email')){
                    $table->string('estado_email');
                }            
                if($request->nombre && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_nombre'))){
                    $table->string('estado_nombre');
                }            
                if($request->apellidos && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_apellidos'))){
                    $table->string('estado_apellidos');
                }            
                if($request->edad && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_edad'))){
                    $table->string('estado_edad');
                }            
                if($request->genero && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_genero'))){
                    $table->string('estado_genero');
                }            
                if($request->telefono && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_telefono'))){
                    $table->string('estado_telefono');
                }            
                if($request->num_voucher && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_num_voucher'))){
                    $table->string('estado_num_voucher');
                }            
                if($request->num_habitacion && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_num_habitacion'))){
                    $table->string('estado_num_habitacion');
                }            
                if($request->razon_visita && !(Schema::connection(session('database'))->hasColumn($NameTable,'estado_razon_visita'))){
                    $table->string('estado_razon_visita');
                }

                if(!$request->nombre && Schema::connection(session('database'))->hasColumn($NameTable,'estado_nombre')){
                    $table->dropColumn('estado_nombre');
                }            
                if(!$request->apellidos && Schema::connection(session('database'))->hasColumn($NameTable,'estado_apellidos')){
                    $table->dropColumn('estado_apellidos');
                }            
                if(!$request->email && Schema::connection(session('database'))->hasColumn($NameTable,'estado_email')){
                    $table->dropColumn('estado_email');
                }            
                if(!$request->edad && Schema::connection(session('database'))->hasColumn($NameTable,'estado_edad')){
                    $table->dropColumn('estado_edad');
                }            
                if(!$request->genero && Schema::connection(session('database'))->hasColumn($NameTable,'estado_genero')){
                    $table->dropColumn('estado_genero');
                }            
                if(!$request->telefono && Schema::connection(session('database'))->hasColumn($NameTable,'estado_telefono')){
                    $table->dropColumn('estado_telefono');
                }            
                if(!$request->num_voucher && Schema::connection(session('database'))->hasColumn($NameTable,'estado_num_voucher')){
                    $table->dropColumn('estado_num_voucher');
                }            
                if(!$request->num_habitacion && Schema::connection(session('database'))->hasColumn($NameTable,'estado_num_habitacion') ){
                    $table->dropColumn('estado_num_habitacion');
                }            
                if(!$request->razon_visita && Schema::connection(session('database'))->hasColumn($NameTable,'estado_razon_visita')){
                    $table->dropColumn('estado_razon_visita');
                }

            });
    }


    public function deleteFolderFtp($NameTableForDelete){
        //descomentar al pasar a producción

        // if((session('database') == 'portal_oxohotel' && $id != 2) || (session('database') == 'unicentro' && ($id != 1 && $id != 2)) || (session('database') !='unicentro' && session('database') !='portal_oxohotel')){
            if(Storage::disk("ftp_".session('database'),"")->exists($NameTableForDelete)){
                Storage::disk("ftp_".session('database'),"")->deleteDirectory($NameTableForDelete);
            }
        // }
        // if((session('database') == 'unicentro' && ($id == 1 || $id == 2))){
        //     if(Storage::disk("ftp_unicentro_produccion","")->exists($NameTableForDelete)){
        //         Storage::disk("ftp_ermita_produccion","")->deleteDirectory($NameTableForDelete);
        //     }
        // }
        // if((session('database') == 'portal_oxohotel' && $id == 2)){
        //     if(Storage::disk("ftp_ermita_produccion","")->exists($NameTableForDelete)){
        //         Storage::disk("ftp_ermita_produccion","")->deleteDirectory($NameTableForDelete);
        //     }
        // }
    }
    
    private function alterTable($NameTabla, $NameTableForDelete){
        try {
            Schema::connection(session('database'))->rename($NameTableForDelete, $NameTabla);
            return 200;
        } catch (\Throwable $th) {
           return 500;
        }
        
    }

    private function update_Styles_Terms($request){
        $type_form = 0;
        $type_banner = 0;
        $static_form = 0;
        $weather_widget = 0;

        if($request->type_form_one){
            $type_form = 1;
        }
        if($request->type_form_two){
            $type_form = 2;
        }
        if($request->type_form_three){
            $type_form = 3;
        }

        
        if($request->static_form){
            $static_form = 1;
        }
      

        if($request->type_banner_one){
            $type_banner = 1;
        }
        if($request->type_banner_two){
            $type_banner = 2;
        }
        
        if($request->weather_widget){
            $weather_widget = 1;
        }

        DB::connection(session('database'))->table('styles_campania')->where('id_campania', $request->id_campaing)->update([
            'width_logo_web' => $request->sizeLogoWeb.'px',
            'margin_logo_web' => '1px',
            'width_logo_movil' => $request->sizeLogoMobile.'px',
            'margin_logo_movil' => '1px',
            'container_form_color' => "rgba(".$request->backgroundColorForm['r'].", ".$request->backgroundColorForm['g'].", ".$request->backgroundColorForm['b'].", ".$request->backgroundColorForm['a'].")",
            'container_form_font_color' => "rgba(".$request->colorFontForm['r'].", ".$request->colorFontForm['g'].", ".$request->colorFontForm['b'].", ".$request->colorFontForm['a'].")",
            'button_font_color' => "rgba(".$request->buttonColorsFont['r'].", ".$request->buttonColorsFont['g'].", ".$request->buttonColorsFont['b'].", ".$request->buttonColorsFont['a'].")",
            'button_background_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'button_border_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'button_hover_font_color' => '#EEE',
            'button_hover_background_color' => '#000',
            'checkbox_terms_background_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'checkbox_terms_border_color' => "rgba(".$request->buttonColors['r'].", ".$request->buttonColors['g'].", ".$request->buttonColors['b'].", ".$request->buttonColors['a'].")",
            'msg_error_color_font' => '#EEE',
            'msg_error_color_background' => 'rgb(160,19,35,0.91)',
            'title_portal' => $request->titlePortal,
            'color_title_portal' => "rgba(".$request->colorTitleForm['r'].", ".$request->colorTitleForm['g'].", ".$request->colorTitleForm['b'].", ".$request->colorTitleForm['a'].")",
            'color_background' => "rgba(".$request->backgroundColor['r'].", ".$request->backgroundColor['g'].", ".$request->backgroundColor['b'].", ".$request->backgroundColor['a'].")",
            'type_form' => $type_form,
            'type_banner' => $type_banner,
            'static_form' => $static_form,
            'weather_widget' => $weather_widget
        ]);

        DB::connection(session('database'))->table('terms_conditions_campania')->where('id_campania', $request->id_campaing)->update([
            'terms_conditions_es' => $request->terminos_condiciones_esp,
            'terms_conditions_en' => $request->terminos_condiciones_eng         
        ]);
    }

    private function sendImagesWithUpdate($request, $NameTable, $urlEncodedBackground='', $urlEncodedLogo=''){
        $db = session('database');
        if(($db == 'unicentro' && ($request->id_campaing == 1 || $request->id_campaing == 2))){
            $background = explode(';base64,', $urlEncodedBackground);
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/background.png", base64_decode($background[1]));
            $logo = explode(';base64,', $urlEncodedLogo);
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/logo.png", base64_decode($logo[1]));
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/favicon.ico", base64_decode($logo[1]));

            // descomentar al pasar a produccion

            // $background = explode(';base64,', $urlEncodedBackground);
            // Storage::disk("ftp_unicentro_produccion"."")->put($NameTable."/img/background.png", base64_decode($background[1]));
            // $logo = explode(';base64,', $urlEncodedLogo);
            // Storage::disk("ftp_unicentro_produccion"."")->put($NameTable."/img/logo.png", base64_decode($logo[1]));
            // Storage::disk("ftp_unicentro_produccion"."")->put($NameTable."/img/favicon.ico", base64_decode($logo[1]));
         }
         if(($db == 'portal_oxohotel' && $request->id_campaing == 2)){
            $background = explode(';base64,', $urlEncodedBackground);
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/background.png", base64_decode($background[1]));
            $logo = explode(';base64,', $urlEncodedLogo);
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/logo.png", base64_decode($logo[1]));
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/favicon.ico", base64_decode($logo[1]));

            // descomentar al pasar a produccion

                // $background = explode(';base64,', $urlEncodedBackground);
                // Storage::disk("ftp_ermita_produccion"."")->put($NameTable."/img/background.png", base64_decode($background[1]));
                // $logo = explode(';base64,', $urlEncodedLogo);
                // Storage::disk("ftp_ermita_produccion"."")->put($NameTable."/img/logo.png", base64_decode($logo[1]));
                // Storage::disk("ftp_ermita_produccion"."")->put($NameTable."/img/favicon.ico", base64_decode($logo[1]));
         }
         if(($db == 'portal_oxohotel' && $request->id_campaing != 2) || ($db == 'unicentro' &&  ($request->id_campaing != 1 && $request->id_campaing != 2)) || ($db !='unicentro' && $db !='portal_oxohotel')){
            
            $background = explode(';base64,', $request->fileBackground);
            // dd($request->fileBackground);
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/background.png", base64_decode($background[1]));
    
            $logo = explode(';base64,', $request->fileLogo);
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/logo.png", base64_decode($logo[1]));
    
            Storage::disk("ftp_".session('database')."")->put($NameTable."/img/favicon.ico", base64_decode($logo[1]));
        }
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
            DB::connection(session('database'))->select("delete from banner_files_campania where id_campania = $request->id_campaing");
            for($i=0; $i < count($request->filesBanner); $i++){
                $banner = explode(';base64,', $request->filesBanner[$i]);
                Storage::disk("ftp_".session('database')."")->put($NameTable."/img/banner/banner".($i+1).".png", base64_decode($banner[1]));
                DB::connection(session('database'))->table('banner_files_campania')->insert([
                    'id_campania' => $request->id_campaing,
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
        if((session('database') == 'portal_oxohotel' && $id != 2) || (session('database') == 'unicentro' && ($id != 1 && $id != 2)) || (session('database') !='unicentro' && session('database') !='portal_oxohotel')){
            $NameTable = str_replace(["-", " "],"_",$request->nombre_campaña."_".date('Y-m-d', strtotime($request->fecha_inicio)));

            $NameTableForDelete = $request->campaingForDelete;
            
            if($NameTableForDelete != $NameTable){
                $validation = CampañaController::alterTable($NameTable, $NameTableForDelete);
                if($validation == 500){
                    return response()->json(['message' => 500]);
                }else{
                    $campania = DB::connection(session('database'))
                    ->table('campania')
                    ->where('id', $id)
                    ->update(['nombre' => $request->nombre_campaña,'campania' => $NameTable, 'path_campania' => env("APP_URL").'portales/'.$NameTable]);
                }
            }

            $comparisionCampaings = DB::connection(session('database'))->select("select fecha_inicio, fecha_fin, descripcion, zona_ap, ano_evento, campania, vertical_economica from campania where id = $id");
        
            if((($comparisionCampaings[0]->fecha_inicio != $request->fecha_inicio || $comparisionCampaings[0]->fecha_fin != $request->fecha_fin) || $comparisionCampaings[0]->descripcion != $request->descripcion) || ($comparisionCampaings[0]->zona_ap != $request->zona_ap || ($comparisionCampaings[0]->ano_evento != $request->anio || $comparisionCampaings[0]->vertical_economica != $request->vertical_economica))){
                $campania = DB::connection(session('database'))
                    ->table('campania')
                    ->where('id', $id)
                    ->update(['fecha_inicio' => $request->fecha_inicio, 'fecha_fin' => $request->fecha_fin, 'descripcion' => $request->descripcion, 'zona_ap' => $request->zona_ap,'ano_evento' => $request->anio, 'vertical_economica' => $request->vertical_economica]);
            }

            CampañaController::alterTableWithNewColumns($request, $id, $NameTable);

           
            CampañaController::update_Styles_Terms($request);
            CampañaController::deleteFolderFtp($NameTableForDelete, $id);
            CampañaController::ftp_portal_cautivo($NameTable, $request);
            CampañaController::sendImagesWithUpdate($request, $NameTable);
            SideBarController::getSideBarRol(session('rol'),session('database'));
            return response()->json(['message' => 200]);
        } else{
            $imgBackground = file_get_contents($request->fileBackground);
            $urlEncodedBackground='data:image/png;base64,'.base64_encode($imgBackground);
            $imgLogo = file_get_contents($request->fileLogo);
            $urlEncodedLogo='data:image/png;base64,'.base64_encode($imgLogo);

            $NameTable = str_replace(["-", " "],'_', $request->nombre_campaña);

            $NameTableForDelete = $request->campaingForDelete;
            
            if($NameTableForDelete != $NameTable){
                $validation = CampañaController::alterTable($NameTable, $NameTableForDelete);
                if($validation == 500){
                    return response()->json(['message' => 500]);
                }
                if($validation == 200 && session('database') == 'unicentro'){
                    $campania = DB::connection(session('database'))
                    ->table('campania')
                    ->where('id', $id)
                    ->update(['nombre' => $request->nombre_campaña,'campania' => $NameTable, 'path_campania' => 'https://www.unicentro.ipwork.io/'.$NameTable]);
                }
                if($validation == 200 && session('database') == 'portal_oxohotel'){
                    $campania = DB::connection(session('database'))
                    ->table('campania')
                    ->where('id', $id)
                    ->update(['nombre' => $request->nombre_campaña,'campania' => $NameTable, 'path_campania' => 'https://www.oxohotel.ipwork.io/'.$NameTable]);
                }
            }

            $comparisionCampaings = DB::connection(session('database'))->select("select fecha_inicio, fecha_fin, descripcion, zona_ap, ano_evento, campania, vertical_economica from campania where id = $id");
        
            if((($comparisionCampaings[0]->fecha_inicio != $request->fecha_inicio || $comparisionCampaings[0]->fecha_fin != $request->fecha_fin) || $comparisionCampaings[0]->descripcion != $request->descripcion) || ($comparisionCampaings[0]->zona_ap != $request->zona_ap || ($comparisionCampaings[0]->ano_evento != $request->anio || $comparisionCampaings[0]->vertical_economica != $request->vertical_economica))){
                $campania = DB::connection(session('database'))
                    ->table('campania')
                    ->where('id', $id)
                    ->update(['fecha_inicio' => $request->fecha_inicio, 'fecha_fin' => $request->fecha_fin, 'descripcion' => $request->descripcion, 'zona_ap' => $request->zona_ap,'ano_evento' => $request->anio, 'vertical_economica' => '']);
            }

            CampañaController::alterTableWithNewColumns($request, $id, $NameTable);

            CampañaController::update_Styles_Terms($request);
            CampañaController::deleteFolderFtp($NameTableForDelete, $id);
            CampañaController::ftp_portal_cautivo($NameTable, $request);
            CampañaController::sendImagesWithUpdate($request, $NameTable, $urlEncodedBackground, $urlEncodedLogo);
            SideBarController::getSideBarRol(session('rol'),session('database'));
            return response()->json(['message' => 200]);
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
