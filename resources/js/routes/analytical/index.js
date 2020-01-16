import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import moment from "moment";

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// widgets
import ChartGenero from "Components/new-Graficas/ChartGenero";
import ChartAp from "Components/new-Graficas/ChartAp";
import ChartPais from "Components/new-Graficas/ChartPais";
import ChartEdad from "Components/new-Graficas/ChartEdad";
import ChartOS from "Components/new-Graficas/ChartOS";
import ChartFecha from "Components/new-Graficas/ChartFecha";
import ChartZona from "Components/new-Graficas/ChartZona";
import ChartAnchoBanda from "Components/new-Graficas/ChartAnchoBanda";
import ChartConexionClientes from "Components/new-Graficas/ChartConexionClientes";

import CardInfo from "Components/new-Graficas/CardInfo";
import TopTables from "Components/new-Graficas/TopTables";
import LastTenUsersList from "Components/new-Graficas/LastTenUsersList";


import {
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardColumns,
    CardSubtitle,
    CardBody,
    CardImgOverlay
 } from 'reactstrap';


import FilterDateForm from 'Components/FilterDateForm/FilterDateForm';

export default class Analytical extends Component {

    constructor(props){
        super(props)

        const id_location = localStorage.user_location

        let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
        let año = date.year();
        let mes = date.month()+1;
        let dia = date.date();
        let hora = date.hour();
        let minutos = date.minute();
        let initialDate = (año) + '-' + (mes) + '-' + (dia) + " 00:00";
        let finalDate = (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos);

        this.state = {
            data: [],
            dataTop:[],
            lastTenUsers:[],
            topZones:[],
            topVisits:[],
			error: null,
            form: {
                filterPersonalizado: false,
                initialDate: initialDate,
                finalDate: finalDate,
                id_event: 0,
                column: ["fecha_creacion"],
                id_location: id_location,
                campania: 'Todas',
            },
            events: [],
        }
        this.ConsultaGraficas = this.ConsultaGraficas.bind(this);
        this.ConsultaEventos = this.ConsultaEventos.bind(this);
        this.handleChange=this.handleChange.bind(this)
        this.handleDateFilter=this.handleDateFilter.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.handleDateFilterCancel = this.handleDateFilterCancel.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)
        this.handleReload = this.handleReload.bind(this)
        this.TopCampanias = this.TopCampanias.bind(this);
        this.UltimosDiez = this.UltimosDiez.bind(this);
        this.TopZonas = this.TopZonas.bind(this);
        this.TopVisitas = this.TopVisitas.bind(this);
        
    }
    
    componentDidMount(){
        this.TopCampanias();
        this.UltimosDiez();
        this.TopZonas();
        this.ConsultaEventos();
        this.TopVisitas();
        let column = "fecha_creacion";
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "mac_ap";
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "os";
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "id_evento";
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
    }
    
    async TopCampanias(){
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/topCampaings`, config);
            let topCampaings = await res.json()
            
            this.setState({
                dataTop: topCampaings
            })
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async UltimosDiez(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/lastTen`, config)
            let lastTenUsers = await res.json()
            this.setState({
                lastTenUsers: lastTenUsers
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async TopZonas(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/topZones`, config)
            let topZones = await res.json()
            this.setState({
                topZones: topZones
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async TopVisitas(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/topVisits`, config)
            let topVisits = await res.json()
            this.setState({
                topVisits: topVisits
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async ConsultaGraficas(column = "fecha_creacion"){
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/graficas`, config);
            let datagraph = await res.json()
            this.state.data[column] = datagraph[column];
            // this.setState({
            //     data: [ [column] = datagraph.column ]
            // })
            
            this.setState({
                form:{
                    ...this.state.form,
                    filterPersonalizado: false,
                }
            });
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    handleDateFilter(e = null){
        if(e != null){
            e.preventDefault()
        }
        this.setState({
            form:{
                ...this.state.form,
                filterPersonalizado: false,
            }
        });
        this.componentDidMount()
    }
    
    async ConsultaEventos(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/events`)
            let dataevents = await res.json()
            
            this.setState({
                events: dataevents
            })

        } catch (error) {
            this.setState({ 
                error
            })
        }
    }

    handleChangeFilter(e){
        if(e.target.value != 4){
            let dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a');
            if(e.target.value == 1){
                dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a').subtract(3, 'days');
            }
            if(e.target.value == 2){
                dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a').subtract(15, 'days');
            }
            if(e.target.value == 3){
                dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a').subtract(1, 'month');
            }
            let añoAtras = dateAtras.year();
            let mesAtras = dateAtras.month()+1;
            let diaAtras = dateAtras.date();
            let minutosAtras = '00';
            let horaAtras = '00';

            if(e.target.value != 0){
                horaAtras = dateAtras.hour();
                minutosAtras = dateAtras.minute();
            }

            let dateActual = moment(new Date, 'YYYY/MM/DD hh:mm a');
            let añoActual = dateActual.year();
            let mesActual = dateActual.month()+1;
            let diaActual = dateActual.date();
            let horaActual = dateActual.hour();
            let minutosActual = dateActual.minute();

            this.state.form.id_event = 0
            this.state.form.initialDate = (añoAtras) + '-' + (mesAtras) + '-' + (diaAtras) + " " + (horaAtras) + ":" + (minutosAtras)
            this.state.form.finalDate = (añoActual) + '-' + (mesActual) + '-' + (diaActual) + " " + (horaActual) + ":" + (minutosActual)
            
            this.componentDidMount()
        }
        else{
            this.handleModal();
        }
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    handleChange(e, name=null){
        if(e.target){
            var nameCampain = e.target.options[e.target.selectedIndex].innerText;
            this.setState({
                form:{
                    ...this.state.form,
                    campania: nameCampain,
                    [e.target.name]: e.target.value
                }
            })
        }
        else if(e._d){
            let date = moment(e._d, 'YYYY/MM/DD hh:mm a');
            let año = date.year();
            let mes = date.month()+1;
            let dia = date.date();
            let hora = date.hour();
            let minutos = date.minute();
            this.setState({
                form:{
            		...this.state.form,
                    [name]: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos)
                }
            })
        }
    }

    handleModal(e = null){
        if(e != null){
            e.preventDefault()
        }
        this.state.form.filterPersonalizado = true;
        this.setState({
            form:{
                ...this.state.form,
                filterPersonalizado: true,
            }
        });
    }

    handleDateFilterCancel(e){
        e.preventDefault()
        this.setState({
            form:{
                ...this.state.form,
                filterPersonalizado: false,
            }
        });
        this.componentDidMount()
    }

    handleReload(column){
        this.ConsultaGraficas(column)
    }




    render() {
        const { events,form } = this.state;
        const { dataTop, lastTenUsers, topZones, topVisits } = this.state;
        const { location } = this.props.match.params
        return (
            <div className="cardsmasonry-wrapper" >
                <PageTitleBar 
                    title={location} 
                    match={this.props.match} 
                    history={this.props.history}
                />
                <FilterDateForm
                        form={form}
                        onChange={this.handleChange}
                        onSubmit={this.handleDateFilter}
                        onClick={this.handleModal}
                        onChangeFilter={this.handleChangeFilter}
                        onCancel={this.handleDateFilterCancel}
                        campain={true}
                        events={events}
                        onClickCampania={this.handleClickCampain}
                />
                <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                </div>
                
                <div className="row">
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-4 col-lg-4 d-sm-full"
                    heading={"Total Conectados"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <CardInfo 
                            titleName={"Total Conectados Por Locación"}
                            dataNum={546}
                            backgroundColor=""
                            classColor={"primary"}
                        />
                    </div>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-4 col-lg-4 d-sm-full"
                    heading={"Tiempo de Conexión"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <CardInfo 
                            titleName={"Tiempo Promedio De Conexión Por Usuarios"}
                            dataNum={2}
                            backgroundColor=""
                            time={" hrs"}
                            classColor={"secondary"}
                        />
                    </div>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-4 col-lg-4 d-sm-full"
                    heading={"Ancho de Banda"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <CardInfo 
                            titleName={"Ancho de Banda Promedio Utilizado Por Usuarios"}
                            dataNum={5120}
                            backgroundColor=""
                            time={"  Kbps"}
                            classColor={"info"}
                        />
                    </div>
                </RctCollapsibleCard>

                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-12 w-xs-full"
                    heading={<IntlMessages id="graphics.date" />}
                    collapsible
                    //reloadable={this.handleReload('fecha_creacion')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    <ChartFecha data={this.state.data.fecha_creacion}/>
                </RctCollapsibleCard>

                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                    heading={<IntlMessages id="graphics.ap" />}
                    collapsible
                    //reloadable={this.handleReload('mac_ap')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    <ChartAp data={this.state.data.mac_ap} paddingRight={20}/>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                    heading={<IntlMessages id="graphics.os" />}
                    collapsible
                    //reloadable={this.handleReload('os')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    <ChartOS data={this.state.data.os}/>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                    heading={<IntlMessages id="graphics.zone" />}
                    collapsible
                    //reloadable={this.handleReload('id_evento')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    <ChartZona data={this.state.data.id_evento} paddingRight={20}/>
                </RctCollapsibleCard>


                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
                    heading={"Ancho de Banda VS Fecha"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <ChartAnchoBanda />
                    </div>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
                    heading={"Tiempo De Conexión VS Fecha"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <ChartConexionClientes />
                    </div>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Top 5 Campañas Activas"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <TopTables
                            dataTopC={dataTop}
                            dataTopZ={[]}
                            name={"Campañas"}
                        />
                    </div>
                    
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Top 5 Zonas Activas"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <TopTables
                            dataTopC={[]}
                            dataTopZ={topZones}
                            name={"Zonas"}
                        />
                    </div>
                    
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Top 5 Personas Por Visitas"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <TopTables
                            dataTopC={[]}
                            dataTopZ={[]}
                            dataTopV={topVisits}
                            name={"Visitas"}
                        />
                    </div>
                    
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Últimos 10 Clientes Conectados"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <LastTenUsersList
                            listData={lastTenUsers}
                        />
                        <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                        </div>
                    </div>
                </RctCollapsibleCard>
                </div>
            </div>
        );
	}
}
