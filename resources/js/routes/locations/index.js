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
            data: [],
			error: null,
        }
       
    }
    
    async componentDidMount(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/locations`)
            let dataLocations = await res.json();
            console.log(dataLocations); 
            this.setState({
                data: dataLocations
            })
            console.log(this.state.data)
        } catch (error) {
            
        }
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
        const { data } = this.state;
        return (
            <div className="cardsmasonry-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.locations" />} match={this.props.match} />
            
                <CardColumns>
                    <Card>
                        <CardBody>
                        {/* <IntlMessages id="" /> */}
                        <CardTitle></CardTitle>
                            <CardText>
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Card 4</CardTitle>
                            <CardText>
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Card 2</CardTitle>
                              
                            <CardText>
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                                wqewqewqewqew
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Card 5</CardTitle>
                              
                            <CardText>
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Card 3</CardTitle>
                              
                            <CardText>
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                                    wqewqewqewqew
                            </CardText>
                        </CardBody>
                    </Card>
                </CardColumns>

            
            </div>
        );
	}
}
