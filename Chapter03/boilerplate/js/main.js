// Francisco Ocampo, Geography 575

// code from main.js
function initialize(){	// runs initialize function
	cities();
	loadData();
//	debugAjax();
};

// create table
function cities(){

// end code from main.js

var cityPop = [				// create array object(s) `cityPop`
	{				// sets properties of array object
		city: 'Madison',	// cityPop.city = 'Madison'
		population: 233209	// cityPop.population = 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];					// ends declaration of objects

//code from main.js
	var table = document.createElement("table");

	var headerRow = document.createElement("tr");
	table.appendChild(headerRow); // append header to table

	headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>") // create property headers
	

    cityPop.forEach(function(cityObject){ // loop per city

		var rowHtml = "<tr><td>" + cityObject.city + "</td><td>" + cityObject.population + "</td></tr>";

		table.insertAdjacentHTML('beforeend',rowHtml); // append each row to table
	})
	
	document.querySelector("#mydiv").appendChild(table); // append table to `#mydiv`

    addColumns(cityPop);	// calling function addColumns(cityPop)
    addEvents();		// calling for event functions

};	// closes function cities
//end of main.js

//add cityPop columns to table
function addColumns(cityPop){

	var rows = document.querySelectorAll("tr")	// select all rows
    
    document.querySelectorAll("tr").forEach(function(row,i){			// each row adds new column to city size

    	if (i == 0){								// if the header row,

    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');	// add header for city size;
    	} else {								// if NOT header row,

    		var citySize;							// add category:

    		if (cityPop[i-1].population < 100000){				// if cityPop.population < 100,000, mark as Small
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){			// if cityPop.population < 500,000, mark as Medium
    			citySize = 'Medium';

    		} else {							// otherwise, mark as Large;
    			citySize = 'Large';
    		};
			// append cell to header row
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');	
    	};	// ends if statement
    });	// ends function
};	// ends function addColumns

function addEvents(){	// adds global listener(s)
	
	table = document.querySelector("table");	// select table

	// when mousing over table, set color randomly between 0-255 (8-bit)
	document.querySelector("table").addEventListener("mouseover", function(){
		// start of statement rgb(x,y,z)
		var color = "rgb(";
		// create 3 RGB values
		for (var i=0; i<3; i++){
			// create random integer 0 through 255
			var random = Math.round(Math.random() * 255);
			// assign random integer to color
			color += random;
			// if the first 2 instances, generate another color
			if (i<2){
				color += ",";
			// if the third instance, end color generator
			} else {
				color += ")";
			};
		};	// closes the loop
		// asign the color value to table
		table.style.color = color;
	});	// ends color function
	
	// adds click function
	function clickme(){
		alert('Hey, you clicked me!');
	};
	// adds click listener to table
	document.querySelector("table").addEventListener("click", clickme)
};

document.addEventListener('DOMContentLoaded', initialize)	// call initialization upon document loading


// assignment 3
// add initialization for loadData and debugAjax


function loadData(){
	// declare cities
	var cities;
	// web browser allowed HTTP request
	fetch("data/MegaCitiesData.geojson")
		.then(function(response){
			return response.json();
		})
		.then(function(response) {
			cities = response;
			console.log(cities);
		})
}
/*
function debugAjax(){
	// declare myData
	var myData;

	fetch("data/MegaCitiesData.geojson")
		.then(function(response){
			return response.json();
		})
		.then(debugCallback) // pulls data into callback function
};
*/
// define callback function : function calls another function
function debugCallback(myData){
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend',"GeoJSON data: " + JSON.stringify(myData));
};
