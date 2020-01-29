/**
 * Transaction table section
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ContactProfile from 'Components/SwipeableViews/ContactProfile';
import DetailConnection from 'Components/SwipeableViews/DetailConnection';
import VisitHistory from 'Components/SwipeableViews/VisitHistory';
import './styles.css';

function TabContainer({ children, dir }) {
	return (
	<Typography component="div" dir={dir} style={{ padding: 8 * 3,overflowX: 'hidden'}}>
		{children}
	</Typography>
	);
}

class SwipeableViewInfo extends Component {

   state = {
      value: 0,
   };
   
	handleChangeTabs = (event, value) => {
		this.setState({ value });
	 };
  
	 handleChangeTabsIndex = index => {
		this.setState({ value: index });
    };
    
   render() {
      const { rowData, columns } = this.props;
      const theme  = {
			direction: 'rlt'
		}
      return (
         <div className="Tab-wrap">
         <AppBar position="static" color="default">
         <Tabs
            value={this.state.value}
            onChange={this.handleChangeTabs}
            indicatorColor="primary"
            textColor="primary"
            variant="standard"
         >
            <Tab label={'Perfil de Contacto'} />
            <Tab label={'Detalle de Conexión'} />
            <Tab label={'Historial de Visitas'} />
         </Tabs>
         </AppBar>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={this.state.value}
               onChangeIndex={this.handleChangeTabsIndex}>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <ContactProfile 
                        rowData={rowData}
                        columns={columns}
                     />
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <DetailConnection 
                        rowData={rowData}
                        columns={columns}
                     />
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <VisitHistory 
                        rowData={rowData}
                        columns={columns}
                     />
                  </TabContainer>
               </div>
            </SwipeableViews>
      </div>	
      );
   }
}

export default withStyles(null, { withTheme: true })(SwipeableViewInfo);
