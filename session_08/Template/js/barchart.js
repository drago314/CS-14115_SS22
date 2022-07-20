
/*****************************************/
/*   DRAW BAR CHART - ALREADY COMPLETE   */
/*****************************************/

// CHART AREA

let margin = {top: 40, right: 20, bottom: 40, left: 90},
    width = $('#chart-area').width() - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


let svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// AXIS 

let x = d3.scaleBand()
	.range([0, width])
	.paddingInner(0.1);

let y = d3.scaleLinear()
    .range([height, 0]);

let xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(function(d) { return shortenString(d, 20); });

let yAxis = d3.axisLeft()
    .scale(y);

let xAxisGroup = svg.append("g")
    .attr("class", "x-axis axis");

let yAxisGroup = svg.append("g")
  .attr("class", "y-axis axis");



function renderBarChart(data) {

	// Check array length (top 5 attractions)
	if(data.length > 5) {
		errorMessage("Max 5 rows");
		return;
	}

	// Check object properties
	if(!data[0].hasOwnProperty("Visitors") || !data[0].hasOwnProperty("Location") || !data[0].hasOwnProperty("Category")) {
		errorMessage("The Object properties are not correct! An attraction should include at least: 'Visitors', 'Location', 'Category'");
		return;
	}

	x.domain(data.map( d => d.Location));
    y.domain([0, d3.max(data, d => d.Visitors)]);

  // ---- DRAW BARS ----
    let bars = svg.selectAll(".bar")
        .remove()
        .exit()
        .data(data)

    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Location))
        .attr("y", d => y(d.Visitors))
        .attr("height", d => (height - y(d.Visitors)))
        .attr("width", x.bandwidth())
		.on("mouseover", function(event, d) {

			// explore event

            //Show the tooltip
            //d3.select("")...
		})
		.on("mouseout", function(d) {

            //Hide the tooltip
            // d3.select("
		});


	// ---- DRAW AXIS	----
	xAxisGroup = svg.select(".x-axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);

  yAxisGroup = svg.select(".y-axis")
      .call(yAxis);

  svg.select("text.axis-title").remove();
  svg.append("text")
  	.attr("class", "axis-title")
		.attr("x", -5)
		.attr("y", -15)
		.attr("dy", ".1em")
		.style("text-anchor", "end")
		.text("Annual Visitors");
}


function errorMessage(message) {
	console.log(message);
}

function shortenString(content, maxLength){
	// Trim the string to the maximum length
	let trimmedString = content.substr(0, maxLength);

	// Re-trim if we are in the middle of a word
	trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

	return trimmedString;
}





// TODO Tooltip example


// tooltip
// vis.tooltip = d3.select("body").append('div')
// 	.attr('class', "tooltip")
// 	.attr('id', 'mapTooltip')
//


// .on('mouseover', function (event, d) {
// 	d3.select(this)
// 		.attr("fill", 'rgba(181,0,0,0.48)')
// 		.attr("stroke", 'darkred')
//
// 	console.log(d)
// 	vis.tooltip
// 		.style("opacity", 1)
// 		.style("left", event.pageX + 20 + "px")
// 		.style("top", event.pageY + "px")
// 		.html(`
//                         <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 20px">
//                             <h3>${d.properties.name}<h3>
//                             <h4> Name: ${vis.countryInfo[d.properties.name].name}</h4>
//                             <h4> Category: ${vis.countryInfo[d.properties.name].category}</h4>
//                             <h4> Color: ${vis.countryInfo[d.properties.name].color}</h4>
//                             <h4> Value: ${vis.countryInfo[d.properties.name].value}</h4>
//                         </div>`);
