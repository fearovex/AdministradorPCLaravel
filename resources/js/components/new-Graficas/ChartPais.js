/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated /* am4themes_dataviz */ from "@amcharts/amcharts4/themes/animated";
// am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ChartPais extends Component {
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
      let chart = am4core.create("chartpais", am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0;

      // Add data
      chart.data = data;

      // chart.responsive.enabled = true;

      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.category = "pais";
      series.dataFields.value = "personas";
      series.dataFields.radiusValue = "personas";
      series.slices.template.cornerRadius = 6;
      // series.colors.step = 3;

      series.slices.template.stroke = am4core.color("#fff");
      series.slices.template.strokeWidth = 2;

      // series.labels.template.disabled = true;
      // series.ticks.template.disabled = true;
      series.hiddenState.properties.endAngle = -90;
      // chart.svgContainer.htmlElement.style.height = "100px";
      // chart.legend = new am4charts.Legend();

      this.chart = chart;
   }

   componentWillMount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      return (
         <RctCardContent>
            <div id="chartpais" style={{ width: "100%", height: "150px" }}></div>
         </RctCardContent>
      );
   }
}

export default ChartPais;