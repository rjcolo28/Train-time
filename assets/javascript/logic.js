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

function timeCalc(firstTime, frequency) {
  var timeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(timeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutes = frequency - tRemainder;
  return minutes;
};

trainbase.ref().on("child_added", function(snapshot){
  var sv = snapshot.val();

  var minutesAway = timeCalc(sv.firstTrain, sv.frequency);
  var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
  JSON.stringify(nextTrain);

  var newRow = $("<tr>");
  newRow.append("<td>" + sv.name + "</td>")
  newRow.append("<td>" + sv.destination + "</td>")
  newRow.append("<td>" + sv.frequency + "</td>")
  newRow.append("<td>" + nextTrain + "</td>")
  newRow.append("<td>" + minutesAway + "</td>")

  $("tbody").append(newRow);

});


$("#submitButton").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train").val().trim();
  destinationName = $("#destination").val().trim();
  firstTime = $("#firstTrain").val().trim();
  frequency = $("#frequency").val().trim();


  trainbase.ref().push({
    name: trainName,
    destination: destinationName,
    firstTrain: firstTime,
    frequency: frequency,
  });

  $(".form-control").val("");

});
