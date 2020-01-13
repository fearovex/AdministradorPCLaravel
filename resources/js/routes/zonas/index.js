import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import './styles.css'




export default class zona extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			error: null,
			activeStep: 0,
			id: 0,
			prompt: false,
			modaledit: false,
			zona: [],
			form: {
				nombre: "",
			},
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);
		this.dispositivos = this.dispositivos.bind(this);
	}
	async componentDidMount() {
		const id_location = localStorage.user_location;
		const { location } = this.props;

		try {
			let res = await fetch(`${localStorage.urlDomain}api/zonas/${id_location}`)
			let data = await res.json();

			for (let i = 0; i < data.length; i++) {
				data[i]["Editar"] =
					<Link to={location.pathname} onClick={() => this.openAlertTest('modaledit', data[i].id)}>
						<ListItemIcon className="menu-icon">
							<i className='ti-pencil-alt' style={{ margin: "0 auto" }}></i>
						</ListItemIcon>
					</Link>
				data[i]["Dispositivos"] =
					<Link to={location.pathname + '/dispositivos'} onClick={() => this.dispositivos(data[i].id)}>
						<ListItemIcon className="menu-icon">
							<i className='material-icons' style={{ margin: "0 auto" }}>router</i>
						</ListItemIcon>
					</Link>
			}
			this.setState({
				data: data,
				form: {
					id_location: id_location
				}
			})

		} catch (error) {
			this.setState({
				error,
			})
		}
	}

	dispositivos(id_zona) {
		localStorage.setItem('user_zona', id_zona);
	}

	async handleSubmit(e) {
		e.preventDefault()
		console.log(this.state.form)
		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/zonas`, config);

			this.componentDidMount();

			this.setState({
				prompt: false
			})
		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}

	async handleEdit(e) {
		e.preventDefault();
		try {
			let config = {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/zonas/` + this.state.form.id_zona, config);

			this.componentDidMount();
			this.setState({
				modaledit: false
			})

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

	/**
	 * Open Alert
	 * @param {key} key
	 */

	openAlert(key) {

		this.setState({ [key]: true });
		// console.log(this.state.id_locacion);	

	}

	async openAlertTest(key, id) {
		this.setState({ [key]: true });
		let res = await fetch(`${localStorage.urlDomain}api/zonas/${id}/edit`);
		let zona = await res.json();
		this.setState({
			form: {
				nombre: zona.nombre,
				id_zona: id,
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
	handleChange(e) {
		this.state.form[e.target.name] = e.target.value;
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
		const { data } = this.state;
		const columns = ['Nombre', 'Editar', 'Dispositivos'];
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
					title={<IntlMessages id="sidebar.zonas" />}
					match={this.props.match}
					history={this.props.history}
				/>
				<div className="blank-wrapper">
					<Button
						style={{ 'marginRight': '20px' }}
						variant="contained"
						color="primary"
						className="botonDisZon1"
						onClick={() => this.openAlert('prompt')}
					>
						Crear Zona
						</Button>
					<div className="sweet-alert-wrapper">
						<SweetAlert
							btnSize="sm"
							show={prompt}
							showCancel
							confirmBtnText="Guardar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="primary"
							title="Crear Zona"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('prompt')}
						>
							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className=" col-lg-5 offset-lg-3">
										<Input
											type="text"
											name="nombre"
											id="nombre"
											className="has-input input-lg"
											placeholder="Nombre"
											onChange={() => this.handleChange(event)}
										/>
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
							title="Editar Zona"
							onConfirm={() => this.handleEdit(event)}
							onCancel={() => this.onCancel('modaledit')}
						>

							<form onSubmit={this.handleEdit}>
								<div className="row">
									<div className=" col-lg-5 offset-lg-3">
										<Input
											type="text"
											name="nombre"
											id="nombre"
											value={this.state.form.nombre}
											className="has-input input-lg"
											placeholder="Nombre"
											onChange={() => this.handleChangeEdit(event)}

										/>

									</div>
								</div>
							</form>
						</SweetAlert>
					</div>
				</div>
				<RctCollapsibleCard fullBlock >
					<MUIDataTable
						className="mui-tableRes"
						title={"Zonas"}
						data={data}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}
