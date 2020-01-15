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
            data:[],
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
    }
    
    componentDidMount(){
        this.ConsultaEventos()
        let column = "fecha_creacion"; //"genero","mac_ap","os",
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "mac_ap"; //"genero","mac_ap","os",
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "os"; //"genero","mac_ap","os",
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "id_evento"; //"genero","mac_ap","os",
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
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
            this.setState({
                data: [ [column] = datagraph.column ]
            })
            console.log(this.state.data)
            
         } catch (error) {
               this.setState({ 
                  error
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
                        colClasses="col-sm-12 col-md-12 col-lg-12 w-xs-full"
                        heading={<IntlMessages id="graphics.date" />}
                        collapsible
                        reloadable={this.handleReload('fecha_creacion')}
                        fullBlock
                        customClasses="overflow-hidden"
                    >
                        <ChartFecha data={this.state.data.fecha_creacion}/>
                    </RctCollapsibleCard>
                </div>
                <div className="row">
                    <RctCollapsibleCard
                        colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                        heading={<IntlMessages id="graphics.ap" />}
                        collapsible
                        reloadable={this.handleReload('mac_ap')}
                        fullBlock
                        customClasses="overflow-hidden"
                    >
                        <ChartAp data={this.state.data.mac_ap} paddingRight={20}/>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                        heading={<IntlMessages id="graphics.os" />}
                        collapsible
                        reloadable={this.handleReload('os')}
                        fullBlock
                        customClasses="overflow-hidden"
                    >
                        <ChartOS data={this.state.data.os}/>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                        heading={<IntlMessages id="graphics.zone" />}
                        collapsible
                        reloadable={this.handleReload('id_evento')}
                        fullBlock
                        customClasses="overflow-hidden"
                    >
                        <ChartZona data={this.state.data.id_evento} paddingRight={20}/>
                    </RctCollapsibleCard>
                </div>
            </div>
        );
	}
}
