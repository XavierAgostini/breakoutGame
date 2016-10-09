// Initialize Canvas
var canvas = document.getElementById("myCanvas");
var canvasOffset = canvas.getBoundingClientRect().left;
console.log("offset-left: ", canvasOffset);
//console.log(rect.top, rect.right, rect.bottom, rect.left);
var canvasHeight = 800; //document.getElementById("myCanvas").getAttribute("height");
var canvasWidth = 500; //document.getElementById("myCanvas").getAttribute("width");
var ctx = canvas.getContext("2d");
var interval = 10;


// Block Parameters
var blockColors = ['red', '#064df1', '#33f106', '#8037dd', 'yellow'];
var blockWidth = 43;
var blockHeight = 25;
// dictionary of block [{id, posX, posY, color, level, active}]
var blocks = generateInitialBlocks();


// Paddle Paramters
var paddleHeight = 15;
var paddleHeightOffset = 40;
var paddleSpeed = 0.5;
var paddle = {posX: (canvasWidth - 50)/2, posY: canvasHeight - paddleHeightOffset, velX: 0, velY: 0, width: 100, height: 15};

//ball parameters: radiues, x-position, y-position, x-acceleration, y-acceleratoin, x-velocty, y-velocity
var ballStart = 200;
var ball = {radius: 10, posX: 400, posY: ballStart, accelX: 0, accelY: 0, velX: 0, velY: 0.2};

// Initiale Score
var score = 0;
var numLives = 1;
var highScore = localStorage.getItem("highScore") || 0;
var newGameBtn = document.getElementById("newGameBtn");
// Redraw canvas 20x/s ->1/60 = 0.05s = 50ms
var game = setInterval(draw, interval);

function draw() {
	//clear canvas before redrawing
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	//draw paddle
	ctx.fillStyle = 'black';
	paddlePosition();
	//paddle.posX += paddle.velX*interval;
	//paddle.velX = 0;
	ctx.fillRect(paddle.posX, paddle.posY, paddle.width, paddle.height);

	
	
	ballPhysics();
	refreshBlocks(blocks);

	ctx.beginPath();
	//draw ball

	//center(x,y), start radian, end radian
	ctx.arc(ball.posX, ball.posY, ball.radius, 0 , 2*Math.PI, false);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.stroke();

	// Score
	updateScore();


}

// generate blocks on canvas and push into block dictionary
function generateInitialBlocks() {
	var width = blockWidth;
	var height = blockHeight;
	var posX = 0;
	var posY = 0;

	var index = 0;
	var blockArray = []
	for(var i = 0; i < 5; i++) {
		posX = 12;
		posY += height + 5;
		for(var j = 0; j < 10; j++) {	
			ctx.fillStyle = blockColors[i];
			ctx.fillRect(posX, posY, width, height);
			blockArray.push({id: index, posX: posX, posY: posY, color: blockColors[i], level: i, active: true});
			posX += width + 5;
			index++;
		}                                             
	}             
	return blockArray;                                          
}

//rerender blocks
function refreshBlocks(blockArray) {
	var multiHits = 0;
	for(var i = 0; i < blockArray.length; i++) {
		//check if block hit by ball
		//if ball hits multiple blocks at same time, want to cancel the double negation
		if(blockHit(blockArray[i])) {
			if(gameComplete()) gameOver();
			multiHits++;
			if(multiHits > 1) ball.velY *= -1;
		}
		
		//only render blocks that have been hit
		if(blockArray[i].active) {
			ctx.fillStyle = blockArray[i].color;
			ctx.fillRect(blockArray[i].posX, blockArray[i].posY, blockWidth, blockHeight);
		}		
	}
}

// Check if ball hits block helper method
function blockHit(rect) {
	var hit = false;
	var blockSection = blocks[blocks.length -1 ].posY + blockHeight;
	//if ball is in the top of the screen

	if(ball.posY - ball.radius <= blockSection && rect.active) {
		var top = {x: ball.posX, y: ball.posY - ball.radius};
		var right = {x: ball.posX + ball.radius, y: ball.posY};
		var bottom = {x: ball.posX, y: ball.posY + ball.radius};
		var left = {x: ball.posX - ball.radius, y: ball.posY};
		//iterate over the circumference of the ball and check if any of the points are inside the rectangle
		for(var i = 0; i < 360; i++) {                                                            
			var x = ball.posX + ball.radius * Math.cos(i * Math.PI/180);
			var y = ball.posY -  ball.radius * Math.sin(i * Math.PI/180);

			if(x >= rect.posX && x <= rect.posX + blockWidth) {
				if(y <= rect.posY + blockHeight && y >= rect.posY) {
					hit = true;
					ball.velY *= -1;
					score += (40 - 10*rect.level + 1);
					break;
				}
			}
		}		
	}
	if(hit) {
		blocks[rect.id].active = false;
		return true
	} 
	return false;	
}



