import React, {useEffect}  from 'react'
import { useLocation } from "react-router-dom";

import * as d3 from "d3";


function ScoreGraph(){
    const location = useLocation();

    const score = localStorage.getItem("Score");

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
    //    console.log(location.search); // result: '?query=abc'
        console.log(location.state.graphPoints); // result: 'some_value'
        createGraph();
    }, [location]);

    const createGraph = async () => {
    let data=location.state.graphPoints;
    data.forEach((d) => {
        d.date=d[0];
        d.value=d[1];
    });

         // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#graph_plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .style("stroke","white")
    .attr("transform", `translate(${margin.left},     ${margin.top})`);
    


       // Add X axis and Y axis
   var x = d3.scaleLinear().range([0, width]);
   var y = d3.scaleLinear().range([height, 0]);
   x.domain([0, d3.max(data, (d) => { return d.date; })]);
   y.domain([d3.min(data,(d)=>{return d.value;}), d3.max(data, (d) => { return d.value; })]);
   svg.append("g")
   .attr("transform", `translate(0, ${height})`)
   .call(d3.axisBottom(x));
   svg.append("g")
   .call(d3.axisLeft(y));


   var valueLine = d3.line()
   .x((d) => { return x(d.date); })
   .y((d) => { return y(d.value); });

        svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine);

    }

    return (<>
        <div style={{color:"white" , padding:"5%"}}>
            your Score is : {score}
        </div>
        <br></br>

       <div id='graph_plot'>
       
       </div>
       
       </>
      )
}

export default ScoreGraph;

