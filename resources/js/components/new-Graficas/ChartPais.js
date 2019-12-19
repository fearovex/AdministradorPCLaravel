/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated /* am4themes_dataviz */ from "@amcharts/amcharts4/themes/animated";
import SweetAlert from 'react-bootstrap-sweetalert'
import MUIDataTable from "mui-datatables";
// am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ChartPais extends Component {
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
      let chart = am4core.create("chartpais", am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0;

      // Add data
      chart.data = data;

      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "personas";
      series.dataFields.radiusValue = "personas";
      series.dataFields.category = "id_pais";
      series.slices.template.cornerRadius = 6;
      series.colors.step = 3;

      series.labels.template.disabled = true;
      series.ticks.template.disabled = true;

      series.hiddenState.properties.endAngle = -90;

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "left";
      chart.legend.width = 100;
      chart.legend.labels.template.maxWidth = 150;
      chart.legend.labels.template.truncate = true;
      chart.legend.markers.template;
      var markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 10;
      markerTemplate.height = 10;

      this.chart = chart;

      series.slices.template.events.on("hit", function(ev) {
         this.openAlert('prompt');
         this.setState({
            columns: [ev.target._dataItem.category],
            data: [[ev.target._dataItem.value]]
         })
       }, this);

      // chart.legend = new am4charts.Legend();
   }

   onCancel(key) {
      this.setState({ [key]: false })

   }

   openAlert(key) {
      this.setState({ [key]: true });
   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      const { prompt } = this.state;
      const columns = this.state.columns;
      const data = this.state.data;
      const options = {
			filterType: 'dropdown',
			responsive: 'scrollMaxHeight'
		};
      return (
         <RctCardContent>
            <div id="chartpais" style={{ width: "100%", height: "250px" }}>
            <SweetAlert
                     btnSize="sm"
                     show={prompt}
                     confirmBtnText="Cancelar"
                     confirmBtnBsStyle="danger"
                     title="Detalle"
                     onConfirm={() => this.onCancel('prompt')}
               >
                  <MUIDataTable
                     title={"pais"}
                     data={data}
                     columns={columns}
                     options={options}
                  />

               </SweetAlert>
               </div>
         </RctCardContent>
      );
   }
}

export default ChartPais;