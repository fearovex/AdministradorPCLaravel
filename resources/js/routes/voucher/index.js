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

import './styles.css'




export default class Voucher extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location

		this.state = {
			vouchers: [],
			error: null,
			prompt: false,
			envio: false,
			campanias: [],
			modaledit: false,
			form: {
				campaña: "",
				fecha_inicio: "",
				fecha_fin: "",
				numerovouchers: "",
				numerousos:"",
				id_location: id_location,
			},
		}

		this.handleChange = this.handleChange.bind(this);

	}

	async componentDidMount(){
		try {
			let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(this.state.form)
            }

            let res = await fetch(`${localStorage.urlDomain}api/vouchers/create`, config);
			let datacampania = await res.json()
			
			this.setState({ campanias: datacampania });

			if(this.state.vouchers.length == 0){
				this.setState({ prompt: true });
			}

		} catch (error) {
			console.log(error)
		}
	}

	async handleSubmit(e){
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
				vouchers: datavouchers,
				prompt: false
			});

		} catch (error) {
			console.log(error)
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
	}

	openAlerttest(key) {
		this.setState({ [key]: true });
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

	render() {
		const { form, campanias } = this.state;
		const columns = ['campaña', 'Voucher', 'fecha_inicio', 'fecha_fin'];
		const { basic, withDes, success, envio, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle, modaledit } = this.state;

		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			downloadOptions: {
				filename: 'Vouchers.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			elevation: 0
		};
		return (
			<div className="blank-wrapper">
				<Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet>


				<PageTitleBar
					title={<IntlMessages id="Crear voucher" />}
					match={this.props.match}
				/>
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">

						<Button
							variant="contained"
							color="primary"
							className="botonDisZon"
							onClick={() => this.openAlert('envio')}
						>enviar por correo
					</Button>

						<Button
							style={{ 'marginRight': '20px' }}
							variant="contained"
							color="primary"
							className="botonDisZon1"
							onClick={() => this.openAlert('prompt')}
						>Crear
					</Button>

						<SweetAlert

							btnSize="sm"
							show={prompt}
							showCancel
							confirmBtnText="Guardar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="success"
							title="Crear Vouchers"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('prompt')}
						>



							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-lg-5 mb-4 ml-3" >
										<Select name="campaña" native onChange={() => this.handleChange(event)}
											className="has-input input-lg"
										>
											<option value="">Seleccione una campaña</option>
											{campanias && campanias.map((data) => (

												<option key={data.id} value={data.id}>{data.nombre}</option>
											))}

										</Select>
									</div>
									<div className="col-lg-5 mb-4 ml-3" >

										<Input
											type="number"
											name="numerovouchers"
											id="numerovouchers"
											max={500}
											className="has-input input-lg"
											placeholder="numero Vouchers"
											onChange={() => this.handleChange(event)}
										/>
									</div>
								</div>
								<div className="row">

									<div className="col-lg-5 mb-4 ml-3" >
										<Input
											type="date"
											name="fecha_inicio"
											id="fecha_inicio"
											className="has-input input-lg"
											placeholder="Fecha Inicial"
											onChange={() => this.handleChange(event)}
										/>
									</div>
									<div className="col-lg-6">
										<Input
											type="date"
											name="fecha_fin"
											id="fecha_fin"
											className="has-input input-lg"
											placeholder="Fecha Final"
											onChange={() => this.handleChange(event)}
										/>
									</div>
								</div>
								<div className="row">

									<div className="col-lg-5 mb-4 ml-3" >
										<Input
											type="text"
											name="numerousos"
											id="numerousos"
											className="has-input input-lg"
											placeholder="Cantidad de usos"
											onChange={() => this.handleChange(event)}
										/>
									</div>

								</div>
							</form>

						</SweetAlert>
						<SweetAlert

							btnSize="sm"
							show={envio}
							showCancel
							confirmBtnText="Enviar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="success"
							title="Enviar"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('envio')}
						>



							<form onSubmit={this.handleSubmit}>
							<div className="row">
									<div className="col-lg-10 mb-4 ml-8" >
										<Input
											type="email"
											name="correo"
											id="correo"
											className="has-input input-lg"
											placeholder="Correo"
											onChange={() => this.handleChange(event)}
										/>
									</div>


								</div>


							</form>

						</SweetAlert>


					</div>
				</div>


				<RctCollapsibleCard fullBlock>
					{console.log(this.state.vouchers)}
					<MUIDataTable
						className="mui-tableRes"
						data={this.state.vouchers}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
