import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { RctCardContent } from 'Components/RctCard';


class DetailConnectionDB extends Component {
   render() {
    const { rowData, userRadius } = this.props
      return (
         <RctCardContent>
            <div className="ongoing-projects-wrap paddingDetail">
               <List className="project-list list-unstyled p-0 ">
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">signal_cellular_4_bar</i>
                        Ip Cliente :
                     </span>
                     <span className=" text-truncate">
                        {rowData[0] && rowData[0].ip_cliente}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">speaker_phone</i>
                        Ip Dispositivo :
                     </span>
                     <span className=" text-truncate">
                        {rowData[0] && rowData[0].ip_ap}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">tablet_android</i>
                        Mac Cliente :
                     </span>
                     <span className=" text-truncate">
                        {rowData[0] && rowData[0].mac_cliente}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                     <i className='material-icons mr-10'>router</i>
                        Mac Dispositivo :
                     </span>
                     <span className=" text-truncate">
                        {rowData[0] && rowData[0].mac_ap}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">wifi_tethering</i>
                        SSID :
                     </span>
                     <span className=" text-truncate">
                           {rowData[0] && rowData[0].ssid}
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="mr-3 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">nature_people</i>
                        Usuario Radius :
                     </span>
                     <span className=" text-truncate">
                           {userRadius}
                     </span>
                  </ListItem>
               </List>
            </div>
         </RctCardContent>
      );
   }
}

export default DetailConnectionDB;
