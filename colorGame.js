var numSquares = 6;
var colors = randomColorGenerator(numSquares);
var squares = document.querySelectorAll(".square");
var guess = document.querySelector("#rgbDisplay");
var heading = document.querySelector("h1");
var message = document.querySelector("#message");
var selected = selectRandom();
var reset = document.querySelector("#reset");
var btn = document.querySelectorAll(".mode");

guess.textContent = selected;

init();

function init() {
	setSquare();
	setButtonListner();
	reset.addEventListener("click" , function() {
		resetfun();
	});
	resetfun();
}

function setSquare() {
	for(var i=0; i<squares.length; i++) {
		squares[i].addEventListener("click" , function() {
			// condition for color selection
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
}

function setButtonListner() {
	for(var i=0; i<btn.length; i++) {
		btn[i].addEventListener("click" , function () {
			btn[0].classList.remove("selected");
			btn[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			resetfun();
		});
	}
}

function resetfun() {
	colors = randomColorGenerator(numSquares);
	selected = selectRandom();
	guess.textContent = selected;
	for(var i=0; i<squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	message.textContent = "";
	heading.style.backgroundColor = "steelBlue";
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