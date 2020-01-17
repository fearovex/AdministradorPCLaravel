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

// import ChartAp from "Components/new-Graficas/ChartAp";
import ChartFecha from "Components/new-Graficas/ChartFecha";
import UsersMoreVisit from "Components/new-Graficas/UsersMoreVisit";
import LastTenUsersListCampaing from "Components/new-Graficas/LastTenUsersListCampaing";
import TopTenAgesList from "Components/new-Graficas/TopTenAgesList";
import TopFiveReasonVisits from "Components/new-Graficas/TopFiveReasonVisits";
import TopFiveRooms from "Components/new-Graficas/TopFiveRooms";
import ChartGenero from "Components/new-Graficas/ChartGenero";
// import ChartAnchoBanda from "Components/new-Graficas/ChartAnchoBanda";
// import ChartConexionClientes from "Components/new-Graficas/ChartConexionClientes";

import CardInfo from "Components/new-Graficas/CardInfo";
// import TopTables from "Components/NewDashBoardInfo/TopTables";
// import LastTenUsersList from "Components/NewDashBoardInfo/LastTenUsersList";


import FilterDateForm from 'Components/FilterDateForm/FilterDateForm';

export default class AnalyticalCampaing extends Component {

    constructor(props) {
        super(props)

        const id_location = localStorage.user_location
        const id_campaing = localStorage.user_campaing;
        const vertical = localStorage.vertical;

        let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
        let año = date.year();
        let mes = date.month()+1;
        let dia = date.date();
        let hora = date.hour();
        let minutos = date.minute();
        let initialDate = (año) + '-' + (mes) + '-' + (dia) + " 00:00";
        let finalDate = (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos);

        this.state = {
            data: {},
            error: null,
            form: {
                filterPersonalizado: false,
                initialDate: initialDate,
                finalDate: finalDate,
                id_event: id_campaing,
                column: ["fecha_creacion"],
                id_campaing: id_campaing,
                id_location: id_location,
                vertical: vertical,
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
        this.handleTotalRecords = this.handleTotalRecords.bind(this);
        this.UsersMoreVisit = this.UsersMoreVisit.bind(this)
        this.LastTenUsersListCampaing = this.LastTenUsersListCampaing.bind(this)
        this.TopTenAgesList = this.TopTenAgesList.bind(this)
        this.PromedyAge = this.PromedyAge.bind(this)
        this.VouchersUse = this.VouchersUse.bind(this)
        this.TopFiveReasonVisits = this.TopFiveReasonVisits.bind(this)
        this.TopFiveRooms = this.TopFiveRooms.bind(this)
    }

    componentDidMount() {
        this.handleTotalRecords()
        this.VouchersUse()
        this.UsersMoreVisit()
        this.LastTenUsersListCampaing()
        this.TopTenAgesList()
        this.PromedyAge()
        this.TopFiveReasonVisits()
        this.TopFiveRooms()
        let column = "fecha_creacion";
        this.state.form.column = [column];
        this.ConsultaGraficas(column)
        column = "genero";
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

    async handleTotalRecords(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/TotalRecords`, config)
            let TotalRecords = await res.json()
            
            this.setState({
                data:{
                    ...this.state.data,
                    TotalRecords: TotalRecords[0].TotalRecords
                }
            })
            // this.state.data.TotalRecords = TotalRecords[0].TotalRecords;

        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async UsersMoreVisit(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/UsersMoreVisit`, config)
            let UsersMoreVisit = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    UsersMoreVisit: UsersMoreVisit
                }
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async LastTenUsersListCampaing(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/LastTenUsersListCampaing`, config)
            let LastTenUsersListCampaing = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    LastTenUsersListCampaing: LastTenUsersListCampaing
                }
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }
    async PromedyAge(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/PromedyAge`, config)
            let PromedyAge = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    PromedyAge: PromedyAge[0].Promedio
                }
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async TopTenAgesList(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/TopTenAgesList`, config)
            let TopTenAgesList = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    TopTenAgesList: TopTenAgesList
                }
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }
    
    async TopFiveReasonVisits(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/TopFiveReasonVisits`, config)
            let TopFiveReasonVisits = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    TopFiveReasonVisits: TopFiveReasonVisits
                }
            })
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }
    
    async VouchersUse(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/VouchersUse`, config)
            let VouchersUse = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    V_SinUso: VouchersUse.Sin_Uso,
                    V_EnUso: VouchersUse.En_Uso
                }
            })
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async TopFiveRooms(){
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/TopFiveRooms`, config)
            let TopFiveRooms = await res.json()
            this.setState({
                data:{
                    ...this.state.data,
                    TopFiveRooms: TopFiveRooms
                }
            })
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    render() {
        const { events,form, data } = this.state;
        const { camp } = this.props.match.params
        const { vertical } = this.state.form
        return (
            <div className="cardsmasonry-wrapper" >
                <PageTitleBar
                    title={camp}
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
                        campain={false}
                        events={events}
                        onClickCampania={this.handleClickCampain}
                />
                <div className="blank-wrapper" style={{ marginBottom: '20px' }}>

                </div>
                {vertical == 'Hoteles' ?
                    <div className="row">
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-4 col-lg-4 d-sm-full"
                            heading={"Numero de registros"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <CardInfo
                                    titleName={"Numero de registros"}
                                    dataNum={data.TotalRecords ? data.TotalRecords : 0}
                                    backgroundColor=""
                                    classColor={"primary"}
                                />
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-4 col-lg-4 d-sm-full"
                            heading={"Total Conectados"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <CardInfo
                                    titleName={"Total Conectados"}
                                    dataNum={546}
                                    backgroundColor=""
                                    classColor={"secondary"}
                                />
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-4 col-lg-4 d-sm-full"
                            heading={"Vouchers"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <div className="row">
                                <CardInfo
                                    titleName={"Sin Usar"}
                                    className="col-sm-12 col-md-5 col-lg-5 mr-10 ml-20"
                                    dataNum={data.V_SinUso ? data.V_SinUso : 0}
                                    icono={false}
                                    backgroundColor=""
                                    classColor={"info"}
                                />
                                <CardInfo
                                    titleName={"En Uso"}
                                    className="col-sm-12 col-md-5 col-lg-5 mr-20 ml-10"
                                    dataNum={data.V_EnUso ? data.V_EnUso : 0}
                                    icono={false}
                                    backgroundColor=""
                                    classColor={"secondary"}
                                />
                                </div>
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
                            customClasses=""
                            colClasses="col-sm-12 col-md-6 col-lg-6 d-sm-full"
                            heading={"Top 5 Razones por Visita"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <TopFiveReasonVisits
                                    listData={data.TopFiveReasonVisits}
                                    name={"Razon"}
                                />
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-6 col-lg-6 d-sm-full"
                            heading={"Top 5 Habitaciones Más Usadas"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <TopFiveRooms
                                    listData={data.TopFiveRooms}
                                    name={"Habitación"}
                                />
                            </div>
                            
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
                            heading={"Top 10 Ultimos Usuarios Conectados"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <LastTenUsersListCampaing
                                    listData={data.LastTenUsersListCampaing}
                                    vertical={vertical}
                                />
                                <div className="blank-wrapper" style={{marginBottom: '20px'}}>
                                </div>
                            </div>
                            
                        </RctCollapsibleCard>
                    </div>
                    :
                    <div className="row">
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-3 col-lg-3 d-sm-full"
                            heading={"Numero de registros"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <CardInfo
                                    titleName={"Numero de registros"}
                                    dataNum={data.TotalRecords ? data.TotalRecords : 0}
                                    backgroundColor=""
                                    classColor={"primary"}
                                />
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-3 col-lg-3 d-sm-full"
                            heading={"Total Conectados"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <CardInfo
                                    titleName={"Total Conectados"}
                                    dataNum={546}
                                    backgroundColor=""
                                    classColor={"secondary"}
                                />
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-3 col-lg-3 d-sm-full"
                            heading={"Tiempo de Conexión"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <CardInfo
                                    titleName={"Promedio"}
                                    dataNum={546}
                                    backgroundColor=""
                                    time={" hrs"}
                                    classColor={"info"}
                                />
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-3 col-lg-3 d-sm-full"
                            heading={"Promedio de Edad"}
                            collapsible
                            // reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <CardInfo
                                    titleName={"Promedio de Edad"}
                                    dataNum={data.PromedyAge ? data.PromedyAge : 0}
                                    backgroundColor=""
                                    classColor={"primary"}
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
                            customClasses=""
                            colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
                            heading={"Top 10 Usuarios más Recurrentes"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <UsersMoreVisit
                                    listData={data.UsersMoreVisit}
                                />
                                <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                                </div>
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
                            heading={"Top 10 Ultimos Usuarios Conectados"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <LastTenUsersListCampaing
                                    listData={data.LastTenUsersListCampaing}
                                    vertical={vertical}
                                />
                                <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                                </div>
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-6 col-lg-6 d-sm-full"
                            heading={"Top 10 de Edades más Recurrentes"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <TopTenAgesList
                                    listData={data.TopTenAgesList}
                                />
                                <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                                </div>
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses=""
                            colClasses="col-sm-12 col-md-6 col-lg-6 d-sm-full"
                            heading={"Personas Por Genero"}
                            collapsible
                            //reloadable
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                                <ChartGenero 
                                    data={data.genero}
                                />
                            </div>
                        </RctCollapsibleCard>
                    </div>
                }
            </div>
        );
    }
}
