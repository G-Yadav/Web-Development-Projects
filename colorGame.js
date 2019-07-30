alert("connected!");
var colors = randomColorGenerator(6);

// select squares to change properties
var squares = document.querySelectorAll(".square");

// select h1 element to show guess rgb
var guess = document.querySelector("#rgbDisplay");

// select h1 element to change color
var heading = document.querySelector("h1");

// select message span to display message
var message = document.querySelector("#message");

// selected color
var selected = selectRandom();

// set selected to h1 in html
guess.textContent = selected;

// alert("after color");

for(var i=0; i<squares.length; i++) {
	// set a color from the list
	squares[i].style.backgroundColor = colors[i];
	// alert("selected");

	// set the listener to select square
	squares[i].addEventListener("click" , function() {
		// path to correct selection
		if(this.style.backgroundColor === selected) {
			changeColor(selected);
			message.textContent = "Correct";
			heading.style.backgroundColor = selected;	
		} else {
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again";
		}
	});
}

function changeColor(color) {
	for(var i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function selectRandom() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function randomColorGenerator(num) {
	arr = [];

	for(var i=0; i<num; i++) {
		arr.push(randomColor());
	}

	return arr;
}	

function randomColor() {
	var r = Math.floor(Math.random() *256);
	var g = Math.floor(Math.random() *256);
	var b = Math.floor(Math.random() *256);
	return "rgb(" + r + ", " + g + ", " + b +")";
}