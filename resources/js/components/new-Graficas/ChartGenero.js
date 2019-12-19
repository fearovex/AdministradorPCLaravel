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

class ChartGenero extends Component {
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

      let chart = am4core.create("chartgenero", am4charts.PieChart3D);
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries3D());
      pieSeries.dataFields.category = "genero";
      pieSeries.dataFields.value = "personas";

      chart.data = data;

      // Let's cut a hole in our Pie chart the size of 30% the radius
      // chart.innerRadius = am4core.percent(30);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.slices.template
         // change the cursor on hover to make it apparent the object can be interacted with
         .cursorOverStyle = [
            {
               "property": "cursor",
               "value": "pointer"
            }
         ];

      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
      shadow.opacity = 0;

      // Create hover state
      let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

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
         <div id="chartgenero" style={{ width: "100%", height: "150px" }}>
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
                     title={"genero"}
                     data={data}
                     columns={columns}
                     options={options}
                  />

               </SweetAlert>
         </div>
      );
   }
}

export default ChartGenero;