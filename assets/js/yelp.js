	// Enter location - receive restuarant recommendations based on user input
	// See phone number, website, ratings
	// Integrate with Google maps using latitude/longitude inputs
	// ONLY places to eat, limit results to 10, within 1 mile of userLocation


let input_category = 'food,restaurant';

function getYelpResults(){

	let input_location = localStorage.getItem("input-address"); 
		
	let queryURL = "https://api.yelp.com/v3/businesses/search?location=" + input_location + "&limit=20&radius=1610&open_now=true";
	const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';

	//adding input category to URL to select cuisine from dropdown
	if(localStorage.getItem("input-category")){
		input_category = localStorage.getItem('input-category');

		if(input_category == "All"){
			input_category = "food,restaurant";
		}
	}

	// console.log("inputCategory", inputCategory);

	queryURL += "&term=" + input_category;	
	console.log("qyeryURL =", queryURL);

	$('#content-results').empty();
	
	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + yelpAPI
		}
	}).done(response => {		
		const results = response.businesses;
		displayMarkers(results); 

		for (let i = 0; i < results.length; i++) {
			const restaurantName = results[i].name;
			const restaurantDistance = results[i].distance;
			const restaurantDistanceMiles = (restaurantDistance * 0.0006213).toFixed(2);
			const pDistance = $("<p>").text("Distance: " + restaurantDistanceMiles + " miles");
			const restaurantPhone = results[i].display_phone;
			const pPhone = $("<p>").text("Phone: " + restaurantPhone);
			const restaurantRating = results[i].rating;
			const pRating = $("<p>").text("Yelp rating: " + restaurantRating);
			const restaurantImg = $('<img>');
			restaurantImg.addClass('restaurant-img');
			restaurantImg.attr("src", results[i].image_url);
			$('#content-results').append(restaurantName);
			$('#content-results').append(pDistance);
			$('#content-results').append(pPhone);
			$('#content-results').append(pRating);
			$('#content-results').append("<p class='direction' data-lat =" + results[i].coordinates.latitude + " data-long=" + results[i].coordinates.longitude + ">Get Directions!</p>");
			$('#content-results').append(restaurantImg);
		};

	}).catch(error => {
		console.error(error);
	});

}


function getYelpSearchResults(){

  let input_location = localStorage.getItem("input-address"); 
    
  let queryURL = "https://api.yelp.com/v3/businesses/search?location=" + input_location + "&limit=20&radius=1610&open_now=true";
  const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';

  //adding input category to URL to select cuisine from dropdown
  if(localStorage.getItem("input-category")){
    input_category = localStorage.getItem('input-category');

    if(input_category == "All"){
      input_category = "food,restaurant";
    }
  }

  // console.log("inputCategory", inputCategory);
  queryURL += "&term=" + input_category;  
  console.log("qyeryURL =", queryURL);

	$('#content-results').empty();
	
	$.ajax({
		url: proxyUrl + queryURL,
		headers: {
			authorization: 'Bearer ' + yelpAPI
		}
	}).done(response => {		
		const results = response.businesses;
		displayMarkers(results); 

		for (let i = 0; i < numOfResults && i < results.length; i++) {

      if(results && results != null && results != undefined){

		let newDiv = $('<div class="div-result">');
		newDiv.css("border-bottom", "2px solid #fff");
        newDiv.css("padding", "10px");

        const ratingNum = parseInt(results[i].rating)
        console.log(ratingNum);
        console.log(results[i]);

		let content = 
        "<table width='100%'><tr><td class='td-results-l' id='results-name'>" 
        + results[i].name +
		"</td><td class='td-results-r' id='results-distance'>" 
        + (results[i].distance * 0.0006213).toFixed(2) + " Miles</td></tr>" +
        "<tr><td class='td-results-l'>Tel: " 
        + results[i].display_phone + "</td><td class='td-results-rating' id='"+results[i].id+"-rating'> Rating: " 
        "</td></tr>" ;

		newDiv.append(content);

        console.log('done-appending');

		let newLink = $("<a>").attr(
			{
				"href" : "#collapse-link-" + i,
				"data-toggle" : 'collapse',
				"data-lat" : results[i].coordinates.latitude,
				"data-long" : results[i].coordinates.longitude,
				"class" : 'direction'
			});

		newLink.text('Get Directions');
		newDiv.append(newLink);

		let collapseDiv = $("<div>");
		collapseDiv.attr('id', 'collapse-link-' + i);
		collapseDiv.attr('class', 'collapse');
		collapseDiv.attr('class', 'directionsDiv');
		newDiv.append(collapseDiv);
		
		$('#content-results').append(newDiv);
		for(let j=0; j < ratingNum; j++) {
        	$("#"+results[i].id+"-rating").append($('<span>').text('⭐️'));
        }

      }else{
        console.log("no results found");
      }
		}
	}).catch(error => {
		console.error(error);
	});

}

