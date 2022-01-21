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
	displayData();
}

// display total stats to the dropdown
function displayStats(filteredEvents) {
	let total = 0;
	let average = 0;
	let most = 0;
	let least = -1;
	let currentAttendance = 0;

	for (let i = 0; i < filteredEvents.length; i++) {

		// calc attendance
		currentAttendance = filteredEvents[i].attendance
		total += currentAttendance;

		// calc most
		if (most < currentAttendance) {
			most = currentAttendance
		}
		// calc least
		if (least == -1 || least > currentAttendance) {
			least = currentAttendance;
		}


	}
	// calc average
	average = (total / filteredEvents.length)

	document.getElementById("total").innerHTML = total.toLocaleString();
	document.getElementById("most").innerHTML = most.toLocaleString();
	document.getElementById("least").innerHTML = least.toLocaleString();
	document.getElementById("average").innerHTML = average.toLocaleString(
		"en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}
	);


}


// show the events for a specific location
// this fires once user selects a city
function getEvents(element) {

	let city = element.getAttribute("data-city");
	curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

	let filteredEvents = curEvents;
	// filter the events based on the selected city
	if (city != "All") {
		filteredEvents = curEvents.filter(function (e) {
			if (e.city == city) {
				return e;
			}
		})
	}

	document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;

	// display the stats fro the selected city
	displayStats(filteredEvents);
}

// display all the events w/data on the lower half of the page
function displayData(filteredEvents) {
	let template = document.getElementById("eventData-template");

	let eventBody = document.getElementById("eventBody");
	// clear the table first
	eventBody.innerHTML = "";

	let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];

	// if nothing is there set local storage with the default data
	if (curEvents.length == 0) {
		curEvents = events;
		localStorage.setItem("eventsArray", JSON.stringify(curEvents));
	}

	for (let i = 0; i < curEvents.length; i++) {
		let eventRow = document.importNode(template.content, true);
		let eventCols = eventRow.querySelectorAll("td");

		eventCols[0].textContent = curEvents[i].event;
		eventCols[1].textContent = curEvents[i].city;
		eventCols[2].textContent = curEvents[i].state;
		eventCols[3].textContent = curEvents[i].attendance;
		eventCols[4].textContent = curEvents[i] = new Date(curEvents[i].date).toLocaleDateString();

		eventBody.appendChild(eventRow);
	}
}

function saveData() {
	// grab existing data from local storage
	let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

	// create newObj to store new event input by the user
	let obj = {};

	obj["event"] = document.getElementById("newEventName").value;
	obj["city"] = document.getElementById("newEventName").value;
	let stateSel = document.getElementById("newEventState");
	obj["state"] = stateSel.options[stateSel.selectedIndex].text;
	obj["attendance"] = parseInt(document.getElementById("newEventAttendance").value, 10);
	let eventDate = document.getElementById("newEventDate").value;
	let eventDate2 = `${eventDate} 00:00`;
	obj["date"] = new Date(eventDate2).toLocaleString();

	// pushs new obj into existing data obj
	curEvents.push(obj);

	localStorage.setItem("eventsArray", JSON.stringify(curEvents));

	buildDropDown();
	displayData();
}