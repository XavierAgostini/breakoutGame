console.log('working');
// Global Variables
var canvas = document.getElementById("myCanvas");
var canvasWidth = 500;
var canvasHeight = 800;
var ctx = canvas.getContext('2d');
var interval = 10;
var lifeLost = new Event('lifeLost');
var gameOver = new Event('gameOver');

class Game {
	constructor() {
		// Game Screen
		this.canvasOffset = canvas.getBoundingClientRect().left;
	
		// Game Settings
		this.scoreBoard = new ScoreBoard();
		this.highScore = 0;
		this.numLives = 3;
		
		// Blocks initialized
		this.blockWidth = 43;
		this.blockHeight = 25;
		this.blocks =  new Blocks(this.scoreBoard);

		// Paddle initialized in the bottom middle of screen
		this.paddle = new Paddle((canvasWidth - 100)/2, canvasHeight - 40);

		// Ball initialized
		this.ball = new Ball(canvasWidth/2, 400);

		this.gameInterval;
		var t = this;
		document.addEventListener('lifeLost', function(event) {
			t.lifeLost();
		});
		document.addEventListener('gameOver', function(event) {
			t.gameOver();
		});
		var newGameBtn = document.getElementById("newGameBtn");
		newGameBtn.addEventListener("click", function(event) {
			newGameBtn.style.display = "none";
			t.startGame();
			t.blocks.resetBlocks();
		});
	}

	writeScore() {
		var scoreMessage = "Score: " + this.scoreBoard.score;
		var liveMessage = "Lives: " + this.numLives;
		ctx.font = "30px sans-serif";
		ctx.fillText(scoreMessage, 10, 25);
		ctx.fillText(liveMessage, 350, 25);
	}

	lifeLost() {
		this.numLives--;
		if(this.numLives == 0) {
			this.gameOver();
		}	
	}
	gameOver() {
		console.log("Game Over");
		clearInterval(this.gameInterval);
		var t = this;
		setTimeout(function() {
			// Clear Canvas
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			

			var currHighScore = t.scoreBoard.highScore;
			t.scoreBoard.highScore = t.scoreBoard.score >  currHighScore ? t.scoreBoard.score : currHighScore;
			t.scoreBoard.updateHighScore(t.scoreBoard.highScore);
			newGameBtn.style.display = "inline";
			
			var message1 = "GAME OVER";
			var message2 = "Score: " + t.scoreBoard.score; 
			var message3 = "High score: " + t.scoreBoard.highScore;
			
			ctx.font = "30px sans-serif";
			ctx.fillText(message1, 150, 50);
			ctx.fillText(message2, 150, 150);
			ctx.fillText(message3, 150, 200);
		}, interval);	
	}

	startGame() {
		var t = this;
		this.scoreBoard.score = 0;
		this.numLives = 3;
		this.gameInterval = setInterval(function() {t.drawScreen()}, interval);
	}

	drawBlocks() {
		for(var i = 0; i < this.blocks.blockArr.length; i++) {
			var block = this.blocks.blockArr[i];
			if(block.active) {
				ctx.fillStyle = block.colour;
				ctx.fillRect(block.posX, block.posY, block.width, block.height);
			}	
		}     
	}

	drawPaddle() {
		ctx.fillStyle = this.paddle.colour;
		ctx.fillRect(this.paddle.posX, this.paddle.posY, this.paddle.width, this.paddle.height);

	}

	drawBall() {
		ctx.beginPath();
		//center(x,y), start radian, end radian
		ctx.arc(this.ball.posX, this.ball.posY, this.ball.radius, 0 , 2*Math.PI, false);
		ctx.fillStyle = this.ball.colour;
		ctx.fill();
		ctx.stroke();
	}

	drawScreen() {
		//clear canvas before redrawing
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		this.paddle.updatePosition();
		this.ball.ballPhysics(canvasWidth, canvasHeight, this.paddle, this.blocks);
		this.blocks.updateBlocks(this.ball);
		this.writeScore();
		this.drawBlocks();
		this.drawPaddle();
		this.drawBall();
		
	}

	
}

class ScoreBoard {
	constructor() {
		this.score = 0;
		this.highScore = localStorage.getItem("highScore") || 0;
	}
	updateScore(score) {
		this.score += score;
	}
	updateHighScore(score) {
		localStorage.setItem("highScore", score);
	}
	get(property) {
		return this[property];
	}
}

