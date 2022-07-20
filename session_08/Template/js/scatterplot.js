// CHART AREA

let marginScatter = {top: 40, right: 20, bottom: 40, left: 90},
    widthScatter = 500 - marginScatter.left - marginScatter.right,
    heightScatter = 400 - marginScatter.top - marginScatter.bottom;


let svgScatter = d3.select("#scatter-chart-area").append("svg")
    .attr("width", widthScatter + marginScatter.left + marginScatter.right)
    .attr("height", heightScatter + marginScatter.top + marginScatter.bottom)
    .append("g")
    .attr("transform", "translate(" + marginScatter.left + "," + marginScatter.top + ")");

let cleanedData = []

attractionData.forEach (function (attraction, index) {
    attraction.Rating = +attraction.Rating
    attraction["Revenue"] =  attraction.Visitors * 5

    cleanedData.push(attraction)
})

let circles = svgScatter.selectAll("attraction-circle").data(cleanedData)

circles.enter()
    .append("circle")
    .attr("id", (d,i) => {
        return "circle_" + i
    })
    .attr("r", d => {
        if (d.Entry == "Paid") {
            return 4
        }
        else {
            return 6
        }
    })
    .attr("cx", (d) => {
        return d.Rating * 150 - 450
    })
    .attr("cy", (d) => {
        return d.Revenue / 1000000
    })
    .attr("fill", (d) => {
        if (d.Category == "Theme Park") {
            return "#FF0000"
        }
        if (d.Category == "Water Park") {
            return "#00FF00"
        }
        if (d.Category == "Museum") {
            return "#0000FF"
        }
    })

//Add a svg tag into the HTML for