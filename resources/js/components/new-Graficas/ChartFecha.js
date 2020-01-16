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
      const {data} = this.props;
      this.handleChart(data)
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
         var newDate = new Date(data[i].fecha_creacion);
         newDate.setDate(newDate.getDate() + 1);
         data[i].fecha_creacion = newDate;
      }
      
      let chart = am4core.create("chartfecha", am4charts.XYChart);
      chart.paddingRight = 20;

      // Add data
      chart.data = data;
      
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.title.text = "Fecha Por Personas";
      dateAxis.title.fontWeight = "bold";
      dateAxis.renderer.labels.template.horizontalCenter = "right";
      dateAxis.renderer.labels.template.verticalCenter = "middle";
      dateAxis.renderer.grid.template.location = 0;
      // dateAxis.renderer.labels.template.rotation = 270;
      dateAxis.minZoomCount = 5;

      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;

      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Personas";
      valueAxis.title.fontWeight = "bold";

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "personas";
      series.dataFields.dateX = "fecha_creacion";
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.1;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      // let scrollbarX = new am4core.Scrollbar();
      // scrollbarX.marginBottom = 20;
      // chart.scrollbarX = scrollbarX;

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