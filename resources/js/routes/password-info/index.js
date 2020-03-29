import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import SweetAlert from 'react-bootstrap-sweetalert'
import CustomToolbar from "../../util/CustomToolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckCircle from "@material-ui/icons/CheckCircle";
import Block from "@material-ui/icons/Block";
import { Input, Select, Button } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './styles.css'

export default class PasswordInfo extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location
		const id_campaing = localStorage.user_campaing;
		const name_campaing = localStorage.user_name_campaing;
		const finalDateCampaing =  localStorage.user_finalDate_campaing;

		this.state = {
			data: [],
			createVoucher: new Date() < new Date(finalDateCampaing) ? true : false,
			error: null,
			activeStep: 0,
			prompt: false,
			id_location: id_location,
			campania: [],
			modalEdit: false,
			statePassword:false,
			form: {
				email: '',
				columns: [],
				rows: [],
				id_location: id_location,
				id_campaing: id_campaing,
				name_campaing: name_campaing,
			},
			formPassword:{
				id_password:"",
				password:"",
				etiqueta:""
			},
			nameColumns: ['Etiqueta','Contraseña','Fecha Inicio','Fecha Fin', 'N° de Usos por Voucher','N° Usos Total',{
				name:"Estado",
				options: {
					customBodyRender: (value, tableMeta, updateValue) => {
					if(value === "Disponible")
						return (
						  <Tooltip title="Disponible" style={{margin:"0uto"}}>
								<CheckCircle style={{fill:"#57d43b"}} />
						  </Tooltip>
						);
					else
					return(
						<Tooltip title="No Disponible">
						<Block style={{fill:"red"}}  />
						</Tooltip>
					);
					}
				  }	
			},'Acciones'],
			dataVouchers: [],
			modalEmailCsv: false,
		}

		this.createVoucher = this.createVoucher.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.changeTable = this.changeTable.bind(this)
		this.openModalEdit = this.openModalEdit.bind(this)
		this.handleEditPassword = this.handleEditPassword.bind(this)
		this.dataPasswordsInfo = this.dataPasswordsInfo.bind(this)
		this.handleChangeStatePassword = this.handleChangeStatePassword.bind(this)
	}

	componentDidMount(){
		this.dataPasswordsInfo();
	}

	async dataPasswordsInfo(){
		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};
			let res = await fetch(`${localStorage.urlDomain}api/passwords/passwordInfo`, config);
			let datavouchers = await res.json()
			for (let i = 0; i < datavouchers.length; i++) {
                datavouchers[i]["Acciones"]=
			<a onClick={() => this.openModalEdit('modalEdit', datavouchers[i].id_password)}>
				<ListItemIcon className="menu-icon">
					<i className='ti-pencil-alt' style={{ margin: "0 auto" }}></i>
				</ListItemIcon>
			</a>
            }
			this.setState({ 
				dataVouchers: datavouchers,
			});

		} catch (error) {
			console.log(error)
		}
	}

	// CSV //
	handleChangeEmailCsv(e) {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}

		})
	}

	handleChange(e) {
		this.setState({
			formPassword: {
				...this.state.formPassword,
				[e.target.name]: e.target.value
			}

		})
	}

	handleChangeStatePassword = name => (event, checked) => {
		this.setState({ [name]: checked });
	};


	async handleSubmit(e) {
		e.preventDefault()

		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			let res = await fetch(`${localStorage.urlDomain}api/csvEmail`, config);
			let data = await res.json();

			if (data.errors) {
				if(data.errors.email[0]==="The email must be a valid email address."){
					NotificationManager.error('El correo tiene que ser valido.', '', 4000);
				}
				if(data.errors.email[0]==="The email field is required."){
					NotificationManager.error('El campo con el correo electrónico es requerido.', '', 4000);
				}
				
			}
			if (data.message && !data.errors) {
				NotificationManager.success(data.message, '', 4000);
				this.setState({
					modalEmailCsv: false
				})
			}

		} catch (error) {
			this.setState({
				error
			});
		}
	}

	async handleEditPassword(e){
		e.preventDefault();
		const id_location = localStorage.user_location;
		const id_campaing = localStorage.user_campaing;
		try {
			if(this.state.formPassword.etiqueta == ''){
				NotificationManager.error('El campo etiqueta es obligatorio', '', 4000);
			}
			if(this.state.formPassword.password == ''){
				NotificationManager.error('El campo contraseña es obligatorio', '', 4000);
			}
			if(this.state.formPassword.etiqueta != '' && this.state.formPassword.password != ''){
				let config = {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id_password:this.state.formPassword.id_password,
						password:this.state.formPassword.password,
						etiqueta:this.state.formPassword.etiqueta,
						statePassword:this.state.statePassword,
						id_location:id_location,
						id_campaing:id_campaing
					})
				};
				let res = await fetch(`${localStorage.urlDomain}api/passwords/updatePassword`, config);
				let data = await res.json();

				if(data.code == 200){
					NotificationManager.success('La contraseña se ha editado exitosamente', '', 4000);
					this.dataPasswordsInfo();
					this.setState({
						modalEdit:false
					})
				}
				else{
					NotificationManager.error('Error al editar la contraseña', '', 4000);
				}
			}

		} catch (error) {
			
		}
		
	}

	openAlert(key) {
		this.setState({ 
			[key]: true,
			form: {
				...this.state.form,
				email: '', 
			}
		});
	}

	async openModalEdit(key,id_password) {
		const id_location = localStorage.user_location;
		const id_campaing = localStorage.user_campaing;
		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id_password:id_password,
					id_location:id_location,
					id_campaing:id_campaing
				})
			};
			let res = await fetch(`${localStorage.urlDomain}api/passwords/editPassword`, config);
			let data = await res.json();
			this.setState({ 
				[key]: true,
				formPassword:{
					...this.state.formPassword,
					id_password:id_password,
					etiqueta:data.etiqueta,
					password:data.password,
					estado:data.estado,
				}
			});
			if(this.state.formPassword.estado == 'Disponible'){
				this.setState({
					statePassword:true
				})
			}else{
				this.setState({
					statePassword:false
				})
			}
		} catch (error) {
			
		}
	}

	createVoucher() {
		const { location } = this.props;
		this.props.history.push(location.pathname + '/create')
	}

	onCancel(key) {
		this.setState({ [key]: false })
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
			form:{
				...this.state.form,
				columns: arrayColumns,
				rows: arrayData,
			}
		});
	}


	render() {
		const { dataVouchers, modalEmailCsv, form, modalEdit } = this.state;
		const columns = this.state.nameColumns;
		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			selectableRows: 'multiple',
			downloadOptions: {
				filename: 'Vouchers.csv',
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
				<Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet>


				<PageTitleBar
					title={"Información de Contraseñas - "+form.name_campaing}
					match={this.props.match}
					history={this.props.history}
				/>
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">
						{this.state.createVoucher &&
							<Button
								variant="contained"
								color="primary"
								className="botonVoucher"
								onClick={() => this.createVoucher()}
							>
								Crear Contraseña
							</Button>
						}
						<SweetAlert
							btnSize="sm"
							show={modalEdit}
							showConfirm={false}
							title="Editar Contraseña"
							onConfirm={() => this.handleEditPassword(event)}
						>
								<form onSubmit={this.handleEditPassword} className="col-lg-12" >
									<div className="row marginForm">
										<div className="col-lg-6 col-sm-6 col-6 mb-4">
											<Input
												type="text"
												value={this.state.formPassword.etiqueta}
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
												value={this.state.formPassword.password}
												placeholder="Contraseña"
												name="password"
												autoComplete="off"
												id="password"
												onChange={() => this.handleChange(event)}
											/>
										</div>
									</div>
									
									<div className="row marginForm">
										<div className="col-lg-12 col-sm-12 col-12 mb-4">
										<FormControlLabel
											style={{margin: "0 auto"}}
											control={
											<Switch
												checked={this.state.statePassword}
												onChange={this.handleChangeStatePassword('statePassword')}
												color="secondary"
											/>
											}
											label={this.state.statePassword ? "Contraseña Habilitada" : "Contraseña Deshabilitada"}
										/>
										</div>
									
									</div>
									
									<div className="row">
										<div className="col-lg-3 col-md-3 col-sm-12 offset-lg-3 offset-md-3 mb-3">
											<Button
												type="submit"
												className="btn btn-danger"
												onClick={() => this.onCancel('modalEdit')}
											>
												Cancelar
											</Button>
										</div>
										<div className="col-lg-3 col-md-3 col-sm-12 mb-3">
											<Button
												type="submit"
												className="btn btn-primary ml-1"
											>
												Editar
											</Button>
										</div>
									</div>
								</form>
						</SweetAlert>
						<SweetAlert
							btnSize="sm"
							show={modalEmailCsv}
							showCancel
							confirmBtnText="Enviar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="primary"
							title="Enviar CSV a Correo Electrónico"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('modalEmailCsv')}
						>

							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-6 mb-6 ml-6 offset-3">
										<Input
											type="email"
											name="email"
											id="email"
											value={this.state.form.email}
											className="has-input input-lg"
											placeholder="Correo"
											onChange={() => this.handleChangeEmailCsv(event)}
										/>
									</div>

								</div>
							</form>
						</SweetAlert>

					</div>
				</div>

				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes"
						title={"Lista de Contraseñas"}
						data={this.state.dataVouchers}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>

		);
	}
}
