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




export default class zona extends Component {
	constructor(props){
        super(props)
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			id:0,
			prompt: false,
			modaledit:false,
			zona:[],
            form: {
				nombre: "",
								
		   },
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);
		
	}     
	async componentDidMount(){
		try {
		   let res = await fetch(`${localStorage.urlDomain}api/zonas/1`)
		   let data = await res.json();
		   
		   for (let i = 0; i < data.length; i++) {
			data[i]["acciones"]=<Link to={"/app/zonas?id="+data[i].id} onClick={() => this.openAlertTest('modaledit',data[i].id)}>Editar</Link>
		}

		   this.setState({
			   data: data,
			  
		   })

		 
		} catch (error) {
		   this.setState({
			   error
		   })
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

		   await fetch(`${localStorage.urlDomain}api/zonas`, config);
		//    this.props.history.push('zonas') 
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

			await fetch(`${localStorage.urlDomain}api/zonas/`+url.id, config);
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
		let res = await fetch(`${localStorage.urlDomain}api/zonas/${id}/edit`);
		let zona = await res.json();

		   this.setState({ form:{
			   nombre: zona.nombre
		   } });
		 
	}

	direccionar() {
		this.props.history.push("dispositivos");
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
        const columns = ['nombre','acciones'];
        const { basic, withDes, success, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle,modaledit } = this.state;
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
                    title={<IntlMessages id="sidebar.zonas" />}
                    match={this.props.match}
                />
					<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">				
					
						<Button
							variant="contained"
							color="primary"
							className="boton"
							onClick={() => this.openAlert('prompt')}
						>Crear Zona
						</Button>
						<Button
							variant="contained"
							color="primary"
							className="botones"
							onClick={() => this.direccionar()}
							>Agregar dispositivos
						</Button>
						
			
				<SweetAlert

					btnSize="sm"
					show={prompt}
					showCancel
					confirmBtnText="Guardar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="Crear Zona"
					onConfirm={() => this.handleSubmit(event)}
					onCancel={() => this.onCancel('prompt')}
			>
			
			
             
					<form onSubmit={this.handleSubmit}>
					<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="nombre"
							id="nombre"
							
							className="has-input input-lg"
							placeholder="Nombre"
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
					confirmBtnText="Editar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="Editar Zona"
					onConfirm={() => this.handleEdit(event)}
					onCancel={() => this.onCancel('modaledit')}
			>
             
					<form onSubmit={this.handleEdit}>
					<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="nombre"
							id="nombre"
							value={this.state.form.nombre}
							className="has-input input-lg"
							placeholder="Nombre"
							onChange={() => this.handleChangeEdit(event)}

							/>
							   
						</div>
						</div>
						
						</form>
			
            
    </SweetAlert>	
		</div>
		</div>
	
				
                
		<RctCollapsibleCard  fullBlock >
			
					<MUIDataTable
						title={"Zonas"}
						data={this.state.data}
						columns={columns}
                        options={options}
					/>
				</RctCollapsibleCard>       
                          
                    </div>
                
                
		
        	
        );
    }
}
