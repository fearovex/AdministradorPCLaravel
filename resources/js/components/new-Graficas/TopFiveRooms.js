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

export default class TopFiveRooms extends Component {
   render() {
      const { listData }= this.props
      const name = this.props.name
      return (
         <Card className="rct-block">
            
            <CardBody className="pb-0 d-flex justify-content-between" style={{backgroundColor: '#31405699'}}>
               <h4 className="mb-5" >{name}</h4>
               <p className="fs-14 mb-0" >Total Usos <i className="ti-user text-success ml-1"></i></p>
            </CardBody>
            {listData && listData[0].habitacion === 'No posee habitaciones'?
               <List className="p-0">
                  {listData && listData.map((data, key) => {
                     return(
                        <ListItem key={key} className="d-flex justify-content-between border-bottom py-5 fs-14 px-20" style={{backgroundColor: '#3e558412'}}>
                              <span key={data.habitacion}>{data.habitacion}</span>
                              <span style={{width: '120px', textAlign: 'center'}} key={data.usos}></span>
                        </ListItem>
                        )
               
                  })}
               </List>
            :
               <List className="p-0">
                  {listData && listData.map((data, key) => {
                     return(
                        <ListItem key={key} className="d-flex justify-content-between border-bottom py-5 fs-14 px-20" style={{backgroundColor: '#3e558412'}}>
                              <span style={{width: '69px', textAlign: 'center'}} key={data.habitacion}>{data.habitacion}</span>
                              <span style={{width: '120px', textAlign: 'center'}} key={data.usos}>{data.usos}</span>
                        </ListItem>
                        )
               
                  })}
               </List>
            }
         </Card>
      );
   }
}
