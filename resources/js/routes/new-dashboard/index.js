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
			form: {}
        }
        
        this.ConsultaGraficas = this.ConsultaGraficas.bind(this);
        this.handleChange=this.handleChange.bind(this)
		this.handleDateFilter=this.handleDateFilter.bind(this)
    }
    
    async componentDidMount(){
        try {
            let res = await fetch(`http://administradorpclaravel.test:8080/api/evento`);
            let datagraph = await res.json()
            let tempDate = new Date(datagraph.fecha_inicio);
            let initialDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate(); 
            // let initialDate = new Date(); 
            let initialTime = ('0'+tempDate.getHours()).slice(-2) +':'+ ('0'+tempDate.getMinutes()).slice(-2) +':'+ ('0' + tempDate.getSeconds()).slice(-2);
            let tempDate2 = new Date(datagraph.fecha_fin);
            let finalDate = tempDate2.getFullYear() + '-' + (tempDate2.getMonth()+1) + '-' + tempDate2.getDate();
            let finalTime = ('0'+tempDate2.getHours()).slice(-2) +':'+ ('0'+tempDate2.getMinutes()).slice(-2) +':'+ ('0' + tempDate2.getSeconds()).slice(-2);
            
            this.setState({
                form:{
                    initialDate: initialDate,
                    initialTime: initialTime,
                    finalDate: finalDate,
                    finalTime: finalTime
                }
            })

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

            let res = await fetch(`http://administradorpclaravel.test:8080/api/graficas`, config);
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

    handleDateFilter(e){
        e.preventDefault()
        this.ConsultaGraficas()
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
        const { match } = this.props;
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.cardsMasonry" />} match={this.props.match} />
                <RctCollapsibleCard heading="Filtro" fullBlock>
					<FilterDateForm
							form={this.state.form}
							onChange={this.handleChange}
							onSubmit={this.handleDateFilter}
					/>
				</RctCollapsibleCard>
                <CardColumns>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.gender" /></CardTitle>
                            <CardText><ChartGenero data={this.state.data.genero}/></CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.ap" /></CardTitle>
                            <CardText><ChartAp data={this.state.data.ap}/></CardText>
                        </CardBody>
                    </Card>
                    {/* <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.pais" /></CardTitle>
                            <CardText><ChartPais data={this.state.data.paises}/></CardText>
                        </CardBody>
                    </Card> */}
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.edad" /></CardTitle>
                            <CardText><ChartEdad data={this.state.data.edad}/></CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.os" /></CardTitle>
                            <CardText><ChartOS data={this.state.data.os}/></CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.date" /></CardTitle>
                            <CardText><ChartFecha data={this.state.data.fecha}/></CardText>
                        </CardBody>
                    </Card>
                </CardColumns>
            </div>
        );
	}
}
