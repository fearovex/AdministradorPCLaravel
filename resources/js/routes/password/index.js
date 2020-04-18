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
import 'moment/locale/es'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import CustomToolbar from "../../util/CustomToolbar";
import { Input,TextField, Select, InputLabel, FormControlLabel, MenuItem, Checkbox} from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FullScreenLoader from 'Components/FullScreenLoader';
import './styles.css'




export default class Password extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location
		const id_campaing = localStorage.user_campaing
		const name_campaing = localStorage.user_name_campaing;
		
		this.state = {
			error: null,
			prompt: false,
			envio: false,
			modaledit: false,
			form: {
				etiqueta:"",
				passwordPersonalizado:"",
				id_location: id_location,
				id_campaing: id_campaing,
				name_campaing: name_campaing,
			},
			form2: {
				email: '',
				columns: [],
				rows: [],
				id_location: id_location,
				id_campaing: id_campaing,
				name_campaing: name_campaing, 
			},
			nameColumns: ['Etiqueta','Contraseña', 'Fecha Inicio', 'Fecha Fin','N° Usos Total'],
			dataVouchers: [],
			modalEmailCsv: false,
			spinnerState:false
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
		this.setState({
			spinnerState:true
		})
		const {
			etiqueta,
			passwordPersonalizado
		} = this.state.form
		
		if(etiqueta == ''){
			this.setState({
				spinnerState:false
			})
			NotificationManager.error('El campo etiqueta es obligatorio','',5000);
		}
		if(!passwordPersonalizado){
			this.setState({
				spinnerState:false
			})
			NotificationManager.error('El campo de contraseña personalizada es obligatorio','',5000);
		}
		if(passwordPersonalizado != '' && etiqueta !=''){
			try {
				let config = {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(this.state.form)
				};
				let res = await fetch(`${localStorage.urlDomain}api/password/store`, config);
				let datavouchers = await res.json()
				if(datavouchers != 500){
					this.setState({
						dataVouchers: datavouchers,
						prompt: false,
						spinnerState:false
					});
					NotificationManager.success('Contraseña creada satisfactoriamente','',5000);
				}
				else{
					this.setState({
						spinnerState:false
					})
					NotificationManager.error('La contraseña creada ya se encuentra registrada','',5000);
				}

			} catch (error) {
				console.log(error)
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
		this.setState({
			spinnerState:true
		})
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
					modalEmailCsv: false,
					spinnerState: false
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
		const { dataVouchers, prompt, modalEmailCsv, form, spinnerState } = this.state;
		

		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			selectableRows: 'multiple',
			downloadOptions: {
				filename: 'Contraseñas.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			onTableChange: (action,tableState) => {
				this.changeTable(tableState)
			},
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
					title="Crear Contraseña"
					match={this.props.match}
					history={this.props.history}
				/>
				{ spinnerState ? 
					<FullScreenLoader />
					:
					<div>

					</div>
				}
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">
						<SweetAlert
							customClass="makePasswordAlert"
							btnSize="sm"
							show={prompt}
							showConfirm={false}
							title="Crear Contraseñas"
							onConfirm={() => this.handleSubmitVouchers(event)}
						>
								<form onSubmit={this.handleSubmitVouchers} className="col-lg-12" >
									<div className="row marginForm">
										<div className="col-lg-6 col-sm-6 col-6 mb-4">
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
										<div className="col-lg-6 col-sm-6 col-6 mb-4">
											<Input
												type="text"
												value={this.state.form.passwordPersonalizado}
												placeholder="Clave Personalizada"
												name="passwordPersonalizado"
												autoComplete="off"
												id="passwordPersonalizado"
												onChange={() => this.handleChange(event)}
											/>
										</div>
									</div>
									
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
								<p className="col-lg-12 col-md-12 col-sm-12 mr-10">
									<span>Etiqueta de los Vouchers : <span className="font-weight-bold">{form.etiqueta}</span></span>
								</p>
							</ListItem>
							<ListItem className="p-0 col-lg-6 col-md-6 col-sm-12 mb-10 align-content-left">
								<p className="col-lg-12 col-md-12 col-sm-12 mr-10">
									<span>Opción de Caducidad : <span className="font-weight-bold">{form.nuncaExpira ? 'Nunca Expira' : (form.expira ? 'Expira' : (form.activarUso ? 'Activar Una Vez Se Use' : "Personalizado"))}</span></span>
								</p>
							</ListItem>
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
					customClass='emailCsvSweetAlert'
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
							<div className="col-6 mb-6 ml-6" style={{marginLeft: "20%", marginTop:" 20px"}}>
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
