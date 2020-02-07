import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import queryString from 'query-string';
import moment from "moment";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { DateTimePicker } from '@material-ui/pickers';

import './styles.css'




export default class campañas extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location

		let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.dates();
		let hora = date.hours();
		let minutos = date.minute();

		this.state = {
			data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id_location: id_location,
			campania: [],
			modaledit: false,
			form: {
				nombre_campaña: "",
				fecha_inicio: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				fecha_fin: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				descripcion: "",
				zona_ap: "",
				anio: "",
				vertical_economica:""
			},
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);
		this.DataCampania = this.DataCampania.bind(this);
		this.DashboardCampania = this.DashboardCampania.bind(this);

	}
	async componentDidMount() {
		const id_location = localStorage.user_location
		const { location } = this.props
		try {
			let res = await fetch(`${localStorage.urlDomain}api/zonas/${id_location}`)
			let data = await res.json()

			this.setState({
				data: data,
				form: {
					id_location: id_location
					
				}
			})

		} catch (error) {
			this.setState({
				error
			})
		}
		try {
			let res = await fetch(`${localStorage.urlDomain}api/campanias/${id_location}`)
			let datacampania = await res.json()
			for (let i = 0; i < datacampania.length; i++) {
				datacampania[i]["Editar"] = 
				<Link to={location.pathname} onClick={() => this.openAlertTest('modaledit', datacampania[i].id)}>
					<ListItemIcon className="menu-icon">
						<i className='ti-pencil-alt' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
				datacampania[i]["Datos"] = 
				<Link to={location.pathname + '/' + datacampania[i].Nombre} onClick={() => this.DataCampania(datacampania[i].id, datacampania[i].Nombre)}>
					<ListItemIcon className="menu-icon">
						<i className='ti-eye' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
				datacampania[i]["Dashboard"] = 
				<Link to={location.pathname + '/' + datacampania[i].Nombre+'/dashboard'} onClick={() => this.DashboardCampania(datacampania[i].id, datacampania[i].campania, datacampania[i].Vertical)}>
					<ListItemIcon className="menu-icon">
						<i className='ti-pie-chart' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
			}

			this.setState({
				datacampania: datacampania
			})

		} catch (error) {
			this.state = {
				error: error
			}
		}


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
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/campanias`, config);

			let redirectCMS = this.props.history.location.pathname;
			let nameCampaingCreated = this.state.form.nombre_campaña
			// this.props.history.push(redirectCMS+'/'+nameCampaingCreated+'/cms')// al terminar cms
			this.props.history.push(redirectCMS+'/crear/cms')
			localStorage.setItem('campaingCreated',nameCampaingCreated);
			this.setState({
				prompt: false
			})
			
			// this.componentDidMount();

		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}

	async handleEdit(e) {
		e.preventDefault()
		try {
			let config = {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/campanias/` + this.state.form.id_campain, config);

			this.setState({
				modaledit: false
			})

			this.componentDidMount();

		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}



	onConfirm(key) {
		this.setState({ [key]: false })
	}


	DataCampania(id_campaing, name_campaing) {
		localStorage.setItem('user_campaing', id_campaing);
		localStorage.setItem('user_name_campaing', name_campaing);
	}

	DashboardCampania(id_campaing, campaing_db, vertical){
		localStorage.setItem('user_campaing', id_campaing);
		localStorage.setItem('user_campaing_db', campaing_db);
		localStorage.setItem('vertical', vertical);
	}


	/**
	 * Open Alert
	 * @param {key} key
	 */
	openAlert(key) {
		this.setState({ [key]: true });
	}
	async openAlertTest(key, id) {
		this.setState({ [key]: true });
		let res = await fetch(`${localStorage.urlDomain}api/campanias/${id}/edit`);
		let campania = await res.json();
		this.setState({
			form: {
				nombre_campaña: campania.nombre,
				fecha_inicio: campania.fecha_inicio,
				fecha_fin: campania.fecha_fin,
				descripcion: campania.descripcion,
				zona_ap: campania.zona_ap,
				anio: campania.ano_evento,
				id_campain: id,

			}
		});

	}

	/**
	 * On Cancel dialog
	 * @param {string} key
	 */
	onCancel(key) {
		this.setState({ [key]: false })
	}
	handleChange(e, name=null) {
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
	handleChangeEdit(e) {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		})
	}
	render() {
		const { data, form } = this.state;
		const columns = ['Nombre', 'Descripcion', 'Fecha Inicio', 'Fecha Fin', 'Editar', 'Datos','Dashboard'];
		const { prompt, modaledit } = this.state;
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
			responsive: 'scrollMaxHeight',
			print: false,
			download: false
		};
		return (
			<div className="blank-wrapper">
				<Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet>


				<PageTitleBar
					title={<IntlMessages id="sidebar.campaña" />}
					match={this.props.match}
					history={this.props.history}
				/>
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">

						<Button
							variant="contained"
							color="primary"
							className="boton"
							onClick={() => this.openAlert('prompt')}
						>Crear campaña
						</Button>

						<SweetAlert

							btnSize="sm"
							show={prompt}
							showCancel
							confirmBtnText="Siguiente"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="primary"
							title="Agregar Campaña"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('prompt')}
						>



							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-lg-5 mb-4 ml-3" >
										<Input
											type="text"
											name="nombre_campaña"
											id="nombre_campaña"
											className="has-input input-lg"
											placeholder="Nombre campaña"
											onChange={() => this.handleChange(event)}
										/>
									</div>
									<div className="col-lg-6">
										<Select name="zona_ap" native onChange={() => this.handleChange(event)}
											className="has-input input-lg"
										>
											<option value="">Seleccione una zona</option>
											{data && data.map((data) => (

												<option key={data.id} value={data.id}>{data.Nombre}</option>
											))}

										</Select>
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
											format="YYYY/MM/DD hh:mm a"
											onChange={(event) => this.handleChange(event, 'fecha_inicio')}
											animateYearScrolling={false}
											leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
											rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
											showTodayButton={true}
										/>
									</div>
									<div className="col-lg-6">
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
									<div className="col-lg-5 mb-4 ml-3" >

										<Input
											type="text"
											name="descripcion"
											id="descripcion"
											className="has-input input-lg"
											placeholder="Descripción"
											onChange={() => this.handleChange(event)}
										/>
									</div>
									<div className="col-lg-6">
										<Input
											type="text"
											name="anio"
											id="anio"
											className="has-input input-lg"
											placeholder="Año"
											onChange={() => this.handleChange(event)}
										/>
									</div>
									<div className="col-lg-10">
										<Select name="vertical_economica" native onChange={() => this.handleChange(event)}
											className="has-input input-lg"
										>
											<option value="">Seleccione una vertical</option>
											<option value='Hoteles'>Hoteles</option>
											<option value='Centros Comerciales'>Centros Comerciales</option>

										</Select>
									</div>
								</div>


							</form>

						</SweetAlert>

						<SweetAlert

							btnSize="sm"
							show={modaledit}
							showCancel
							confirmBtnText="Editar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="primary"
							title="Editar Campaña"
							onConfirm={() => this.handleEdit(event)}
							onCancel={() => this.onCancel('modaledit')}
						>



							<form onSubmit={this.handleEdit}>
								<div className="row">
									<div className="col-lg-5 mb-4 ml-3" >
										<Input
											type="text"
											name="nombre_campaña"
											id="nombre_campaña"
											value={this.state.form.nombre_campaña}
											className="has-input input-lg"
											placeholder="Nombre campaña"
											onChange={() => this.handleChangeEdit(event)}
										/>
									</div>
									<div className="col-lg-6">
										<Select name="zona_ap" native onChange={() => this.handleChangeEdit(event)}
											className="has-input input-lg"
											value={this.state.form.zona_ap}
										>
											<option value="">Seleccione una zona</option>
											{data && data.map((data) => (

												<option key={data.id} value={data.id}>{data.Nombre}</option>
											))}

										</Select>
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
											format="YYYY/MM/DD hh:mm a"
											onChange={(event) => this.handleChange(event, 'fecha_inicio')}
											animateYearScrolling={false}
											leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
											rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
											showTodayButton={true}
										/>
									</div>
									<div className="col-lg-6">
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
									<div className="col-lg-5 mb-4 ml-3" >

										<Input
											type="text"
											name="descripcion"
											id="descripcion"
											value={this.state.form.descripcion}
											className="has-input input-lg"
											placeholder="Descripciòn"
											onChange={() => this.handleChangeEdit(event)}
										/>
									</div>
									<div className="col-lg-6">
										<Input
											type="text"
											name="anio"
											id="anio"
											value={this.state.form.anio}
											className="has-input input-lg"
											placeholder="Año"
											onChange={() => this.handleChangeEdit(event)}
										/>
									</div>
								</div>


							</form>

						</SweetAlert>
					</div>
				</div>


				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						data={this.state.datacampania}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
