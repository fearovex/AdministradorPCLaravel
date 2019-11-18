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
 import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

// widgets data 
/* import {
   visitorData,
   revenueData,
   salesData,
   dealData,
   transactionList,
   transferreport,
   expenseCategory
} from './data'; */


export default class NewList extends Component {

    constructor(props){
        super(props)

        this.state={
            data:[],
            // fecha_inicial: new Data(),
            // fecha_final: new Data(),
            error:null
        }
        this.ConsultaGraficas = this.ConsultaGraficas.bind(this);
    }
    
    async componentDidMount(){
        try {
            let res = await fetch(`http://administradorpclaravel.test:8080/api/evento`);
            let datagraph = await res.json()

            var fecha_inicio = datagraph.fecha_inicio;
            var fecha_final = datagraph.fecha_fin;
            
            this.ConsultaGraficas(fecha_inicio, fecha_final)
            
         } catch (error) {
               this.setState({ 
                  error
               })
         }
    }

    async ConsultaGraficas(fecha_inicial, fecha_final){
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({'fecha_inicial': fecha_inicial, 'fecha_final': fecha_final})
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

    render() {
        const { match } = this.props;
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.cardsMasonry" />} match={this.props.match} />
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
