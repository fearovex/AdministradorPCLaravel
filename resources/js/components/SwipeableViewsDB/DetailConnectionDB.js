import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// rct card box
import { RctCardContent } from 'Components/RctCard';

class DetailConnectionDB extends Component {
   render() {
    const { rowData, columns } = this.props
    let objectDataUser = {}

    columns.forEach((column, i) => objectDataUser[column] = rowData[i]);

    console.log(objectDataUser)
      return (
         <RctCardContent>
            <div className="ongoing-projects-wrap paddingInfo">
               <List className="project-list list-unstyled p-0 ">
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">signal_cellular_4_bar</i>
                        Ip Cliente :
                     </span>
                     <span className=" text-truncate">
                        {/* {objectDataUser["Ip Cliente"]} */}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">speaker_phone</i>
                        Ip Dispositivo :
                     </span>
                     <span className=" text-truncate">
                        {/* {objectDataUser["Ip Dispositivo"]} */}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">tablet_android</i>
                        Mac Cliente :
                     </span>
                     <span className=" text-truncate">
                        {/* {objectDataUser["Mac Cliente"]} */}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">tablet_mac</i>
                        Mac Dispositivo :
                     </span>
                     <span className=" text-truncate">
                        {/* {objectDataUser["Mac Dispositivo"]} */}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">wifi_tethering</i>
                        SSID :
                     </span>
                     <span className=" text-truncate">
                           {/* {objectDataUser.Ssid} */}
                     </span>
                  </ListItem>
               </List>
            </div>
         </RctCardContent>
      );
   }
}

export default DetailConnectionDB;
