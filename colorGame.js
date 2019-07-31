// alert("connected!");
var numSquares = 6;
var colors = randomColorGenerator(numSquares);
var squares = document.querySelectorAll(".square");
var guess = document.querySelector("#rgbDisplay");
var heading = document.querySelector("h1");
var message = document.querySelector("#message");
var selected = selectRandom();
var reset = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

guess.textContent = selected;

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

reset.addEventListener("click" , function() {
	resetfun();
});

function resetfun() {
	//	generate new colors
	colors = randomColorGenerator(6);
	// new colors are set to square
	for(var i=0; i<colors.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}

	//	pick new color for selected
	selected = selectRandom();
	// guess change to new selected
	guess.text = selected;

	//	change color of h1 
	heading.style.backgroundColor = "steelBlue";

	//	change message
	message.textContent = "";

	//	change reset button text to play again
	reset.textContent = "New Colors?";
}

easyBtn.addEventListener("click" , function() {
	easyBtn.classList.toggle("selected");
	hardBtn.classList.toggle("selected");
	numSquares = 3;
	colors = randomColorGenerator(numSquares);
	selected = selectRandom();
	guess.textContent = selected;
	for(var i=0; i<squares.length; i++) {
		if(colors[i])
			squares[i].style.backgroundColor = colors[i];
		else
			squares[i].style.display = "none";
	}
	message.textContent = "";
	heading.style.backgroundColor = "steelBlue";


});

hardBtn.addEventListener("click" , function() {
	easyBtn.classList.toggle("selected");
	hardBtn.classList.toggle("selected");
	numSquares = 6;
	colors = randomColorGenerator(numSquares);
	selected = selectRandom();
	guess.textContent = selected;
	for(var i=0; i<squares.length; i++) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
	}
	message.textContent = "";
	heading.style.backgroundColor = "steelBlue";
});
