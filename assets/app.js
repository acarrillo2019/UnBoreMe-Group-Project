$(document).ready(function () {

var firebaseConfig = {
    apiKey: "AIzaSyCeshwfwLmlh2uwM6BLs7J4SmoUbmZvoGQ",
    authDomain: "unboreme-b99d9.firebaseapp.com",
    databaseURL: "https://unboreme-b99d9.firebaseio.com",
    projectId: "unboreme-b99d9",
    storageBucket: "unboreme-b99d9.appspot.com",
    messagingSenderId: "1080038770107",
    appId: "1:1080038770107:web:4c8db7157faf340aaa309e"
};

firebase.initializeApp(firebaseConfig);

database = firebase.database()

database.ref().on("value", function(snapshot) {

    console.log(snapshot.val())

});


    // These variables hold will feed data to the querlyURL. The variable values will come from user input. Currently some of the variables hold temporary data for testing purposes.
    var what = "music";
    var where = "tucson";
    var radius = "50";
    var when = "future";
    var category = "country";
    var results = "25"
    var key = "vMvwtd4qCcNr8hZL";
    var oAuthKey = "f294b0ab520483c96e63"
    var oAuthSecret = "7f051c9da5f92bfbe8e3"
    var proxyURL = "https://cors-anywhere.herokuapp.com/"

    // queryURL to pull data from Eventful.com. The proxy URL is necessary to circumvent CORS rejection.
    var queryURL = "http://api.eventful.com/json/events/search?app_key=" + key + "&q=" + what + "&l=" + where + "&within=" + radius + "&t=" + when + "&c=" + category + "&page_size=" + results + "&oauth_consumer_key=" + oAuthKey + "&oauth_signature_method=HMAC-SHA1&oauth_version=1.0&scheme=https";

    $.ajax({
        url: proxyURL + queryURL,
        method: "GET",
        crossDomain: true
    }).then(function (response) {
        for (var i = 0; i < 1; i++) {
            // Console logging response.events to 'see' JSON object
          //  console.log(JSON.parse(response));
            var temp = JSON.parse(response);
            console.log(temp.events.event[0].latitude);
            var lat = temp.events.event[i].latitude;
            var lng = temp.events.event[i].longitude;
        }
    });

});