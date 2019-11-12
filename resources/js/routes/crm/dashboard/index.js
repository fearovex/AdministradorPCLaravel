/**
 * Crm Dashboard
 */
/* eslint-disable */
import React, { Component } from 'react'
import { Helmet } from "react-helmet";

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// widgets
import {
   ProjectStatusChart,
   SalesDoughnutChart,
   LineChart,
   UpcomingEvents,
   OngoingProjects,
   ProjectStatus,
   NotificationV2,
   LiveChatSupport,
   TransactionList
} from "Components/Widgets";

// widgets data
import {
   visitorData,
   revenueData,
   salesData,
   dealData,
   transactionList,
   transferreport,
   expenseCategory
} from './data';

export default class CrmDashboard extends Component {
   render() {
      const { match } = this.props;

      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Crm Dashboard</title>
               <meta name="description" content="Reactify Crm Dashboard" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.crm" />} match={match} />
            <div className="row">
               <div className="col-sm-12 col-md-6 col-lg-3">
                  <LineChart data={visitorData} />
               </div>
               <div className="col-sm-12 col-md-6 col-lg-3">
                  <LineChart data={revenueData} />
               </div>
               <div className="col-sm-12 col-md-6 col-lg-3">
                  <LineChart data={salesData} />
               </div>
               <div className="col-sm-12 col-md-6 col-lg-3">
                  <LineChart data={dealData} />
               </div>
            </div>
            <div className="row">
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
                  heading={<IntlMessages id="widgets.ProjectStatus" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <ProjectStatusChart />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                  heading={<IntlMessages id="widgets.sales" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <SalesDoughnutChart />
               </RctCollapsibleCard>
            </div>
            <div className="row">
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                  heading={<IntlMessages id="widgets.upcomingEvents" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <UpcomingEvents />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                  heading={<IntlMessages id="widgets.OngoingProjects" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <OngoingProjects />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                  heading={<IntlMessages id="widgets.ProjectStatus" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <ProjectStatus />
               </RctCollapsibleCard>
            </div>
            <div className="row">
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                  heading={<IntlMessages id="widgets.notifications" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <NotificationV2 />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  customClasses=""
                  colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
                  heading={<IntlMessages id="widgets.LiveChatSupport" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <LiveChatSupport />
               </RctCollapsibleCard>
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
         </div>
      )
   }
}
