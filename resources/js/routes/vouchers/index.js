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




export default class Vouchers extends Component {
	constructor(props) {
		super(props)

		// if (!this.props.location.state) {
		// 	this.props.history.push('/');
		// } else {
		// 	const { id_location } = this.props.location.state
		// 	this.id_location = id_location
		// }
		this.state = {
			data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id: 0,
			campania: [],
			modaledit: false,
			form: {

			},
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
		const { data } = this.state;
		const { datacampania } = this.state;
		const columns = ['voucher', 'fecha_inicio', 'fecha_fin', 'estado'];
		const { basic, withDes, success, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle, modaledit } = this.state;
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
					title={<IntlMessages id="vouchers" />}
					match={this.props.match}
				/>
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">

						<Button
							variant="contained"
							color="primary"
							className="boton"
							onClick={() => this.openAlert('prompt')}
						>enviar por correo
						</Button>

						<SweetAlert

							btnSize="sm"
							show={prompt}
							showCancel
							confirmBtnText="Enviar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="success"
							title="Enviar"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('prompt')}
						>



							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-lg-5 mb-4 ml-3" >
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
					<MUIDataTable
						title={"Lista Vouchers"}
						data={this.state.datacampania}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
