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
    constructor(props){
        super(props);

        this.state = {
            props: '',
            visitHistory: []
        }
        this.handleVisit = this.handleVisit.bind(this);
    }
    
    handleVisit(visitHistory){
        for (let i = 0; i < visitHistory.length; i++) {
            let typeTime = "Seg";
            let Time = Math.round(visitHistory[i].Tiempo_Conexion);
            if(Time >= 60){
                Time = Math.round((Time/60));
                typeTime = "Min";
                if(Time >= 60){
                    Time = Math.round((Time/60));
                    typeTime = "Hrs";
                    if(Time >= 24){
                        Time = Math.round((Time/24));
                        typeTime = "Dias";
                    }
                }
            }

            let typeBajada = "Bytes";
            let Data_Bajada = Math.round(visitHistory[i].Data_Bajada*10)/10;
            if(Data_Bajada > 1024.0){
                Data_Bajada = Math.round((Data_Bajada/1024)*10)/10;
                typeBajada = "Kb";
                if(Data_Bajada > 1024.0){
                    Data_Bajada = Math.round((Data_Bajada/1024)*10)/10;
                    typeBajada = "Mb";
                    if(Data_Bajada > 1024.0){
                        Data_Bajada = Math.round((Data_Bajada/1024)*10)/10;
                        typeBajada = "Gb";
                        if(Data_Bajada > 1024.0){
                            Data_Bajada = Math.round((Data_Bajada/1024)*10)/10;
                            typeBajada = "Tb";
                        }
                    }
                }
            }
            
            let typeSubida = "Bytes";
            let Data_Subida = Math.round(visitHistory[i].Data_Subida*10)/10;
            if(Data_Subida > 1024.0){
                Data_Subida = Math.round((Data_Subida/1024)*10)/10;
                typeSubida = "Kb";
                if(Data_Subida > 1024.0){
                    Data_Subida = Math.round((Data_Subida/1024)*10)/10;
                    typeSubida = "Mb";
                    if(Data_Subida > 1024.0){
                        Data_Subida = Math.round((Data_Subida/1024)*10)/10;
                        typeSubida = "Gb";
                        if(Data_Subida > 1024.0){
                            Data_Subida = Math.round((Data_Subida/1024)*10)/10;
                            typeSubida = "Tb";
                        }
                    }
                }
            }

            this.state.visitHistory[i] = {
                Fecha_Registro : visitHistory[i].Fecha_Registro,
                Tiempo_Conexion : Time,
                typeTime : typeTime,
                Data_Bajada : Data_Bajada,
                typeBajada : typeBajada,
                Data_Subida : Data_Subida,
                typeSubida : typeSubida,
            }
        }
    }

    componentDidUpdate() {
        if(this.state.props != this.props.visitHistory){
           this.handleVisit(this.props.visitHistory)
           this.setState({
              props: this.props.visitHistory
           })
        }
     }

    render() {
        const { visitHistory } = this.state;

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
                            {visitHistory && visitHistory.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.Fecha_Registro}</TableCell>
                                    <TableCell>{list.Tiempo_Conexion+" "+list.typeTime}</TableCell>
                                    <TableCell>{list.Data_Bajada+" "+list.typeBajada}</TableCell>
                                    <TableCell>{list.Data_Subida+" "+list.typeSubida}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </RctCardContent>
        );
    }
}