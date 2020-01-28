/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated /* am4themes_dataviz */ from "@amcharts/amcharts4/themes/animated";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
am4core.useTheme(am4themes_animated);

// rct card box

class ChartAnchoBanda extends Component {
   constructor(props){
      super(props)

      this.state={
         props: '',
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

   async handleChart(data = []) {
      let chart = am4core.create("chartBandWidth", am4charts.XYChart);
      chart.language.locale = am4lang_es_ES;
      chart.paddingRight = 20;

      let bandWidth = 10;
      for (var i = 1; i < 15; i++) {
         bandWidth = Math.floor(Math.random()*(3896-90+1)+120);
         data.push({ date: new Date(2019, 0, i), value: bandWidth });
      }

      chart.data = data;
      chart.language.locale = am4lang_es_ES;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 40;
      dateAxis.title.text = "Fecha Por Locación";
      dateAxis.title.fontWeight = "bold";
      dateAxis.renderer.labels.template.horizontalCenter = "right";
      dateAxis.renderer.labels.template.verticalCenter = "middle";
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.rotation = 270;
      dateAxis.renderer.minGridDistance = 0.5;


      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Ancho De Banda (kbps)";
      valueAxis.title.fontWeight = "bold";

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      // series.strokeWidth = 1;
      // series.minBulletDistance = 5;

      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      let scrollbarX = new am4core.Scrollbar();
      scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      return (
         <div id="chartBandWidth" style={{ width: "100%", height: "300px" }}></div>
      );
   }
}

export default ChartAnchoBanda;