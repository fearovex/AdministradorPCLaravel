/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncCrmComponent,
   AsyncProjectsComponent,
   AsyncProjectDetailComponent,
   AsyncClientsComponent,
   AsyncReportsComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Crm = ({ match }) => (
   <div className="Crm-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
         <Route path={`${match.url}/dashboard`} component={AsyncCrmComponent} />
         <Route path={`${match.url}/projects`} component={AsyncProjectsComponent} />
         <Route path={`${match.url}/project-detail/:id`} component={AsyncProjectDetailComponent} />
         <Route path={`${match.url}/clients`} component={AsyncClientsComponent} />
         <Route path={`${match.url}/reports`} component={AsyncReportsComponent} />
      </Switch>
   </div>
);

export default Crm;