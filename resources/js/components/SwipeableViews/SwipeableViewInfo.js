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
import CardInfo from "Components/new-Graficas/CardInfo";
import 'Components/SwipeableViews/styles.css';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3, overflowX: 'hidden' }}>
         {children}
      </Typography>
   );
}

class SwipeableViewInfo extends Component {

   constructor(props) {
      super(props)
      const { rowData, columns } = this.props;
      const id_campaing = localStorage.user_campaing;
      let objectDataUser = {}
      columns.forEach((column, i) => objectDataUser[column] = rowData[i]);
      this.state = {
         value: 0,
         error:false,
         rowData: rowData,
         columns: columns,
         prefferDayOfWeek: [],
         visitHistory: [],
         timeConnect: [],
         userRadius: "",
         form: {
            objectDataUser: objectDataUser,
            id_campaing: id_campaing
         }
      }
   }

   componentDidMount() {
      this.handlePrefferDayOfWeek();
      this.handleVisitHistory();
      this.handleUserRadius();
      this.handleTimeConnect();
   }

   async handlePrefferDayOfWeek() {
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
            prefferDayOfWeek: prefferDayOfWeek
         })
      } catch (error) {
         this.setState({
            error:error
         })
      }

   }

   async handleVisitHistory() {
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         }
         let res = await fetch(`${localStorage.urlDomain}api/visitHistory`, config);
         let visitHistory = await res.json()
         this.setState({
            visitHistory: visitHistory
         })
      } catch (error) {

      }
   }

   async handleUserRadius() {
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         }
         let res = await fetch(`${localStorage.urlDomain}api/userRadius`, config);
         let userRadius = await res.json()
         this.setState({
            userRadius: userRadius
         })
      } catch (error) {

      }
   }

   async handleTimeConnect() {
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         }
         let res = await fetch(`${localStorage.urlDomain}api/timeConnect`, config);
         let timeConnect = await res.json()
         let type = "Seg";
         let time = Math.round(timeConnect.Time);
         if (time >= 60) {
            time = Math.round((time / 60));
            type = "Min";
            if (time >= 60) {
               time = Math.round((time / 60));
               type = "Hrs";
               if (time >= 24) {
                  time = Math.round((time / 24));
                  type = "Dias";
               }
            }
         }

         this.setState({
            timeConnect: {
               time: time,
               type: type,
            }
         });
      } catch (error) {
         console.log(error);
      }
   }

   handleChangeTabs = (event, value) => {
      this.setState({ value });
   };

   handleChangeTabsIndex = index => {
      this.setState({ value: index });
   };

   render() {
      const { rowData, columns, prefferDayOfWeek, visitHistory, timeConnect, userRadius } = this.state;

      const theme = {
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
                        <div className="col-lg-7 col-sm-7 col-xl-7 col-7 col-md-7">
                           <DetailConnection
                              rowData={rowData}
                              columns={columns}
                              userRadius={userRadius}
                           />
                        </div>
                        <div className="col-lg-5 col-sm-5 col-xl-5 col-5 col-md-5">
                           <CardInfo
                              titleName={"Tiempo de conexión"}
                              dataNum={timeConnect.time ? timeConnect.time : 0}
                              time={` ${timeConnect.type ? timeConnect.type : 'Seg'}`}
                              backgroundColor=""
                              classColor="primary"
                              className="styleCard1"
                              customIcon="timer"
                           />
                           {prefferDayOfWeek[0] ?
                              <CardInfo
                                 titleName={`Día más visitado:  ${(prefferDayOfWeek[0].dia_preferido).charAt(0).toUpperCase() + (prefferDayOfWeek[0].dia_preferido).slice(1)}`}
                                 dataNum={prefferDayOfWeek[0].cantidad}
                                 backgroundColor=""
                                 classColor="secondary"
                                 className="styleCard2"
                                 customIcon="calendar-alt"
                              />
                              :
                              <div className="paddingFix">
                              </div>
                           }
                        </div>
                     </div>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <VisitHistory
                        visitHistory={visitHistory}
                     />
                  </TabContainer>
               </div>
            </SwipeableViews>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(SwipeableViewInfo);
