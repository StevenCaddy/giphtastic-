$(document).ready(function() {
  //Array for the buttons
var actors = ["Tom Cruise", "Brad Pitt", "Kate Beckinsale", "Emily Blunt", "Leonardo Dicaprio"];
//giphy api
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actors + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
      console.log(response);

  });
});


