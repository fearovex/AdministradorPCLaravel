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
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FullScreenLoader from 'Components/FullScreenLoader'
import './styles.css'




export default class campañas extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location
		this.state = {
			data: [],
			error: null,
			prompt: false,
			id_location: id_location,
			campania: [],
			url:false,
			spinnerState:false
		}
		this.redirectCMS = this.redirectCMS.bind(this);
		this.DataCampania = this.DataCampania.bind(this);
		this.DashboardCampania = this.DashboardCampania.bind(this);

		this.openUrl = this.openUrl.bind(this);
		this.closeUrl = this.closeUrl.bind(this);

	}
	async componentDidMount() {
		const id_location = localStorage.user_location
		const { location } = this.props
		this.setState({
			spinnerState:true
		})
		try {
			let res = await fetch(`${localStorage.urlDomain}api/campanias/${id_location}`)
			let datacampania = await res.json()
			for (let i = 0; i < datacampania.length; i++) {
				datacampania[i]["Editar"] = 
				<Link to={{pathname:location.pathname+'/editar/cms',state:{id_campaing: datacampania[i].id}}}>
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
				datacampania[i]["Portal"] =
				<a onClick={() => this.openUrl('url',datacampania[i].path_campania)} target="_blank">
					<ListItemIcon className="menu-icon">
						<i className='ti-world' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</a>
			}

			this.setState({
				datacampania: datacampania,
				spinnerState:false
			})

		} catch (error) {
			this.state = {
				error: error
			}
		}


	}


	redirectCMS() {
		let redirectCMSLocation = this.props.history.location.pathname;
		// let nameCampaingCreated = this.state.form.nombre_campaña
		// this.props.history.push(redirectCMS+'/'+nameCampaingCreated+'/cms')// al terminar cms
		this.props.history.push({
			pathname: redirectCMSLocation +'/crear/cms',
			state: { id_campaing: 0 }
		})
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
	openUrl(key,portalUrl) {
		this.setState({ 
			[key]: true,
			portalUrl:portalUrl
		 });
	}

	/**
	 * On Cancel dialog
	 * @param {string} key
	 */
	closeUrl(key) {
		this.setState({ [key]: false })
	}
	
	

	render() {
		const columns = ['Nombre', 'Ultima Fecha','Total Registros', 'Fecha Inicio', 'Fecha Fin', 'Editar', 'Datos','Dashboard', 'Portal'];
		const { url, portalUrl, spinnerState } = this.state;
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
			responsive: 'scrollMaxHeight',
			print: false,
			download: false
		};
		return (
			<div className="blank-wrapper">
				{/* <Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet> */}
				{spinnerState ? 
					<FullScreenLoader />
					:
					<div>

					</div>
				}

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
							className="botonCampaña"
							onClick={() => this.redirectCMS()}
						>Crear campaña
						</Button>
						<SweetAlert
						 	customClass="urlPortalAlert"
							info
							btnSize="sm"
							show={url}
							// showCancel
							confirmBtnText="Cerrar"
							confirmBtnBsStyle="danger"
							// cancelBtnBsStyle="danger"
							title="Url Portal Cautivo"
							// onConfirm={() => this.openUrl('url')}
							onConfirm={() => this.closeUrl('url')}
						>
							<div style={{color: "#50b2c1", wordWrap:"break-word",border: "1px solid white", margin: "24px 73px", fontSize: "17px", padding:"20px"}}>{portalUrl}</div>
        				</SweetAlert>

					</div>
				</div>

				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes"
						data={this.state.datacampania}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
