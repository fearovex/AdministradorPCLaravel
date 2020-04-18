import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import SweetAlert from 'react-bootstrap-sweetalert'
import CustomToolbar from "../../util/CustomToolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons 
import CheckCircle from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/Error";
import Block from "@material-ui/icons/Block";
import Warning from "@material-ui/icons/Warning";

import { Input, Select, Button } from '@material-ui/core';
import { Route, Link } from 'react-router-dom'
import queryString from 'query-string'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FullScreenLoader from 'Components/FullScreenLoader'

import './styles.css'

export default class VoucherInfo extends Component {
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
			modaledit: false,
			form: {
				email: '',
				columns: [],
				rows: [],
				id_location: id_location,
				id_campaing: id_campaing,
				name_campaing: name_campaing,
			},
			nameColumns: ['Etiqueta','Voucher','Fecha Inicio','Fecha Fin', 'N° de Usos por Voucher','N° Usos Total',{
				name:"Estado",
				options: {
					customBodyRender: (value, tableMeta, updateValue) => {
					if (value === "En Uso")
						return (
						  <Tooltip title="En Uso">
							  <Warning style={{fill:"yellow"}} />
						  </Tooltip>
						);
					else if(value === "Sin Uso")
						return (
						  <Tooltip title="Sin Uso" style={{margin:"0uto"}}>
									<CheckCircle style={{fill:"#57d43b"}} />
						  </Tooltip>
						);
					else if(value === "Sin Usos Disponibles")
						return (
							<Tooltip title="Sin Usos Disponibles">
							<Error style={{fill:"#ff8600"}} />
							</Tooltip>
						);
					else
					return(
						<Tooltip title="Caducado">
						<Block style={{fill:"red"}}  />
						</Tooltip>
					);
					}
				  }	
			}],
			dataVouchers: [],
			modalEmailCsv: false,
			spinnerState:false
		}

		this.createVoucher = this.createVoucher.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.changeTable = this.changeTable.bind(this)
	}

	async componentDidMount(){
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
				body: JSON.stringify(this.state.form)
			};
			let res = await fetch(`${localStorage.urlDomain}api/vouchers/voucherInfo`, config);
			let datavouchers = await res.json()
			// for (let i = 0; i < datavouchers.length; i++) {
            //     datavouchers[i]["Acciones"]=<Link to={"/app/info-vouchers"}  >Ver Más</Link>
            // }
			this.setState({ 
				dataVouchers: datavouchers,
				spinnerState: false
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
				body: JSON.stringify(this.state.form)
			};

			let res = await fetch(`${localStorage.urlDomain}api/csvEmail`, config);
			let data = await res.json();

			if (data.errors) {
				if(data.errors.email[0]==="The email must be a valid email address."){
					this.setState({
						spinnerState:false
					})
					NotificationManager.error('El correo tiene que ser valido.', '', 4000);
				}
				if(data.errors.email[0]==="The email field is required."){
					this.setState({
						spinnerState:false
					})
					NotificationManager.error('El campo con el correo electrónico es requerido.', '', 4000);
				}
				
			}
			if (data.message && !data.errors) {
				NotificationManager.success(data.message, '', 4000);
				this.setState({
					modalEmailCsv: false,
					spinnerState: false
				})
			}

		} catch (error) {
			this.setState({
				error
			});
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
		const { dataVouchers, modalEmailCsv, form, spinnerState } = this.state;
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
				{ spinnerState ? 
					<FullScreenLoader />
					:
					<div>

					</div>
				}


				<PageTitleBar
					title={"Información de Vouchers - "+form.name_campaing}
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
								Crear Vouchers
							</Button>
						}
						<SweetAlert
							btnSize="sm"
							customClass='emailCsvSweetAlert'
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
									<div className="col-6 mb-6 ml-6" style={{marginLeft: "20%"}}>
										<Input
											type="email"
											name="email"
											id="email"
											autoComplete="off"
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
						title={"Lista de Vouchers"}
						data={this.state.dataVouchers}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>

		);
	}
}
