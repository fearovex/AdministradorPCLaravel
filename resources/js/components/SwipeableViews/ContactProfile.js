import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ContactProfile extends Component {


   render() {
    const { rowData, columns } = this.props
    let objectDataUser = {}
    columns.forEach((column, i) => objectDataUser[column] = rowData[i]);
    console.log(objectDataUser)
      return (
         <RctCardContent>
            <div className="ongoing-projects-wrap paddingInfo">
               <div className="row">
                  <div className="col-lg-4 col-sm-4 col-xl-4 col-4 col-md-4">
                     <div className="avatar marginAvatar" >
                        <img src={require("Assets/avatars/profile.jpg")} height="150" width="150" />
                     </div>
                  </div>
                  <div className="col-lg-8 col-sm-8 col-xl-8 col-8 col-md-8">   
                     <List className="project-list list-unstyled p-0 ">
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                           <span className="mr-3 d-flex fw-semi-bold ">
                              <i className="material-icons mr-10 ">person</i>
                              Nombre :
                           </span>
                           <span className=" text-truncate">
                              {objectDataUser.Nombre}
                           </span>
                        </ListItem>
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                           <span className="mr-3 d-flex fw-semi-bold ">
                              <i className="material-icons mr-10 ">person_add</i>
                              Apellidos :
                           </span>
                           <span className=" text-truncate">
                              {objectDataUser.Apellidos}
                           </span>
                        </ListItem>
                        {objectDataUser.Edad && objectDataUser.Telefono ?
                        <div>
                              <ListItem className="p-0 d-flex justify-content-start align-content-center">
                                 <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 ">hourglass_empty</i>
                                 Edad :
                                 </span>
                                 <span className=" text-truncate">
                                 {objectDataUser.Edad}
                                 </span>
                              </ListItem>
                              <ListItem className="p-0 d-flex justify-content-start align-content-center">
                                 <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 ">call</i>
                                 Telefono :
                                 </span>
                                 <span className=" text-truncate">
                                 {objectDataUser.Telefono}
                                 </span>
                              </ListItem>
                        </div>
                        :
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                              <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 "> loyalty</i>
                                 Número del Voucher
                              </span>
                              <span className=" text-truncate">
                                 {objectDataUser["Numero de Vouchers"]}
                              </span>
                           </ListItem>
                        }
                     {objectDataUser.Email?
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                              <span className="mr-3 d-flex fw-semi-bold ">
                                 
                                 <i className="material-icons mr-10 ">mail_outline</i>
                                 Correo Electrónico :
                              </span>
                              <span className=" text-truncate">
                                 {objectDataUser.Email}
                              </span>
                        </ListItem>
                        :
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                              <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 ">local_hotel</i>
                                 Número Habitación :
                              </span>
                              <span className=" text-truncate">
                                 {objectDataUser["N° Habitacion"]}
                              </span>
                        </ListItem>
                     }
                     </List>
                     <ListItem className="p-0 d-flex justify-content-start align-content-center">
                        <span className="mr-3 d-flex fw-semi-bold ">
                           <i className="material-icons mr-10 ">settings_applications</i>
                           Sistema Operativo:
                        </span>
                        <span className=" text-truncate">
                           {objectDataUser["Sistema Operativo"]}
                        </span>
                     </ListItem>
                  </div>
               </div>
            </div>
         </RctCardContent>
      );
   }
}

export default ContactProfile;
