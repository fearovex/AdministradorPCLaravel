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

// import ChartGenero from "Components/new-Graficas/ChartGenero";
// import ChartAp from "Components/new-Graficas/ChartAp";
// import ChartPais from "Components/new-Graficas/ChartPais";
// import ChartEdad from "Components/new-Graficas/ChartEdad";
// import ChartOS from "Components/new-Graficas/ChartOS";
// import ChartFecha from "Components/new-Graficas/ChartFecha";

// import ChartAnchoBanda from "Components/new-Graficas/ChartAnchoBanda";
// import ChartConexionClientes from "Components/new-Graficas/ChartConexionClientes";

import CardInfo from "Components/NewDashBoardInfo/CardInfo";
import TopTables from "Components/NewDashBoardInfo/TopTables";
// import LastTenUsersList from "Components/NewDashBoardInfo/LastTenUsersList";


// import FilterDateForm from 'Components/FilterDateForm/FilterDateForm';

export default class AnalyticalCampaing extends Component {

    constructor(props){
        super(props)

        const id_location = localStorage.user_location
        const id_campaing = localStorage.user_campaing;
        const vertical = localStorage.vertical;

        this.state = {
            dataTop:[],
            lastTenUsers:[],
            topZones:[],
            topVisits:[],
			error: null,
            form: {
          
                id_campaing: id_campaing,
                id_location: id_location,
                vertical: vertical,
            },
        }
        this.UltimosDiez = this.UltimosDiez.bind(this)
    }
    
    componentDidMount(){
        this.UltimosDiez();
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


    render() {
        // const { dataTop, lastTenUsers, topZones, topVisits } = this.state;
        const { camp } = this.props.match.params
        const { vertical } = this.state.form
        return (
            <div className="cardsmasonry-wrapper" >
                <PageTitleBar 
                    title={camp} 
                    match={this.props.match} 
                    history={this.props.history}
                />
             
                <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                </div>
                <div className="row">
                    {vertical=='Hoteles' ?
                     <RctCollapsibleCard
                        customClasses=""
                        colClasses="col-sm-12 col-md-12 col-lg-4 d-sm-full"
                        heading={"Total Conectados Hoteles"}
                        collapsible
                        reloadable
                        closeable
                        fullBlock
                    >
                        <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                         
                        </div>
                    </RctCollapsibleCard>
                    :
                    <RctCollapsibleCard
                        customClasses=""
                        colClasses="col-sm-12 col-md-12 col-lg-4 d-sm-full"
                        heading={"Tiempo de Conexión Centros Comerciales"}
                        collapsible
                        reloadable
                        closeable
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
                     }
				</div>
            </div>
        );
	}
}
