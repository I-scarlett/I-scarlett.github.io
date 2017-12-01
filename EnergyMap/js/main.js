
//global variables
var keyArray = ["Production Share (Percentile)","Production Rank","Consumption per Capital (Mbtu)","Consumption per Capital Rank","Expenditures per Capital (Dollars)","Expenditures per Capital Rank"];
var expressed = keyArray[0];
var colorize;
var mapWidth = 800, mapHeight = 500; //map frame dimensions
var chartWidth = 300, chartHeight = 500; //chart frame dimensions

window.onload = initialize(); //start script once HTML is loaded

function initialize(){ //the first function called once the html is loaded
	setMap();
};

function setMap(){ //set choropleth map parameters

	//create a title for the page
	 var title = d3.select("body")
		.append("h1")
		.text("US States Energy Choropleth Map 2016");



	//create a new svg element with the above dimensions
	var map = d3.select("body")
		.append("svg")
		.attr("width", mapWidth)
		.attr("height", mapHeight)
		.attr("class", "map");

	//create State albers equal area conic projection, centered on US
	var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([mapWidth / 2, mapHeight/ 2]);


	//create svg path generator using the projection
	var path = d3.geo.path()
		.projection(projection);

	var graticule = d3.geo.graticule()
		.step([10, 10]); //place graticule lines every 10 degrees of longitude and latitude


	queue() //use queue.js to parallelize asynchronous data loading for cpu efficiency
		.defer(d3.csv, "data/Energy_by_state_2016.csv") //load attributes data from csv
		.defer(d3.json, "data/state.topojson") //load geometry from countries topojson
		.await(callback);

	function callback(error, csvData, state){
		colorize = colorScale(csvData); //retrieve color scale generator

		//variables for csv to json data transfer
		var jsonProvs = state.objects.US_States.geometries;

		//loop through csv data to assign each csv state's values to json state properties
		for (var i=0; i<csvData.length; i++) {
			var csvState = csvData[i]; //the current state's attributes
			var csvName = csvState.STATE_ABBR; //STATE_ABBR code

			//loop through json states to assign csv data to the right state
			for (var a=0; a<jsonProvs.length; a++){

				//where STATE_ABBR codes match, attach csv data to json object
				if (jsonProvs[a].properties.STATE_ABBR == csvName){

					//one more for loop to assign all key/value pairs to json object
					for (var key in keyArray){
						var attr = keyArray[key];
						var val = parseFloat(csvState[attr]);
						jsonProvs[a].properties[attr] = val;
					};

					jsonProvs[a].properties.name = csvState.name; //set prop
					break; //stop looking through the json states
				};
			};
		};


		//add states to map as enumeration units colored by data
		var states = map.selectAll(".states")
			.data(topojson.feature(state, state.objects.US_States).features) //bind states data to path element
			.enter() //create elements
			.append("g") //give each state its own g element
			.attr("class", "states") //assign class for additional styling
			.append("path")
			.attr("class", function(d) { return d.properties.STATE_ABBR })
			.attr("d", path) //project data as geometry in svg
			.style("fill", function(d) { //color enumeration units
				return choropleth(d, colorize);
			})
			.on("mouseover", highlight)
			.on("mouseout", dehighlight)
			.on("mousemove", moveLabel)
			.append("desc") //append the current color
				.text(function(d) {
					return choropleth(d, colorize);
				});

		createDropdown(csvData); //create the dropdown menu
		setChart(csvData, colorize); //create the bar chart
	};
};

function createDropdown(csvData){
	//add a select element for the dropdown menu
	var dropdown = d3.select("body")
		.append("div")
		.attr("class","dropdown") //for positioning menu with css
		.html("<h3>Explore Data:</h3>")
		.append("select")
		.on("change", function(){ changeAttribute(this.value, csvData) }); //changes expressed attribute

	//create each option element within the dropdown
	dropdown.selectAll("options")
		.data(keyArray)
		.enter()
		.append("option")
		.attr("value", function(d){ return d })
		.text(function(d) {
			d = d[0].toUpperCase() + d.substring(1,3) + d.substring(3);
			return d
		});
};

function setChart(csvData, colorize){

	//create a second svg element to hold the bar chart
	var chart = d3.select("body")
		.append("svg")
		.attr("width", chartWidth)
		.attr("height", chartHeight)
		.attr("class", "chart");

	//create a text element for the chart title
	var title = chart.append("text")
		.attr("x", 10)
		.attr("y", 25)
		.attr("class", "chartTitle")


	//set bars for each state
	var bars = chart.selectAll(".bar")
		.data(csvData)
		.enter()
		.append("rect")
		.sort(function(a, b){return a[expressed]-b[expressed]})
		.attr("class", function(d){
			return "bar " + d.STATE_ABBR;
		})
		.attr("height", chartHeight / csvData.length - 1)
		.on("mouseover", highlight)
		.on("mouseout", dehighlight)
		.on("mousemove", moveLabel);

	//adjust bars according to current attribute
	updateChart(bars, csvData.length);
};

