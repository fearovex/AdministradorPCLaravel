/**
 * Transaction table section
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Scrollbars } from 'react-custom-scrollbars';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Badge } from 'reactstrap';
import SwipeableViewInfoDB from 'Components/SwipeableViewsDB/SwipeableViewInfoDB';
import SweetAlert from 'react-bootstrap-sweetalert'

// intl messages
import IntlMessages from 'Util/IntlMessages';


const UsersMoreVisitColumns = ['Posicion', 'Nombre', 'Apellido', 'Email', 'Celular', 'Sexo', 'Sistema Operativo', 'N° Visitas'] ;

class UsersMoreVisit extends Component {

   state={
      modalInfo: false
   }

   openModalInfo(){
		this.setState({ 
			modalInfo: true 
		});
	}

	handleCloseModal(e){
		e.preventDefault();
		this.setState({ 
			modalInfo: false 
		});
	}
   render() {
      const { listData } = this.props;
      const { modalInfo } = this.state;
      return (
         <div className="Transaction-table-wrap Tab-wrap" style={{marginTop: "4px"}}>
            
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={320} autoHide>
                  <div className="card mb-0 transaction-box">
                        <Table className="table-wrap" >
                           <TableHead >
                              <TableRow>
                                 {UsersMoreVisitColumns.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody >
                              {listData && listData.map((list, index) => (
                                 <TableRow key={index} onClick={() => this.openModalInfo()}>
                                    <TableCell align='center'>#{index+1}</TableCell> 
                                    <TableCell>{list.Nombre}</TableCell>
                                    <TableCell>{list.Apellido}</TableCell>
                                    <TableCell>{list.Email}</TableCell>
                                    <TableCell>{list.Celular}</TableCell>
                                    <TableCell>{list.Sexo}</TableCell>
                                    <TableCell>{list.Sistema_Operativo}</TableCell>
                                    <TableCell>{list.N_Visitas}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                  </div>
            </Scrollbars>
            <SweetAlert
						btnSize="sm"
						show={modalInfo}
						// showCancel
						confirmBtnText="Cerrar"
						// cancelBtnText="Cancelar"
						// cancelBtnBsStyle="danger"
						// confirmBtnBsStyle="primary"
						onConfirm={() => this.handleCloseModal(event)}
						// onCancel={() => this.onCancel('modalEmailCsv')}
					>
						<SwipeableViewInfoDB 
							// rowData={rowData}
							// columns={columns}
						/>
				</SweetAlert>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(UsersMoreVisit);
