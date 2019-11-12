/**
 * Reports Page
*/
/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import { RctCard, RctCardHeading, RctCardContent } from 'Components/RctCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// widgets
import {
   Invoices,
   PaymentReport,
   TransactionList,
   TaxRates,
   AddTickets
} from "Components/Widgets";
// widgets data
import {
   invoiceList,
   paymentList,
   transactionList,
   transferreport,
   expenseCategory,
   taxRates,
   addTickets
} from './data';

export default class Reports extends Component {

   render() {
      return (
         <div className="blank-wrapper">
            <Helmet>
               <title>Reports</title>
               <meta name="description" content="Reactify Blank Page" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.reports" />} match={this.props.match} />
            <div className="row">
               <div className="col-sm-12 col-md-12 col-lg-6">
                  <RctCard>
                     <RctCardHeading
                        title="Invoices"
                        customClasses="pb-0"
                     />
                     <RctCardContent>
                        <Invoices data={invoiceList} />
                     </RctCardContent>
                  </RctCard>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6">
                  <RctCard>
                     <RctCardHeading
                        title="Payments"
                        customClasses="pb-0"
                     />
                     <RctCardContent>
                        <PaymentReport paymentlist={paymentList} />
                     </RctCardContent>
                  </RctCard>
               </div>
            </div>
            <div className="row">
               <div className="col-sm-12 col-md-12 col-lg-12">
                  <RctCard>
                     <RctCardContent>
                        <TransactionList
                           listData={transactionList}
                           transferreport={transferreport}
                           expenseCategory={expenseCategory}
                        />
                     </RctCardContent>
                  </RctCard>
               </div>
            </div>
            <div className="row">
               <div className="col-sm-12 col-md-12 col-lg-6">
                  <RctCard>
                     <RctCardHeading
                        title="Tax Rates"
                        customClasses="pb-0"
                     />
                     <RctCardContent>
                        <TaxRates taxrates={taxRates} />
                     </RctCardContent>
                  </RctCard>
               </div>
               <div className="col-sm-12 col-md-12 col-lg-6">
                  <RctCard>
                     <RctCardHeading
                        title="Add Tickets"
                        customClasses="pb-0"
                     />
                     <RctCardContent>
                        <AddTickets addtickets={addTickets} />
                     </RctCardContent>
                  </RctCard>
               </div>
            </div>
         </div>
      );
   }
}