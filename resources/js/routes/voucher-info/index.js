import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import SweetAlert from 'react-bootstrap-sweetalert'
import CustomToolbar from "../../util/CustomToolbar";
import { Input, Select, Button } from '@material-ui/core';
import { Route, Link } from 'react-router-dom'
import queryString from 'query-string'
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './styles.css'

export default class VoucherInfo extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location
		const id_campaing = localStorage.user_campaing;
		const name_campaing = localStorage.user_name_campaing;

		this.state = {
			data: [],
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
			nameColumns: ['Voucher','Fecha Inicio','Fecha Fin','Estado', 'N° de Usos por Voucher','N° Usos Total'],
			dataVouchers: [],
			modalEmailCsv: false,
		}

		this.createVoucher = this.createVoucher.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

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
			};
			let res = await fetch(`${localStorage.urlDomain}api/vouchers/voucherInfo`, config);
			let datavouchers = await res.json()
			// for (let i = 0; i < datavouchers.length; i++) {
            //     datavouchers[i]["Acciones"]=<Link to={"/app/info-vouchers"}  >Ver Más</Link>
            // }
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
				[e.target.name]: e.target.value,
				columns: this.state.nameColumns,
				rows: this.state.dataVouchers
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

	openAlert(key) {
		this.setState({ [key]: true });
	}

	createVoucher() {
		const { location } = this.props;
		this.props.history.push(location.pathname + '/create')
	}

	onCancel(key) {
		this.setState({ [key]: false })
	}


	render() {
		const { dataVouchers, modalEmailCsv } = this.state;
		const columns = this.state.nameColumns;
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
			customToolbar: () => {
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
					title="Información de Vouchers"
					match={this.props.match}
					history={this.props.history}
				/>
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">
						<Button
							variant="contained"
							color="primary"
							className="botonVoucher"
							onClick={() => this.createVoucher()}
						>
							Crear Vouchers
						</Button>
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
