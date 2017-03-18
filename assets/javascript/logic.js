var input = ["Moana", "Finding Dory", "Zootopia","The Good Dinosaur","Inside Out", 
"Strange Magic", "Big Hero 6", "Planes:Fire & Rescue", "The Wind Rises", "The Pirate Fairy", "Frozen"]

$(document).ready(function(){
	for (prop in input){
		$("#display-button").append("<button class = 'btn btn-primary'>" + input[prop] + "</button>");
	};

	$("#submit-movie").on("click", function(){
		event.preventDefault();
		var movie_name = $("#add-movie").val().trim();
		$("#display-button").append("<button class = 'btn btn-primary'>" + movie_name + "</button>")
	});

	$("#display-button").on("click","button",function(){
		var select_movie = $(this).text().trim();
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + select_movie + "&api_key=dc6zaTOxFJmzC&limit=10"
		$.ajax({
			url : queryURL,
			method : 'GET'
		}).done(function(event){
			var newdiv = $("<div>");
			newdiv.append("<p class = 'clear'>" + select_movie + "</p>");
			for (i = 0; i < event.data.length; i++){
				var rating = event.data[i].rating;
				var Year = event.data[i].trending_datetime;
				var image_src_still = event.data[i].images.fixed_height_still.url;
				var image_src = event.data[i].images.fixed_height.url;
				var image = $("<img src = '" + image_src_still + "'>");
				image.attr({
					"status": "still",
					"dynamic_url" : image_src,
					"static_url" : image_src_still
				});
				// image.attr("status","still");
				var new_section = $("<div class = 'float-left'>");
				new_section.append("<p>" + rating + "</p>" );
				new_section.append("<p>" + Year + "</p>");
				new_section.append(image);
				newdiv.append(new_section);
			};
			$("#display-image").prepend(newdiv);
		});
	});

	$("#display-image").on("click","img",function(){

		if ($(this).attr("status") === "still"){
			$(this).attr("status","dynamic");
			this.src = $(this).attr("dynamic_url");
		}
		else if($(this).attr("status") === "dynamic"){
			$(this).attr("status","still");
			this.src = $(this).attr("static_url");
		}
	});

});