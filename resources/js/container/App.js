/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Agency Layout
import AgencyLayout from './AgencyLayout';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import RctBoxedLayout from './RctBoxedLayout';
// CRM layout
// app signin
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';
import AppForgotPassword from './ForgotPassword';
import AppResetPassword from './ResetPassword';


import AutoLogout from './AutoLogout';

// async components
import {
   AsyncSessionLoginComponent,
   AsyncSessionRegisterComponent,
   AsyncSessionLockScreenComponent,
   AsyncSessionForgotPasswordComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AsyncTermsConditionComponent
} from 'Components/AsyncComponent/AsyncComponent';

//Auth0
import Auth from '../Auth/Auth';
// callback component
import Callback from "Components/Callback/Callback";
import { updateSidebar } from 'Actions';
import { bindActionCreators } from 'redux';


//Auth0 Handle Authentication

const auth = new Auth();

const handleAuthentication = ({ location }) => {
   if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
   }
}

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest}) =>
   <Route
      {...rest}
      render={props =>
         authUser
            ? <Component {...props} />
            : <Redirect
               to={{
                  pathname: '/signin',
                  state: { from: props.location }
               }}
            />}
   />;

class App extends Component {
   async getSidebar(){
		let res = await fetch(`${localStorage.urlDomain}api/sidebar`)
		let data = await res.json();
		this.props.updateSidebar(
			data.original
		);
	}
   componentDidMount(){
      this.getSidebar();
   }

   render() {
      const { location, match, user } = this.props;
      
      if (location.pathname == '/') {
         if (user === null) {
            return (<Redirect to={'/signin'} />);
         } else {
            return (<Redirect to={localStorage.user_dashboard} />);
         }
      }
      return (
        


         <RctThemeProvider>
            <AutoLogout />
            <NotificationContainer />
            <InitialPath
               path={`${match.url}app`}
               authUser={user}
               component={RctDefaultLayout}
            />
            <Route path="/horizontal" component={HorizontalLayout} />
            <Route path="/agency" component={AgencyLayout} />
            <Route path="/boxed" component={RctBoxedLayout} />
            <Route path="/signin" component={AppSignIn} />
            <Route path="/signup" component={AppSignUp} />
            <Route path="/password/email" component={AppForgotPassword} />
            <Route path="/password/reset" component={AppResetPassword} />
            {/* password reset */}
            <Route path="/session/login" component={AsyncSessionLoginComponent} />
            <Route path="/session/register" component={AsyncSessionRegisterComponent} />
            <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
            <Route
               path="/session/forgot-password"
               component={AsyncSessionForgotPasswordComponent}
            />
            <Route path="/session/404" component={AsyncSessionPage404Component} />
            <Route path="/session/500" component={AsyncSessionPage500Component} />
            <Route path="/terms-condition" component={AsyncTermsConditionComponent} />
            <Route path="/callback" render={(props) => {
               handleAuthentication(props);
               return <Callback {...props} />
            }} />
         </RctThemeProvider>
         
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user } = authUser;
   return { user };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
	  updateSidebar,
	},dispatch);
 };

export default connect(mapStateToProps,mapDispatchToProps)(App);
