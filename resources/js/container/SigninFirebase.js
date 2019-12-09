/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import Recaptcha from 'react-recaptcha';






// components
import {
   SessionSlider
} from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
} from 'Actions';

//Auth File
import Auth from '../Auth/Auth';
import { Fab } from '@material-ui/core';

const auth = new Auth();

class Signin extends Component {

   constructor(props) {
      super(props)
      this.state = {
         data: [],
         error: null,
         Form: {
            email: "",
            password: "",
            ip_public: "",
         }
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);      
      // this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
      // this.verifyCallback = this.verifyCallback.bind(this);
   }

   async handleSubmit(e) {
      e.preventDefault()
      // if (this.state.isVerified) {
      //       alert('You have successfully subscribed!');
         try {
            this.state.Form.ip_public = localStorage.ip_client;
            let config = {
               method: 'POST',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(this.state.Form)
            };
            let res = await fetch(`${localStorage.urlDomain}api/login`, config);
            let data = await res.json()
            if(data.email && data.email != null){
               this.setState({
                  data:data
               })
               this.props.signinUserInFirebase(this.state, this.props.history)
            }
            
            
         } catch (error) {
            console.log(error);
            this.setState({
               error
            });
         }
      // }   
      // else {
      //       alert('por favor verifique el captcha');
      // }
   }

   handleChange(e) {
      this.setState({
         Form: {
            ...this.state.Form,
            [e.target.name]: e.target.value
         }
      });
   }
   // verifyCallback(response) {
   //    if (response) {
   //      this.setState({
   //        isVerified: true
   //      })
   //    }
   //  }
//     recaptchaLoaded() {
//     console.log('captcha successfully loaded');
//   }




   render() {
      const {data} = this.state
      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                           <AppBar position="static" className="session-header" style={{'alignItems' : 'center', 'marginBottom': '30px'}}>
                              <Toolbar>
                                 <div className="container">
                                    <div className="d-flex justify-content-between">
                                       <div className="session-logo">
                                          <Link to="/">
                                             {/* <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" /> */}
                                             <img src={require('Assets/logos/ipfi.png')} className="img-fluid" alt="site-logo" style={{'width' : '250px'}}/>
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
                           <div className="session-body text-center ">
                              <div className="session-head mb-30">
                                 <h2 className="font-weight-bold">Administrador Portal Cautivo</h2>
                              </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="mail"
                                       value={this.state.Form.email}
                                       name="email"
                                       id="user-mail"
                                       className="has-input input-lg"
                                       placeholder="Enter Email Address"
                                       onChange={() => this.handleChange(event)}
                                    />
                                    <span className="has-icon"><i className="ti-email"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={this.state.Form.password}
                                       type="Password"
                                       name="password"
                                       id="pwd"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       onChange={() => this.handleChange(event)}
                                    />
                                    <span className="has-icon"><i className="ti-lock"></i></span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       color="primary"
                                       className="btn-block text-white w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={() => this.handleSubmit(event)}
                                    >
                                       Sign In
                            			</Button>
                                 </FormGroup>
                              
                                    <Recaptcha
                                       sitekey="6LfuVcYUAAAAAB5R7FWDHAPk-qG5l9hSzZ2PN9pq"
                                       render="explicit"
                                       onloadCallback={this.recaptchaLoaded}
                                       verifyCallback={this.verifyCallback}
                                    />
                                
                              </Form>
                           </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 ">
                           <SessionSlider />
                        </div>
                        
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { user, loading } = authUser;
   return { user, loading }
}

export default connect(mapStateToProps, {
   signinUserInFirebase,
})(Signin);
