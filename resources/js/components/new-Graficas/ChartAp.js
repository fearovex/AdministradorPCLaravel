/**
 * Sales doughnut chart
*/
import React, { Component, useState } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import SweetAlert from 'react-bootstrap-sweetalert'
import MUIDataTable from "mui-datatables";

// rct card box
import { RctCardContent } from 'Components/RctCard';


class ChartAp extends Component {
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

   async handleChart(data = []) {

      let chart = am4core.create("chartap", am4charts.XYChart);
      // chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      chart.data = data;

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "mac_ap";
      categoryAxis.title.text = "Dispositivos";
      categoryAxis.title.fontWeight = "bold";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Personas";
      valueAxis.title.fontWeight = "bold";
      valueAxis.renderer.minWidth = 50;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "personas";
      series.dataFields.categoryX = "mac_ap";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function (fill, target) {
         return chart.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      chart.cursor = new am4charts.XYCursor();
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
            <div id="chartap" style={{ width: "100%", height: "300px" }}>
            </div>
         </RctCardContent>
      );
   }
}

export default ChartAp;