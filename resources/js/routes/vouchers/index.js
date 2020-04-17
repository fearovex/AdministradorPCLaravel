import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Link } from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FullScreenLoader from 'Components/FullScreenLoader';

import './styles.css'

export default class Vouchers extends Component {
	constructor(props) {
		super(props)
		const id_location = localStorage.user_location
		this.state = {
			error: null,
			nameColumns: ['Campaña','Fecha Inicio', 'Fecha Fin', '# Vouchers', 'Ver Vouchers'],
			dataVouchers: [],
			form:{
				id_locacion: id_location
			},
			modalEmailCsv: false,
			spinnerState: false
		}
		this.clickNavLink= this.clickNavLink.bind(this)
	}

	clickNavLink(id_location, id_campaing, name_campaing,fecha_inicio,fecha_fin){
		localStorage.setItem('user_location', id_location);
		localStorage.setItem('user_campaing', id_campaing);
		localStorage.setItem('user_name_campaing', name_campaing);
		localStorage.setItem('user_initialDate_campaing', fecha_inicio);
		localStorage.setItem('user_finalDate_campaing', fecha_fin);
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
			let res = await fetch(`${localStorage.urlDomain}api/vouchers`, config);
			let datavouchers = await res.json()
		
			for (let i = 0; i < datavouchers.length; i++) {
                datavouchers[i]["Ver Vouchers"]=
				<Link 
					to={this.props.history.location.pathname+"/voucher-info"} 
					onClick = {() => this.clickNavLink(
						this.state.form.id_locacion, 
						datavouchers[i].id, 
						datavouchers[i]['Campaña'],
						datavouchers[i]['Fecha Inicio'], 
						datavouchers[i]['Fecha Fin']
					)} 
				>
					<ListItemIcon className="menu-icon">
						<i className='ti-eye' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
                // delete datavouchers[i].id
                // delete datavouchers[i].id_locacion
            }

			this.setState({ 
				dataVouchers: datavouchers,
				spinnerState: false
			});

		} catch (error) {
			console.log(error)
		}
	}
	
	render() {
		const { spinnerState } = this.state;
		const columns = this.state.nameColumns;
		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			selectableRows: false,
			download: false,
			elevation: 0
		};
		return (
			<div className="blank-wrapper">
				{ spinnerState ? 
					<FullScreenLoader />
					:
					<div>

					</div>
				}
				<Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet>

				<PageTitleBar
					title={<IntlMessages id="vouchers" />}
					match={this.props.match}
					history={this.props.history}
				/>
				
				<RctCollapsibleCard fullBlock>

					<MUIDataTable
						// title={"Lista Vouchers"}
						data={this.state.dataVouchers}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
