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

class ChartOS extends Component {
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
         this.handleChart(this.props.data)
         this.setState({
            props: this.props.data
         })
      }
   }

   async handleChart(data = []) {
      let chart = am4core.create("chartos", am4charts.XYChart);
      // chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      chart.data = data;

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "os";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries3D());
      series.dataFields.valueX = "personas";
      series.dataFields.categoryY = "os";
      series.name = "Personas";
      series.columns.template.propertyFields.fill = "color";
      series.columns.template.tooltipText = "{valueX}";
      series.columns.template.column3D.stroke = am4core.color("#fff");
      series.columns.template.column3D.strokeOpacity = 0.2;

      pieSeries.slices.template.events.on("hit", function(ev) {
         this.openAlert('prompt');
         this.setState({
            columns: [ev.target._dataItem.category],
            data: [[ev.target._dataItem.value]]
         })
       }, this);
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
            <div id="chartos" style={{ width: "100%", height: "300px" }}>
            <SweetAlert
                     btnSize="sm"
                     show={prompt}
                     showCancel
                     confirmBtnText="Cancelar"
                     confirmBtnBsStyle="danger"
                     title="Detalle"
                     onConfirm={() => this.handleSubmit(event)}
                     onCancel={() => this.onCancel('prompt')}
               >
                  <MUIDataTable
                     title={"os"}
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

export default ChartOS;