var movie = [ {
		"name":"Interstellar",
		"rating":5.0,
		"hasWatched": true 
	}, {
		"name":"Imitation Game",
		"rating":4.5,
		"hasWatched": true 
	} , {
		"name":"Wake Up Sid",
		"rating":3.0,
		"hasWatched": false 
	}

];


function myownForEach(arr , func) {
	for(var i=0; i<arr.length; i++) {
		func(arr[i]);
	}
}

movie.forEach(function(obj) {
	if(obj.hasWatched) {
		console.log("You have seen " + obj.name + " - " + obj.rating);
	} else {
		console.log("You have not seen " + obj.name + " - " + obj.rating);
	}
});