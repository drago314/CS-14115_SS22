
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);

dataFiltering();


function dataFiltering() {
	let attractions = attractionData;

	attractions.sort((a,b) => {
		return b.Visitors - a.Visitors;
	})

	let parkArray = []
	let selectBox = document.getElementById("attraction-category");
	let selectedValue = selectBox.options[selectBox.selectedIndex].value;

	for (const element of attractions){
		if (selectedValue == "all") {
			parkArray.push(element)
		}
		else if (selectedValue == "Theme Park" && element["Category"] == "Theme Park") {
			parkArray.push(element)
		}
		else if (selectedValue == "Water Park" && element["Category"] == "Water Park") {
			parkArray.push(element)
		}
		else if (selectedValue == "Museum" && element["Category"] == "Museum") {
			parkArray.push(element)
		}
		if (parkArray.length == 5) {
			break;
		}
	}
	renderBarChart(parkArray)

	/* **************************************************
	 *
	 * ADD YOUR CODE HERE (ARRAY/DATA MANIPULATION)
	 *
	 * CALL THE FOLLOWING FUNCTION TO RENDER THE BAR-CHART:
	 *
	 * renderBarChart(data)
	 *
	 * - 'data' must be an array of JSON objects
	 * - the max. length of 'data' is 5
	 *
	 * **************************************************/

}