class Ball {
	constructor(posX, posY) {
		this.colour = 'white';
		this.radius = 10;
		this.posX = posX;
		this.posY = posY;
		this.velX = 0;
		this.velY = 0.2;
	}
	/* Update ball position on canvas*/
	ballPhysics(canvasWidth, canvasHeight, paddle, blocks) {
		var bottomWallHit = false;
		// Update Ball position
		this.posY += this.velY * interval;
		this.posX += this.velX * interval;
		
		//if ball hits bottom wall
		if(this.posY + this.radius >= canvasHeight) {
			console.log('bottom wall hit');
			this.posY = 400;
			this.posX = canvasWidth/2;
			this.velX = 0;
			// this.velY *= -1;
			document.dispatchEvent(lifeLost);

		}

		//if ball hist top wall
		if(this.posY - this.radius <= 0) {
			console.log('top wall hit -a');
			this.velY *= -1;
		}

		//if vall hits right wall
		if(this.posX + this.radius >= canvasWidth) {
			console.log('right wall hit -a');
			this.velX *= -1;
		}

		//if ball hits left wall
		if(this.posX - this.radius <= 0) {
			console.log('left wall hit -a');
			this.velX *= -1;
		}


		//ball at paddle level
		if(this.posY >= canvasHeight - paddle.height - paddle.heightOffset) {
			//ball hits paddle
			if((this.posX - this.radius <= paddle.posX + paddle.width) && (this.posX + this.radius >= paddle.posX)) {
				console.log("paddle hit -a");
				this.velY *= -1;
				var speed = this.posX/(paddle.posX + 0.5*paddle.width) - 1;
				this.velX = speed > 0.5 ? 0.5 : speed;
			}
		}


	}

	get(property) {
		return this[property];
	}

}
 
class Paddle {
	constructor(posX, posY) {
		this.colour = 'black';
		this.width = 100;
		this.height = 15;
		this.heightOffset = 40;
		this.posX = posX;
		this.posY = posY;
		this.velX = 0;
		this.speed = 0.5;
		this.canvasOffset = canvas.getBoundingClientRect().left;	

		var t = this;
		document.addEventListener("keydown", function(event) {
			
			// move paddle pos left if left button pressed
			if(event.keyCode == 37) {
				t.velX = -t.speed;
			}
			//move paddle pos right if right button pressed
			else if(event.keyCode == 39) {
				t.velX = t.speed;
			}
		});

		document.addEventListener("keyup", function(event) {
			// move paddle pos left if left button pressed
			if(event.keyCode == 37 || event.keyCode == 39) {
				t.velX = 0;
			}
			
		});

		// Event Handlers for paddle control
		canvas.addEventListener("mousemove", function(event) {
			var x = event.clientX - t.canvasOffset;
			t.posX = x;
		});
		
	}
	
	/* Update paddle position */
	updatePosition() {
		// console.log(this.velX);
		this.posX += this.velX * interval;
		this.posX = this.posX >= canvasWidth - this.width ? canvasWidth - this.width : this.posX;
		this.posX = this.posX <= 0 ? 0 : this.posX;
	}

	get(property) {
		return this[property];
	}
	
}

class Block {
	constructor(id, level, active, colour, posX, posY, width, height) {
		this.id = id;
		this.level = level;
		this.active = active;
		this.colour = colour;
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
	}
	get (property) {
		return this[property];
	}

	blockHit(ball) {
		var hit = false;
		var blockSection = this.posY + this.height;
		
		if(ball.posY - ball.radius <= blockSection && this.active) {
			//iterate over the circumference of the ball and check if any of the points are inside the rectangle
			for(var i = 0; i < 360; i++) {                                                            
				var x = ball.posX + ball.radius * Math.cos(i * Math.PI/180);
				var y = ball.posY -  ball.radius * Math.sin(i * Math.PI/180);

				if(x >= this.posX && x <= this.posX + this.width) {
					if(y <= this.posY + this.height && y >= this.posY) {
						hit = true;
						ball.velY *= -1;
						// score += (40 - 10*this.level + 1);
						break;
					}
				}
			}		
		}
		if(hit) {
			this.active = false;
			return true;
		} 
		return false;	
	}
}

class Blocks {
	constructor(scoreBoard) {
		this.scoreBoard = scoreBoard;
		this.blockArr = this.generateBlocks();
	}

	/* Generate the intial blocks */
	generateBlocks() {
		// console.log("blocks generated");
		var width = 43;
		var height = 25;
		var posX = 0;
		var posY = 0;
		var blockColours = ['red', '#064df1', '#33f106', '#8037dd', 'yellow'];
		var index = 0;
		var blockArray = []
		for(var i = 0; i < 5; i++) {
			posX = 12;
			posY += height + 5;
			for(var j = 0; j < 10; j++) {	
				var block = new Block(index, i, true, blockColours[i], posX, posY, width, height);
				blockArray.push(block);
				posX += width + 5;
				index++;
			}                                             
		}
		          
		// console.log(blockArray);
		return blockArray;              
	}
	resetBlocks() {
		for(var i = 0; i < this.blockArr.length; i++) {
			this.blockArr[i].active = true;
		}
	}
	updateBlocks(ball) {
		var multiHits = 0;
		var noMoreBlocks = false;
		for(var i = 0; i < this.blockArr.length; i++) {
			// console.log(this.blocksArr[i]);
			if(this.blockArr[i].active && this.blockArr[i].blockHit(ball)) {
				multiHits++;
				if(multiHits > 1) ball.velY *= -1;
				this.scoreBoard.updateScore(40 - 10*this.blockArr[i].level + 1);
			}
			noMoreBlocks = this.blockArr[i].active ? false : true;
		}
		// check if there are any blocks remaining
		if(noMoreBlocks) { 
			console.log('over');
			document.dispatchEvent(gameOver);
		}
	}   

	get (property) {
		console.log(property)
		return this[property];
	}
}

// Do shit here

var game = new Game();
game.startGame();