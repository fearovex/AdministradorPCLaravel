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
			error: null,
        }
       
    }
    
    async componentDidMount(){
        // try {
        //     let res = await fetch(`${localStorage.urlDomain}api/evento`);
        //     let datagraph = await res.json()

        //     this.setState({
        //         form:{
        //             initialDate: initialDate,
        //             initialTime: initialTime,
        //             finalDate: finalDate,
        //             finalTime: finalTime,
        //             id_event: datagraph.id,
        //         }
        //     })

        //     this.ConsultaEventos()
        //     this.ConsultaGraficas()
            
        //  } catch (error) {
        //        this.setState({ 
        //           error
        //        })
        //  }
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
        const { events, form } = this.state;
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.dashboard" />} match={this.props.match} />
            
                <CardColumns>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.gender" /></CardTitle>
                                <p>
                                    Card 1
                                </p>
                            <CardText></CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle><IntlMessages id="graphics.ap" /></CardTitle>
                                <p>
                                    Card 2
                                </p>
                            <CardText></CardText>
                        </CardBody>
                    </Card>
                    
                </CardColumns>
            </div>
        );
	}
}
