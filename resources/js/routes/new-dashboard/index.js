import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';



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

export default class NewList extends Component {

    constructor(props){
        super(props)

        this.state = {
			data:[],
			error: null,
            form: {},
            events: []
        }
        
        this.ConsultaGraficas = this.ConsultaGraficas.bind(this);
        this.handleChange=this.handleChange.bind(this)
        this.handleDateFilter=this.handleDateFilter.bind(this)
        this.handleChangeEvent = this.handleChangeEvent.bind(this)
    }
    
    async componentDidMount(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/evento`);
            let datagraph = await res.json()
            let tempDate = new Date(datagraph.fecha_inicio);
            let initialDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate(); 
            // let initialDate = new Date(); 
            let initialTime = ('0'+tempDate.getHours()).slice(-2) +':'+ ('0'+tempDate.getMinutes()).slice(-2) +':'+ ('0' + tempDate.getSeconds()).slice(-2);
            // let initialTime = ('0'+tempDate.getHours()).slice(-2) +':'+ ('0'+tempDate.getMinutes()).slice(-2);
            let tempDate2 = new Date(datagraph.fecha_fin);
            let finalDate = tempDate2.getFullYear() + '-' + (tempDate2.getMonth()+1) + '-' + tempDate2.getDate();
            let finalTime = ('0'+tempDate2.getHours()).slice(-2) +':'+ ('0'+tempDate2.getMinutes()).slice(-2) +':'+ ('0' + tempDate2.getSeconds()).slice(-2);
            // let finalTime = ('0'+tempDate2.getHours()).slice(-2) +':'+ ('0'+tempDate2.getMinutes()).slice(-2);

            this.setState({
                form:{
                    initialDate: initialDate,
                    initialTime: initialTime,
                    finalDate: finalDate,
                    finalTime: finalTime,
                    id_event: datagraph.id,
                }
            })

            this.ConsultaEventos()
            this.ConsultaGraficas()
            
         } catch (error) {
               this.setState({ 
                  error
               })
         }
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
                id_event: 0,
            }
        })

        this.ConsultaEventos()
    }
    
    async ConsultaEventos(){
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(this.state.form)
            }

            let res = await fetch(`${localStorage.urlDomain}api/events`, config)
            let dataevents = await res.json()
            
            for (let i = 0; i < dataevents.length; i++) {
                this.setState({
                    events: dataevents
                })                
            }

        } catch (error) {
            this.setState({ 
                error
            })
        }
    }
    
    handleChangeEvent(e){
        var value = e.target.value

        if(value != 0){
            this.state.form.id_event = value;

            this.ConsultaGraficas()
        }
        else{
            this.setState({ 
                error: 'error'
            })
        }
    }

    handleChange(e){
        this.setState({
            form:{
				...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        const { events, form } = this.state;
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.dashboard" />} match={this.props.match} />
                <RctCollapsibleCard heading="Filtro" >
					<FilterDateForm
							form={form}
							onChange={this.handleChange}
							onSubmit={this.handleDateFilter}
					/>
                    <div className="form-inline justify-content-center">
                        <label className="mr-4">Eventos</label>
                            <select name="change" id="change" className="form-control col-10 col-sm-8 col-lg-8" onChange={this.handleChangeEvent} value={form.id_event}>
                                <option value="0">Seleccione...</option>
                                {events && events.map((data) => (
                                <option value={data.id}>{data.nombre}</option>
                                ))}
                            </select>   
                    </div>
				</RctCollapsibleCard>
                <CardColumns>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.ap" /></CardTitle>
                        </CardBody>
                        <ChartAp data={this.state.data.ap} paddingRight={20}/>
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
                        <ChartPais data={this.state.data.paises}/>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.date" /></CardTitle>
                        </CardBody>
                        <ChartFecha data={this.state.data.fecha}/>
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
