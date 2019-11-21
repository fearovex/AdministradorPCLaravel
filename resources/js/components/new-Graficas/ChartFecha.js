/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ChartFecha extends Component {
   constructor(props){
      super(props)

      this.state={
         props: ''
      }
   }

   componentDidMount() {
      this.handleChart()
   }

   componentDidUpdate() {
      if(this.state.props != this.props.data){
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
      
      // Add data
      chart.data = data;
      
      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "personas";
      series.dataFields.dateX = "fecha";
      series.strokeWidth = 2;
      series.minBulletDistance = 10;
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.fillOpacity = 0.5;
      series.tooltip.label.padding(12,12,12,12)

      // Add scrollbar
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }
    
   render() {
      return (
         <RctCardContent>
            <div id="chartfecha" style={{ width: "300px", height: "300px" }}></div>
         </RctCardContent>
      );
   }
}

export default ChartFecha;