import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { NotificationContainer, NotificationManager } from 'react-notifications';

// app config
// import AppConfig from '../Constants/AppConfig';

export default class ForgotPassword extends Component {


      state = {
         error: null,
         form: {
            email: "",
         }
      };

   async sendEmailLink(e){
      e.preventDefault();
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         };
         let res = await fetch(`${localStorage.urlDomain}api/password/email`, config);
         let data = await res.json();
         if(data.error){
            NotificationManager.error(data.error,'',4000);
         }
         if(data.message && !data.errors){
            NotificationManager.success(data.message,'',4000);
         }
         if(data.errors.email){
            NotificationManager.error(data.errors.email,'',4000);
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
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper" key="1">
               <AppBar position="static" className="session-header" style={{'alignItems' : 'center','marginTop':'55px'}}>
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 {/* <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" /> */}
                                 <img src={require('Assets/logos/ipfi.png')} className="img-fluid" alt="site-logo" style={{'width' : '200px'}}/>
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
               <div className="session-inner-wrapper p-4 h-100 p-md-0">
                  <div className="row">
                     <div className="col-sm-8 col-lg-5 mx-auto">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2>Forgot The Password?</h2>
                              <p className="mb-0">Put your email for receive a notification with your password</p>
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input 
                                 type="mail" 
                                 name="email" 
                                 id="email" 
                                 required
                                 className="has-input input-lg" 
                                 placeholder="Enter Email Address"
                                 onChange={() => this.handleChange(event)}
                              />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup>
                                 <Button onClick={()=>this.sendEmailLink(event)} variant="contained" className="btn-info text-white btn-block btn-large w-100">Send Password Password Reset Link</Button>
                              </FormGroup>
                              <Button component={Link} to="/signin" className="btn-dark btn-block btn-large text-white w-100">Already having account?  Login</Button>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}