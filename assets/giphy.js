$(document).ready(function() {
  //Array for the buttons
var places = ["Paris", "Cairo", "London", "Mount Everest", "Yosemite", "Machu Picchu", "Rome", "Great Barrier Reef"];


//giphy api
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + places + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
    url: queryURL,
    method: 'GET'
}).done(function(response) {
  	console.log(response);

    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#places-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < places.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("place");
          // Adding a data-attribute with a value of the place at index i
          a.attr("data-name", places[i]);
          // Providing the button's text with a value of the place at index i
          a.text(places[i]);
          // Adding the button to the HTML
          $("#places-view").append(a);
        }
      

      	// This function handles events where one button is clicked
      	$("#add-place").on("click", function(event) {
        	// event.preventDefault() prevents the form from trying to submit itself.
        	// We're using a form so that the user can hit enter instead of clicking the button if they want
        	event.preventDefault();

        	// This line will grab the text from the input box
        	var place = $("#place-input").val().trim();
        	// The place from the textbox is then added to our array
        	places.push(place);

        	// calling renderButtons which handles the processing of our place array
        	renderButtons();
     	});
    }
    	// Calling the renderButtons function at least once to display the initial list of places
    	renderButtons();
    	// Storing an array of results in the results variable
    
    $(".place").on("click", function(){


    var results = response.data;

    

            // Only taking action if the photo has an appropriate rating
        if (results.rating !== "r" && results.rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results.rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var placeImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            placeImage.attr("src", results.URL);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(placeImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
        }
    
    });
});
});