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
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id:0,
			campania:[],
			modaledit: false,
            form: {
				nombre_campaña: "",
				fecha_inicio: "",
				fecha_fin: "",
				descripcion: "",
				zona_ap: "",
				anio: "",								
		   },
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);
		
	}   
	async componentDidMount(){
		try {
		   let res = await fetch(`${localStorage.urlDomain}api/zonas/11`)
		   let data = await res.json()

		  

		   this.setState({
			   data: data
		   })
		   
		} catch (error) {
		   this.setState({
			   error
		   })
		}
		try {
			        let res = await fetch(`${localStorage.urlDomain}api/campanias/11`)
					let datacampania = await res.json()
					for (let i = 0; i < datacampania.length; i++) {
						datacampania[i]["acciones"]=<Link to={"/app/campaña?id="+datacampania[i].id} onClick={() => this.openAlertTest('modaledit',datacampania[i].id)}>Editar</Link>
					}
			
					
			
			        this.setState({
			            datacampania: datacampania
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

		   	await fetch(`${localStorage.urlDomain}api/campanias`, config);
			// this.props.history.push('campaña') 
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
			var url = queryString.parse(this.props.location.search);
			let config = {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/campanias/`+url.id, config);
			
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
		let res = await fetch(`${localStorage.urlDomain}api/campanias/${id}/edit`);
		let campania = await res.json();
		console.log(campania)
		   this.setState({ form:{
			nombre_campaña: campania.nombre,
			fecha_inicio: campania.fecha_inicio,
			fecha_fin: campania.fecha_fin,
			descripcion: campania.descripcion,
			zona_ap: campania.zona_ap,
			anio: campania.ano_evento,
			
			   
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
		const {datacampania} = this.state;
        const columns = ['nombre','descripcion','fecha_inicio','fecha_fin','acciones'];
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
                    title={<IntlMessages id="sidebar.campaña" />}
                    match={this.props.match}
                />
					<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">				
					
						<Button
							variant="contained"
							color="primary"
							className="boton"
							onClick={() => this.openAlert('prompt')}
						>Crear campaña
						</Button>
			
				<SweetAlert

					btnSize="sm"
					show={prompt}
					showCancel
					confirmBtnText="Guardar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="Agregar campaña"
					onConfirm={() => this.handleSubmit(event)}
					onCancel={() => this.onCancel('prompt')}
			>
			
			
             
					<form onSubmit={this.handleSubmit}>
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
								<Select name="zona_ap" native onChange={() => this.handleChange(event)}
									 className="has-input input-lg"
									 >
									<option value="">Seleccione una zona</option>
									{data && data.map((data) => (

									<option key={data.id} value={data.id}>{data.nombre}</option>
									))}
									
							</Select>
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
									name="descripcion"
									id="descripcion"									
									className="has-input input-lg"
									placeholder="Descripciòn"	
									onChange={() => this.handleChange(event)}						                 
										/>
				   				</div>			
							<div className="col-lg-6">
							<Input
									type="text"
									name="anio"
									id="anio"									
									className="has-input input-lg"
									placeholder="Año"	
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
					confirmBtnText="editar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="editar campaña"
					onConfirm={() => this.handleEdit(event)}
					onCancel={() => this.onCancel('modaledit')}
			>
			
			
             
					<form onSubmit={this.handleEdit}>
					<div className="row">			
								<div className="col-lg-5 mb-4 ml-3" >
									<Input
									type="text"
									name="nombre_campaña"
									id="nombre_campaña"	
									value={this.state.form.nombre_campaña}							
									className="has-input input-lg"
									placeholder="Nombre campaña"	
									onChange={() => this.handleChangeEdit(event)}						                 
										/>
				   				</div>			
							<div className="col-lg-6">
								<Select name="zona_ap" native onChange={() => this.handleChangeEdit(event)}
					 				className="has-input input-lg"
									value={this.state.form.zona_ap}
								>
									<option value="">Seleccione una zona</option>
									{data && data.map((data) => (

									<option key={data.id} value={data.id}>{data.nombre}</option>
									))}
									
							</Select>
				   				</div>
							</div>		   	
							<div className="row">			
								<div className="col-lg-5 mb-4 ml-3" >
									<Input
									type="date"
									name="fecha_inicio"
									id="fecha_inicio"	
									value={moment(this.state.form.fecha_inicio).format('YYYY-MM-DD')}									
									className="has-input input-lg"
									placeholder="Fecha Inicial"	
									onChange={() => this.handleChangeEdit(event)}						                 
										/>
				   				</div>			
							<div className="col-lg-6">
							<Input
									type="date"
									name="fecha_fin"
									id="fecha_fin"
									value={moment(this.state.form.fecha_fin).format('YYYY-MM-DD')}								
									className="has-input input-lg"
									placeholder="Fecha Final"	
									onChange={() => this.handleChangeEdit(event)}						                 
										/>
				   				</div>
							</div>		  
							<div className="row">			
								<div className="col-lg-5 mb-4 ml-3" >
									
										<Input
									type="text"
									name="descripcion"
									id="descripcion"		
									value={this.state.form.descripcion}								
									className="has-input input-lg"
									placeholder="Descripciòn"	
									onChange={() => this.handleChangeEdit(event)}						                 
										/>
				   				</div>			
							<div className="col-lg-6">
							<Input
									type="text"
									name="anio"
									id="anio"	
									value={this.state.form.anio}									
									className="has-input input-lg"
									placeholder="Año"	
									onChange={() => this.handleChangeEdit(event)}						                 
										/>
				   				</div>
							</div>	
								  		
						   
		   			</form>
            
    </SweetAlert>	
		</div>
		</div>
			
                
		<RctCollapsibleCard  fullBlock>
					<MUIDataTable
						title={"Campañas"}
						data={this.state.datacampania}
						columns={columns}
                        options={options}
					/>
				</RctCollapsibleCard>       
                          
                    </div>
		
        );
    }
}
