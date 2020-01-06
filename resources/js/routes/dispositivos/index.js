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

import './styles.css'




export default class dispositivos extends Component {
	constructor(props){
		super(props)
		
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id:0,
			dispositivo:[],
			modaledit:false,
            form: {
				nombre_dispositivo: "",
				mac_dispositivo: "",
				tecnologia: "",
				zona_ap: "",							
		   },
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);
		
	}   
	async componentDidMount(){
		const id_location = localStorage.user_location
		const { location } = this.props

		try {
		   let res = await fetch(`${localStorage.urlDomain}api/zonas/${id_location}`)
		   let data = await res.json()

		   this.setState({
				data: data,
				form:{
					id_location: id_location
				}
		   })
		   
		} catch (error) {
		   this.setState({
			   error
		   })
		}
		try {
			let res = await fetch(`${localStorage.urlDomain}api/dispositivos/1`)
			let datadispositivos = await res.json()
			for (let i = 0; i < datadispositivos.length; i++) {
				datadispositivos[i]["acciones"]=<Link to={location.pathname} onClick={() => this.openAlertTest('modaledit',datadispositivos[i].id)}>Editar</Link>
			}
	
			this.setState({
				datadispositivos: datadispositivos
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

		   await fetch(`${localStorage.urlDomain}api/dispositivos`, config);
		//    this.props.history.push('app/dispositivos') 
		this.setState({
			prompt: false
		})

		this.componentDidMount();
			 
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

			await fetch(`${localStorage.urlDomain}api/dispositivos/`+this.state.form.id_dispositivo, config);
			this.setState({
				modaledit: false
			})
			
			this.componentDidMount();
			// this.setState({
			// 	state:this.state
			// })
			   

		   
		
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
	async openAlertTest(key,id) {
		this.setState({ [key]: true});
		console.log(id)
		let res = await fetch(`${localStorage.urlDomain}api/dispositivos/${id}/edit`);
		let dispositivo = await res.json();

		   this.setState({ form:{
			nombre_dispositivo: dispositivo.nombre_dispositivo,
			mac_dispositivo: dispositivo.mac_dispositivo,
			tecnologia: dispositivo.tecnologia,
			id_zona: dispositivo.id_zona,
			id_dispositivo: id,
		   } });
		 
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
			form:{
			   ...this.state.form,
			   [e.target.name] : e.target.value
			}
		})
	}
    render() {
		const {data} = this.state;
		const {datadispositivos} = this.state;
        const columns = ['nombre_dispositivo','mac_dispositivo','tecnologia','id_zona','acciones'];
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
                    title={<IntlMessages id="sidebar.dispositivos" />}
                    match={this.props.match}
                />
						
					<div className="blank-wrapper">
						
					<Button
							variant="contained"
							color="primary"
							className="boton"
							onClick={() => this.openAlert('prompt')}
						>Agregar Dispositivo
						</Button>
			
					<div className="sweet-alert-wrapper">				
					
				<SweetAlert

					btnSize="sm"
					show={prompt}
					showCancel
					confirmBtnText="Guardar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="Agregar Dispositivo"
					onConfirm={() => this.handleSubmit(event)}
					onCancel={() => this.onCancel('prompt')}
			>
			
			
             
					<form onSubmit={this.handleSubmit}>
					<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="nombre_dispositivo"
							id="nombre_dispositivo"
							className="has-input input-lg"
							placeholder="Nombre Dispositivo"
							onChange={() => this.handleChange(event)}

							   />

					
							   
						</div>
						<div className=" col-lg-5 mb-4 ml-3">
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
						<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="tecnologia"
							id="tecnologia"
							className="has-input input-lg"
							placeholder="Tecnologia"
							onChange={() => this.handleChange(event)}

							   />

					
							   
						</div>
						<div className=" col-lg-5 mb-4 ml-3">
						<Select name="id_zona" native onChange={() => this.handleChange(event)}
					 				className="has-input input-lg"
									 >
									<option value="">Seleccione una zona</option>
									{data && data.map((data) => (

									<option key={data.id} value={data.id}>{data.nombre}</option>
									))}
									
							</Select>
						</div>
						</div>
						
						</form>
			
            
    </SweetAlert>	

	<SweetAlert

					btnSize="sm"
					show={modaledit}
					showCancel
					confirmBtnText="editar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="editar Dispositivo"
					onConfirm={() => this.handleEdit(event)}
					onCancel={() => this.onCancel('modaledit')}
			>
			
			
             
					<form onSubmit={this.handleEdit}>
					<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="nombre_dispositivo"
							id="nombre_dispositivo"
							value={this.state.form.nombre_dispositivo}
							className="has-input input-lg"
							placeholder="Nombre Dispositivo"
							onChange={() => this.handleChangeEdit(event)}

							   />

					
							   
						</div>
						<div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="mac_dispositivo"
							id="mac_dispositivo"
							value={this.state.form.mac_dispositivo}
							className="has-input input-lg"
							placeholder="Mac Dispositivo"
							onChange={() => this.handleChangeEdit(event)}

							   />
						</div>
						</div>
						<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="tecnologia"
							id="tecnologia"
							value={this.state.form.tecnologia}
							className="has-input input-lg"
							placeholder="Tecnologia"
							onChange={() => this.handleChangeEdit(event)}

							   />

					
							   
						</div>
						<div className=" col-lg-5 mb-4 ml-3">
						<Select name="id_zona" native onChange={() => this.handleChangeEdit(event)}
									 className="has-input input-lg"
									 value={this.state.form.id_zona}
									 >
									<option value="">Seleccione una zona</option>
									{data && data.map((data) => (

									<option key={data.id} value={data.id}>{data.nombre}</option>
									))}
									
							</Select>
						</div>
						</div>
						
						</form>
			
            
    </SweetAlert>	
		</div>
		</div>
			
                
		<RctCollapsibleCard  fullBlock>
					<MUIDataTable
						title={"Dispositivos"}
						data={this.state.datadispositivos}
						columns={columns}
                        options={options}
					/>
				</RctCollapsibleCard>       
                          
                    </div>
		
        );
    }
}
