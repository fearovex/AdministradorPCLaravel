import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IconButton from "@material-ui/core/IconButton";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { DateTimePicker } from '@material-ui/pickers';
import moment from "moment";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import CustomToolbar from "../../util/CustomToolbar";
import { Input,TextField, Select, InputLabel, FormControlLabel, MenuItem, Checkbox} from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './styles.css'




export default class Voucher extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location
		const id_campaing = localStorage.user_campaing
		const name_campaing = localStorage.user_name_campaing;
		const initialDateCampaing =  localStorage.user_initialDate_campaing;
		const finalDateCampaing =  localStorage.user_finalDate_campaing;

		const initialDate = moment(new Date, 'YYYY/MM/DD hh:mm a');
		const finalDate = moment(new Date, 'YYYY/MM/DD hh:mm a').add(30,'Minutes');
		
		let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.dates();
		let hora = date.hours();
		let minutos = date.minute();
		
		this.state = {
			error: null,
			prompt: false,
			envio: false,
			modaledit: false,
			form: {
				fecha_inicio: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				fecha_fin: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				numerovouchers: "",
				numerousos: "",
				etiqueta:"",
				id_location: id_location,
				id_campaing: id_campaing,
				name_campaing: name_campaing,
				initialDateCampaing: initialDateCampaing,
				finalDateCampaing: finalDateCampaing,
				initialDate:initialDate,
				finalDate:finalDate,
				nuncaExpira: true,
				expira: false,
				activarUso: false,
				diasDisponibles: "",
				horasDisponibles: "",
				minutosDisponibles: "",
			},
			form2: {
				email: '',
				columns: [],
				rows: [],
				id_location: id_location,
				id_campaing: id_campaing,
				name_campaing: name_campaing, 
			},
			nameColumns: ['Etiqueta','Voucher', 'Fecha Inicio', 'Fecha Fin','N° Usos Total'],
			dataVouchers: [],
			modalEmailCsv: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitVouchers = this.handleSubmitVouchers.bind(this);
		this.changeTable = this.changeTable.bind(this);

	}

	async componentDidMount() {
		try {
			if (this.state.dataVouchers.length == 0) {
				this.setState({ prompt: true });
			}

		} catch (error) {
			console.log(error)
		}
	}

	async handleSubmitVouchers(e) {
		e.preventDefault()

		
		const {
			numerovouchers,
			numerousos, 
			etiqueta, 
			nuncaExpira, 
			expira, 
			activarUso, 
			diasDisponibles,
			horasDisponibles,
			minutosDisponibles, 
			finalDate,
			fecha_fin
		} = this.state.form


		let año = finalDate.year()
		let mes = finalDate.month() + 1;
		let dia = finalDate.dates();
		let hora = finalDate.hours();
		let minutos = finalDate.minute();
		
		let finalDateValidation = (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00"

		
		if(nuncaExpira){
			if(etiqueta == ''){
				NotificationManager.error('El campo etiqueta es obligatorio!','',5000);
			}
			if(numerovouchers == ''){
				NotificationManager.error('El campo de número de vouchers es obligatorio (Min: 1 Voucher)!','',5000);
			}
			if(numerousos == ''){
				NotificationManager.error('El campo cantidad de usos es obligatorio (Min: 1 Uso)!','',5000);
			}
			if(((numerovouchers!= '' && numerovouchers > 0) && (numerousos !='' && numerousos > 0)) && etiqueta !=''){
				try {
					let config = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(this.state.form)
					};
					let res = await fetch(`${localStorage.urlDomain}api/vouchers/store`, config);
					let datavouchers = await res.json()
	
					this.setState({
						dataVouchers: datavouchers,
						prompt: false
					});
	
				} catch (error) {
					console.log(error)
				}
			}
		}
		if(expira){
			if(etiqueta == ''){
				NotificationManager.error('El campo etiqueta es obligatorio','',5000);
			}
			if(numerovouchers == ''){
				NotificationManager.error('El campo de número de vouchers es obligatorio (Min: 1 Voucher)','',5000);
			}
			if(numerousos == ''){
				NotificationManager.error('El campo cantidad de usos es obligatorio (Min: 1 Uso)','',5000);
			}
			if(new Date(fecha_fin) < new Date(finalDateValidation)){
				NotificationManager.error('La Fecha Fin del voucher debe ser mayor de 30 minutos con respecto a la Fecha Inicio','',5000);
			}
			if((((numerovouchers!= '' && numerovouchers > 0) && (new Date(fecha_fin) >= new Date(finalDateValidation))) && (numerousos !='' && numerousos > 0)) && etiqueta !=''){
				try {
					let config = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(this.state.form)
					};
					let res = await fetch(`${localStorage.urlDomain}api/vouchers/store`, config);
					let datavouchers = await res.json()
	
					this.setState({
						dataVouchers: datavouchers,
						prompt: false
					});
	
				} catch (error) {
					console.log(error)
				}
			}
		}
		if(activarUso){
			if(etiqueta == ''){
				NotificationManager.error('El campo etiqueta es obligatorio!','',5000);
			}
			if(numerovouchers == ''){
				NotificationManager.error('El campo de número de vouchers es obligatorio (Min: 1 Voucher)!','',5000);
			}
			if(numerousos == ''){
				NotificationManager.error('El campo cantidad de usos es obligatorio (Min: 1 Uso)!','',5000);
			}
			if(diasDisponibles == ''){
				NotificationManager.error('El campo días es obligatorio (Min: 1 Día)!','',5000);
			}
			if(horasDisponibles == ''){
				NotificationManager.error('El campo cantidad de usos es obligatorio (Min: 1 Hora)!','',5000);
			}
			if(minutosDisponibles == ''){
				NotificationManager.error('El campo cantidad de usos es obligatorio (Min: 1 Uso)!','',5000);
			}
			if(((diasDisponibles != '' && horasDisponibles !='') && (minutosDisponibles != '')) && ((etiqueta !='' && numerovouchers!= '') && (numerousos !=''))){
				try {
					let config = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(this.state.form)
					};
					let res = await fetch(`${localStorage.urlDomain}api/vouchers/store`, config);
					let datavouchers = await res.json()
	
					this.setState({
						dataVouchers: datavouchers,
						prompt: false
					});
	
				} catch (error) {
					console.log(error)
				}
			}
		}
	}

	onConfirm(key) {
		this.setState({ [key]: false })
	}

	// CSV //
	handleChangeEmailCsv(e) {
		this.setState({
			form2: {
				...this.state.form2,
				[e.target.name]: e.target.value,
			}
		})
	}

	async handleSubmit(e) {
		e.preventDefault()

		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form2)
			};

			let res = await fetch(`${localStorage.urlDomain}api/csvEmail`, config);
			let data = await res.json();


			if (data.error) {
				NotificationManager.error(data.error, '', 4000);
			}
			if (data.message && !data.errors) {
				NotificationManager.success(data.message, '', 4000);
				this.setState({
					modalEmailCsv: false
				})
			}

		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}

	openAlert(key) {
		const id_location = localStorage.user_location
		const id_campaing = localStorage.user_campaing
		const name_campaing = localStorage.user_name_campaing;

		let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.dates();
		let hora = date.hours();
		let minutos = date.minute();

		this.setState({
			[key]: true,
		});
	}

	onCancel(key) {
		this.setState({ [key]: false })
		if(key != 'modalEmailCsv'){
			this.props.history.goBack()
		}
	}

	handleChange(e, name = null) {
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
			let mes = date.month() + 1;
			let dia = date.date();
			let hora = date.hour();
			let minutos = date.minute();
			this.setState({
				form: {
					...this.state.form,
					[name]: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00"
				}
			})
		}
	}

	handleChangeNumber(e) {
		if (e.target.name === 'numerovouchers' && e.target.value > 100) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "100",
				}
			})
		}
		else if (e.target.name === 'numerovouchers' && e.target.value <= 0) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "",
				}
			})
		}
		else if (e.target.name === 'numerousos' && e.target.value > 5) {
				this.setState({
					form: {
						...this.state.form,
						[e.target.name]: "5",
					}
				})
		}
		else if (e.target.name === 'numerousos' && e.target.value <= 0) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "",
				}
			})
		}
		else if (e.target.name === 'diasDisponibles' && e.target.value > 355) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "355",
				}
			})
		}
		else if (e.target.name === 'diasDisponibles' && e.target.value <= 0) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "",
				}
			})
		}
		else if (e.target.name === 'horasDisponibles' && e.target.value > 24) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "24",
				}
			})
		}
		else if (e.target.name === 'horasDisponibles' && e.target.value <= 0) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "",
				}
			})
		}
		else if (e.target.name === 'minutosDisponibles' && e.target.value > 60) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "60",
				}
			})
		}
		else if (e.target.name === 'minutosDisponibles' && e.target.value <= 0) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "",
				}
			})
		}
		else {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: e.target.value,
				}
			})
		}
	}
	handleChangeCheckBox = name => event =>{
		if(name == "nuncaExpira"){
			this.setState({ 
				form:{
					...this.state.form, 
					nuncaExpira: true, 
					expira: false,
					activarUso: false,
				}
			});
		}
		if(name == "expira"){
			this.setState({ 
				form:{
					...this.state.form, 
					nuncaExpira: false, 
					expira: true, 
					activarUso: false,
				}
			});
		}
		if(name == "activarUso"){
			this.setState({ 
				form:{
					...this.state.form, 
					nuncaExpira: false, 
					expira: false, 
					activarUso: true,
				}
			});
		}
	};

	changeTable(table){
		let columns = table.columns;
		let data = table.displayData;
		let dataSelect = table.selectedRows.data;
		let arrayColumns = [];
		let arrayData = [];
		let arrayNumberColumns = [];
		for (let i = 0; i < columns.length; i++) {
			if(columns[i].display != "false"){
				arrayColumns.push(columns[i].name);
				arrayNumberColumns.push(i);
			}
		}
		for (let j = 0; j < data.length; j++) {
			let arrayDataDetail = [];
			let dataDetail = data[j].data;
			for (let i = 0; i < arrayNumberColumns.length; i++) {
				if(dataDetail[arrayNumberColumns[i]].props){
					arrayDataDetail.push(dataDetail[arrayNumberColumns[i]].props.title);
				}
				else{
					arrayDataDetail.push(dataDetail[arrayNumberColumns[i]]);
				}
			}
			arrayData.push(arrayDataDetail);
		}
		if(dataSelect.length != 0){
			arrayData = [];
			for (let j = 0; j < dataSelect.length; j++) {
				let arrayDataDetail = [];
				let dataDetail = data[dataSelect[j].dataIndex].data;
				for (let i = 0; i < arrayNumberColumns.length; i++) {
					if(dataDetail[arrayNumberColumns[i]].props){
						arrayDataDetail.push(dataDetail[arrayNumberColumns[i]].props.title);
					}
					else{
						arrayDataDetail.push(dataDetail[arrayNumberColumns[i]]);
					}
				}
				arrayData.push(arrayDataDetail);
			}
		}
		this.setState({
			form2:{
				...this.state.form,
				columns: arrayColumns,
				rows: arrayData,
			}
		});
	}

	render() {
		const columns = this.state.nameColumns;
		const { dataVouchers, prompt, modalEmailCsv, form } = this.state;
		

		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			selectableRows: 'multiple',
			downloadOptions: {
				filename: 'Voucher.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			onTableChange: (action,tableState) => {
				this.changeTable(tableState)
			},
			// customToolbar: () => {
			// 	return (
			// 		<CustomToolbar columns={columns} data={dataVouchers} alertOpen={() => this.openAlert('modalEmailCsv')} />
			// 	);
			// },
			customToolbarSelect: () => {
				return (
					<CustomToolbar columns={columns} data={dataVouchers} alertOpen={() => this.openAlert('modalEmailCsv')} />
				);
			},
			elevation: 0
		};
		return (
			<div className="blank-wrapper">
				<PageTitleBar
					title="crear voucher"
					match={this.props.match}
					history={this.props.history}
				/>
				
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">
						<SweetAlert
							btnSize="sm"
							show={prompt}
							showConfirm={false}
							// showCancel
							// confirmBtnText="Guardar"
							// cancelBtnText="Cancelar"
							// cancelBtnBsStyle="danger"
							// confirmBtnBsStyle="success"
							title="Crear Vouchers"
							onConfirm={() => this.handleSubmitVouchers(event)}
						// onCancel={() => this.onCancel('prompt')}
						>
								<form onSubmit={this.handleSubmitVouchers} className="col-lg-12" >
									<div className="col-lg-12 mt-4 mb-4" >
										<Input
											type="text"
											value={this.state.form.etiqueta}
											placeholder="Etiqueta"
											name="etiqueta"
											autoComplete="off"
											id="etiqueta"
											onChange={() => this.handleChange(event)}
										/>
									</div>
									<div className="row marginForm">
										<div className="col-lg-6 mb-4">
											<Input
												type="number"
												min={1}
												max={100}
												autoComplete="off"
												placeholder="Número de Vouchers"
												name="numerovouchers"
												id="numerovouchers"
												value={this.state.form.numerovouchers}
												onChange={() => this.handleChangeNumber(event)}
											/>
										</div>
										<div className="col-lg-6 mb-4">
											<Input
												min={1}
												max={5}
												autoComplete="off"
												type="number"
												value={this.state.form.numerousos}
												placeholder="Cantidad de usos"
												name="numerousos"
												id="numerousos"
												onChange={() => this.handleChangeNumber(event)}
											/>
										</div>
									</div>
									<div className="row marginForm">
										<div className="col-lg-4 mb-3">
										<FormControlLabel
											control={<Checkbox checked={form.nuncaExpira} onChange={this.handleChangeCheckBox('nuncaExpira')} value="nuncaExpira "/>}
											label="Nunca Expira"
										/>
											{/* <Checkbox checked={true} onChange={handleChange('gilad')} value="gilad"/> */}
										</div>
										<div className="col-lg-4 mb-3">
											<FormControlLabel
												control={<Checkbox checked={form.expira} onChange={this.handleChangeCheckBox('expira')} value="expira"/>}
												label="Expira"
											/>
										</div>
										<div className="col-lg-4 mb-3">
											<FormControlLabel
												control={<Checkbox checked={form.activarUso} onChange={this.handleChangeCheckBox('activarUso')} value="activarUso"/>}
												label="Activar Una Vez Se Use"
											/>
										</div>
										
									</div>
									{form.expira && form.expira == true?
										<div className="row marginForm">
											<div className="col-lg-12 mb-4">
												La fecha fin de la campaña es: {form.finalDateCampaing}
											</div>
											<div className="col-lg-6 mb-4" >
												<DateTimePicker
													key="fecha_inicio"
													label="Fecha Inicio"
													required
													value={form.fecha_inicio}
													minDate={moment(form.initialDate, 'YYYY/MM/DD hh:mm a')}
													// maxDate={moment(form.fecha_fin, 'YYYY/MM/DD hh:mm a').subtract(1,'Days')}
													format="YYYY/MM/DD hh:mm a"
													onChange={(event) => this.handleChange(event, 'fecha_inicio')}
													animateYearScrolling={false}
													leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
													rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
													showTodayButton={true}
												/>
											</div>
											<div className="col-lg-6 mb-4">
												<DateTimePicker
													key="fecha_fin"
													label="Fecha Fin"
													required
													value={form.fecha_fin}
													minDate={moment(form.fecha_inicio, 'YYYY/MM/DD hh:mm a').add(30,'Minutes')}
													maxDate={moment(form.finalDateCampaing, 'YYYY/MM/DD hh:mm a')}
													format="YYYY/MM/DD hh:mm a"
													onChange={(event) => this.handleChange(event, 'fecha_fin')}
													animateYearScrolling={false}
													leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
													rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
													showTodayButton={true}
												/>
											</div>
										</div> 
										:form.nuncaExpira?
										<div className="row marginForm">
										
										</div>
										:
										<div className="row marginForm">
											<div className="col-lg-12 mb-4">
												<span style={{fontSize: '13px'}}>
													Los siguientes campos serán agregados a la fecha en la cual se active el voucher,
													recuerde que si la fecha fin del voucher excede la fecha final de la campaña, la siguiente fecha
													será registrada en su lugar: <b>{form.finalDateCampaing}</b> 
												</span>
											</div>
											<div className="col-lg-4 mb-4">
												<Input
													type="number"
													min={1}
													max={355}
													autoComplete="off"
													placeholder="Días disponibles"
													name="diasDisponibles"
													id="diasDisponibles"
													value={this.state.form.diasDisponibles}
													onChange={() => this.handleChangeNumber(event)}
												/>
											</div>
											<div className="col-lg-4 mb-4">
												<Input
													min={1}
													max={23}
													autoComplete="off"
													type="number"
													value={this.state.form.horasDisponibles}
													placeholder="Horas disponibles"
													name="horasDisponibles"
													id="horasDisponibles"
													onChange={() => this.handleChangeNumber(event)}
												/>
											</div>
											<div className="col-lg-4 mb-4">
												<Input
													min={1}
													max={59}
													autoComplete="off"
													type="number"
													value={this.state.form.minutosDisponibles}
													placeholder="Minutos disponibles"
													name="minutosDisponibles"
													id="minutosDisponibles"
													onChange={() => this.handleChangeNumber(event)}
												/>
											</div>
										</div>
									}
									
									<div className="row">
										<div className="col-lg-3 col-md-3 col-sm-12 offset-lg-3 offset-md-3 mb-3">
											<Button
												type="submit"
												className="btn btn-danger"
												onClick={() => this.onCancel('prompt')}
											>
												Cancelar
											</Button>
										</div>
										<div className="col-lg-3 col-md-3 col-sm-12 mb-3">
											<Button
												type="submit"
												className="btn btn-primary ml-1"
											>
												Guardar
											</Button>
										</div>
									</div>
								</form>
						</SweetAlert>
					</div >
				</div >

				<RctCollapsibleCard fullBlock >
					<RctCardContent>
						<List className="row list-unstyled p-0 ">
							<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
								<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
									Etiqueta de los Vouchers : {form.etiqueta}
								</p>
							</ListItem>
							<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
								<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
									Cantidad de Vouchers Generados : {form.numerovouchers}
								</p>
							</ListItem>
							<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
								<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
									Cantidad de Usos por Vouchers : {form.numerousos}
								</p>
							</ListItem>
							<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
								<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
									Opción de Caducidad : {form.nuncaExpira ? 'Nunca Expira' : (form.expira ? 'Expira' : 'Activar Una Vez Se Use')}
								</p>
							</ListItem>
							{form.expira &&
								<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
									<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
										Fecha de Inicio : {form.fecha_inicio}
									</p>
								</ListItem>
							}
							{form.expira &&
								<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
									<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
										Fecha de Final : {form.fecha_fin}
									</p>
								</ListItem>
							}
							{!form.expira && !form.nuncaExpira &&
								<ListItem className="p-0 col-lg-4 col-md-4 col-sm-12 mb-10 align-content-left">
									<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
										Dias Disponibles : {form.diasDisponibles}
									</p>
								</ListItem>
							}
							{!form.expira && !form.nuncaExpira &&
								<ListItem className="p-0 col-lg-4 col-md-4 col-sm-12 mb-10 align-content-left">
									<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
										Horas Disponibles : {form.horasDisponibles}
									</p>
								</ListItem>
							}
							{!form.expira && !form.nuncaExpira &&
								<ListItem className="p-0 col-lg-4 col-md-4 col-sm-12 mb-10 align-content-left">
									<p className="col-lg-12 col-md-12 col-sm-12 mr-10 font-weight-bold">
										Minutos Disponibles : {form.minutosDisponibles}
									</p>
								</ListItem>
							}
						</List>
					</RctCardContent>
				</RctCollapsibleCard>

				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes mt-2"
						data={this.state.dataVouchers}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

				<SweetAlert
					btnSize="sm"
					show={modalEmailCsv}
					showCancel
					confirmBtnText="Enviar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="primary"
					title="Enviar Email CSV"
					onConfirm={() => this.handleSubmit(event)}
					onCancel={() => this.onCancel('modalEmailCsv')}
				>

					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-6 mb-6 ml-6 offset-3">
								<TextField
									type="email"
									name="email"
									id="email"
									autoComplete="off"
									value={this.state.form2.email}
									className="has-input input-lg"
									placeholder="Email Csv"
									onChange={() => this.handleChangeEmailCsv(event)}
								/>
							</div>

						</div>
					</form>
				</SweetAlert>

			</div >

		);
	}
}
