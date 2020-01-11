import React, { Component } from "react";
import { Helmet } from "react-helmet";
import SweetAlert from 'react-bootstrap-sweetalert'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import './styles.css'
import { Route, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

function getSteps() {
	return [<h3>DATOS GENERALES</h3>,<h3>DISPOSITIVOS</h3>];
}

export default class locacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			prompt: false,
            form: {
				nombre: "",
				direccion: "",
				pais: "",
				ciudad: "",
				telefono: "",
				PaginaWeb: "",	
				dispositivo:"",
				mac_dispositivo:"",
				tecnologia:"",
		   },
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getStepContent = this.getStepContent.bind(this);
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
			let res = await fetch(`${localStorage.urlDomain}api/locations`, config);
			let data = await res.json()
			this.props.history.push('/app/campaña')
			// console.log(this.state.form);
			//   if(data.email && data.email != null){
			// 		this.setState({
			// 		   data:data
			// 		})
			// 	 this.props.signinUserInFirebase(this.state, this.props.history);
			// 	 NotificationManager.success('User Logged In Succesfully','',4000);
			// 	 }
			//   else{
			// 	 NotificationManager.error("The password is invalid or the user doesn't have a password.",'',4000);
			//   }
			  
		   } catch (error) {
			  console.log(error);
			//   this.setState({
			// 	 error
			//   });
		   }		
	 }
	
	 getStepContent(step) {
		switch (step) {
		   case 0:
			  return (
				 <div>
				 <form onSubmit={this.handleSubmit}>
					<div className="row">			
						 <div className="col-lg-6">
							<Input
							type="text"
							name="nombre"
							id="nombre"
							className="has-input input-lg"
							placeholder="Nombre"
							onChange={() => this.handleChange(event)}						                 
							   />
						</div>
					<div className="col-lg-6">
							<Input
							type="text"
							name="direccion"
							id="direccion"
							className="has-input input-lg"
							placeholder="Direccion"
							onChange={() => this.handleChange(event)}                  
							   />
					</div>
				</div>
				<div className="row">			
						 <div className="col-lg-6">
							<Input
							type="text"
							name="pais"
							id="pais"
							className="has-input input-lg"
							placeholder="Pais"
							onChange={() => this.handleChange(event)}                  
							   />
						</div>
					<div className="col-lg-6">
							<Input
							type="text"
							name="ciudad"
							id="ciudad"
							className="has-input input-lg"
							placeholder="Ciudad" 
							onChange={() => this.handleChange(event)}                 
							   />
					</div>
				</div>
				<div className="row">			
						 <div className="col-lg-6">
							<Input
							type="number"
							name="telefono"
							id="telefono"
							className="has-input input-lg"
							placeholder="Telefono"
							onChange={() => this.handleChange(event)}                  
							   />
						</div>
					<div className="col-lg-6">
							<Input
							type="text"
							name="PaginaWeb"
							id="PaginaWeb"
							className="has-input input-lg"
							placeholder="Pagina Web" 
							onChange={() => this.handleChange(event)}                 
							   />
					</div>
				</div>				   
				 </form>
				 </div>
			  );	  
		   case 1:
			return (
				<div>
				<form>
				   <div className="row">			
				   <div className="col-lg-6">
						   <Input
						   type="text"
						   name="dispositivo"
						   id="dispositivo"
						   className="has-input input-lg"
						   placeholder="Nombre Dispositivo"
						   onChange={() => this.handleChange(event)}                  
							  />
				   </div>
				   <div className="col-lg-6">
						   <Input
						   type="text"
						   name="mac_dispositivo"
						   id="mac_dispositivo"
						   className="has-input input-lg"
						   placeholder="Mac Dispositivo"  
						   onChange={() => this.handleChange(event)}                
							  />
				   </div>				   
			   </div>
			   <div className="col-lg-6">
						
					 <Select name="tecnologia" native onChange={() => this.handleChange(event)}
					 	className="has-input input-lg"
					 >
						<option value="">Seleccione una tecnologia</option>
						<option value="Ruckus">Ruckus</option>
									
					</Select>
				   </div>	
			   </form>
			   </div>
			   );
		   default:
			  return 'Unknown step';
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
	
	handleNext = () => {
		this.setState({
		   activeStep: this.state.activeStep + 1,
		});
	 };
  
	 handleBack = () => {
		this.setState({
		   activeStep: this.state.activeStep - 1,
		});
	 };
  
	 handleReset = () => {
		this.setState({
		   activeStep: 0,
		});
	 };

	 handleChange(e) {
		this.state.form[e.target.name] = e.target.value;
	 }
	 


     render() {
        const steps = getSteps();
		const { activeStep } = this.state;
		const { basic, withDes, success, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle } = this.state;
		return (
			<div className="sweet-alert-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.locacion" />} match={this.props.match} />
				<div className="row">
					<RctCollapsibleCard
						customClasses="p-20 text-center"
						colClasses="col-sm-6 col-lg-12 col-xl-3"
					>
						<h5 className="col-lg-12">Crear locacion</h5>
						<Button
							variant="contained"
							color="primary"
							className="text-white"
							onClick={() => this.openAlert('prompt')}
						>
							Crear locacion
						</Button>
					</RctCollapsibleCard>
				</div>		
				<SweetAlert
                
					btnSize="sm"
					show={prompt}
					title={<IntlMessages id='alert.timeOutTitle' />}
					confirmBtnText={'cancelar'}
					confirmBtnBsStyle="danger"
					onConfirm={() =>  this.onCancel('prompt')}
				>
			 <div>
            		<Stepper activeStep={activeStep} orientation="vertical">
               			{steps.map((label, index) => {
                  			return (
                     			<Step key={label}>
                        			<StepLabel>{label}</StepLabel>
                        <StepContent>
							
                           <span>{this.getStepContent(index)}</span><br/>
                           <div>
                              <Button variant="contained" className="btn-danger text-white mr-10 mb-10" disabled={activeStep === 0} onClick={this.handleBack}>
                                 Atras
                    		</Button>
                              <Button variant="contained" color="primary" className="text-white mr-10 mb-10" onClick={activeStep === steps.length - 1 ? this.handleSubmit : this.handleNext}>
                                 {activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
                              </Button>
                           </div>
                        </StepContent>
                     </Step>
                  );
               })}
            </Stepper>
            {activeStep === steps.length && (
               <Paper square elevation={0} className="pl-40">
                  <p>All steps completed - you&quot;re finished</p>
                  <Button variant="contained" className="btn-success text-white mr-10 mb-10" onClick={this.handleReset}>
                     Reset
            		</Button>
               </Paper>
            )}
         </div>
            
    </SweetAlert>	
		</div>
		);
	}
}
