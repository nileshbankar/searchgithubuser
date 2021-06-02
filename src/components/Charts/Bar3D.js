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
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

const ChartComponent = ({ data }) => {
  const [charData, setChartData] = useState(data);

  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most Forked",
        // //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",
        // //Set the x-axis name
        xAxisName: "Repos",
        // //Set the y-axis name
        yAxisName: "Forks",
        // numberSuffix: "K",
        // //Set the theme for your chart
        theme: "fusion",
        decimals: 0,
        pieRadius: "45%",
      },
      // Chart Data
      data: charData,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
