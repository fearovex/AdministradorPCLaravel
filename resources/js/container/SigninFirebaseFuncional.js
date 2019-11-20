/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import {
   signinUserInFirebase
} from 'Actions'


class Signin extends Component {
   constructor(props) {
      super(props)
      this.state = {
         data: [],
         error: null,
         Form: {
            email: "",
            password: ""
         }
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   async handleSubmit(e) {
      e.preventDefault()
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.Form)
         };
         let res = await fetch('https://www.ipfi.ipwork.io/api/login', config);
         let data = await res.json()
         if(data.email && data.email != null){
            this.setState({
               data:data
            })
            this.props.signinUserInFirebase(this.state, this.props.history)
         }
         
      } catch (error) {
         this.setState({
            error
         });
      }


   }

   handleChange(e) {
      this.setState({
         Form: {
            ...this.state.Form,
            [e.target.name]: e.target.value
         }
      });
   }

 



   render() {
      const {data} = this.state
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

                        <Form className="login100-form validate-form" >
                           <FormGroup className="wrap-input100 validate-input">
                              <Input
                                 type="mail"
                                 value={this.state.Form.email}
                                 name="email"
                                 id="email"
                                 className="input100"
                                 placeholder="Correo"
                                 onChange={() => this.handleChange(event)}
                              />
                              <span className="label-input100"></span>
                           </FormGroup>
                           <FormGroup className="wrap-input100 validate-input">
                              <Input
                                 value={this.state.Form.password}
                                 type="Password"
                                 name="password"
                                 id="password"
                                 className="input100"
                                 placeholder="Contraseña"
                                 onChange={() => this.handleChange(event)}

                              />
                              <span className="label-input100"></span>
                           </FormGroup>
                           <FormGroup className="container-login100-form-btn">
                              <Button
                                 color="primary"
                                 className="login100-form-btn"
                                 variant="contained"
                                 size="large"
                                 onClick={() => this.handleSubmit(event)}
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
            <NotificationContainer />
            
         </QueueAnim>
      );
     
   }
}

// // map state to props
const mapStateToProps = ({ authUser }) => {
   const { user, loading } = authUser;
   return { user, loading }
}

export default connect(mapStateToProps,{
   signinUserInFirebase
})(Signin);
