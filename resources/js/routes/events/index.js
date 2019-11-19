import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import './styles.css'
import { Route, Link } from 'react-router-dom'

export default class Events extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            error: null
        }
        this.onSubmit=this.onSubmit.bind(this)
    }
     onSubmit() {
        // if(userFound){

            this.props.history.push('/app/detail-events/');
        // }
     }

     async componentDidMount(){
         try {
            let res = await fetch('http://administradorpclaravel.test/api/events')
            let data = await res.json()

            for (let i = 0; i < data.length; i++) {
                // data[i]["acciones"]=<a href={"http://administradorpclaravel.test/app/detail-events?id="+ data[i].id+"&tb="+data[i].campania }>Ver</a>
                data[i]["acciones"]=<Link to={"/app/detail-events?id="+ data[i].id+"&tb="+data[i].campania }>Ver</Link>
                delete data[i].id
                delete data[i].id_locacion
            }
            console.log(data)
            this.setState({
                data: data
            })
         } catch (error) {
            this.setState({
                error
            })
         }
        
     }

    render() {
        const columns = ['nombre','descripcion','fecha_inicio','fecha_fin','fecha_creacion','ano_evento','campania','acciones'];
        
    const options = {
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        print: false,
        download: false
    };
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>
                        Eventos
                    </title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>


                <PageTitleBar
                    title={<IntlMessages id="sidebar.events" />}
                    match={this.props.match}
                />
                <RctCollapsibleCard heading="Tabla de Eventos" fullBlock>
					<MUIDataTable
						title={"Eventos"}
						data={this.state.data}
						columns={columns}
                        options={options}
					/>
				</RctCollapsibleCard>
                
            </div>
        );
    }
}
