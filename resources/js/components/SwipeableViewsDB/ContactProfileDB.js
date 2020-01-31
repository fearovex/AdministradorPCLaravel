import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ContactProfileDB extends Component {
   render() {
    const { rowData } = this.props
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
                           {rowData[0] && rowData[0].nombre}
                        </span>
                     </ListItem>
                     <ListItem className="p-0 d-flex justify-content-start align-content-center">
                        <span className="mr-3 d-flex fw-semi-bold ">
                           <i className="material-icons mr-10 ">person_add</i>
                           Apellidos :
                        </span>
                        <span className=" text-truncate">
                           {rowData[0] && rowData[0].apellidos}
                        </span>
                     </ListItem>
                     {rowData[0] && (rowData[0].edad && rowData[0].telefono) ?
                        <div>
                           <ListItem className="p-0 d-flex justify-content-start align-content-center">
                                 <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 ">hourglass_empty</i>
                                 Edad :
                                 </span>
                                 <span className=" text-truncate">
                                 {rowData[0] && rowData[0].edad}
                                 </span>
                           </ListItem>
                           <ListItem className="p-0 d-flex justify-content-start align-content-center">
                                 <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 ">call</i>
                                 Telefono :
                                 </span>
                                 <span className=" text-truncate">
                                 {rowData[0] && rowData[0].telefono}
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
                              {rowData[0] && rowData[0].num_voucher}
                           </span>
                        </ListItem>
                     }
                     {rowData[0] && rowData[0].email?
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                           <span className="mr-3 d-flex fw-semi-bold ">
                                 
                                 <i className="material-icons mr-10 ">mail_outline</i>
                                 Correo Electrónico :
                           </span>
                           <span className=" text-truncate">
                                 {rowData[0].email}
                           </span>
                        </ListItem>
                        :
                        <ListItem className="p-0 d-flex justify-content-start align-content-center">
                           <span className="mr-3 d-flex fw-semi-bold ">
                                 <i className="material-icons mr-10 ">local_hotel</i>
                                 Número Habitación :
                           </span>
                           <span className=" text-truncate">
                                 {rowData[0] && rowData[0].num_habitacion}
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
                           {rowData[0] && rowData[0].os}
                        </span>
                  </ListItem>
                  </div>
               </div>
            </div>
         </RctCardContent>
      );
   }
}

export default ContactProfileDB;
