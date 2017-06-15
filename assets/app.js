// Pseudocode

// The user is allowed to input text for Origin Form

	// Street Address
	// City
	// State
	// Zip Code

// The user is allowed to input text for Destination Form

	// Street Address
	// City
	// State
	// Zip Code

// When user clicks the "Use Current Location" link, the current location autopopulates the Origin Form

	// Street Address
	// City
	// State
	// Zip Code

// When user clicks submit button, the page displays the cheapest ride (BART versus Uber) AND fastest ride (BART versus Uber)
// The app shall display the Previous Origin and Previous Destination.
// The displayed Previous Origin and Previous Destination can be clicked. 
// When the displayed Previous Origin and Previous Destination are clicked, the form autopopulates accordingly  

// Backend --- instructions to be completed/revised
// Create a variable to store values for Origin and Destination Data
// Create on-click listener for submit button
// Create the variables for Firebase and store the Data in Firebase
// Set up API's for Uber, BART, Google Maps
// Set up API to get traffic data
// Needs to establish time of search (moment.js) 
// Compare prices. Compare times.

// <script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>

// <script>

// initialize firebase
var config = {
   apiKey: "AIzaSyC213GJibSJGz-RH9Eo2Gk6OaeZLCbkQKI",
   authDomain: "commuter-570b0.firebaseapp.com",
   databaseURL: "https://commuter-570b0.firebaseio.com",
   projectId: "commuter-570b0",
   storageBucket: "commuter-570b0.appspot.com",
   messagingSenderId: "554554260832"
};
firebase.initializeApp(config);

// variable
var database = firebase.database()

// Commented out these variables since we use them in different ways in the functions below
// var streetOrigin = "";
// var cityOrigin = "";
// var stateOrigin = "";
// var zipOrigin;
// var streetDestination = "";
// var cityDestination = "";
// var stateDestination = "";
// var zipDestination;

//function for getting user address inputs and storing to firebase
$("#submitButton").on("click", function(){
	// prevent default
	event.preventDefault();
	// stores user input in variables
	var streetOrigin = $("#originStreet-input").val().trim();
	var cityOrigin = $("#originCity-input").val().trim();
	var stateOrigin = $("#originState-input").val().trim();
	var zipOrigin = $("#originZIP-input").val().trim();
	var streetDestination = $("#destinationState-input").val().trim();
	var cityDestination = $("#destinationCity-input").val().trim();
	var stateDestination = $("#destinationState-input").val().trim();
	var zipDestination = $("#destinationZIP-input").val().trim();
	// assign origin address to an "origin" object
	var origin = {
		street: streetOrigin,
		city: cityOrigin,
		state: stateOrigin,
		zip: zipOrigin
	};
	// assign destination address to an "destination" object
	var destination = {
		street: streetDestination,
		city: cityDestination,
		state: stateDestination,
		zip: zipDestination,
	};
	//push objects to firebase database
  	database.ref().push(origin);
  	database.ref().push(destination);

});

// function for pushing firebase addresses to html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	// prevent default
	console.log(childSnapshot.val());
	// Store everything into a variable.
	var streetOrigin = childSnapshot.val().origin.street;
	var cityOrigin = childSnapshot.val().origin.city;
	var stateOrigin = childSnapshot.val().state.street;
	var zipOrigin = childSnapshot.val().origin.zip;
	var streetDestination = childSnapshot.val().destination.street;
	var cityDestination = childSnapshot.val().destination.city;
	var stateDestination = childSnapshot.val().destination.state;
	var zipDestination = childSnapshot.val().destination.zip;
	
	// Add addresses to the respective "Previous ____" div
	$("#prevOrigins").append("<p>" + streetOrigin + "</p><p>" + cityOrigin + "<p>" + stateOrigin + "</p><p>" + zipOrigin + "</p><br>");
	$("#prevDestinations").append("<p>" + streetDestination + "</p><p>" + cityDestination + "<p>" + stateDestination + "</p><p>" + zipDestination + "</p><br>");
});

// function to use
// $("#useThisAddress").on("click", function(){
// 	// prevent default
// 	event.preventDefault();

// 	var streetOrigin = $("#originStreet-input").val().trim();
// 	var cityOrigin = $("#originCity-input").val().trim();
// 	var stateOrigin = $("#originState-input").val().trim();
// 	var zipOrigin = $("#originZIP-input").val().trim();
// 	var streetDestination = $("#destinationState-input").val().trim();
// 	var cityDestination = $("#destinationCity-input").val().trim();
// 	var stateDestination = $("#destinationState-input").val().trim();
// 	var zipDestination = $("#destinationZIP-input").val().trim();

// 	var origin = {
// 		street: streetOrigin;
// 		city: cityOrigin;
// 		state: stateOrigin;
// 		zip: zipOrigin;
// 	};

// 	var destination = {
// 		street: streetDestination;
// 		city: cityDestination;
// 		state: stateDestination;
// 		zip: zipDestination;
// 	};

//   	database.ref().push(origin);
//   	database.ref().push(destination);

// });

// </script>