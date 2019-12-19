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

        const { id_location } = this.props.location.state;

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
                columns: ["genero","ip_ap","id_pais","os","fecha_creacion","edad"],
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
        this.handleClickCampain = this.handleClickCampain.bind(this)
    }
    
    componentDidMount(){
        this.ConsultaEventos()
        this.ConsultaGraficas()
    }

    async ConsultaGraficas(){
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

            this.setState({
                data: datagraph
            })
            
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
        this.ConsultaGraficas()
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
            
            this.ConsultaGraficas()
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
            this.setState({
                form:{
            		...this.state.form,
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

    handleClickCampain(name){
        this.setState({
            form:{
                ...this.state.form,
                campania: name
            }
        })
    }

    handleModal(e){
        e.preventDefault()
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
        this.ConsultaGraficas()
    }

    render() {
        const { events,form } = this.state;
        const { location } = this.props.match.params
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={location} match={this.props.match} />
                <RctCollapsibleCard>
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
				</RctCollapsibleCard>
                {console.log(this.state.data)}
                <CardColumns>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.ap" /></CardTitle>
                        </CardBody>
                        <ChartAp data={this.state.data.ip_ap} paddingRight={20}/>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.gender" /></CardTitle>
                        </CardBody>
                        <ChartGenero data={this.state.data.genero} paddingRight={20}/>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.os" /></CardTitle>
                        </CardBody>
                        <ChartOS data={this.state.data.os}/>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.pais" /></CardTitle>
                        </CardBody>
                        <ChartPais data={this.state.data.id_pais}/>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.date" /></CardTitle>
                        </CardBody>
                        <ChartFecha data={this.state.data.fecha_creacion}/>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.edad" /></CardTitle>
                        </CardBody>
                        <ChartEdad data={this.state.data.edad}/>
                    </Card>
                </CardColumns>
            </div>
        );
	}
}