function colorScale(csvData){
    var colorRange;

    if (expressed == "Production Share (Percentile)"||expressed == "Production Rank" ) {
        colorRange = [
            "#edf8fb",
            "#ccece6",
            "#99d8c9",
            "#66c2a4",
            "#41ae76",
            "#238b45",
		];
    } else if (expressed == "Consumption per Capital (Mbtu)"||expressed == "Consumption per Capital Rank" ){
        colorRange = [
            "#fef0d9",
            "#fdd49e",
            "#fdbb84",
            "#fc8d59",
            "#ef6548",
            "#d7301f",
		];
    }
    else {
        colorRange = [
            "#f0f9e8",
            "#ccebc5",
            "#a8ddb5",
            "#7bccc4",
            "#4eb3d3",
            "#2b8cbe",
		];
    }

	//create quantile classes with color scale
	var color = d3.scale.quantile() //designate quantile scale generator
		.range(colorRange);

	//build array of all currently expressed values for input domain
	var domainArray = [];
	for (var i in csvData){
		domainArray.push(Number(csvData[i][expressed]));
	};

	//for equal-interval scale, use min and max expressed data values as domain
	// color.domain([
	// 	d3.min(csvData, function(d) { return Number(d[expressed]); }),
	// 	d3.max(csvData, function(d) { return Number(d[expressed]); })
	// ]);

	//for quantile scale, pass array of expressed values as domain
	color.domain(domainArray);

	return color; //return the color scale generator
};

function choropleth(d, colorize){

	//get data value
	var value = d.properties ? d.properties[expressed] : d[expressed];
	//if value exists, assign it a color; otherwise assign gray
	if (value) {
		return colorize(value); //colorize holds the colorScale generator
	} else {
		return "#ccc";
	};
};

function changeAttribute(attribute, csvData){

	//change the expressed attribute
	expressed = attribute;
	colorize = colorScale(csvData);

	//recolor the map
	d3.selectAll(".states") //select every state
		.select("path")
		.style("fill", function(d) { //color enumeration units
			return choropleth(d, colorize); //->
		})
		.select("desc") //replace the color text in each state's desc element
			.text(function(d) {
				return choropleth(d, colorize); //->
			});

	//re-sort the bar chart
	var bars = d3.selectAll(".bar")
		.sort(function(a, b){
			return a[expressed]-b[expressed];
		})
		.transition() //this adds the super cool animation
		.delay(function(d, i){
			return i * 10
		});

	//update bars according to current attribute
	updateChart(bars, csvData.length);
};

function updateChart(bars, numbars){
	//style the bars according to currently expressed attribute
	bars.attr("width", function(d, i){
            if (expressed == "Production Share (Percentile)") {
                return Number(d[expressed])*15
            } else if (expressed == "Consumption per Capital (Mbtu)"){
                return Number(d[expressed])*0.25
            } else if (expressed == "Expenditures per Capital (Dollars)"){
                return Number(d[expressed])*0.02
            } else return Number(d[expressed])*3.5;
    })
		.attr("x", function(d, i){

         if (expressed == "Production Share (Percentile)") {
             return chartWidth - Number(d[expressed])*15
            } else if (expressed == "Consumption per Capital (Mbtu)"){
             return chartWidth - Number(d[expressed])*0.25
            } else if (expressed == "Expenditures per Capital (Dollars)"){
             return chartWidth - Number(d[expressed])*0.02
            } else return chartWidth - Number(d[expressed])*3.5;
		})
		.attr("y", function(d, i){
			return chartHeight + 40 - i * (chartHeight / numbars);
		})
		.style("fill", function(d){
			return choropleth(d, colorize);
		});

	//update chart title

    d3.select(".chartTitle")
		.text("Number of "+
			expressed[0].toUpperCase() +
			expressed.substring(1,3) +
			expressed.substring(3) + " " )
        .call(wrap,chartWidth);


};


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = 0,
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}


function format(value){

	//format the value's display according to the attribute
	if (expressed != "Population"){
		value = "$"+roundRight(value);
	} else {
		value = roundRight(value);
	};

	return value;
};

function roundRight(number){

	if (number>=100){
		var num = Math.round(number);
		return num.toLocaleString();
	} else if (number<100 && number>=10){
		return number.toPrecision(4);
	} else if (number<10 && number>=1){
		return number.toPrecision(3);
	} else if (number<1){
		return number.toPrecision(2);
	};
};

function highlight(data){

	//json or csv properties
	var props = data.properties ? data.properties : data;

	d3.selectAll("."+props.STATE_ABBR) //select the current state f in the DOM
		.style("fill", "gray"); //set the enumeration unit fill to black

	var labelAttribute = "<h1>"+props[expressed]+
		"</h1><br><b>"+expressed+"<br>"+"in "+props.STATE_NAME+"</b>"; //label content
	var labelName = props.name //html string for name to go in child div

	//create info label div
	var infolabel = d3.select("body")
		.append("div") //create the label div
		.attr("class", "infolabel")
		.attr("id", props.STATE_ABBR+"label") //for styling label
		.html(labelAttribute) //add text
		.append("div") //add child div for feature name
		.attr("class", "labelname") //for styling name
		.html(labelName); //add feature name to label
};

function dehighlight(data){

	//json or csv properties
	var props = data.properties ? data.properties : data;
	var prov = d3.selectAll("."+props.STATE_ABBR); //designate selector variable for brevity
	var fillcolor = prov.select("desc").text(); //access original color from desc
	prov.style("fill", fillcolor); //reset enumeration unit to orginal color

	d3.select("#"+props.STATE_ABBR+"label").remove(); //remove info label
};

function moveLabel() {

	//horizontal label coordinate based mouse position stored in d3.event
	var x = d3.event.clientX < window.innerWidth - 200 ? d3.event.clientX+10 : d3.event.clientX-210;
	//vertical label coordinate
	var y = d3.event.clientY < window.innerHeight - 100 ? d3.event.clientY-75 : d3.event.clientY-175;

	d3.select(".infolabel") //select the label div for moving
		.style("margin-left", x+"px") //reposition label horizontal
		.style("margin-top", y+"px"); //reposition label vertical
};
