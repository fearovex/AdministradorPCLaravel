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

class ChartGenero extends Component {
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

      let chart = am4core.create("chartgenero", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0;

      chart.data = data;


      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries3D());
      pieSeries.dataFields.category = "genero";
      pieSeries.dataFields.value = "personas";

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      // pieSeries.slices.template.strokeOpacity = 1;
      // change the cursor on hover to make it apparent the object can be interacted with
      pieSeries.slices.template
      .cursorOverStyle = [
         {
               "property": "cursor",
               "value": "pointer"
            }
         ];

      // pieSeries.labels.template.disabled = false;
      // pieSeries.ticks.template.disabled = true;

      // Create hover state
      let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      // chart.legend = new am4charts.Legend();
      // chart.legend.position = "right";
      // chart.legend.labels.template.maxWidth = 150;
      // chart.legend.labels.template.truncate = true;

      this.chart = chart;
   }

   UNSAFE_componentWillMount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      return (
         <div id="chartgenero" style={{width: '100%', height: "150px"}}></div>
      );
   }
}

export default ChartGenero;