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
import 'Components/SwipeableViews/styles.css';
import CardInfo from "Components/new-Graficas/CardInfo";

function TabContainer({ children, dir }) {
	return (
	<Typography component="div" dir={dir} style={{ padding: 8 * 3,overflowX: 'hidden'}}>
		{children}
	</Typography>
	);
}

class SwipeableViewInfo extends Component {

   constructor(props){
      super(props)
      const { rowData, columns} = this.props;
      const id_campaing = localStorage.user_campaing;
      let objectDataUser = {}
      columns.forEach((column, i) => objectDataUser[column] = rowData[i]);
      this.state = {
         value: 0,
         rowData: rowData,
         columns: columns,
         prefferDayOfWeek:[],
         form: {
            objectDataUser: objectDataUser,
            id_campaing: id_campaing
         }
      }
   }

   async componentDidMount(){
      try {
         let config = {
            method: 'POST',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         }
         let res = await fetch(`${localStorage.urlDomain}api/prefferWeekDay`, config);
         let prefferDayOfWeek = await res.json()
         this.setState({
         prefferDayOfWeek:prefferDayOfWeek
         })


        
         let responseRadius = await fetch(`${localStorage.urlDomain}api/radiusApi`);
         let radius = await responseRadius.json()

         console.log(radius)



      } catch (error) {
         
      }
   }
   
	handleChangeTabs = (event, value) => {
		this.setState({ value });
	 };
  
	 handleChangeTabsIndex = index => {
		this.setState({ value: index });
    };
    
   render() {
      const { rowData, columns, prefferDayOfWeek} = this.state;
     
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
                     <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6 col-md-6">
                           <DetailConnection 
                              rowData={rowData}
                              columns={columns}
                           />
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6 col-md-6">
                           <CardInfo 
                              titleName={"Tiempo de conexión(hrs)"}
                              dataNum={250}
                              backgroundColor=""
                              classColor="primary"
                              className="styleCard1"
                              customIcon="timer"
                           />
                           {prefferDayOfWeek[0] ?
                           <CardInfo 
                              titleName={`Día más visitado:  ${(prefferDayOfWeek[0].dia_preferido).charAt(0).toUpperCase()+(prefferDayOfWeek[0].dia_preferido).slice(1)}`}
                              dataNum={prefferDayOfWeek[0].cantidad}
                              backgroundColor=""
                              classColor="secondary"
                              className="styleCard1"
                              customIcon="calendar-alt"
                           />
                              :
                              <div>

                              </div>
                           }
                        </div>
                     </div>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     hola3
                  </TabContainer>
               </div>
            </SwipeableViews>
      </div>	
      );
   }
}

export default withStyles(null, { withTheme: true })(SwipeableViewInfo);
