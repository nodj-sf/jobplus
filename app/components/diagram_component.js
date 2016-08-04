import React, { Component } from "react";
import rd3, { BarChart } from "rd3";


const barGraphData = [
  {
    "name": "Series A",
    "values": [
      { "x": 1, "y": 91  },
      { "x": 2, "y": 290 },
      { "x": 3, "y": 25 },
    ]
  },
  {  
    "name": "Series B",
    "values": [
      { "x": 1, "y": 9   },
      { "x": 2, "y": 49  },
      { "x": 3, "y": 20 },
    ]
  },
  {  
    "name": "Series C",
    "values": [
      { "x": 1, "y": 14  },
      { "x": 2, "y": 77  },
      { "x": 3, "y": 70 },
    ]
  }
];


class DataDiagram extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="chartContainer">
        <BarChart
          data={barGraphData}
          width={500}
          height={300}
          title="Job Prevalence"
          xAxisLabel="Value"
          yAxisLabel="Available Positions" />
      </div>
    );
  }
}

export default DataDiagram;



// var BarChart = rd3.BarChart;



// class Chart extends Component {
//   render() {
//     return  (
//       <BarChart
//         data={barData}
//         width={500}
//         height={300}
//         title="Job Prevalence"
//         xAxisLabel="Value"
//         yAxisLabel="Available Positions" />
//     );
//   }
// };


// ReactDOM.render(
//   <Chart />,
//   document.getElementById('container')
// );

