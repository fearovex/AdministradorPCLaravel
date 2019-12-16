import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { logoutUserFromFirebase } from 'Actions';


 class ResetPassword extends Component {

 
      query = new  URLSearchParams(this.props.location.search);
      token = this.query.get('token');
      state = {
         validResetPass: false,
         error: null,
         form: {
            email: "",
            password: "",
            password_confirmation: "",
            token: this.token,
         }
      };

   async sendEmailRequestReset(e){
      e.preventDefault();
      // console.log(this.props);
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         };
         let res = await fetch(`${localStorage.urlDomain}api/password/reset`, config);
         let data = await res.json();
         if(data.error){
            NotificationManager.error(data.error,'',4000);
         }
         if(data.message && !data.errors){
            NotificationManager.success(data.message,'',4000);
            this.setState({
               validResetPass: true
            })
         //   location.href = localStorage.urlDomain+'signin';
         }if(data.errors.password){
            NotificationManager.error(data.errors.password,'',4000);
         }

         
      } catch (error) {
         this.setState({
            error:error
         })
      }
      
   }

   handleChange(e) {
      this.setState({
         form: {
            ...this.state.form,
            [e.target.name]: e.target.value
         }
      });
   }

   render() {
      const {validResetPass} = this.state;

      if(validResetPass) {
         return (
            <div className="rct-session-wrapper" key="1">
               <div className="session-inner-wrapper p-4 h-100 p-md-0">
                  <AppBar position="static" className="session-header">
                     <Toolbar>
                        <div className="container">
                           <div className="d-flex justify-content-between">
                              <div className="session-logo">
                                 <Link to="/">
                                    {/* <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" /> */}
                                    <img src={require('Assets/logos/ipfi.png')} className="img-fluid imgLogoIPFi" alt="site-logo"/>
                                 </Link>
                              </div>
                              {/* <div>
                                 <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                                 <Button variant="contained" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
                              </div> */}
                           </div>
                        </div>
                     </Toolbar>
                  </AppBar>
                  <div className="row">
                     <div className="col-sm-8 col-lg-5 mx-auto">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2>Reset Your Password</h2>
                           </div>
                           <p>Your password has been reset.</p>
                           <p>
                              <Link to="/signin">
                              Click here to login with your new credentials.
                              </Link>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );
       }
    
      return (
            <div className="rct-session-wrapper" key="1">
               <div className="session-inner-wrapper p-4 h-100 p-md-0">
                  <AppBar position="static" className="session-header">
                     <Toolbar>
                        <div className="container">
                           <div className="d-flex justify-content-between">
                              <div className="session-logo">
                                 <Link to="/">
                                    {/* <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" /> */}
                                    <img src={require('Assets/logos/ipfi.png')} className="img-fluid imgLogoIPFi" alt="site-logo"/>
                                 </Link>
                              </div>
                              {/* <div>
                                 <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                                 <Button variant="contained" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
                              </div> */}
                           </div>
                        </div>
                     </Toolbar>
                  </AppBar>
                  <div className="row">
                     <div className="col-sm-8 col-lg-5 mx-auto">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2>Reset Your Password</h2>
                              <p className="mb-0">Fill correctly the fields for reset succesfully your password</p>
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input 
                                 type="mail" 
                                 name="email" 
                                 id="email" 
                                 autocomplete="off"
                                 required
                                 className="has-input input-lg" 
                                 placeholder="Enter Email Address"
                                 onChange={() => this.handleChange(event)}
                                 />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup>
                                 <Input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    autocomplete="off"
                                    required
                                    className="has-input input-lg" 
                                    placeholder="Enter New Password"
                                    onChange={() => this.handleChange(event)}
                                 />
                              </FormGroup>
                               <FormGroup>
                               <Input 
                                 type="password" 
                                 name="password_confirmation" 
                                 id="password_confirmation" 
                                 required
                                 autocomplete="off"
                                 className="has-input input-lg" 
                                 placeholder="Verify New Password"
                                 onChange={() => this.handleChange(event)}
                              />
                              
                               </FormGroup>
                              <FormGroup>
                                 <Button onClick={(e)=>this.sendEmailRequestReset(e)} variant="contained" className="btn-info text-white btn-block btn-large w-100">Reset Password</Button>
                              </FormGroup>
                           </Form>

                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
      );
   }
}


export default connect(null)(ResetPassword)