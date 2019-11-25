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

// url for backend
import urlDomain from 'Util/urlDomain';

export default class Events extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            error: null,
            form: {},
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
            let form = {
                initialDate: 0
            }

            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(form)
            }

            let res = await fetch(`${urlDomain}api/events`, config)
            let data = await res.json()

            for (let i = 0; i < data.length; i++) {
                data[i]["acciones"]=<Link to={"/app/detail-events?id="+ data[i].id+"&tb="+data[i].campania }>Ver</Link>
                delete data[i].id
                delete data[i].id_locacion
            }

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
