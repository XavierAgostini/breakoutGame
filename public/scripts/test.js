console.log('working');


class Game {
	constructor() {
		// Game Screen
		this.canvas = document.getElementById("myCanvas");
		this.ctx = canvas.getContext('2d');
		this.canvasOffset = canvas.getBoundingClientRect().left;	
		this.canvasWidth = 500;
		this.canvasHeight = 800;

		// Game Settings
		this.interval = 10;
		this.score = 0;
		this.highScore = 0;
		this.numLives = 3;
		
		// Blocks initialized
		this.blockWidth = 43;
		this.blockHeight = 25;
		this.blocks =  new Blocks();

		// Paddle initialized in the bottom middle of screen
		this.paddle = new Paddle((this.canvasWidth - 100)/2, this.canvasHeight - 40, this.canvas);

		// Ball initialized
		this.ball = new Ball((this.canvasWidth)/2, 400);
	}


	drawBlocks() {
		for(var i = 0; i < this.blocks.blocksArr.length; i++) {
			var block = this.blocks.blocksArr[i];	
			this.ctx.fillStyle = block.colour;
			this.ctx.fillRect(block.posX, block.posY, block.width, block.height);
		}     
	}

	drawPaddle() {
		this.ctx.fillStyle = this.paddle.colour;
		this.ctx.fillRect(this.paddle.posX, this.paddle.posY, this.paddle.width, this.paddle.height);

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
		this.drawBlocks();
		this.drawPaddle();
		this.drawBall();
		
	}
	startGame() {
		var t = this;
		setInterval(function() {t.drawScreen()}, t.interval);
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
	updatePosition() {
		this.posY += this.velY * interval;
		this.posX += this.velX * interval;
	}
	get(property) {
		return this[property];
	}
	/* Check if ball has hit the paddle */
	/* Check if ball has hit a wall */
	/* Check if ball has hit a block */

}
 //{posX: (canvasWidth - 50)/2, posY: canvasHeight - paddleHeightOffset, velX: 0, velY: 0, width: 100, height: 15};
class Paddle {
	constructor(posX, posY, canvas) {
		this.colour = 'black';
		this.width = 100;
		this.height = 15;
		this.posX = posX;
		this.posY = posY;
		this.velX = 0;
		this.speed = 0.5;
		this.canvas = canvas;
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
		this.canvas.addEventListener("mousemove", function(event) {
			var x = event.clientX - t.canvasOffset;
			var y = event.clientY;
			t.posX = x;
			//console.log('m: ', x);
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
}

class Blocks {
	constructor() {
		this.blocksArr = this.generateBlocks();
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


	get (property) {
		console.log(property)
		return this[property];
	}
}

// Do shit here

var game = new Game();
game.startGame();