// Event Handlers for paddle control
canvas.addEventListener("mousemove", function(event) {
	var x = event.clientX - canvasOffset;
	var y = event.clientY;
	paddle.posX = x;
	//console.log('m: ', x);
});
document.addEventListener("keydown", function(event) {
	// move paddle pos left if left button pressed
	if(event.keyCode == 37) {
		paddle.velX = -paddleSpeed;
		// console.log('t');
	}
	//move paddle pos right if right button pressed
	else if(event.keyCode == 39) {
		paddle.velX = paddleSpeed;
	}
});
document.addEventListener("keyup", function(event) {
	// move paddle pos left if left button pressed
	if(event.keyCode == 37 || event.keyCode == 39) {
		paddle.velX = 0;
	}
	
});
function paddlePosition() {
	paddle.posX += paddle.velX * interval;
	paddle.posX = paddle.posX >= canvasWidth - paddle.width ? canvasWidth - paddle.width : paddle.posX;
	paddle.posX = paddle.posX <= 0 ? 0 : paddle.posX;
}



function ballPhysics() {

	// Update Ball position
	ball.posY += ball.velY * interval;
	ball.posX += ball.velX * interval;
	
	//if ball hits bottom wall
	if(ball.posY + ball.radius >= canvasHeight) {
		console.log('bottom wall hit');
		lifeLost();
		//ball.velY *= -1;
	}

	//if ball hist top wall
	if(ball.posY - ball.radius <= 0) {
		console.log('top wall hit');
		ball.velY *= -1;
	}

	//if vall hits right wall
	if(ball.posX + ball.radius >= canvasWidth) {
		console.log('right wall hit');
		ball.velX *= -1;
	}

	//if ball hits left wall
	if(ball.posX - ball.radius <= 0) {
		console.log('left wall hit');
		ball.velX *= -1;
	}


	//ball at paddle level
	if(ball.posY >= canvasHeight - paddleHeight - paddleHeightOffset) {
		//ball hits paddle
		if((ball.posX - ball.radius <= paddle.posX + paddle.width) && (ball.posX + ball.radius >= paddle.posX)) {
			console.log("paddle hit");
			ball.velY *= -1;
			var speed = ball.posX/(paddle.posX + 0.5*paddle.width) - 1;
			ball.velX = speed > 0.5 ? 0.5 : speed;10
		}
	}
}
function updateScore() {
	var scoreMessage = "Score: " + score 
	var liveMessage = "Lives: " + numLives;
	ctx.font = "30px sans-serif";
	ctx.fillText(scoreMessage, 10, 50);
	ctx.fillText(liveMessage, 350, 50);
	
}
function lifeLost() {
	numLives--;
	if(numLives == 0) {
		gameOver();
	}
	ball.posY = ballStart;
}

function gameComplete() {
	for(var i = 0; i < blocks.length; i++) {
		if(blocks[i].active) return false;
	}
	return true;
}
function gameOver() {
	console.log("Game Over");
	clearInterval(game);
	setTimeout(function() {
		// Clear Canvas
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		

		var currHighScore = localStorage.getItem("highScore");
		score >  currHighScore ? highScore = score : highScore;
		localStorage.setItem("highScore", highScore);
		newGameBtn.style.display = "inline";
		
		var message1 = "GAME OVER";
		var message2 = "Your Score: " + score; 
		var message3 = "Your High score: " + highScore;
		
		ctx.font = "30px sans-serif";
		ctx.fillText(message1, 150, 50);
		ctx.fillText(message2, 150, 150);
		ctx.fillText(message3, 150, 200);
	}, interval);
	
}
newGameBtn.addEventListener("click", function(event) {
	newGameBtn.style.display = "none";
	blocks = generateInitialBlocks();
	numLives = 1;
	score = 0;
	game = setInterval(draw, interval);
});
