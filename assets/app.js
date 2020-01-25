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

    // These variables hold will feed data to the querlyURL. The variable values will come from user input. Currently some of the variables hold temporary data for testing purposes.
    
    var API_KEY = "vMvwtd4qCcNr8hZL";
    var proxyURL = "https://cors-anywhere.herokuapp.com/"

    

    const createQueryURL = (info) => {
        console.log(info);
        return `http://api.eventful.com/json/events/search?app_key=${API_KEY}&q=${info.searchTerm}&l=${info.location}&within=${info.radius}&t=future&c=${info.category}&page_size=25`;
      }

    function searchEvents(data) {
        // queryURL to pull data from Eventful.com. The proxy URL is necessary to circumvent CORS rejection.
        var queryURL = createQueryURL(data);
        console.log(queryURL);
        $.ajax({
            url: proxyURL + queryURL,
            method: "GET",
            crossDomain: true
        }).then(function (response) {

            // first the entire response must be parsed from its JSON origin
            temp = JSON.parse(response)
            // then we can grab the important event information from the nest
            eventData = temp.events.event
            console.log(eventData)
            
            for (var i = 0; i < eventData.length; i++) {

                newCountry = $("<p>")
                newCountry.text(eventData[i].country_name)

                newCity = $("<p>")
                newCity.text(eventData[i].city_name)

                newTime = $("<p>")
                newTime.text(eventData[i].start_time)

                newTitle = $("<p>")
                newTitle.text(eventData[i].title)

                newEvent = $("<div>")
                newEvent.append(newCountry, newCity, newTime, newTitle)
                newEvent.addClass("cards")

                $("#resultCard").append(newEvent)
            }


        });

    };



    // Event handler for user clicking the submit button
    $("#submitSearch").click(function (event) {
        event.preventDefault()
        // Storing the search queries
       var submitData =  {
             searchTerm : $("#searchTerm").val().trim(),
             category : $("#category").val().trim(),
             location : $("#state").val().trim(),
           //  city : $("#city").val().trim(),
             radius : $("#radius").val().trim(),
          //   where : state + city
        }
        // Running the searchEvents function(passing search queries as arguments)
        searchEvents(submitData);
       
    })



    database.ref().on("value", function (snapshot) {

        console.log(snapshot.val())

    })
});