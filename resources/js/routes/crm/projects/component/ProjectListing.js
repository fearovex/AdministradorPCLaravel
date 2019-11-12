/**
 * Project Listing layout
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import ReactTable from 'react-table';
import { Badge } from 'reactstrap';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// helpers
import { getAppLayout } from "Helpers/helpers";

class ProjectListing extends Component {

   state = {
      selected: null,
      detail: null
   }
   // get file id
   getFile(Id) {
      this.setState({
         detail: Id
      });
   }

   render() {
      const { data } = this.props;
      const { detail } = this.state;
      if (detail !== null) {
         return <Redirect to={`/${getAppLayout(location)}/crm/Project-detail/${detail}`} />
      }
      const columns = [
         {
            maxWidth: 75,
            Header: 'id',
            accessor: 'id'
         },
         {
            maxWidth: 220,
            Header: 'projectName',
            accessor: 'title',
         },
         {
            Header: 'budget',
            accessor: 'budget',
         },
         {
            Header: 'duration',
            accessor: 'duration',
         },
         {
            Header: 'client',
            accessor: 'client',
         },
         {
            Header: 'team',
            accessor: 'team_image',
            Cell: props => <Fragment>
               {props.value.map((image, index) => {
                  return (
                     <img
                        key={index}
                        src={require(`Assets/avatars/${image}`)}
                        alt="team"
                        className="rounded-circle"
                        width="20"
                        height="20"
                     />
                  )
               })}
            </Fragment>
         },
         {
            Header: 'status',
            accessor: 'status',
            Cell: props => <Fragment>
               {props.value === true ?
                  <Badge color="primary">Active</Badge>
                  :
                  <Badge color="danger">InActive</Badge>
               }
            </Fragment>
         },
         {
            Header: 'deadline',
            accessor: 'deadline',
         }
      ]
      return (
         <RctCard>
            <RctCardContent>
               <ReactTable
                  data={data}
                  columns={columns}
                  minRows={10}
                  getTrProps={(state, rowInfo) => {
                     if (rowInfo.row) {
                        return {
                           onClick: (e) => {
                              this.setState({
                                 selected: rowInfo.index
                              });
                              this.getFile(rowInfo.original.id);
                           },
                        }
                     }
                  }
                  }
               />
            </RctCardContent>
         </RctCard>
      );
   }
}
export default ProjectListing;