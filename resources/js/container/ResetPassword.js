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
         if(data.error=="We can't find a user with that e-mail address."){
            NotificationManager.error('No podemos encontrar un usuario con ese correo electrónico.','',4000);
         }
         if(data.error=='This password reset token is invalid.'){
            NotificationManager.error('El token de restablecimiento de contraseña no es valido','',4000);
         }
         
         if(data.message && !data.errors){
            NotificationManager.success(data.message,'',4000);
            this.setState({
               validResetPass: true
            })
         //   location.href = localStorage.urlDomain+'signin';
         }if(data.errors.password == 'The password must be at least 8 characters.'){
            NotificationManager.error('La contraseña debe tener como mínimo 8 carácteres','',4000);
         }
         if(data.errors.password == 'The password field is required.'){
            NotificationManager.error('El campo de la contraseña es requerido','',4000);
         }
         if(data.errors.email){
            NotificationManager.error('El campo del correo es requerido','',4000);
         }
         if(data.errors.password == 'The password confirmation does not match.'){
            NotificationManager.error('La contraseña de confirmación no coincide','',4000);
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
                              <h2>Restablecer Su Contraseña</h2>
                           </div>
                           <p>Su contraseña ha sido restablecida.</p>
                           <p>
                              <Link to="/signin">
                              Click aquí para ingresar con sus nuevas credenciales
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
                        <div className="session-body text-center login-body">
                           <div className="session-head mb-30">
                              <h2 className="forgotPasswordTitle">Restablecer Su Contraseña</h2>
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
                                 placeholder="Ingrese Su Correo Electrónico"
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
                                    placeholder="Ingrese Nueva Contraseña"
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
                                 placeholder="Verifique Nueva Contraseña"
                                 onChange={() => this.handleChange(event)}
                              />
                              
                               </FormGroup>
                              <FormGroup>
                                 <Button onClick={(e)=>this.sendEmailRequestReset(e)} variant="contained" className="btn-info text-white btn-block btn-large w-100">Restablecer Contraseña</Button>
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