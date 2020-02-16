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

      for (let i = 0; i < data.length; i++) {
         var newDate = new Date(data[i].DateRegister);
         newDate.setDate(newDate.getDate() + 1);
         data[i].DateRegister = newDate;
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
      // dateAxis.groupData = true;
      dateAxis.groupCount = 500;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Ancho De Banda";
      valueAxis.title.fontWeight = "bold";
      valueAxis.min = 0;

      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = "#.0 b";

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "DateRegister";
      series.dataFields.valueY = "Quantity";
      // series.strokeWidth = 1;
      // series.minBulletDistance = 5;

      series.tooltipText = "{valueY.formatNumber('#.0 b')}";
      // series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 1;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.strokeWidth = 2;
      bullet.stroke = am4core.color("#fff");
      bullet.setStateOnChildren = true;
      bullet.propertyFields.fillOpacity = "opacity";
      bullet.propertyFields.strokeOpacity = "opacity";
      bullet.properties.scale = 1.4;

      var hoverState = bullet.states.create("hover");
      hoverState.properties.scale = 1.8;

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