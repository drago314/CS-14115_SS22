let ride_1 = {
    "ID": "1234",
    "Name": "Superman",
    "Price": 30,
    "Opening Days": ["Sunday", "Tuesday", "Thursday"],
    "CanChildrenRide": false
}

let ride_2 = {
    "ID": "2345",
    "Name": "Batman",
    "Price": 20,
    "Opening Days": ["Saturday", "Tuesday", "Thursday"],
    "CanChildrenRide": false
}

let ride_3 = {
    "ID": "3456",
    "Name": "Merry-Go-Round",
    "Price": 10,
    "Opening Days": ["Sunday", "Tuesday", "Thursday", "Saturday"],
    "CanChildrenRide": true
}

amusementRides = [ride_1, ride_2, ride_3]

// Calling the function
let amusementRidesDouble = doublePrices(amusementRides);

// Implementation of the function
function doublePrices(amusementRides) {
    amusementRides.forEach( (element, index) => {
        if (index != 1) {
            element["Price"] = element["Price"] * 2
        }
    })
    return amusementRides
}

function debugAmusementRides(amusementRides) {
    amusementRides.forEach( (element, index) => {
        console.log(`${element["Name"]} now costs \$${element["Price"]} to ride`)
    })
}

debugAmusementRides(amusementRidesDouble)

let html = ''
amusementRidesDouble.forEach( (element, index) => {
    html += `<h1>${element["Name"]}: \$${element["Price"]}</h1>`
})
document.getElementById("content-1").innerHTML = html;
