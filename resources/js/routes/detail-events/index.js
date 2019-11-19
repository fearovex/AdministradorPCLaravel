import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import FilterDateForm from './FilterDateForm';
import queryString from 'query-string'
import '../events/styles.css';


export default class DetailEvents extends Component {

	constructor(props){
		

		let tempDate = new Date();
		let initialDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate(); 
		// let initialDate = new Date(); 
		let initialTime = '00' +':'+ '00' +':'+'00';
		let tempDate2 = new Date();
		let finalDate = tempDate2.getFullYear() + '-' + (tempDate2.getMonth()+1) + '-' + tempDate2.getDate();
		let finalTime = ('0'+tempDate2.getHours()).slice(-2) +':'+ ('0'+tempDate2.getMinutes()).slice(-2) +':'+ ('0' + tempDate2.getSeconds()).slice(-2);
		super(props)
		const values = queryString.parse(this.props.location.search)
        this.state = {
			nameColumns: [],
			dataDetails: [],
			error: null,
			form: {
				initialDate: initialDate,
				initialTime: initialTime,
				finalDate: finalDate,
				finalTime: finalTime,
				tb: values.tb,
				id_event: values.id,
			}
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleDateFilter=this.handleDateFilter.bind(this)
	}

	async handleDateFilter(e){
        e.preventDefault()
        try {
            let config = {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
			}
			// console.log(this.state.form)
			let res = await fetch('http://administradorpclaravel.test/api/detailEvents', config)
            let dataDetails = await res.json()
            this.setState({
               dataDetails: dataDetails
            })
            
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    handleChange(e){
		
        this.setState({
			
            form:{
				...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

	
	async componentDidMount(){
		
		try {
			//Consulta Nombre Columnas  -> Se hace la consulta de los nombres de las columnas de la tabla correspondiente
			let onlyTableConfig = {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
			}

			let resNameColumns = await fetch('http://administradorpclaravel.test/api/nameColumnNames', onlyTableConfig)
            let dataNameColumns = await resNameColumns.json()
		   /// fin  Consulta Nombre Columnas

		   //Proceso DataTable -> Se gregan los nombres a un arreglo para luego pasarlos al data table
			let arrayNames=[]
			for (let i = 0; i < dataNameColumns.length; i++) {
				arrayNames.push.apply(arrayNames, Object.values(dataNameColumns[i]))
			}
			arrayNames = arrayNames.filter(names => names != 'id' && names != 'id_evento' && names != 'id_pais')
			 // fin Proceso DataTable

			 //Consulta Detalle -> Se consulta el detalle del evento de acuerdo a su tabla en la bd
            let config = {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
			}
			let res = await fetch('http://administradorpclaravel.test/api/detailEvents', config)
			let dataDetails = await res.json()
			
            this.setState({
				nameColumns: arrayNames,
            	dataDetails: dataDetails
			})
			//fin Consulta Detalle
            
        } catch (error) {
            this.setState({
                error
            })
        }
    }
	
	render() {
		const columns = this.state.nameColumns;
		//date

		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			downloadOptions: { 
				filename: 'DetallesEventoTabla.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			elevation: 0
		  };
	  
		return (
			<div className="data-table-wrapper">
				
				<PageTitleBar title={<IntlMessages id="sidebar.detailEvents" />} match={this.props.match} />
				
				<FilterDateForm
                        form={this.state.form}
                        onChange={this.handleChange}
						onSubmit={this.handleDateFilter}
                />
				<RctCollapsibleCard heading="Tabla de Datos" fullBlock>
					<MUIDataTable
						title={"Detalle Eventos"}
						data={this.state.dataDetails}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		)
	}
}

// if (document.getElementById("root")) {
//     ReactDOMServer.render(<DetailEvents />, document.getElementById("root"));
// }
