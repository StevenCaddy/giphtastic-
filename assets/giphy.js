$(document).ready(function(){
	var places = ["Paris", "London", "Belgium", "Mount Everest", "Rome"];


	function renderButtons(arrayUsed, classUsed, areaUsed){
		$(areaUsed).empty();

		for (var i = 0; i < arrayUsed.length; i++){
			var a = $("<button>");
			a.addClass(classUsed);
			a.attr("data-type", arrayUsed[i]);
			a.text(arrayUsed[i]);
			$(areaUsed).append(a);
		}

	}

	$(document).on("click", ".place-button", function() {
    	$("#places").empty();
    	$(".place-button").removeClass("active");
    	$(this).addClass("active");

    	var type = $(this).attr("data-type");
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    	$.ajax({
    		url: queryURL,
    		method: "GET"
    	}).done(function(response){
    		var results = response.data;

    		for (var i = 0; i < results.length; i++) {
    			var placeDiv = $("<div class=\"place-item\">");
    			var rating = results[i].rating;
    			var p = $("<p>").text("Rating: " + rating);
    			var animated = results[i].images.fixed_height.url;
    			var still = results[i].images.fixed_height_still.url;
    			var placeImage = $("<img>");

    			placeImage.attr("src", still);
    			placeImage.attr("data-still", still);
    			placeImage.attr("data-animate", animated);
    			placeImage.attr("data-state", "still");
    			placeImage.addClass("place-image");

    			placeDiv.append(p);
    			placeDiv.append(placeImage);

    			$("#places").append(placeDiv);	
    		}
    	});
    });

  $(document).on("click", ".place-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-place").on("click", function(event) {
    event.preventDefault();
    var newPlace = $("input").eq(0).val();

    if (newPlace.length > 2) {
      places.push(newPlace);
    }

    renderButtons(places, "place-button", "#place-buttons");

  });

  renderButtons(places, "place-button", "#place-buttons");
});
