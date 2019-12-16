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

import './styles.css'




export default class campaña extends Component {
	constructor(props){
        super(props)
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			prompt: false,
            form: {
				nombre_campaña: "",
				fecha_inicio: "",
				fecha_final: "",
				tecnologia: "",
				zona_ap: "",				
		   },
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		
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
		   console.log(this.state.form);
		   //   
			 
		  } catch (error) {
			 console.log(error);
		   //   this.setState({
		   // 	 error
		   //   });
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

    render() {
        const columns = ['nombre','fecha_inicio','fecha_final','tecnologia','zona_ap','acciones'];
        const { basic, withDes, success, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle } = this.state;
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
                    title={<IntlMessages id="sidebar.campaña" />}
                    match={this.props.match}
                />
				
						
			
					<div className="blank-wrapper">
					<RctCollapsibleCard fullBlock>
						<form>							
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
								<Select name="zona" native onChange={() => this.handleChange(event)}
					 				className="has-input input-lg"
					 			>
									<option value="">Seleccione una zona</option>
									<option value="Ruckus">Zona A</option>
									
							</Select>
				   				</div>
							</div>		   	
							<div className="row">			
								<div className="col-lg-5 mb-4 ml-3" >
									<Input
									type="text"
									name="fecha_inicial"
									id="fecha_inicial"									
									className="has-input input-lg"
									placeholder="Fecha Inicial"	
									onChange={() => this.handleChange(event)}						                 
										/>
				   				</div>			
							<div className="col-lg-6">
							<Input
									type="text"
									name="fecha_final"
									id="fecha_final"									
									className="has-input input-lg"
									placeholder="Fecha Final"	
									onChange={() => this.handleChange(event)}						                 
										/>
				   				</div>
							</div>		  		
						   
		   			</form>
					   
					   </RctCollapsibleCard>
		  		 </div>
				   </div>
        	
        );
    }
}
