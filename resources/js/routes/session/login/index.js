/**
 * Login Page
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
import { Fab } from '@material-ui/core';

// components
import { SessionSlider } from 'Components/Widgets';

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

class Signin extends Component {

   state = {
      email: 'demo@example.com',
      password: 'test#123'
   }

   /**
    * On User Login
    */
   onUserLogin() {
      if (this.state.email !== '' && this.state.password !== '') {
         this.props.signinUserInFirebase(this.state, this.props.history);
      }
   }

   /**
    * On User Sign Up
    */
   onUserSignUp() {
      this.props.history.push('/signup');
   }

   render() {
      const { email, password } = this.state;
      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="limiter">
               {loading &&
                  <LinearProgress />
               }
               
               <div className="limiter">
                  <div className="container-login100">
                     <div className="wrap-login100">                        
                             
                              <Form className="login100-form validate-form">
                                 <FormGroup className="wrap-input100 validate-input">
                                    <Input 
                                       type="mail"
                                       value={email}
                                       name="user-mail"
                                       id="user-mail"
                                       className="input100"
                                       placeholder="Enter Email Address"
                                       onChange={(event) => this.setState({ email: event.target.value })}
                                    />
                                    <span className="label-input100"></span>
                                 </FormGroup>
                                 <FormGroup className="wrap-input100 validate-input">
                                    <Input
                                       value={password}
                                       type="Password"
                                       name="user-pwd"
                                       id="pwd"
                                       className="input100"
                                       placeholder="Password"
                                       onChange={(event) => this.setState({ password: event.target.value })}
                                    />
                                    <span className="label-input100"></span>
                                 </FormGroup>
                                 <FormGroup className="container-login100-form-btn">
                                    <Button
                                       color="primary"
                                       className="login100-form-btn"
                                       variant="contained"
                                       size="large"
                                       onClick={() => this.onUserLogin()}
                                    >
                                       Ingresar
                            			</Button>
                                 </FormGroup>
                                 </Form>
                                 <div className="login100-more">
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
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
})(Signin);



