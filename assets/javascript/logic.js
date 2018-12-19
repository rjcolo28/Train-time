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
var nextTrain = "";
var minutes = "";
var currentTime = moment();

function dataPull() {
  trainbase.ref().on("child_added", function(snapshot){
    var sv = snapshot.val();
  
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.nextTrain);
    console.log(sv.minutesAway);

    var newRow = $("<tr>");
    newRow.append("<td>" + sv.name + "</td>")
    newRow.append("<td>" + sv.destination + "</td>")
    newRow.append("<td>" + sv.frequency + "</td>")
    newRow.append("<td>" + sv.nextTrain + "</td>")
    newRow.append("<td>" + sv.minutesAway + "</td>")

    $("tbody").append(newRow);
  
  });
}

$("#submitButton").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train").val().trim();
  destinationName = $("#destination").val().trim();
  firstTime = $("#firstTrain").val().trim();
  frequency = $("#frequency").val().trim();

  var timeConverted = moment(firstTime, "HH:mm").subtract(1, "years")
  var diffTime = moment().diff(moment(timeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  minutes = frequency - tRemainder;
  nextTrain = moment().add(minutes, "minutes").format("hh:mm");
  JSON.stringify(nextTrain);

  trainbase.ref().push({
    name: trainName,
    destination: destinationName,
    firstTrain: firstTime,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesAway: minutes
  });
});

dataPull();
