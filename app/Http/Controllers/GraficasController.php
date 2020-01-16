<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraficasController extends Controller
{
    public function Consulta(Request $request){

        $fecha_inicial = '"'.date('Y-m-d H:i:00', strtotime($request->initialDate)).'"';
        $fecha_final = '"'.date('Y-m-d H:i:00', strtotime($request->finalDate)).'"';
        $campania =$request->id_event;
        $locaccion =$request->id_location;
        $database = session('database');
        $columns = $request->column;
        $columnsQuery = '["'.implode('","',$columns).'"]';

        $dataColumns = DB::select(
            "call dataColumnsCampaings('".$database."','".$locaccion."','".$campania."','".$columnsQuery."','".$fecha_inicial."','".$fecha_final."')"
        );
        
        for($i = 0; $i < count($columns); $i++){
            $DatosGraficas[$columns[$i]] = array();
        }

        $countData = 0;
        $countColumns = 0;
        foreach ($dataColumns as $key){
            do{
                if($key->nameColumn ==  $columns[$countColumns]){
                    $DatosGraficas[$key->nameColumn][$countData] = array();
                    if($key->nameColumn === "mac_ap"){
                        $nombre_dispositivo = DB::connection(session('database'))->table('dispositivos')->select('nombre_dispositivo')->where('mac_dispositivo', $key->dataColumn)->first();
                        if($nombre_dispositivo){
                            $key->dataColumn = $nombre_dispositivo->nombre_dispositivo; 
                        }
                    }
                    $DatosGraficas[$key->nameColumn][$countData] = array(
                        "personas" => $key->people,
                        $key->nameColumn => $key->dataColumn
                    );
                    $countData++;
                    $repitetir = false;
                }
                else{
                    $countData = 0;
                    $repitetir = true;
                    $countColumns++;
                }
            }while ($repitetir);
        }
        // $DatosGraficas['genero'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('genero, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('genero')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();
        
        // $DatosGraficas['ap'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('ip_ap as ap, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('ap')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();

        // $DatosGraficas['paises'] = DB::connection(session('database'))
        //     ->table($Evento->campania.' as pac')
        //     ->join('paises', 'pac.id_pais',  '=', 'paises.id')
        //     ->select(DB::raw('paises.nombre_esp as pais, pac.id_pais, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('pac.id_pais', 'pais')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();


        // $DatosGraficas['os'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('os, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('os')
        //     ->orderBy('personas', 'DESC')
        //     ->limit(5)
        //     ->get();

        // $DatosGraficas['fecha'] = DB::connection(session('database'))
        //     ->table($Evento->campania)
        //     ->select(DB::raw('date(fecha_creacion) as fecha, COUNT(*) AS personas'))
        //     ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
        //     ->groupBy('fecha')
        //     ->orderBy('fecha', 'ASC')
        //     ->get();
            
        return response()->json($DatosGraficas, 200);
    }

    public function TopCampaings(Request $request){
        $database = session('database');
        $locacion = $request->id_location;
        $dataTop = DB::select(
            "call dataTopCampaings('".$database."','".$locacion."')"
        );
        return $dataTop;
    }

    public function LastTenUsersCampaing(Request $request){
        $database = session('database');
        $locacion = $request->id_location;
        $dataUsers = DB::select(
            "call dataLastTen('".$database."','".$locacion."')"
        );
        return $dataUsers;
    }

    public function TopZones(Request $request){
        $database = session('database');
        $locacion = $request->id_location;
        $dataZones = DB::select(
            "call dataTopZones('".$database."','".$locacion."')"
        );
        return $dataZones;
    }

    public function TopVisits(Request $request){
        $database = session('database');
        $locacion = $request->id_location;
        $dataVisits = DB::select(
            "call dataTopVisits('".$database."','".$locacion."')"
        );
        return $dataVisits;
    }

    public function TotalRecords(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select count(*) as TotalRecords from $database.$tabla->campania";
        $TotalRecords = DB::select($query);
        return $TotalRecords;
    }
    
    public function UsersMoreVisit(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select nombre as 'Nombre', apellidos as 'Apellido', email as 'Email', telefono as 'Celular', genero as 'Sexo', os as 'Sistema_Operativo', count(mac_cliente) as 'N_Visitas' FROM $database.$tabla->campania GROUP BY mac_cliente, nombre, apellidos, email, telefono, genero, os ORDER BY N_Visitas desc limit 10";
        $UsersMoreVisit = DB::select($query);
        return $UsersMoreVisit;
    }

    public function LastTenUsersListCampaing(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select nombre as 'Nombre', apellidos as 'Apellido', email as 'Email', telefono as 'Celular', genero as 'Sexo', os as 'Sistema_Operativo', fecha_creacion as 'Fecha_Creacion' FROM $database.$tabla->campania ORDER BY fecha_creacion desc limit 10";
        $LastTenUsersListCampaing = DB::select($query);
        return $LastTenUsersListCampaing;
    }

    public function TopTenAgesList(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select edad as 'Edad', count(edad) as 'N_Registros' FROM $database.$tabla->campania GROUP BY Edad ORDER BY N_Registros desc limit 10";
        $TopTenAgesList = DB::select($query);
        return $TopTenAgesList;
    }

    public function PromedyAge(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('campania')->select('campania')->where('id', $request->id_campaing)->first();
        $query = "select round(avg(edad)) as Promedio FROM $database.$tabla->campania";
        $PromedyAge = DB::select($query);
        return $PromedyAge;
    }
}
