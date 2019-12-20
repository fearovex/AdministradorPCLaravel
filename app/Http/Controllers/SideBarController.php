<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SideBarController extends Controller
{
    public static function getSideBarRol($rol, $database){
        if($rol == 1){
            $locations=DB::connection($database)
                ->select("select * from locaciones");
            $locationsArray = [];
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
                        'path'=>'/app/locations/'.$location->nombre.'/campañas/'.$campaing->nombre
                    );
                }
                $locationsArray[$count] = (object) array(
                    'menu_title'=>$location->nombre,
                    'id_campain'=> '',
                    'tb' => '',
                    'id_location' => $location->id,
                    'type_multi'=>true,
                    'child_routes'=>[
                        (object) array(
                            'menu_title'=>'DetailCampaings',
                            'type_multi'=> false,
                            'id_campain'=> '',
                            'tb' => '',
                            'id_location' => $location->id,
                            'path'=>'/app/locations/'.$location->nombre.'/campañas'
                        ),
                        (object) array(
                            'menu_title'=>'Campaings',
                            'type_multi'=>true,
                            'menu_icon'=>'zmdi zmdi-view-compact',
                            'child_routes'=> $campaingsArray
                        ),
                        (object) array(
                            'menu_title'=>'Zonas',
                            'id_campain'=> '',
                            'tb' => '',
                            'id_location' => $location->id,
                            'type_multi'=> false,
                            'path'=>'/app/locations/'.$location->nombre.'/zonas'
                        ),
                        (object) array(
                            'menu_title'=>'Dispositivos',
                            'id_campain'=> '',
                            'tb' => '',
                            'id_location' => $location->id,
                            'type_multi'=> false,
                            'path'=>'/app/locations/'.$location->nombre.'/dispositivos'
                        )
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $locationsArray);

            session(['sideBar' => $sidebarJSON]);
        }
        else if($rol == 2){
            $idLocacion = 1;
            $locations=DB::connection($database)
                ->select("select * from locaciones where id=".$idLocacion);
            $locationsArray = [];
            $campaingsArray =[];
            $campaings=DB::connection($database)
                ->select("select * from campania where id_locacion =".$idLocacion);
                foreach($campaings as $countC => $campaing){
                    $campaingsArray[$countC] = (object) array(
                        'menu_title'=>$campaing->nombre,
                        'path'=>'/app/locations/'.$locations[0]->nombre.'/campañas/ '.$campaing->nombre
                    );
                }
                $locationsArray[0] = (object) array(
                    'menu_title'=>$locations[0]->nombre,
                    'child_routes'=>$campaingsArray
                );
            $sidebarJSON = (object) array('category1' => $locationsArray); 
            
            session(['sideBar' => $sidebarJSON]);
        }
        else if($rol == 3){
            $idLocacion = 1;
            $campania = 'publicidad_a_2019_campania';
            $campaingArray = [];
            $campaing=DB::connection($database)
                ->select('select * from campania where campania = "'.$campania.'" and id_locacion='.$idLocacion);
            $campaingArray[0] = (object) array(
                'menu_title'=>$campaing[0]->nombre,
                'path'=> '/app/locations/'.$idLocacion.'/campañas/'+$campaing[0]->nombre
            );

            $sidebarJSON = (object) array('category1' => $campaingArray); 
            
            session(['sideBar' => $sidebarJSON]);
        }
    }
}
