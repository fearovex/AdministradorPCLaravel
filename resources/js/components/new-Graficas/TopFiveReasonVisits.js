/**
 * Followers Widget
 */
import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class TopFiveReasonVisits extends Component {
   render() {
      const { listData }= this.props
      const name = this.props.name
      return (
         <Card className="rct-block">
            
            <CardBody className="pb-0 d-flex justify-content-between" style={{backgroundColor: '#31405699'}}>
               <h4 className="mb-5" >{name}</h4>
               <p className="fs-14 mb-0" >Total Registros <i className="ti-user text-success ml-1"></i></p>
            </CardBody>
            <List className="p-0">
               {listData && listData.map((data, key) => {
                  return(
                  <ListItem key={key} className="d-flex justify-content-between border-bottom py-5 fs-14 px-20" style={{backgroundColor: '#3e558412'}}>
                        <span key={data.razon}>{data.razon}</span>
                        <span style={{width: '120px', textAlign: 'center'}} key={data.registros}>{data.registros}</span>
                  </ListItem>
                  )
               })}
            </List>
         </Card>
      );
   }
}
