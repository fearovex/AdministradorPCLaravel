<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Storage;

class SideBarController extends Controller
{
    public function index(){
        $response = SideBarController::getSideBarRol(session('rol'),session('database'));
        return response()->json($response);
    }

    public static function getSideBarRol($rol, $database){
        $id_location = session('location');
        $id_campaing = session('campaing');
        if($rol == 1){
            $locations=DB::connection($database)
                ->select("select * from locaciones");
            $locationsArray = [];
            $locationsArray[0] = (object) array(
                'menu_title'=>'Locaciones',
                'id_campain'=> 0,
                'id_location' => 0,
                'type_multi'=>false,
                'menu_icon'=>'zmdi zmdi-city',
                'path'=>'/'
            );
            foreach ($locations as $count => $location){
                $campaingsArray =[];
                $campaings=DB::connection($database)
                    ->select("select * from campania where id_locacion =".$location->id);
                foreach($campaings as $countC => $campaing){
                    $campaingsArray[$countC] =  (object) array( 
                        'menu_title'=>$campaing->nombre,
                        'id_campain'=> $campaing->id,
                        'tb' => $campaing->campania,
                        'id_location' => $location->id,
                        'menu_icon'=>'ti-layout-grid2',
                        'path'=>'/app/locations/'.$location->nombre.'/campañas/'.$campaing->nombre
                    );
                }
                $locationsArray[$count+1] = (object) array(
                    'menu_title'=>$location->nombre,
                    'id_campain'=> 0,
                    'id_zona'=> 0,
                    'id_location' => $location->id,
                    'menu_icon'=>'zmdi zmdi-pin',
                    'type_multi'=>false,
                    'child_routes'=>[
                        (object) array(
                            'menu_title'=>"Contraseñas",
                            'id_campain'=> 0,
                            'id_location' => $location->id,
                            'type_multi'=> false,
                            'menu_icon'=>'zmdi zmdi-key',
                            'path'=> '/app/locations/'.$location->nombre.'/contraseñas'
                        ),
                        (object) array(
                            'menu_title'=>"Vouchers",
                            'id_campain'=> 0,
                            'id_location' => $location->id,
                            'type_multi'=> false,
                            'menu_icon'=>'icon-tag',
                            'path'=> '/app/locations/'.$location->nombre.'/vouchers'
                        ),
                        (object) array(
                            'menu_title'=>'Dashboard',
                            'type_multi'=> false,
                            'id_campain'=> 0,
                            'menu_icon'=>'ti-pie-chart',
                            'id_location' => $location->id,
                            'path'=>'/app/locations/'.$location->nombre
                        ),
                        (object) array(
                            'menu_title'=>'Campañas',
                            'type_multi'=> false,
                            'id_campain'=> 0,
                            'menu_icon'=>'ti-view-grid',
                            'id_location' => $location->id,
                            'path'=>'/app/locations/'.$location->nombre.'/campañas'
                        ),
                        (object) array(
                            'menu_title'=>'Zonas/Dispositivos',
                            'id_campain'=> 0,
                            'id_location' => $location->id,
                            'type_multi'=> false,
                            'menu_icon'=>'zmdi zmdi-view-carousel',
                            'path'=>'/app/locations/'.$location->nombre.'/zonas'
                        ),
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $locationsArray);
            return response()->json($sidebarJSON);
            // $sidebarJSON = (object) array('category1' => $locationsArray);
            // $jsonString = str_replace('\/', '/', json_encode($sidebarJSON));
            // $utf8 = utf8_encode($jsonString);
            // Storage::disk("local"."")->put("NavLinks.js", "export default  $utf8 ");
            // // session(['sideBar' => $sidebarJSON]);
        }
        else if($rol == 2){
            $idLocacion = $id_location;
            $location=DB::connection($database)
                ->select("select * from locaciones where id=".$idLocacion);
            $locationsArray = [];
            $locationsArray[0] = (object) array(
                'menu_title'=>$location[0]->nombre,
                'menu_icon'=>'zmdi zmdi-pin',
                'child_routes'=>[
                    (object) array(
                        'menu_title'=>"Contraseñas",
                        'id_campain'=> 0,
                        'id_location' => $location->id,
                        'type_multi'=> false,
                        'menu_icon'=>'zmdi zmdi-key',
                        'path'=> '/app/locations/'.$location->nombre.'/contraseñas'
                    ),
                    (object) array(
                        'menu_title'=>"Vouchers",
                        'id_campain'=> 0,
                        'id_location' => $location[0]->id,
                        'type_multi'=> false,
                        'menu_icon'=>'icon-tag',
                        'path'=> '/app/locations/'.$location[0]->nombre.'/vouchers'
                    ),
                    (object) array(
                        'menu_title'=>'Dashboard',
                        'type_multi'=> false,
                        'id_campain'=> 0,
                        'menu_icon'=>'ti-pie-chart',
                        'id_location' => $location[0]->id,
                        'path'=>'/app/locations/'.$location[0]->nombre
                    ),
                    (object) array(
                        'menu_title'=>'Campañas',
                        'type_multi'=> false,
                        'id_campain'=> 0,
                        'menu_icon'=>'ti-view-grid',
                        'id_location' => $location[0]->id,
                        'path'=>'/app/locations/'.$location[0]->nombre.'/campañas'
                    ),
                    (object) array(
                        'menu_title'=>'Zonas/Dispositivos',
                        'id_campain'=> 0,
                        'id_location' => $location[0]->id,
                        'type_multi'=> false,
                        'menu_icon'=>'zmdi zmdi-view-carousel',
                        'path'=>'/app/locations/'.$location[0]->nombre.'/zonas'
                    ),
                ]
            );
            $sidebarJSON = (object) array('category1' => $locationsArray); 
            return response()->json($sidebarJSON);
        }
        else if($rol == 3){
            $idLocacion = $id_location;
            $campania = DB::connection($database)->table('campania')->select('campania')->where('id',$id_campaing)->first();
            // dd($campania->campania);
            $campaingArray = [];
            $campaing=DB::connection($database)
                ->select('select * from campania where campania = "'.$campania->campania.'" and id_locacion='.$idLocacion);
            $campaingArray[0] = (object) array(
                'menu_title'=>$campaing[0]->nombre,
                'path'=> '/app/locations/'.$idLocacion.'/campañas/'.$campaing[0]->nombre
            );


            $sidebarJSON = (object) array('category1' => $campaingArray);
            return response()->json($sidebarJSON);
        }
        else if($rol == 4){
            $idLocacion = $id_location;
            $locations=DB::connection($database)
                ->select("select * from locaciones where id=".$idLocacion);
            $campaingArray = [];
         
            $campaingArray[0] = (object) array(
                'menu_title'=>"Vouchers",
                'menu_icon'=>'icon-tag',
                'path'=> '/app/locations/'.$locations[0]->nombre.'/vouchers'
            );

            $sidebarJSON = (object) array('category1' => $campaingArray);
            return response()->json($sidebarJSON);
        }
    }
}
