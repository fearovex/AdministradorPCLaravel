import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IconButton from "@material-ui/core/IconButton";
import { DateTimePicker } from '@material-ui/pickers';
import moment from "moment";
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import CustomToolbar from "../../util/CustomToolbar";
import { Input, TextField, Select, InputLabel, MenuItem } from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './styles.css'




export default class Voucher extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location
		const id_campaing = localStorage.user_campaing

		this.state = {
			error: null,
			prompt: false,
			envio: false,
			modaledit: false,
			form: {
				fecha_inicio: moment(new Date, 'YYYY/MM/DD hh:mm a'),
				fecha_fin: moment(new Date, 'YYYY/MM/DD hh:mm a'),
				numerovouchers: "",
				numerousos: "",
				id_location: id_location,
				campaña: id_campaing,
			},
			form2: {
				email: '',
				columns: [],
				rows: [],
			},
			nameColumns: ['Voucher', 'Fecha Inicio', 'Fecha Fin', 'Estado', 'N° de Usos por Voucher', 'N° Usos Total'],
			dataVoucher: [],
			modalEmailCsv: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitVouchers = this.handleSubmitVouchers.bind(this);
	}

	async componentDidMount() {
		try {
			if (this.state.dataVoucher.length == 0) {
				this.setState({ prompt: true });
			}

		} catch (error) {
			console.log(error)
		}
	}

	async handleSubmitVouchers(e) {
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
			let res = await fetch(`${localStorage.urlDomain}api/vouchers/store`, config);
			let datavouchers = await res.json()

			this.setState({
				dataVoucher: datavouchers,
				prompt: false
			});

		} catch (error) {
			console.log(error)
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
				columns: this.state.nameColumns,
				rows: this.state.dataVoucher
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

		this.setState({
			[key]: true,
			form: {
				fecha_inicio: moment(new Date, 'YYYY/MM/DD hh:mm a'),
				fecha_fin: moment(new Date, 'YYYY/MM/DD hh:mm a'),
				numerovouchers: "",
				numerousos: "",
				id_location: id_location,
				campaña: id_campaing,
			}
		});
	}

	onCancel(key) {
		this.setState({ [key]: false })
	}

	handleChange(e, name = null) {
		let date = moment(e._d, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.date();
		let hora = date.hour();
		let minutos = date.minute();
		this.setState({
			form: {
				...this.state.form,
				[name]: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos)
			}
		})
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
		else if (e.target.name === 'numerousos' && e.target.value > 5) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: "5",
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

	render() {
		const columns = this.state.nameColumns;
		const { dataVoucher, prompt, modalEmailCsv, form } = this.state;

		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			downloadOptions: {
				filename: 'Voucher.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			customToolbar: () => {
				return (
					<CustomToolbar columns={columns} data={this.state.dataVoucher} alertOpen={() => this.openAlert('modalEmailCsv')} />
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
					title="crear voucher"
					match={this.props.match}
					history={this.props.history}
				/>
				
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">
						<Button
							variant="contained"
							color="primary"
							className="botonDisZon1"
							onClick={() => this.openAlert('prompt')}
						>
							Crear
						</Button>
						<SweetAlert
							// btnSize="sm"
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
							<form onSubmit={this.handleSubmitVouchers}>
								<div className="row">

									<div className="col-lg-5 mb-4 mt-4 ml-3">
										<Input
											type="number"
											min={1}
											max={100}
											placeholder="Número de Vouchers"
											name="numerovouchers"
											id="numerovouchers"
											value={this.state.form.numerovouchers}
											className="has-input input-lg"
											onChange={() => this.handleChangeNumber(event)}
										/>
									</div>
									<div className="col-lg-5 mb-4 mt-4 ml-3">
										<Input
											min={1}
											max={5}
											type="number"
											value={this.state.form.numerousos}
											className="has-input input-lg"
											placeholder="Cantidad de usos"
											name="numerousos"
											id="numerousos"
											onChange={() => this.handleChangeNumber(event)}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-5 mb-4 ml-3" >
										<DateTimePicker
											className="has-input input-lg"
											key="fecha_inicio"
											label="Fecha Inicio"
											required
											value={form.fecha_inicio}
											minDate={moment(new Date, 'YYYY/MM/DD hh:mm a')}
											format="YYYY/MM/DD hh:mm a"
											onChange={(event) => this.handleChange(event, 'fecha_inicio')}
											animateYearScrolling={false}
											leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
											rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
											showTodayButton={true}
										/>
									</div>
									<div className="col-lg-5 mb-4 ml-3">
										<DateTimePicker
											className="has-input input-lg"
											key="fecha_fin"
											label="Fecha Fin"
											required
											value={form.fecha_fin}
											minDate={moment(form.fecha_inicio, 'YYYY/MM/DD hh:mm a')}
											format="YYYY/MM/DD hh:mm a"
											onChange={(event) => this.handleChange(event, 'fecha_fin')}
											animateYearScrolling={false}
											leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
											rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
											showTodayButton={true}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-3 col-md-3 col-sm-12 offset-lg-3 offset-md-3">
										<Button
											type="submit"
											className="btn btn-danger mr-1"
											onClick={() => this.onCancel('prompt')}
										>
											Cancelar
										</Button>
									</div>
									<div className="col-lg-3 col-md-3 col-sm-12">
										<Button
											type="submit"
											className="btn btn-success ml-1"
										>
											Guardar
										</Button>
									</div>
								</div>
							</form>
						</SweetAlert>
					</div >
				</div >

				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes"
						data={this.state.dataVoucher}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

				<SweetAlert
					btnSize="sm"
					show={modalEmailCsv}
					showCancel
					confirmBtnText="Send"
					cancelBtnText="Cancel"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="Send Email CSV"
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
