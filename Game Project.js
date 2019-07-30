var p1Button = document.querySelector("#player1");
var p2Button = document.querySelector("#player2");
var reset = document.querySelector("#reset");
var p1ScoreBoard = document.querySelector("#p1Score");
var p2ScoreBoard = document.querySelector("#p2Score");
var winningScoreDisplay = document.querySelector("#winningScore");
var input  = document.querySelector("input");
var p1Score = 0;
var p2Score = 0;
var winningScore = 5;
var gameOver = false;



p1Button.addEventListener("click" , function () {
	p1Score++;
	if(!gameOver) {
		if(p1Score === winningScore) {
			gameOver = true;
			p1ScoreBoard.classList.add("winner");
		}	
		p1ScoreBoard.textContent = p1Score;
	}
});

p2Button.addEventListener("click" , function () {
	p2Score++;
	if(!gameOver) {
		if(p2Score === winningScore) {
			gameOver = true;
			p2ScoreBoard.classList.add("winner");
		}	
		p2ScoreBoard.textContent = p2Score;
	}
});


reset.addEventListener("click" , function() {
	p1Score = 0;
	p2Score = 0;
	p1ScoreBoard.textContent  = p1Score;
	p2ScoreBoard.textContent  = p2Score;
	gameOver = false;
	p1ScoreBoard.classList.remove("winner");
	p2ScoreBoard.classList.remove("winner");
});

input.addEventListener("change" , function() {
	p1Score = 0;
	p2Score = 0;
	p1ScoreBoard.textContent  = p1Score;
	p2ScoreBoard.textContent  = p2Score;
	gameOver = false;
	p1ScoreBoard.classList.remove("winner");
	p2ScoreBoard.classList.remove("winner");
	winningScore = Number(input.value);
	winningScoreDisplay.textContent  = winningScore;
});