import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import { RctCardContent } from 'Components/RctCard';

export default class VisitHistory extends Component {    
    render() {
        const { visitHistory } = this.props;

        return (
            <RctCardContent>
                <div className="ongoing-projects-wrap paddingInfo" style={{maxHeight: '306.5px', overflow: 'auto'}}>
                    <List className="project-list list-unstyled p-0 ">
                        {visitHistory &&
                            visitHistory.map((visit, index) => (
                            <ListItem className="p-0 d-flex justify-content-start align-content-center" key={index}>
                                <span className="mr-3 d-flex fw-semi-bold ">
                                    <i className="material-icons mr-10 ">today</i>
                                    {visit.Fecha_Registro}
                                </span>
                                <span className=" text-truncate">
                                    {}
                                </span>
                            </ListItem>
                            ))
                        }
                    </List>
                </div>
            </RctCardContent>
        );
    }
}