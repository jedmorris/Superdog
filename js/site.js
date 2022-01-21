const events = [{
		id: 1,
		event: "ComicCon",
		city: "New York",
		state: "New York",
		attendance: 240000,
		date: "06/01/2017",
	},
	{
		id: 2,
		event: "ComicCon",
		city: "New York",
		state: "New York",
		attendance: 250000,
		date: "06/01/2018",
	},
	{
		id: 3,
		event: "ComicCon",
		city: "New York",
		state: "New York",
		attendance: 257000,
		date: "06/01/2019",
	},
	{
		id: 4,
		event: "ComicCon",
		city: "San Diego",
		state: "California",
		attendance: 130000,
		date: "06/01/2017",
	},
	{
		id: 5,
		event: "ComicCon",
		city: "San Diego",
		state: "California",
		attendance: 140000,
		date: "06/01/2018",
	},
	{
		id: 6,
		event: "ComicCon",
		city: "San Diego",
		state: "California",
		attendance: 150000,
		date: "06/01/2019",
	},
	{
		id: 7,
		event: "HeroesCon",
		city: "Charlotte",
		state: "North Carolina",
		attendance: 40000,
		date: "06/01/2017",
	},
	{
		id: 8,
		event: "HeroesCon",
		city: "Charlotte",
		state: "North Carolina",
		attendance: 45000,
		date: "06/01/2018",
	},
	{
		id: 9,
		event: "HeroesCon",
		city: "Charlotte",
		state: "North Carolina",
		attendance: 50000,
		date: "06/01/2019",
	},
];

// builds a list of distinct cities for drop down 
function buildDropDown() {

	// grab the event dropdown to add cities too	
	let eventDD = document.getElementById("eventDropdown");
	eventDD.innerHTML = "";

	// load our links from a template
	let ddTemplate = document.getElementById("cityDD-template");

	let currentEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

	// get a list of all the values at an index (total cities w/duplicates)
	let cities = currentEvents.map((e) => e.city);
	// get a distinct list of cities by filtering the array
	let distinctCities = [...new Set(cities)];

	// use the ddTemplate
	let ddItemTemplate = document.importNode(ddTemplate.content, true);
	let li = ddItemTemplate.querySelector("li");
	let ddItem = li.querySelector("a");
	ddItem.setAttribute("data-city", "All");
	ddItem.innerText = "All";
	eventDD.appendChild(li);

	// add distinctCities to dropdown
	for (let i = 0; i < distinctCities.length; i++) {
		ddItemTemplate = document.importNode(ddTemplate.content, true);
		li = ddItemTemplate.querySelector("li");
		ddItem = li.querySelector("a");
		ddItem.setAttribute("data-city", distinctCities[i]);
		ddItem.innerText = distinctCities[i];
		eventDD.appendChild(li);
	}
	// display the stats
	displayStats(currentEvents);
}

function displayStats(filteredEvents) {
	let total = 0;
	let average = 0;
	let most = 0;
	let least = -1;
	let currentAttendance = 0;

	for (let i = 0; i < filteredEvents.length; i++) {

		currentAttendance = filteredEvents[i].attendance
		total += currentAttendance;

		// most calculation
		if (most < currentAttendance) {
			most = currentAttendance
		}
		// least calculation
		if (currentAttendance <= least) {
			least = currentAttendance;
		}


	}

	let eventCounter = filteredEvents.length;
	average = (total / eventCounter)



	document.getElementById("total").innerHTML = total.toLocaleString();
	document.getElementById("average").innerHTML = average.toLocaleString();
	document.getElementById("most").innerHTML = most.toLocaleString();
	document.getElementById("least").innerHTML = least.toLocaleString();
}