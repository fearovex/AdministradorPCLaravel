import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// rct card box
import { RctCardContent } from 'Components/RctCard';

const VisitHistoryColumns = ['Fecha Registro','Tiempo Conexion', 'Data Bajada', 'Data Subida'];

export default class VisitHistory extends Component {    
    render() {
        const { visitHistory } = this.props;

        return (
            <RctCardContent>
                <div className="ongoing-projects-wrap" style={{maxHeight: '250.5px', overflow: 'auto'}}>
                    <Table className="table-wrap" >
                        <TableHead >
                            <TableRow>
                                {VisitHistoryColumns.map((th, index) => (
                                <TableCell key={index} className="fw-bold">{th}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {visitHistory && visitHistory.map((list, index, typeTime="", typeBajada="", typeSubida="") => (
                                list.Tiempo_Conexion = Math.round(list.Tiempo_Conexion),
                                list.Tiempo_Conexion < 60 ? (list.Tiempo_Conexion = list.Tiempo_Conexion, typeTime = " Seg") : 
                                (
                                    Math.round(list.Tiempo_Conexion/60) < 60 ? (list.Tiempo_Conexion = Math.round(list.Tiempo_Conexion/60), typeTime = " Min") : 
                                    (
                                        (Math.round(list.Tiempo_Conexion/60/60) < 60 ? (list.Tiempo_Conexion = Math.round(list.Tiempo_Conexion/60/60), typeTime = " Hrs") : 
                                        (
                                            Math.round(list.Tiempo_Conexion/60/60/24), typeTime = " Dias") 
                                        )
                                    )
                                ),

                                list.Data_Bajada = Math.round(list.Data_Bajada*10)/10,
                                list.Data_Bajada < 1024.0 ? (list.Data_Bajada = list.Data_Bajada,  typeBajada = " Kb") : 
                                (
                                    Math.round(list.Data_Bajada/1024*10)/10 < 1024.0 ? (list.Data_Bajada = Math.round(list.Data_Bajada/1024*10)/10,  typeBajada = " Mb") : 
                                    (
                                        Math.round(list.Data_Bajada/1024/1024*10)/10 < 1024.0 ? (list.Data_Bajada = Math.round(list.Data_Bajada/1024/1024*10)/10,  typeBajada = " Gb") : 
                                        (
                                            list.Data_Bajada = Math.round(list.Data_Bajada/1024/1024/1024*10)/10,  typeBajada = " Tb"
                                        )
                                    )
                                ),

                                list.Data_Subida = Math.round(list.Data_Subida*10)/10,
                                list.Data_Subida < 1024.0 ? (list.Data_Subida = list.Data_Subida,  typeSubida = " Kb") : 
                                (
                                    Math.round(list.Data_Subida/1024*10)/10 < 1024.0 ? (list.Data_Subida = Math.round(list.Data_Subida/1024*10)/10,  typeSubida = " Mb") : 
                                    (
                                        Math.round(list.Data_Subida/1024/1024*10)/10 < 1024.0 ? (list.Data_Subida = Math.round(list.Data_Subida/1024/1024*10)/10,  typeSubida = " Gb") : 
                                        (
                                            list.Data_Subida = Math.round(list.Data_Subida/1024/1024/1024*10)/10,  typeSubida = " Tb"
                                        )
                                    )
                                ),
                                <TableRow key={index}>
                                    <TableCell>{list.Fecha_Registro}</TableCell>
                                    <TableCell>{list.Tiempo_Conexion+typeTime}</TableCell>
                                    <TableCell>{list.Data_Bajada+typeBajada}</TableCell>
                                    <TableCell>{list.Data_Subida+typeSubida}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </RctCardContent>
        );
    }
}