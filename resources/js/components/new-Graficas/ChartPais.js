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

   componentDidMount() {
      this.handleChart()
   }

   componentDidUpdate() {
      this.handleChart(this.props.data)
   }

   async handleChart(data = []) {
      let chart = am4core.create("chartpais", am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0;

      // Add data
      chart.data = data;

      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "personas";
      series.dataFields.radiusValue = "personas";
      series.dataFields.category = "pais";
      series.slices.template.cornerRadius = 6;
      series.colors.step = 3;

      series.labels.template.disabled = true;
      series.ticks.template.disabled = true;

      series.hiddenState.properties.endAngle = -90;

      // chart.legend = new am4charts.Legend();
   }

   componentWillUnmount() {
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