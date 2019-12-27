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




export default class campañas extends Component {
	constructor(props){
		super(props)
		
		if(!this.props.location.state){
			this.props.history.push('/');
		}else{
			const { id_location } = this.props.location.state
			this.id_location = id_location
		}
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id:0,
			campania:[],
			modaledit: false,
            form: {
				campaña: "",
				fecha_inicio: "",
				fecha_fin: "",
				numerovouchers: "",
											
		   },
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
		
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

			this.setState({
				prompt: false
			})

			window.location.reload();

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
		const {data} = this.state;
		const {datacampania} = this.state;
        const columns = ['campaña','Voucher','fecha_inicio','fecha_fin'];
        const { basic, withDes, success, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle, modaledit} = this.state;
		const options = {
			filterType: 'dropdown',
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
                    title={<IntlMessages id="Crear voucher" />}
                    match={this.props.match}
                />
					<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">				
					
						<Button
							variant="contained"
							color="primary"
							className="boton"
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
									<Input
									type="text"
									name="campaña"
									id="campaña"									
									className="has-input input-lg"
									placeholder="campaña"	
									onChange={() => this.handleChange(event)}						                 
										/>
				   				</div>
								   <div className="col-lg-5 mb-4 ml-3" >
									
										<Input
									type="number"
									name="numeroVouchers"
									id="numeroVouchers"									
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
							
								  		
						   
		   			</form>
            
    </SweetAlert>	

		
		</div>
		</div>
			
                
		<RctCollapsibleCard  fullBlock>
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
