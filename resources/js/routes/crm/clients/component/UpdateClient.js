/**
 * Form Dialog
 */
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import { onUpdateClient } from "Actions";

class UpdateClient extends React.Component {

   state = {
      open: false,
      name: '',
      phoneNumber: '',
      email: '',
      location: '',
      isValidname: false,
      isValidphoneNumber: false,
      isValidemail: false,
      isValidlocation: false
   };

   handleClose = () => {
      this.setState({ open: false });
      this.props.onCloseDialog(true);
   };

   componentDidMount() {
      this.setState({ open: true });
      this.getClientData();
   }

   // get client data
   getClientData() {
      const { data } = this.props;
      this.setState({
         name: data.name,
         phoneNumber: data.phone_number,
         email: data.e_mail,
         location: data.country,
      })
   }
   /**
   * Method to check update validation
   */
   onPressUpdate() {
      const { name, phoneNumber, email, location } = this.state;
      this.setState({
         isValidname: false,
         isValidphoneNumber: false,
         isValidemail: false,
         isValidlocation: false
      })
      if (name !== '' && phoneNumber !== '' && email !== '' && location !== '') {
         this.updateClient();
      }
      else {
         if (name === '') {
            this.setState({
               isValidname: true,
            })
         }
         if (phoneNumber === '') {
            this.setState({
               isValidphoneNumber: true,
            })
         }
         if (email === '') {
            this.setState({
               isValidemail: true,
            })
         }
         if (location === '') {
            this.setState({
               isValidlocation: true,
            })
         }
         if (name === '' && phoneNumber === '' && email === '' && location === '') {
            this.setState({
               isValidname: true,
               isValidphoneNumber: true,
               isValidemail: true,
               isValidlocation: true
            })
         }
      }
   }
   //update client info
   updateClient() {
      let ID = this.props.data.id;
      let clientObject = {
         name: this.state.name,
         phoneNumber: this.state.phoneNumber,
         email: this.state.email,
         location: this.state.location
      }
      this.props.onUpdateClient((clientObject), ID);
      this.props.onCloseDialog(true);
      this.setState({ open: false });
   }

   render() {
      const { email, name, phoneNumber, location, isValidname, isValidphoneNumber, isValidemail, isValidlocation } = this.state;
      return (
         <div>
            <Button className="rounded-circle mr-5" onClick={this.handleClickOpen}>
               <i className="material-icons">edit</i>
            </Button>
            <Dialog 
            className="client-dialog" 
            open={this.state.open} 
            onClose={this.handleClose} 
            aria-labelledby="form-dialog-title"
            disableBackdropClick
            >
               <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
               <DialogContent>
                  <div>
                     <form autoComplete="off">
                        <div className="row">
                           <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                              <FormControl
                                 required
                                 error={isValidname}
                                 aria-describedby="firstsname-text"
                                 className="d-block"
                              >
                                 <InputLabel htmlFor="name">Name</InputLabel>
                                 <Input
                                    fullWidth
                                    id="name"
                                    type="text"
                                    value={name ? name : ''}
                                    onChange={(event) => { this.setState({ name: event.target.value }) }}
                                 />
                                 {isValidname &&
                                    <FormHelperText id="firstsname-text">
                                       <i className="zmdi zmdi-alert-circle mr-1"></i>
                                       This field should not be empty.
                                    </FormHelperText>
                                 }
                              </FormControl>
                           </div>
                           <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                              <FormControl
                                 required
                                 error={isValidphoneNumber}
                                 aria-describedby="phoneNumber-text"
                                 className="d-block"
                              >
                                 <InputLabel htmlFor="phoneNumber">Contact</InputLabel>
                                 <Input
                                    fullWidth
                                    id="phoneNumber"
                                    type="text"
                                    value={phoneNumber ? phoneNumber : ''}
                                    onChange={(event) => { this.setState({ phoneNumber: event.target.value }) }}
                                 />
                                 {isValidphoneNumber &&
                                    <FormHelperText id="phoneNumber-text">
                                       <i className="zmdi zmdi-alert-circle mr-1"></i>
                                       This field should not be empty.
                                    </FormHelperText>
                                 }
                              </FormControl>
                           </div>
                           <div className="col-sm-12 col-md-12 col-lg-12 mb-20">
                              <FormControl
                                 required
                                 error={isValidemail}
                                 aria-describedby="email-text"
                                 className="d-block"
                              >
                                 <InputLabel htmlFor="email">Email</InputLabel>
                                 <Input
                                    fullWidth
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => { this.setState({ email: event.target.value }) }}
                                 />
                                 {isValidemail &&
                                    <FormHelperText id="email-text">
                                       <i className="zmdi zmdi-alert-circle mr-1"></i>
                                       This field should not be empty.
                                    </FormHelperText>
                                 }
                              </FormControl>
                           </div>
                           <div className="col-sm-12 col-md-12 col-lg-12">
                              <FormControl
                                 required
                                 error={isValidlocation}
                                 aria-describedby="location-text"
                                 className="d-block"
                              >
                                 <InputLabel htmlFor="location">Location</InputLabel>
                                 <Input
                                    fullWidth
                                    id="location"
                                    type="text"
                                    value={location ? location : ''}
                                    onChange={(event) => { this.setState({ location: event.target.value }) }}
                                 />
                                 {isValidlocation &&
                                    <FormHelperText id="location-text">
                                       <i className="zmdi zmdi-alert-circle mr-1"></i>
                                       This field should not be empty.
                                    </FormHelperText>
                                 }
                              </FormControl>
                           </div>
                        </div>
                        <div className="pt-25 text-right">
                           <Button variant="contained" onClick={this.handleClose} className="btn-danger mr-15 text-white">
                              Cancel
            		         </Button>
                           <Button
                              className="btn-success text-white text-capitalize"
                              onClick={() => this.onPressUpdate()}
                           >
                              Submit
                           </Button>
                        </div>
                     </form>
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      );
   }
}

const mapStateToProps = ({ CrmReducer }) => {
   const { clientsData } = CrmReducer;
   return { clientsData };
}

export default connect(mapStateToProps, {
   onUpdateClient
})(UpdateClient);