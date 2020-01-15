/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SweetAlert from 'react-bootstrap-sweetalert'
import MUIDataTable from "mui-datatables";
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ChartFecha extends Component {
   constructor(props){
      super(props)

      this.state={
         props: '',
         columns: [],
         data: [],
         error: null,
         id:0,
         prompt: false,
         modaledit:false,
         zona:[],
                  		
         form: {
            nombre: ""
            }
      }
   }

   componentDidMount() {
      this.handleChart()
   }

   componentDidUpdate() {
      if(this.state.props != this.props.data){
         if (this.chart) {
            this.chart.dispose();
         }
         this.handleChart(this.props.data)
         this.setState({
            props: this.props.data
         })
      }
   }

   async handleChart(data = []){
      for (let i = 0; i < data.length; i++) {
         var newDate = new Date(data[i].fecha);
         newDate.setDate(newDate.getDate() + 1);
         data[i].fecha = newDate;
      }
      
      let chart = am4core.create("chartfecha", am4charts.XYChart);
      // chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      chart.data = data;
      
      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis.renderer.minGridDistance = 50;
      dateAxis.title.text = "Fecha";
      dateAxis.title.fontWeight = "bold";
      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Personas";
      valueAxis.title.fontWeight = "bold";

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "personas";
      series.dataFields.dateX = "fecha_creacion";
      series.tooltipText = "{valueY}";

      

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineY.strokeOpacity = 0;

      this.chart = chart;

   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }
    
   render() {
      
      return (
         <RctCardContent>
            <div id="chartfecha" style={{ width: "100%", height: "300px" }}>
               </div>
         </RctCardContent>
      );
   }
}

export default ChartFecha;