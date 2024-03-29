// STEP 1 - Include Dependencies
// Include react
import React, { useState } from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

const Doughnut2d = ({ data }) => {
  const [charData, setChartData] = useState(data);

  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Languages",
        // //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",
        // //Set the x-axis name
        // xAxisName: "Country",
        // //Set the y-axis name
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        // //Set the theme for your chart
        theme: "candy",
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
      },
      // Chart Data
      data: charData,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
