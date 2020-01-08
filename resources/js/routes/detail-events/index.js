import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import moment from "moment";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import FilterDateForm from 'Components/FilterDateForm/FilterDateForm';
import queryString from 'query-string'
import '../events/styles.css';




export default class DetailEvents extends Component {

	constructor(props){
		super(props)
		
		const id_location = localStorage.user_location;
		const id_campain = localStorage.user_campaing;
		
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
            form: {
				filterPersonalizado: false,
                initialDate: initialDate,
                finalDate: finalDate,
                id_event: id_campain,
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
			for (let i = 0; i < dataNameColumns.length; i++) {
				arrayNames.push.apply(arrayNames, Object.values(dataNameColumns[i]))
			}
			arrayNames = arrayNames.filter(names => names != 'id' && names != 'id_evento' && names != 'id_pais')
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
	
	render() {
		const columns = this.state.nameColumns;
		const { form } = this.state;

		const options = {
			responsive: 'stacked',
			print: false,
			downloadOptions: { 
				filename: 'DetallesEventoTabla.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			elevation: 0
		  };
	  
		return (
			<div className="data-table-wrapper">
				
				<PageTitleBar title={<IntlMessages id="sidebar.detailEvents" />} match={this.props.match} />
				
				<RctCollapsibleCard>
					<FilterDateForm
						form={form}
						onChange={this.handleChange}
						onSubmit={this.handleDateFilter}
						onClick={this.handleModal}
						onChangeFilter={this.handleChangeFilter}
						onCancel={this.handleDateFilterCancel}
						campain={false}
					/>
				</RctCollapsibleCard>
				<RctCollapsibleCard heading="Tabla de Datos" fullBlock>
					<MUIDataTable
						title={"Detalle Eventos"}
						data={this.state.dataDetails}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		)
	}
}

// if (document.getElementById("root")) {
//     ReactDOMServer.render(<DetailEvents />, document.getElementById("root"));
// }
