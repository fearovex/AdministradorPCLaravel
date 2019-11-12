/**
 * clients Page
*/
/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//component
import AddClient from './component/AddClient';
import ClientTab from './component/ClientTab';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class Clients extends Component {

   render() {
      return (
         <div className="clients-wrapper">
            <Helmet>
               <title>clients</title>
               <meta name="description" content="Reactify Blank Page" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.clients" />} match={this.props.match} />
            <div className="search-bar-wrap">
               <RctCard >
                  <RctCardContent>
                     <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 align-items-center mb-10 mb-sm-0">
                           <h2 className="mb-0 text-capitalize">search</h2>
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-9">
                           <div className="d-sm-flex">
                              <div className="search-bar">
                                 <TextField
                                    id="standard-with-placeholder"
                                    placeholder="Search Projects"
                                 />
                                 <Button variant="contained" color="primary" className="mx-sm-15">
                                    Search
                                 </Button>
                              </div>
                              <div className="add-project-wrap">
                                 <AddClient />
                              </div>
                           </div>
                        </div>
                     </div>
                  </RctCardContent>
               </RctCard>
            </div>
            <div>
               <RctCard>
                  <ClientTab />
               </RctCard>
            </div>
         </div>
      );
   }
}