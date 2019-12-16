import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import { RctCard, RctCardContent } from 'Components/RctCard';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardColumns,
    CardSubtitle,
    CardBody,
    CardImgOverlay
 } from 'reactstrap';


export default class Locations extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataLocations: [],
			error: null,
        }
       
    }
    
    async componentDidMount(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/locations`)
            let dataLocations = await res.json();
            this.setState({
                dataLocations: dataLocations
            })
        } catch (error) {
            this.state = {
                error: error
            }
        }
     
    }

    handleChange(e){
        // this.setState({
        //     form:{
		// 		...this.state.form,
        //         [e.target.name]: e.target.value
        //     }
        // })
    }

    render() {
        const { dataLocations } = this.state;
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.locations" />} match={this.props.match} />
                <div className="row">
                {dataLocations && dataLocations.map((data) => (
                    <div key={data.id} className="col-md-4 col-lg-4 col-xs-2 col-sm-6 mb-3">
                        <Card >
                        <CardImg top width="100%" src="http://www.gsfdcy.com/data/img/42/1605654-hotel-wallpaper.jpg" alt="Card image cap" />
                            <CardBody>
                            {/* <IntlMessages id="" /> */}
                            
                            <CardTitle>{data.nombre}</CardTitle>
                                <CardText>
                                    {data.descripcion}  
                                </CardText>
                                
                            </CardBody>
                        </Card>
                    </div>
                    ))}
                </div>
            </div>
        );
	}
}
