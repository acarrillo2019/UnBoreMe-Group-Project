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

    
    // Search query URL built from info from submitData. 
    const createQueryURL = (info) => {
        console.log(info);
        return `http://api.eventful.com/json/events/search?app_key=${API_KEY}&q=${info.category}&l=${info.location}&within=${info.radius}&t=future&c=${info.category}&page_size=25`;
      }

    function searchEvents(data) {
        // queryURL to pull data from Eventful.com. The proxy URL is necessary to circumvent CORS rejection.
        var queryURL = proxyURL + createQueryURL(data);
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
            crossDomain: true
        }).then(function (response) {

            // first the entire response must be parsed from its JSON origin
            temp = JSON.parse(response)
            // then we can grab the important event information from the nest
            eventData = temp.events.event
            console.log(eventData)
            // Dynamically inserts event info into web page

            for (var i = 0; i < eventData.length; i++) {

                var imgSRC;

                if(eventData[i].image === null){
                    imgSRC = "assets/images/unboremini.png";
                }else{
                    imgSRC = "http:" + eventData[i].image.medium.url;
                }
                console.log(imgSRC);

                newCountry = $("<p>")
                newCountry.text(eventData[i].country_name)

                newCity = $("<p>")
                newCity.text(eventData[i].city_name)

                newTime = $("<p>")
                newTime.text(eventData[i].start_time)

                newTitle = $("<h2>")
                newTitle.text(eventData[i].title)

                newAddress = $("<p>")
                newAddress.text(eventData[i].venue_address)
                newAddress.addClass("location")

                newImage = $("<img src='" + imgSRC + "'>")
                newImage.addClass("eventPic")
              

                newMap = $("<div>")
                newMap.attr("id", "map")
                newMap.attr("style", "display:none")

                newButton = $("<button type='button' data-toggle='modal' data-target='#myModal' data-lat='" + eventData[i].latitude + "' data-lng='" + eventData[i].longitude + "'>")
                newButton.text("View Map")
                newButton.addClass("map")
                newButton.attr("value",eventData[i].venue_address)
                

                newEvent = $("<div>")
                newEvent.append(newImage, newTitle, newAddress, newTime, newButton)
                newEvent.addClass("cards")

                $("#resultCard").append(newEvent)

            }

            // Toggles event map display
            $('.map').click(function(e) {
                e.preventDefault();
              /*  console.log($(this).val())
                var $this = $(this).parent().find('div');
                $(".map div").not($this).hide();

                $this.toggle(); */
                $(document).ready(function() {
                    var map = null;
                    var myMarker;
                    var myLatlng;
                  
                    function initializeGMap(lat, lng) {
                      myLatlng = new google.maps.LatLng(lat, lng);
                  
                      var myOptions = {
                        zoom: 15,
                        zoomControl: true,
                        center: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                      };
                  
                      map = new google.maps.Map(document.getElementById("map"), myOptions);
                  
                      myMarker = new google.maps.Marker({
                        position: myLatlng
                      });
                      myMarker.setMap(map);
                    }
                  
                    // Re-init map before show modal
                    $('#myModal').on('show.bs.modal', function(event) {
                      var button = $(event.relatedTarget);
                      initializeGMap(button.data('lat'), button.data('lng'));
                      $("#location-map").css("width", "100%");
                      $("#map_canvas").css("width", "100%");
                    });
                  
                    // Trigger map resize event after modal shown
                    $('#myModal').on('shown.bs.modal', function() {
                      google.maps.event.trigger(map, "resize");
                      map.setCenter(myLatlng);
                    });
                  });

           });





        });
    
    };

    
    // Event handler for user clicking the submit button
    $("#submitSearch").click(function (event) {
        event.preventDefault()
        $("#resultCard").empty();
        // Storing the search queries
       var submitData =  {
            //  searchTerm : $("#searchTerm").val().trim(),
             category : $("#category option:selected").text().trim(),
             location : $("#state").val().trim(),
           //  city : $("#city").val().trim(),
             radius : $("#radius").val().trim(),
          //   where : state + city
        }
        
        // Running the searchEvents function(passing search queries as arguments)
        searchEvents(submitData);

        if (submitData.location == "") {
            console.log("location needeed")
            return false;
        }

        $("#searchTerm").val("");
        $("#category").val("");

    })


    database.ref().on("value", function (snapshot) {

        console.log(snapshot.val())

    })

});

