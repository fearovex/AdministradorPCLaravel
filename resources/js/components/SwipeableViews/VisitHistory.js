import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import { RctCardContent } from 'Components/RctCard';

export default class VisitHistory extends Component {
    constructor(props){
        super(props)

        this.state = {
            history: [],
            key: '',
            value: '',
        }
    }

    componentDidMount(){
        const { rowData , columns } = this.props;
        let objectDataUser = {}
        columns.forEach((column, i) => objectDataUser[column] = rowData[i]);
    }

    render() {
        return (
            <RctCardContent>
                <div className="ongoing-projects-wrap paddingInfo">
                    <List className="project-list list-unstyled p-0 ">
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                            <span className="mr-3 d-flex fw-semi-bold ">
                                <i className="material-icons mr-10 ">signal_cellular_4_bar</i>
                                Ip Cliente :
                            </span>
                            <span className=" text-truncate">
                                {}
                            </span>
                        </ListItem>
                    </List>
                </div>
            </RctCardContent>
        );
    }
}