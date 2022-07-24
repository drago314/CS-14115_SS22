
// SVG Size
let width = 700,
	height = 500;


// Load CSV file
d3.csv("data/wealth-health-2014.csv", d => {
	d.LifeExpectancy = Number(d.LifeExpectancy)
	d.Income = Number(d.Income)
	d.Population = Number(d.Population)
	return d;
}).then( data => {

	let sortedData = data.sort( (a,b) => {
		return b.Population - a.Population;
	});

	drawChart(sortedData)
});

function drawChart(data){
	// do whatever
	let svg = d3.select("#chart-area").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g");

	let circles = svg.selectAll("country-circles").data(data)

	// Returns the min. and max. value in a given array (= [6900,25000])
	let Xextent = d3.extent(data, function(d) {
		return d.Income;
	})
	let Yextent = d3.extent(data, function(d) {
		return d.LifeExpectancy
	})
	let Rextent = d3.extent(data, function (d) {
		return d.Population
	})

	let padding = 30;

	let XScale = d3.scaleLog()
		.domain(Xextent)
		.range([padding, width - padding]);
	let YScale = d3.scaleLinear()
		.domain(Yextent)
		.range([height - padding, padding]);

	let RScale = d3.scaleLinear()
		.domain(Rextent)
		.range([8, 30])

	circles.enter()
		.append("circle")
		.attr("id", (d,i) => {
			return "circle_" + i
		})
		.attr("class", "country-circle")
		.attr("r", (d) => {
			return RScale(d.Population)
		})
		.attr("cx", (d) => {
			return XScale(d.Income)
		})
		.attr("cy", (d) => {
			return YScale(d.LifeExpectancy)
		})
		.attr("fill", (d) => {
			if (d.Region.includes("Europe")) {
				return "purple"
			}
			if (d.Region.includes("Africa")){
				return "red"
			}
			if (d.Region.includes("Asia")) {
				return "green"
			}
			if (d.Region.includes("America")) {
				return "blue"
			}
			return "yellow"
		})
		.attr("stroke", "black")
		.attr("opacity", 0.75)
		.on("mouseover", function (event, d) {
			d3.select(this)
				.transition()
				.duration(250)
				.attr("stroke-width", function(d) {
					if ((d3.select(this).attr("r") / 2.5) < 6) {
						return d3.select(this).attr("r") / 2.2
					}
					else {
						return 6
					}
				})

			d3.select("#tooltip")
				.style("width", d.Country.length * 9 + "px")
				.style("height", "30px")
				.style("left", event.offsetX + 130 + "px")
				.style("top", event.offsetY + 40 + "px")
				.style("opacity", 100)
				.append("p")
				.attr("id", "tooltip-text")
				.append("text")
				.style("font-size", 15 + "px")
				.text(d.Country)
		})
		.on("mouseout", function(event, d) {
			d3.select("#tooltip-text")
				.remove()
			d3.select("#tooltip")
				.style("opacity", 0)
				.html(``)
			d3.select(this)
				.transition()
				.duration(250)
				.attr("stroke-width", 1)
		})
		.on("click", function(event, d) {
			d3.select("#tooltip-text")
				.remove()

			d3.select("#tooltip")
				.style("height", 100 + "px")
				.style("width", 400 + "px")
				.style("left", event.offsetX - 20 + "px")
				.style("top", event.offsetY - 20 + "px")
				.html(`
					<table>
						<thead></thead>
						<tbody>
							<tr><th>${d.Country}</th></tr>
							<tr><td>Income: </td><td>${d.Income}</td></tr>
							<tr><td>Life Expectancy:    </td><td>${d.LifeExpectancy}</td></tr>
							<tr><td>Population: </td><td>${d.Population}</td></tr>
						</tbody>
				`)
		})

	//The Axis
	let xAxis = d3.axisBottom()
		.scale(XScale);

	let yAxis = d3.axisLeft()
		.scale(YScale)

	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + (height - padding + 10) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);
}

function  changeRandomColor() {
	let rand =  Math.floor(Math.random() * 188)
	d3.select("#circle_" + rand)
		.attr("fill", "black")
}
function collapseData() {
	d3.selectAll(".country-circle")
		.transition()
		.duration(500)
		.attr("cx", 40)
		.attr("cy", 460)
}

