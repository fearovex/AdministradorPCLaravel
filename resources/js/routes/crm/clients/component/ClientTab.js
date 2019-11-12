/**
 * Clients tab section
 */
/* eslint-disable */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UpdateClient from './UpdateClient';
import ConfirmationDialog from './ConfirmationDialog';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

//Actions
import { deleteClient } from "Actions";

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

class ClientTab extends Component {

   constructor(props) {
      super(props);
      this.confirmationDialog = React.createRef();
   }
   state = {
      value: 0,
      favClients: [],
      recentClients: null,
      data:null,
      isUpdated:false
   };

   componentDidMount() {
      this.getFavClient();
      this.getRecentClient();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.clientsData.length !== this.props.clientsData.length) {
         this.getFavClient();
         this.getRecentClient();
      }
   }

   // get favourite client data
   getFavClient() {
      let newArray = [];
      let data = this.props.clientsData;
      if (data !== null) {
         for (let Item of data) {
            if (Item.type === 'favourite') {
               newArray.push(Item)
            }
         }
         this.setState({
            favClients: newArray,
            isUpdated:false
         })
      }
   }

   // get recent client data
   getRecentClient() {
      let newArray = [];
      let data = this.props.clientsData;
      if (data !== null) {
         for (let Item of data) {
            if (Item.type === 'recently_added') {
               newArray.push(Item)
            }
         }
         this.setState({
            recentClients: newArray,
            isUpdated:false
         })
      }
   }

   handleChange = (event, value) => {
      this.setState({ value });
   };

   ondeleteClient(data) {
      this.data = data;
      this.confirmationDialog.current.openDialog();
   }

   deleteClientPermanent(popupResponse) {
      if (popupResponse) {
         this.props.deleteClient(this.data);
         this.data = ""
      }
   }

   handleClickEdit(data) {
      this.setState({
         data:data,
         isUpdated:true
      })
   }

   onCloseDialog = (popupResponse) => {
      this.setState({
         data:null,
         isUpdated:false
      })
   }

   render() {
      const { theme, clientsData } = this.props;
      const { recentClients, favClients, isUpdated, data } = this.state;
      return (
         <div className="client-tab-wrap p-15 Tab-wrap">
            { (isUpdated && data) &&
               <UpdateClient data={data} onCloseDialog={this.onCloseDialog} />
            }
            <AppBar position="static" color="default">
               <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
               >
                  <Tab label="All Client" />
                  <Tab label="Favourite" />
                  <Tab label="Recently Added" />
               </Tabs>
            </AppBar>
            <div>
               <SwipeableViews
                  //animateHeight
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={this.state.value}>
                  <div className="card mb-0 transaction-box">
                     <TabContainer dir={theme.direction}>
                        <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                           <div className="row">
                              {clientsData && clientsData.map((data, index) => {
                                 return (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                       <RctCard>
                                          <RctCardContent>
                                             <div className="client-post text-center">
                                                <div className="client-thumb mb-20">
                                                   <img
                                                      className="rounded"
                                                      src={require(`Assets/avatars/${data.image}`)}
                                                      alt="client"
                                                      width="95"
                                                      height="95"
                                                   />
                                                </div>
                                                <div className="client-content">
                                                   <h4 className="fw-bold text-capitalize text-primary">{data.name}</h4>
                                                   <span className="d-block">
                                                      <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">{data.e_mail}</a>
                                                   </span>
                                                   <span className="d-block">
                                                      <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">{data.phone_number}</a>
                                                   </span>
                                                   <span className="d-block text-dark text-capitalize">{data.country}</span>
                                                </div>
                                                <div className="client-action d-flex">
                                                   <Button className="rounded-circle mr-5" onClick={() => this.handleClickEdit(data)}>
                                                         <i className="material-icons">edit</i>
                                                   </Button>
                                                   <Button
                                                      className="rounded-circle"
                                                      onClick={() => this.ondeleteClient(data)}
                                                   >
                                                      <i className="material-icons">delete</i>
                                                   </Button>
                                                </div>
                                             </div>
                                          </RctCardContent>
                                       </RctCard>
                                    </div>
                                 )
                              })}
                           </div>
                        </div>
                     </TabContainer>
                  </div>
                  <div className="card mb-0 transaction-box">
                     <TabContainer dir={theme.direction}>
                        <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                           <div className="row">
                              {favClients && favClients.map((data, index) => {
                                 return (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                       <RctCard>
                                          <RctCardContent>
                                             <div className="client-post text-center">
                                                <div className="client-thumb mb-20">
                                                   <img
                                                      className="rounded"
                                                      src={require(`Assets/avatars/${data.image}`)}
                                                      alt="client"
                                                      width="95"
                                                      height="95"
                                                   />
                                                </div>
                                                <div className="client-content">
                                                   <h4 className="fw-bold text-capitalize text-primary">{data.name}</h4>
                                                   <span className="d-block">
                                                      <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">{data.e_mail}</a>
                                                   </span>
                                                   <span className="d-block">
                                                      <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">{data.phone_number}</a>
                                                   </span>
                                                   <span className="d-block text-dark text-capitalize">{data.country}</span>
                                                </div>
                                                <div className="client-action d-flex">
                                                   <Button className="rounded-circle mr-5" onClick={() => this.handleClickEdit(data)}>
                                                         <i className="material-icons">edit</i>
                                                   </Button>
                                                   <Button
                                                      className="rounded-circle"
                                                      onClick={() => this.ondeleteClient(data)}
                                                   >
                                                      <i className="material-icons">delete</i>
                                                   </Button>
                                                </div>
                                             </div>
                                          </RctCardContent>
                                       </RctCard>
                                    </div>
                                 )
                              })}
                           </div>
                        </div>
                     </TabContainer>
                  </div>
                  <div className="card mb-0 transaction-box">
                     <TabContainer dir={theme.direction}>
                        <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                           <div className="row">
                              {recentClients && recentClients.map((data, index) => {
                                 return (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-3">
                                       <RctCard>
                                          <RctCardContent>
                                             <div className="client-post text-center">
                                                <div className="client-thumb mb-20">
                                                   <img
                                                      className="rounded"
                                                      src={require(`Assets/avatars/${data.image}`)}
                                                      alt="client"
                                                      width="95"
                                                      height="95"
                                                   />
                                                </div>
                                                <div className="client-content">
                                                   <h4 className="fw-bold text-capitalize text-primary">{data.name}</h4>
                                                   <span className="d-block">
                                                      <a href="#" mailto="JerryBRied@jourrapide.com" className="text-dark text-capitalize">{data.e_mail}</a>
                                                   </span>
                                                   <span className="d-block">
                                                      <a href="#" tel="+1 207-589-4752" className="text-dark text-capitalize">{data.phone_number}</a>
                                                   </span>
                                                   <span className="d-block text-dark text-capitalize">{data.country}</span>
                                                </div>
                                                <div className="client-action d-flex">
                                                   <Button className="rounded-circle mr-5" onClick={() => this.handleClickEdit(data)}>
                                                         <i className="material-icons">edit</i>
                                                   </Button>
                                                   <Button
                                                      className="rounded-circle"
                                                      onClick={() => this.ondeleteClient(data)}
                                                   >
                                                      <i className="material-icons">delete</i>
                                                   </Button>
                                                </div>
                                             </div>
                                          </RctCardContent>
                                       </RctCard>
                                    </div>
                                 )
                              })}
                           </div>
                        </div>
                     </TabContainer>
                  </div>
               </SwipeableViews>
            </div>
            <ConfirmationDialog
               ref={this.confirmationDialog}
               onConfirm={(res) => this.deleteClientPermanent(res)}
            />
         </div>
      );
   }
}

// map state to props
const mapStateToProps = ({ CrmReducer }) => {
   const { clientsData } = CrmReducer;
   return {
      clientsData
   };
}
export default connect(mapStateToProps, {
   deleteClient
})(withStyles(null, { withTheme: true })(ClientTab));