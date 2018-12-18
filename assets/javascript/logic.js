  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBITZ-XIWHyvoE_fn9kETdJ3L-Lp1JmjJQ",
    authDomain: "allaboard-ca810.firebaseapp.com",
    databaseURL: "https://allaboard-ca810.firebaseio.com",
    projectId: "allaboard-ca810",
    storageBucket: "allaboard-ca810.appspot.com",
    messagingSenderId: "55707761278"
};
firebase.initializeApp(config);

// Database variable
var trainbase = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

$("#submitButton").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#firstTrain").val().trim();
  frequency = $("#frequency").val().trim();

  trainbase.ref().push({
    name: trainName,
    destination: destination,
    firstTrain: firstTime,
    frequency: frequency
  });
});
