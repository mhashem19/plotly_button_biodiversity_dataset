//Read the json file
function displayCharts(id){
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var metaData = data.metadata.filter(obj => obj.id == id)[0]
        var panel = d3.selectAll("#sample-metadata")
        panel.html(" ")
        Object.entries(metaData).forEach(([key,value])=> {

            panel.append("h5").text(key+": "+value)
        })
//Filtering the data.samples
        filterData = data.samples.filter(obj => obj.id == id)[0]
        console.log(filterData)
        console.log(filterData.otu_ids)

        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);
// getting 10 otu out of all ids
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        var idOtu = idValues.map(d => "OTU " + d)
// setting the lables for the plot
        var labels = samples.otu_labels.slice(0, 10);

        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        console.log(trace)
        var data = [trace];
//settign plot layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        Plotly.newPlot("bar", data, layout)
//gettign the axises for the bubble
        var bubleData = {
            x:samples.otu_ids, 
            y:samples.sample_values,
            text:samples.otu_labels,
            marker:{
                color: samples.otu_ids,
                size:samples.sample_values,
            },
            mode:"markers"
        }
        var bubllayout = {
            title: "bacteria cultures"
        }
        Plotly.newPlot("bubble", [bubleData], bubllayout)
        console.log(metaData.wfreq)
var washingData = [
    {
    domain: { x: [0, 1], y: [0, 1] },
    value: parseFloat(metaData.wfreq),
    title: { text: `Weekly Washing Frequency ` },
    type: "indicator",
    
    mode: "gauge+number",
    gauge: { axis: { range: [null, 9] },
             steps: [
              { range: [0, 2], color: "yellow" },
              { range: [2, 4], color: "orange" },
              { range: [4, 6], color: "pink" },
              { range: [6, 8], color: "blue" },
              { range: [8, 9], color: "green" },
            ]}

    }
  ];
  var layout_gauge = { 
      width: 700, 
      height: 600, 
      margin: { t: 20, b: 40, l:100, r:100 } 
    };
  Plotly.newPlot("gauge", washingData, layout_gauge);

    })
}

// creatign funtion to render the data
function optionChanged(id){

    displayCharts(id)
}
//settign the dropwon calling the funtion
d3.json("samples.json").then((data)=> {

var dropDown = d3.selectAll("#selDataset")
data.names.forEach(element => {
  
    dropDown.append("option").text(element).property("value", element)
});
displayCharts(data.names[0])
})
