console.log('working');



class Game {
	constructor() {
		this.ctx = canvas.getContext('2d');
		this.score = 0;
		this.highScore = 0;
		this.numLives = 3;
		
		// Blocks initialized
		this.blockWidth = 43;
		this.blockHeight = 25;
		this.blocks = generateBlocks();

		// Paddle initialized
		this.paddle = generatePaddle();

		this.interval = 10;


	}
	/* Generate the intial blocks */
	generateBlocks() {ß
		var width = this.blockWidth;
		var height = this.blockHeight;
		var posX = 0;
		var posY = 0;
		var blockColours = ['red', '#064df1', '#33f106', '#8037dd', 'yellow'];
		var index = 0;
		var blockArray = []
		for(var i = 0; i < 5; i++) {
			posX = 12;
			posY += height + 5;
			for(var j = 0; j < 10; j++) {	
				var block = new Block(index, i, true, blockColours[i]. posX, posY);
				blockArray.push(block);
				posX += width + 5;
				index++;
			}                                             
		}             
		return blockArray;              
	}

	/* Generate the paddle */
	generatePaddle() {
		return new Paddle(100, 200);
	}

	/* Generate the ball */
	generateBall() {
		return new Ball();
	}

}

class GameScreen {
	constructor() {
		this.width = 500;
		this.height = 800;
		this.interval = 10;
		this.canvas = document.getElementById("myCanvas");
		this.canvasOffset = canvas.getBoundingClientRect().left;	
	}

	drawBlocks() {
		for(var i = 0; i < 10; i++) {
			var block = this.blocks[i];	
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

}

class Ball {
	constructor() {
		this.colour = 'white';
		this.radius = 10;
		this.posX = 400;
		this.posY = 200;
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
	constructor(posX, posY) {
		this.colour = 'black';
		this.width = 100;
		this.height = 15;
		this.posX = posX;
		this.posY = posY;
		this.speed = 0.5;
	}
	
	/* Update paddle position */
	updatePosition() {
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