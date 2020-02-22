import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import moment from "moment";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FilterDateForm from 'Components/FilterDateForm/FilterDateForm';
import '../events/styles.css';

import SweetAlert from 'react-bootstrap-sweetalert'
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViewInfo from 'Components/SwipeableViews/SwipeableViewInfo';


export default class DetailEvents extends Component {

	constructor(props){
		super(props)
		
		const id_location = localStorage.user_location;
		const id_campain = localStorage.user_campaing;
		const name_campaing = localStorage.user_name_campaing;
		
        let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
        let año = date.year();
        let mes = date.month()+1;
        let dia = date.date();
        let hora = date.hour();
        let minutos = date.minute();
        let initialDate = (año) + '-' + (mes) + '-' + (dia) + " 00:00";
        let finalDate = (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos);
		
        this.state = {
			error: null,
			modalInfo: false,
			value:0,
			rowData:[],
            form: {
				filterPersonalizado: false,
                initialDate: initialDate,
                finalDate: finalDate,
                id_event: id_campain,
                name_campaing: name_campaing,
				id_location: id_location,
				nameColumns: [],
			},
			nameColumns: [],
			dataDetails: [],
		}
		
		this.handleDateFilter=this.handleDateFilter.bind(this)
		this.handleChange=this.handleChange.bind(this)
		this.handleModal = this.handleModal.bind(this)
		this.handleDateFilterCancel = this.handleDateFilterCancel.bind(this)
		this.handleChangeFilter = this.handleChangeFilter.bind(this)
	}


	async componentDidMount(){	
		try {
			//Consulta Nombre Columnas  -> Se hace la consulta de los nombres de las columnas de la tabla correspondiente
			let onlyTableConfig = {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			}

			let resNameColumns = await fetch(`${localStorage.urlDomain}api/nameColumnNames`, onlyTableConfig)
			let dataNameColumns = await resNameColumns.json()
		   /// fin  Consulta Nombre Columnas

		   //Proceso DataTable -> Se gregan los nombres a un arreglo para luego pasarlos al data table
			let arrayNames=[]
			let dbDataDifference = localStorage.getItem('user_database');
			for (let i = 0; i < dataNameColumns.length; i++) {
				arrayNames.push.apply(arrayNames, Object.values(dataNameColumns[i]))
			}
			arrayNames = arrayNames.filter(names => names != 'id' && names != 'Campania' && names != 'Pais')
			if(dbDataDifference == 'unicentro'){
				arrayNames = arrayNames.filter(names => names != 'estado_nombre' && names != 'Campania' && names != 'Pais' && names != 'estado_apellidos' && names != 'estado_email' && names != 'estado_edad' && names != 'estado_telefono' && names != 'estado_genero' && names != 'estado_num_voucher' && names != 'estado_num_habitacion' && names != 'estado_razon_visita' && names != 'num_voucher' && names != 'num_habitacion' && names != 'razon_visita')
			}
			else if(dbDataDifference == 'portal_oxohotel'){
				arrayNames = arrayNames.filter(names => names != 'estado_nombre' && names != 'Campania' && names != 'Pais' && names != 'estado_apellidos' && names != 'estado_email' && names != 'estado_edad' && names != 'estado_telefono' && names != 'estado_genero' && names != 'estado_num_voucher' && names != 'estado_num_habitacion' && names != 'estado_razon_visita' && names != 'Email' && names != 'Edad' && names != 'Telefono' && names != 'Genero')
			}
			 // fin Proceso DataTable

			 //Consulta Detalle -> Se consulta el detalle del evento de acuerdo a su tabla en la bd

			this.setState({
				nameColumns: arrayNames,
				form:{
					...this.state.form,
					nameColumns: arrayNames,
				}
			})
			//fin Consulta Detalle
				
			this.handleDateFilter()
		} catch (error) {
			this.setState({
				error
			})
		}
	}

	async handleDateFilter(e = null){
		if(e != null){
			e.preventDefault()
		}
        try {
            let config = {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
			}

			let res = await fetch(`${localStorage.urlDomain}api/detailEvents`, config)
			let dataDetails = await res.json()
            this.setState({
				form:{
					...this.state.form,
					filterPersonalizado: false,
				},
			   	dataDetails: dataDetails,
            })
            
        } catch (error) {
			console.log(error)
			let array = [];
            this.setState({
				error,
				form:{
					dataDetails: array
				}
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
			
			this.handleDateFilter()
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
		this.handleDateFilter()
	}

	openModalInfo(rowData){
		this.setState({ 
			rowData: rowData,
			modalInfo: true 
		});
	}

	handleCloseModal(e){
		e.preventDefault();
		this.setState({ 
			modalInfo: false 
		});
	}


	render() {
		const columns = this.state.nameColumns;
		const { form, modalInfo, rowData } = this.state;
		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			selectableRows: 'none',
			onRowClick: rowData => this.openModalInfo(rowData),
			downloadOptions: { 
				filename: 'DetalleCampaña.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			elevation: 0
		  };
	  
		return (
			<div className="data-table-wrapper">
				
				<PageTitleBar 
					title={"Detalle de la Campaña - "+form.name_campaing } 
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
				/>
				<div className="blank-wrapper" style={{marginBottom: '20px'}}>

				</div>
				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="classRoot"
						data={this.state.dataDetails}
						columns={columns}
						options={options}
					/>
					<SweetAlert
						btnSize="sm"
						show={modalInfo}
						// showCancel
						confirmBtnText="Cerrar"
						// cancelBtnText="Cancelar"
						// cancelBtnBsStyle="danger"
						confirmBtnBsStyle="danger"
						onConfirm={() => this.handleCloseModal(event)}
						// onCancel={() => this.onCancel('modalEmailCsv')}
					>
						<SwipeableViewInfo 
							rowData={rowData}
							columns={columns}
						/>
					</SweetAlert>
				</RctCollapsibleCard>
			</div>
		)
	}
}

// if (document.getElementById("root")) {
//     ReactDOMServer.render(<DetailEvents />, document.getElementById("root"));
// }
