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

export default class TopTables extends Component {
   render() {
      const dataTopC = this.props.dataTopC
      const dataTopZ = this.props.dataTopZ
      const dataTopV = this.props.dataTopV
      const name = this.props.name
      return (
         <Card className="rct-block">
            
            {name == "Campañas" ?
            <CardBody className="pb-0 d-flex justify-content-between" style={{backgroundColor: '#31405699'}}>
               <h4 className="mb-5" >{name}</h4>
               <p className="fs-14 mb-0" >Total Registros <i className="ti-user text-success ml-1"></i></p>
            </CardBody>
            :name == "Zonas" ?
            <CardBody className="pb-0 d-flex justify-content-between" style={{backgroundColor: '#31405699'}}>
               <h4 className="mb-5" >{name}</h4>
               <p className="fs-14 mb-0" >Total Registros <i className="ti-user text-success ml-1"></i></p>
            </CardBody>
            :
             <CardBody className="pb-0 d-flex justify-content-between" style={{backgroundColor: '#31405699'}}>
               <h4 className="mb-5" >{name}</h4>
               <p className="fs-14 mb-0" >Personas <i className="ti-user text-success ml-1"></i></p>
            </CardBody>
            }
            
            {name == "Campañas" ?
            <List className="p-0">
               {dataTopC && dataTopC.map((data, key) => {
                  return(
                  <ListItem key={key} className="d-flex justify-content-between border-bottom py-5 fs-14 px-20" style={{backgroundColor: '#3e558412'}}>
                        <span key={data.nombreCampania}>{data.nombreCampania}</span>
                        <span style={{width: '120px', textAlign: 'center'}} key={data.totalRegistros}>{data.totalRegistros}</span>
                  </ListItem>
                  )
               })}
            
            </List>
            :name == "Zonas" ?
            <List className="p-0">
               {dataTopZ && dataTopZ.map((data, key) => {
                  return(
                  <ListItem key={key} className="d-flex justify-content-between border-bottom py-5 fs-14 px-20" style={{backgroundColor: '#3e558412'}}>
                        <span key={data.zona}>{data.zona}</span>
                        <span style={{width: '120px', textAlign: 'center'}} key={data.total}>{data.total}</span>
                  </ListItem>
                  )
               })}
            
            </List>
            :
            <List className="p-0">
               {dataTopV && dataTopV.map((data, key) => {
                  return(
                  <ListItem key={key} className="d-flex justify-content-between border-bottom py-5 fs-14 px-20" style={{backgroundColor: '#3e558412'}}>
                        <span style={{width: '42px', textAlign: 'center'}} key={data.visitas}>{data.visitas}</span>
                        <span style={{width: '74px', textAlign: 'center'}} key={data.registros}>{data.registros}</span>
                  </ListItem>
                  )
               })}
            </List>
            }
         </Card>
      );
   }
}
