"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}();console.log("working");var canvas=document.getElementById("myCanvas"),canvasOffset=canvas.getBoundingClientRect().left,canvasWidth=500,canvasHeight=800,ctx=canvas.getContext("2d"),interval=10,lifeLost=new Event("lifeLost"),gameOver=new Event("gameOver");window.onresize=function(t){canvasOffset=canvas.getBoundingClientRect().left};var Game=function(){function t(){_classCallCheck(this,t),this.scoreBoard=new ScoreBoard,this.highScore=0,this.numLives=3,this.blockWidth=43,this.blockHeight=25,this.blocks=new Blocks(this.scoreBoard),this.paddle=new Paddle((canvasWidth-100)/2,canvasHeight-40),this.ball=new Ball(canvasWidth/2,400),this.gameInterval;var e=this;document.addEventListener("lifeLost",function(t){e.lifeLost()}),document.addEventListener("gameOver",function(t){e.gameOver()});var s=document.getElementById("newGameBtn");s.addEventListener("click",function(t){s.style.display="none",e.startGame(),e.ball.resetBall(),e.blocks.resetBlocks()})}return _createClass(t,[{key:"writeScore",value:function(){var t="Score: "+this.scoreBoard.score,e="Lives: "+this.numLives;ctx.font="30px sans-serif",ctx.fillText(t,10,25),ctx.fillText(e,350,25)}},{key:"lifeLost",value:function(){this.numLives--,0==this.numLives&&this.gameOver()}},{key:"gameOver",value:function(){console.log("Game Over"),clearInterval(this.gameInterval);var t=this;setTimeout(function(){ctx.clearRect(0,0,canvasWidth,canvasHeight);var e=t.scoreBoard.highScore;t.scoreBoard.highScore=t.scoreBoard.score>e?t.scoreBoard.score:e,t.scoreBoard.updateHighScore(t.scoreBoard.highScore),newGameBtn.style.display="inline";var s="GAME OVER",i="Score: "+t.scoreBoard.score,a="High score: "+t.scoreBoard.highScore;ctx.font="30px sans-serif",ctx.fillText(s,150,50),ctx.fillText(i,150,150),ctx.fillText(a,150,200)},interval)}},{key:"startGame",value:function(){var t=this;this.scoreBoard.score=0,this.numLives=3,this.gameInterval=setInterval(function(){t.drawScreen()},interval)}},{key:"drawBlocks",value:function(){for(var t=0;t<this.blocks.blockArr.length;t++){var e=this.blocks.blockArr[t];e.active&&(ctx.fillStyle=e.colour,ctx.fillRect(e.posX,e.posY,e.width,e.height))}}},{key:"drawPaddle",value:function(){ctx.fillStyle=this.paddle.colour,ctx.fillRect(this.paddle.posX,this.paddle.posY,this.paddle.width,this.paddle.height)}},{key:"drawBall",value:function(){ctx.beginPath(),ctx.arc(this.ball.posX,this.ball.posY,this.ball.radius,0,2*Math.PI,!1),ctx.fillStyle=this.ball.colour,ctx.fill(),ctx.stroke()}},{key:"drawScreen",value:function(){ctx.clearRect(0,0,canvasWidth,canvasHeight),this.paddle.updatePosition(),this.ball.ballPhysics(canvasWidth,canvasHeight,this.paddle,this.blocks),this.blocks.updateBlocks(this.ball),this.writeScore(),this.drawBlocks(),this.drawPaddle(),this.drawBall()}}]),t}(),ScoreBoard=function(){function t(){_classCallCheck(this,t),this.score=0,this.highScore=localStorage.getItem("highScore")||0}return _createClass(t,[{key:"updateScore",value:function(t){this.score+=t}},{key:"updateHighScore",value:function(t){localStorage.setItem("highScore",t)}},{key:"get",value:function(t){return this[t]}}]),t}(),Ball=function(){function t(e,s){_classCallCheck(this,t),this.colour="white",this.radius=10,this.posX=e,this.posY=s,this.velX=0,this.velY=.2}return _createClass(t,[{key:"ballPhysics",value:function(t,e,s,i){if(this.posY+=this.velY*interval,this.posX+=this.velX*interval,this.posY+this.radius>=e&&(console.log("bottom wall hit"),this.resetBall(),document.dispatchEvent(lifeLost)),this.posY-this.radius<=0&&(console.log("top wall hit -a"),this.velY*=-1),this.posX+this.radius>=t&&(console.log("right wall hit -a"),this.velX*=-1),this.posX-this.radius<=0&&(console.log("left wall hit -a"),this.velX*=-1),this.posY>=e-s.height-s.heightOffset&&this.posX-this.radius<=s.posX+s.width&&this.posX+this.radius>=s.posX){console.log("paddle hit -a"),this.velY*=-1;var a=this.posX/(s.posX+.5*s.width)-1;this.velX=a>.5?.5:a}}},{key:"resetBall",value:function(){this.posX=canvasWidth/2,this.posY=400,this.velX=0,this.velY=.2}},{key:"get",value:function(t){return this[t]}}]),t}(),Paddle=function(){function t(e,s){_classCallCheck(this,t),this.colour="black",this.width=100,this.height=15,this.heightOffset=40,this.posX=e,this.posY=s,this.velX=0,this.speed=.5;var i=this;document.addEventListener("keydown",function(t){37==t.keyCode?i.velX=-i.speed:39==t.keyCode&&(i.velX=i.speed)}),document.addEventListener("keyup",function(t){37!=t.keyCode&&39!=t.keyCode||(i.velX=0)}),canvas.addEventListener("mousemove",function(t){var e=t.clientX-canvasOffset-50;i.posX=e})}return _createClass(t,[{key:"updatePosition",value:function(){this.posX+=this.velX*interval,this.posX=this.posX>=canvasWidth-this.width?canvasWidth-this.width:this.posX,this.posX=this.posX<=0?0:this.posX}},{key:"get",value:function(t){return this[t]}}]),t}(),Block=function(){function t(e,s,i,a,o,l,c,n){_classCallCheck(this,t),this.id=e,this.level=s,this.active=i,this.colour=a,this.posX=o,this.posY=l,this.width=c,this.height=n}return _createClass(t,[{key:"get",value:function(t){return this[t]}},{key:"blockHit",value:function(t){var e=!1,s=this.posY+this.height;if(t.posY-t.radius<=s&&this.active)for(var i=0;i<360;i++){var a=t.posX+t.radius*Math.cos(i*Math.PI/180),o=t.posY-t.radius*Math.sin(i*Math.PI/180);if(a>=this.posX&&a<=this.posX+this.width&&o<=this.posY+this.height&&o>=this.posY){e=!0,t.velY*=-1;break}}return!!e&&(this.active=!1,!0)}}]),t}(),Blocks=function(){function t(e){_classCallCheck(this,t),this.scoreBoard=e,this.blockArr=this.generateBlocks()}return _createClass(t,[{key:"generateBlocks",value:function(){for(var t=43,e=25,s=0,i=0,a=["red","#064df1","#33f106","#8037dd","yellow"],o=0,l=[],c=0;c<5;c++){s=12,i+=e+5;for(var n=0;n<10;n++){var r=new Block(o,c,(!0),a[c],s,i,t,e);l.push(r),s+=t+5,o++}}return l}},{key:"resetBlocks",value:function(){for(var t=0;t<this.blockArr.length;t++)this.blockArr[t].active=!0}},{key:"updateBlocks",value:function(t){for(var e=0,s=!0,i=0;i<this.blockArr.length;i++)s&&this.blockArr[i].active&&(s=!1),this.blockArr[i].active&&this.blockArr[i].blockHit(t)&&(e++,e>1&&(t.velY*=-1),this.scoreBoard.updateScore(40-10*this.blockArr[i].level+1));s&&(console.log("over"),document.dispatchEvent(gameOver))}},{key:"get",value:function(t){return console.log(t),this[t]}}]),t}(),game=new Game;game.startGame();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrb3V0LmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FudmFzT2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImludGVydmFsIiwid2luZG93IiwiZXZlbnQiLCJsaWZlTG9zdCIsIkdhbWUiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0aGlzIiwic2NvcmVCb2FyZCIsIlNjb3JlQm9hcmQiLCJudW1MaXZlcyIsImJsb2NrV2lkdGgiLCJibG9ja0hlaWdodCIsImJsb2NrcyIsIkJsb2NrcyIsImhpZ2hTY29yZSIsIlBhZGRsZSIsImJhbGwiLCJCYWxsIiwidCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnYW1lT3ZlciIsIm5ld0dhbWVCdG4iLCJnYW1lSW50ZXJ2YWwiLCJzdHlsZSIsImRpc3BsYXkiLCJyZXNldEJsb2NrcyIsInN0YXJ0R2FtZSIsInJlc2V0QmFsbCIsImN0eCIsImZpbGxUZXh0IiwibGl2ZU1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwiY2xlYXJSZWN0IiwiY3VyckhpZ2hTY29yZSIsInNjb3JlIiwidXBkYXRlSGlnaFNjb3JlIiwiY2xlYXJJbnRlcnZhbCIsImZvbnQiLCJtZXNzYWdlMiIsIm1lc3NhZ2UxIiwibWVzc2FnZTMiLCJzZXRJbnRlcnZhbCIsImRyYXdTY3JlZW4iLCJibG9ja0FyciIsImxlbmd0aCIsImkiLCJibG9jayIsImFjdGl2ZSIsImZpbGxTdHlsZSIsImNvbG91ciIsImZpbGxSZWN0IiwicG9zWCIsInBvc1kiLCJ3aWR0aCIsImhlaWdodCIsInBhZGRsZSIsImJlZ2luUGF0aCIsImFyYyIsInJhZGl1cyIsIk1hdGgiLCJQSSIsInN0cm9rZSIsImJhbGxQaHlzaWNzIiwidXBkYXRlQmxvY2tzIiwid3JpdGVTY29yZSIsImRyYXdCbG9ja3MiLCJkcmF3QmFsbCIsImxvY2FsU3RvcmFnZSIsInByb3BlcnR5IiwidmVsWCIsImRpc3BhdGNoRXZlbnQiLCJ2ZWxZIiwiaGVpZ2h0T2Zmc2V0IiwiYm90dG9tV2FsbEhpdCIsInNwZWVkIiwia2V5Q29kZSIsIngiLCJjbGllbnRYIiwiQmxvY2siLCJpZCIsImxldmVsIiwiaGl0IiwiYmxvY2tTZWN0aW9uIiwiY29zIiwieSIsInNpbiIsImdlbmVyYXRlQmxvY2tzIiwiYmxvY2tDb2xvdXJzIiwiaW5kZXgiLCJibG9ja0FycmF5IiwiaiIsInB1c2giLCJtdWx0aUhpdHMiLCJtb3JlQmxvY2tzIiwiYmxvY2tIaXQiLCJ1cGRhdGVTY29yZSIsImdhbWUiXSwibWFwcGluZ3MiOiI0WEFBQUEsU0FBUUMsSUFBSSxVQUVaLElBQUlDLFFBQVNDLFNBQVNDLGVBQWUsWUFDakNDLGFBQWVILE9BQU9JLHdCQUF3QkMsS0FDOUNDLFlBQWMsSUFDZEMsYUFBZSxJQUxuQlQsSUFBUUMsT0FBSVMsV0FBWixNQUNBQyxTQUFBLEdBQ0lULFNBQVNDLEdBQUFBLE9BQVNDLFlBQ2xCQyxTQUFBQSxHQUFlSCxPQUFBQSxXQUVuQlUsUUFBSUgsU0FBQUEsU0FBSkksR0FDQVIsYUFBVUgsT0FBT1Esd0JBQWpCSCxTQUVJTyxpQkFDSixRQUFBQyxLQUFlQyxnQkFBQUMsS0FBQUYsR0FXYkUsS0FBS0MsV0FBYSxHQUFJQyxZQUN0QkYsS0FQSUYsVUFPYSxFQU5sQkUsS0FBQUcsU0FBYyxFQUNiSCxLQUFBSSxXQUFBLEdBVUFKLEtBQUtLLFlBQWMsR0FDbkJMLEtBQUtNLE9BQVUsR0FBSUMsUUFBT1AsS0FBS0MsWUFOL0JELEtBQUtRLE9BQUwsR0FBQUMsU0FBQWxCLFlBQUEsS0FBQSxFQUFBQyxhQUFBLElBR0FRLEtBQUFVLEtBQUEsR0FBQUMsTUFBQXBCLFlBQUEsRUFBQSxLQUVBUyxLQUFLSyxZQUNMLElBQUFPLEdBQUtOLElBVUxwQixVQUFTMkIsaUJBQWlCLFdBQVksU0FBU2pCLEdBUi9DZ0IsRUFBQWYsYUFXQVgsU0FBUzJCLGlCQUFpQixX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Q0FDLEVBQUEsRUFDQW1DLEdBQUEsTUFBQSxVQUFBLFVBQUEsVUFBQSxVQStDSUMsRUFBUSxFQUNSQyxLQUNJNUMsRUFBSSxFQUFHQSxFQUFJLEVBQUdBLElBQUssQ0FDMUJNLEVBQU8sR0FoRFJDLEdBQU9FLEVBQUtjLENBQ1osS0FBQSxHQUFBc0IsR0FBQSxFQUFBQSxFQUFBLEdBQUFBLElBQUEsQ0FtREUsR0FBSTVDLEdBQVEsR0FBSWdDLE9BQU1VLEVBQU8zQyxJQUFHLEdBQU0wQyxFQUFhMUMsR0FBSU0sRUFBTUMsRUFBTUMsRUFBT0MsRUFDMUVtQyxHQUFXRSxLQUFLN0MsR0FqRGxCSyxHQUFJOEIsRUFBSixFQUNBTyxLQUtFLE1BQUlaLHlDQUdKLElBQUEsR0FBR0EsR0FBSyxFQUFBL0IsRUFBS00sS0FBVlIsU0FBdUJDLE9BQUFDLElBQ3pCdkMsS0FBQXFDLFNBQVFFLEdBQUtPLFFBQU8sdUNBR25CcEMsR0FHRCxJQUFBLEdBRkM0RSxHQUFBLEVBQ0FDLEdBQUEsRUFDRGhELEVBQUEsRUFBQUEsRUFBQXZDLEtBQUFxQyxTQUFBQyxPQUFBQyxJQUVGZ0QsR0FBQXZGLEtBQUFxQyxTQUFBRSxHQUFBRSxTQUNEOEMsR0FBUSxHQUdQdkYsS0FBQXFDLFNBQUFFLEdBQUFFLFFBQUF6QyxLQUFBcUMsU0FBQUUsR0FBQWlELFNBQUE5RSxLQUNENEUsSUFDQUEsRUFBQSxJQUFBNUUsRUFBQXVELE9BQUEsR0FtREVqRSxLQUFLQyxXQUFXd0YsWUFBWSxHQUFLLEdBQUd6RixLQUFLcUMsU0FBU0UsR0FBR21DLE1BQVEsR0EvQ3hDYSxLQXVEdEJ4RyxRQUFRQyxJQUFJLFFBdERiRSxTQUFLZSxjQUFhQSx1Q0FJbkI2RCxHQXlEQyxNQURBL0UsU0FBUUMsSUFBSThFLEdBQ0w5RCxLQUFLOEQsWUFyRFo0QixLQUFJMUMsR0FBQUEsS0FDSjBDLE1BQUF0RSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbi8vIEdsb2JhbCBWYXJpYWJsZXNcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xudmFyIGNhbnZhc09mZnNldCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xudmFyIGNhbnZhc1dpZHRoID0gNTAwO1xudmFyIGNhbnZhc0hlaWdodCA9IDgwMDtcbnZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbnZhciBpbnRlcnZhbCA9IDEwO1xudmFyIGxpZmVMb3N0ID0gbmV3IEV2ZW50KCdsaWZlTG9zdCcpO1xudmFyIGdhbWVPdmVyID0gbmV3IEV2ZW50KCdnYW1lT3ZlcicpO1xuXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbihldmVudCkge1xuXHRjYW52YXNPZmZzZXQgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbn1cbmNsYXNzIEdhbWUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvLyBHYW1lIFNjcmVlblxuXHRcdFxuXHRcblx0XHQvLyBHYW1lIFNldHRpbmdzXG5cdFx0dGhpcy5zY29yZUJvYXJkID0gbmV3IFNjb3JlQm9hcmQoKTtcblx0XHR0aGlzLmhpZ2hTY29yZSA9IDA7XG5cdFx0dGhpcy5udW1MaXZlcyA9IDM7XG5cdFx0XG5cdFx0Ly8gQmxvY2tzIGluaXRpYWxpemVkXG5cdFx0dGhpcy5ibG9ja1dpZHRoID0gNDM7XG5cdFx0dGhpcy5ibG9ja0hlaWdodCA9IDI1O1xuXHRcdHRoaXMuYmxvY2tzID0gIG5ldyBCbG9ja3ModGhpcy5zY29yZUJvYXJkKTtcblxuXHRcdC8vIFBhZGRsZSBpbml0aWFsaXplZCBpbiB0aGUgYm90dG9tIG1pZGRsZSBvZiBzY3JlZW5cblx0XHR0aGlzLnBhZGRsZSA9IG5ldyBQYWRkbGUoKGNhbnZhc1dpZHRoIC0gMTAwKS8yLCBjYW52YXNIZWlnaHQgLSA0MCk7XG5cblx0XHQvLyBCYWxsIGluaXRpYWxpemVkXG5cdFx0dGhpcy5iYWxsID0gbmV3IEJhbGwoY2FudmFzV2lkdGgvMiwgNDAwKTtcblxuXHRcdHRoaXMuZ2FtZUludGVydmFsO1xuXHRcdHZhciB0ID0gdGhpcztcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdsaWZlTG9zdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHR0LmxpZmVMb3N0KCk7XG5cdFx0fSk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2FtZU92ZXInLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0dC5nYW1lT3ZlcigpO1xuXHRcdH0pO1xuXHRcdHZhciBuZXdHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdHYW1lQnRuXCIpO1xuXHRcdG5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRuZXdHYW1lQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHRcdHQuc3RhcnRHYW1lKCk7XG5cdFx0XHR0LmJhbGwucmVzZXRCYWxsKCk7XG5cdFx0XHR0LmJsb2Nrcy5yZXNldEJsb2NrcygpO1xuXHRcdH0pO1xuXHR9XG5cblx0d3JpdGVTY29yZSgpIHtcblx0XHR2YXIgc2NvcmVNZXNzYWdlID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlQm9hcmQuc2NvcmU7XG5cdFx0dmFyIGxpdmVNZXNzYWdlID0gXCJMaXZlczogXCIgKyB0aGlzLm51bUxpdmVzO1xuXHRcdGN0eC5mb250ID0gXCIzMHB4IHNhbnMtc2VyaWZcIjtcblx0XHRjdHguZmlsbFRleHQoc2NvcmVNZXNzYWdlLCAxMCwgMjUpO1xuXHRcdGN0eC5maWxsVGV4dChsaXZlTWVzc2FnZSwgMzUwLCAyNSk7XG5cdH1cblxuXHRsaWZlTG9zdCgpIHtcblx0XHR0aGlzLm51bUxpdmVzLS07XG5cdFx0aWYodGhpcy5udW1MaXZlcyA9PSAwKSB7XG5cdFx0XHR0aGlzLmdhbWVPdmVyKCk7XG5cdFx0fVx0XG5cdH1cblx0Z2FtZU92ZXIoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJHYW1lIE92ZXJcIik7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVJbnRlcnZhbCk7XG5cdFx0dmFyIHQgPSB0aGlzO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBDbGVhciBDYW52YXNcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCk7XG5cblx0XHRcdFxuXG5cdFx0XHR2YXIgY3VyckhpZ2hTY29yZSA9IHQuc2NvcmVCb2FyZC5oaWdoU2NvcmU7XG5cdFx0XHR0LnNjb3JlQm9hcmQuaGlnaFNjb3JlID0gdC5zY29yZUJvYXJkLnNjb3JlID4gIGN1cnJIaWdoU2NvcmUgPyB0LnNjb3JlQm9hcmQuc2NvcmUgOiBjdXJySGlnaFNjb3JlO1xuXHRcdFx0dC5zY29yZUJvYXJkLnVwZGF0ZUhpZ2hTY29yZSh0LnNjb3JlQm9hcmQuaGlnaFNjb3JlKTtcblx0XHRcdG5ld0dhbWVCdG4uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG5cdFx0XHRcblx0XHRcdHZhciBtZXNzYWdlMSA9IFwiR0FNRSBPVkVSXCI7XG5cdFx0XHR2YXIgbWVzc2FnZTIgPSBcIlNjb3JlOiBcIiArIHQuc2NvcmVCb2FyZC5zY29yZTsgXG5cdFx0XHR2YXIgbWVzc2FnZTMgPSBcIkhpZ2ggc2NvcmU6IFwiICsgdC5zY29yZUJvYXJkLmhpZ2hTY29yZTtcblx0XHRcdFxuXHRcdFx0Y3R4LmZvbnQgPSBcIjMwcHggc2Fucy1zZXJpZlwiO1xuXHRcdFx0Y3R4LmZpbGxUZXh0KG1lc3NhZ2UxLCAxNTAsIDUwKTtcblx0XHRcdGN0eC5maWxsVGV4dChtZXNzYWdlMiwgMTUwLCAxNTApO1xuXHRcdFx0Y3R4LmZpbGxUZXh0KG1lc3NhZ2UzLCAxNTAsIDIwMCk7XG5cdFx0fSwgaW50ZXJ2YWwpO1x0XG5cdH1cblxuXHRzdGFydEdhbWUoKSB7XG5cdFx0dmFyIHQgPSB0aGlzO1xuXHRcdHRoaXMuc2NvcmVCb2FyZC5zY29yZSA9IDA7XG5cdFx0dGhpcy5udW1MaXZlcyA9IDM7XG5cdFx0dGhpcy5nYW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHt0LmRyYXdTY3JlZW4oKX0sIGludGVydmFsKTtcblx0fVxuXG5cdGRyYXdCbG9ja3MoKSB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmJsb2NrQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYmxvY2sgPSB0aGlzLmJsb2Nrcy5ibG9ja0FycltpXTtcblx0XHRcdGlmKGJsb2NrLmFjdGl2ZSkge1xuXHRcdFx0XHRjdHguZmlsbFN0eWxlID0gYmxvY2suY29sb3VyO1xuXHRcdFx0XHRjdHguZmlsbFJlY3QoYmxvY2sucG9zWCwgYmxvY2sucG9zWSwgYmxvY2sud2lkdGgsIGJsb2NrLmhlaWdodCk7XG5cdFx0XHR9XHRcblx0XHR9ICAgICBcblx0fVxuXG5cdGRyYXdQYWRkbGUoKSB7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IHRoaXMucGFkZGxlLmNvbG91cjtcblx0XHRjdHguZmlsbFJlY3QodGhpcy5wYWRkbGUucG9zWCwgdGhpcy5wYWRkbGUucG9zWSwgdGhpcy5wYWRkbGUud2lkdGgsIHRoaXMucGFkZGxlLmhlaWdodCk7XG5cblx0fVxuXG5cdGRyYXdCYWxsKCkge1xuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHQvL2NlbnRlcih4LHkpLCBzdGFydCByYWRpYW4sIGVuZCByYWRpYW5cblx0XHRjdHguYXJjKHRoaXMuYmFsbC5wb3NYLCB0aGlzLmJhbGwucG9zWSwgdGhpcy5iYWxsLnJhZGl1cywgMCAsIDIqTWF0aC5QSSwgZmFsc2UpO1xuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhbGwuY29sb3VyO1xuXHRcdGN0eC5maWxsKCk7XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXHR9XG5cblx0ZHJhd1NjcmVlbigpIHtcblx0XHQvL2NsZWFyIGNhbnZhcyBiZWZvcmUgcmVkcmF3aW5nXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcblxuXHRcdHRoaXMucGFkZGxlLnVwZGF0ZVBvc2l0aW9uKCk7XG5cdFx0dGhpcy5iYWxsLmJhbGxQaHlzaWNzKGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHRoaXMucGFkZGxlLCB0aGlzLmJsb2Nrcyk7XG5cdFx0dGhpcy5ibG9ja3MudXBkYXRlQmxvY2tzKHRoaXMuYmFsbCk7XG5cdFx0dGhpcy53cml0ZVNjb3JlKCk7XG5cdFx0dGhpcy5kcmF3QmxvY2tzKCk7XG5cdFx0dGhpcy5kcmF3UGFkZGxlKCk7XG5cdFx0dGhpcy5kcmF3QmFsbCgpO1xuXHRcdFxuXHR9XG5cblx0XG59XG5cbmNsYXNzIFNjb3JlQm9hcmQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNjb3JlID0gMDtcblx0XHR0aGlzLmhpZ2hTY29yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGlnaFNjb3JlXCIpIHx8IDA7XG5cdH1cblx0dXBkYXRlU2NvcmUoc2NvcmUpIHtcblx0XHR0aGlzLnNjb3JlICs9IHNjb3JlO1xuXHR9XG5cdHVwZGF0ZUhpZ2hTY29yZShzY29yZSkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaGlnaFNjb3JlXCIsIHNjb3JlKTtcblx0fVxuXHRnZXQocHJvcGVydHkpIHtcblx0XHRyZXR1cm4gdGhpc1twcm9wZXJ0eV07XG5cdH1cbn1cblxuY2xhc3MgQmFsbCB7XG5cdGNvbnN0cnVjdG9yKHBvc1gsIHBvc1kpIHtcblx0XHR0aGlzLmNvbG91ciA9ICd3aGl0ZSc7XG5cdFx0dGhpcy5yYWRpdXMgPSAxMDtcblx0XHR0aGlzLnBvc1ggPSBwb3NYO1xuXHRcdHRoaXMucG9zWSA9IHBvc1k7XG5cdFx0dGhpcy52ZWxYID0gMDtcblx0XHR0aGlzLnZlbFkgPSAwLjI7XG5cdH1cblx0LyogVXBkYXRlIGJhbGwgcG9zaXRpb24gb24gY2FudmFzKi9cblx0YmFsbFBoeXNpY3MoY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgcGFkZGxlLCBibG9ja3MpIHtcblx0XHR2YXIgYm90dG9tV2FsbEhpdCA9IGZhbHNlO1xuXHRcdC8vIFVwZGF0ZSBCYWxsIHBvc2l0aW9uXG5cdFx0dGhpcy5wb3NZICs9IHRoaXMudmVsWSAqIGludGVydmFsO1xuXHRcdHRoaXMucG9zWCArPSB0aGlzLnZlbFggKiBpbnRlcnZhbDtcblx0XHRcblx0XHQvL2lmIGJhbGwgaGl0cyBib3R0b20gd2FsbFxuXHRcdGlmKHRoaXMucG9zWSArIHRoaXMucmFkaXVzID49IGNhbnZhc0hlaWdodCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ2JvdHRvbSB3YWxsIGhpdCcpO1xuXHRcdFx0dGhpcy5yZXNldEJhbGwoKTtcblx0XHRcdC8vIHRoaXMudmVsWSAqPSAtMTtcblx0XHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobGlmZUxvc3QpO1xuXG5cdFx0fVxuXG5cdFx0Ly9pZiBiYWxsIGhpc3QgdG9wIHdhbGxcblx0XHRpZih0aGlzLnBvc1kgLSB0aGlzLnJhZGl1cyA8PSAwKSB7XG5cdFx0XHRjb25zb2xlLmxvZygndG9wIHdhbGwgaGl0IC1hJyk7XG5cdFx0XHR0aGlzLnZlbFkgKj0gLTE7XG5cdFx0fVxuXG5cdFx0Ly9pZiB2YWxsIGhpdHMgcmlnaHQgd2FsbFxuXHRcdGlmKHRoaXMucG9zWCArIHRoaXMucmFkaXVzID49IGNhbnZhc1dpZHRoKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncmlnaHQgd2FsbCBoaXQgLWEnKTtcblx0XHRcdHRoaXMudmVsWCAqPSAtMTtcblx0XHR9XG5cblx0XHQvL2lmIGJhbGwgaGl0cyBsZWZ0IHdhbGxcblx0XHRpZih0aGlzLnBvc1ggLSB0aGlzLnJhZGl1cyA8PSAwKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnbGVmdCB3YWxsIGhpdCAtYScpO1xuXHRcdFx0dGhpcy52ZWxYICo9IC0xO1xuXHRcdH1cblxuXG5cdFx0Ly9iYWxsIGF0IHBhZGRsZSBsZXZlbFxuXHRcdGlmKHRoaXMucG9zWSA+PSBjYW52YXNIZWlnaHQgLSBwYWRkbGUuaGVpZ2h0IC0gcGFkZGxlLmhlaWdodE9mZnNldCkge1xuXHRcdFx0Ly9iYWxsIGhpdHMgcGFkZGxlXG5cdFx0XHRpZigodGhpcy5wb3NYIC0gdGhpcy5yYWRpdXMgPD0gcGFkZGxlLnBvc1ggKyBwYWRkbGUud2lkdGgpICYmICh0aGlzLnBvc1ggKyB0aGlzLnJhZGl1cyA+PSBwYWRkbGUucG9zWCkpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJwYWRkbGUgaGl0IC1hXCIpO1xuXHRcdFx0XHR0aGlzLnZlbFkgKj0gLTE7XG5cdFx0XHRcdHZhciBzcGVlZCA9IHRoaXMucG9zWC8ocGFkZGxlLnBvc1ggKyAwLjUqcGFkZGxlLndpZHRoKSAtIDE7XG5cdFx0XHRcdHRoaXMudmVsWCA9IHNwZWVkID4gMC41ID8gMC41IDogc3BlZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0fVxuXHRyZXNldEJhbGwoKSB7XG5cdFx0dGhpcy5wb3NYID0gY2FudmFzV2lkdGgvMjtcblx0XHR0aGlzLnBvc1kgPSA0MDA7XG5cdFx0dGhpcy52ZWxYID0gMDtcblx0XHR0aGlzLnZlbFkgPSAwLjI7XG5cdH1cblx0Z2V0KHByb3BlcnR5KSB7XG5cdFx0cmV0dXJuIHRoaXNbcHJvcGVydHldO1xuXHR9XG5cbn1cbiBcbmNsYXNzIFBhZGRsZSB7XG5cdGNvbnN0cnVjdG9yKHBvc1gsIHBvc1kpIHtcblx0XHR0aGlzLmNvbG91ciA9ICdibGFjayc7XG5cdFx0dGhpcy53aWR0aCA9IDEwMDtcblx0XHR0aGlzLmhlaWdodCA9IDE1O1xuXHRcdHRoaXMuaGVpZ2h0T2Zmc2V0ID0gNDA7XG5cdFx0dGhpcy5wb3NYID0gcG9zWDtcblx0XHR0aGlzLnBvc1kgPSBwb3NZO1xuXHRcdHRoaXMudmVsWCA9IDA7XG5cdFx0dGhpcy5zcGVlZCA9IDAuNTtcblx0XHRcblxuXHRcdHZhciB0ID0gdGhpcztcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XG5cdFx0XHQvLyBtb3ZlIHBhZGRsZSBwb3MgbGVmdCBpZiBsZWZ0IGJ1dHRvbiBwcmVzc2VkXG5cdFx0XHRpZihldmVudC5rZXlDb2RlID09IDM3KSB7XG5cdFx0XHRcdHQudmVsWCA9IC10LnNwZWVkO1xuXHRcdFx0fVxuXHRcdFx0Ly9tb3ZlIHBhZGRsZSBwb3MgcmlnaHQgaWYgcmlnaHQgYnV0dG9uIHByZXNzZWRcblx0XHRcdGVsc2UgaWYoZXZlbnQua2V5Q29kZSA9PSAzOSkge1xuXHRcdFx0XHR0LnZlbFggPSB0LnNwZWVkO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHQvLyBtb3ZlIHBhZGRsZSBwb3MgbGVmdCBpZiBsZWZ0IGJ1dHRvbiBwcmVzc2VkXG5cdFx0XHRpZihldmVudC5rZXlDb2RlID09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT0gMzkpIHtcblx0XHRcdFx0dC52ZWxYID0gMDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdH0pO1xuXG5cdFx0Ly8gRXZlbnQgSGFuZGxlcnMgZm9yIHBhZGRsZSBjb250cm9sXG5cdFx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdHZhciB4ID0gZXZlbnQuY2xpZW50WCAtIGNhbnZhc09mZnNldCAtIDUwO1xuXHRcdFx0dC5wb3NYID0geDtcblx0XHR9KTtcblx0XHRcblx0fVxuXHRcblx0LyogVXBkYXRlIHBhZGRsZSBwb3NpdGlvbiAqL1xuXHR1cGRhdGVQb3NpdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnZlbFgpO1xuXHRcdHRoaXMucG9zWCArPSB0aGlzLnZlbFggKiBpbnRlcnZhbDtcblx0XHR0aGlzLnBvc1ggPSB0aGlzLnBvc1ggPj0gY2FudmFzV2lkdGggLSB0aGlzLndpZHRoID8gY2FudmFzV2lkdGggLSB0aGlzLndpZHRoIDogdGhpcy5wb3NYO1xuXHRcdHRoaXMucG9zWCA9IHRoaXMucG9zWCA8PSAwID8gMCA6IHRoaXMucG9zWDtcblx0fVxuXG5cdGdldChwcm9wZXJ0eSkge1xuXHRcdHJldHVybiB0aGlzW3Byb3BlcnR5XTtcblx0fVxuXHRcbn1cblxuY2xhc3MgQmxvY2sge1xuXHRjb25zdHJ1Y3RvcihpZCwgbGV2ZWwsIGFjdGl2ZSwgY29sb3VyLCBwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0dGhpcy5pZCA9IGlkO1xuXHRcdHRoaXMubGV2ZWwgPSBsZXZlbDtcblx0XHR0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcblx0XHR0aGlzLmNvbG91ciA9IGNvbG91cjtcblx0XHR0aGlzLnBvc1ggPSBwb3NYO1xuXHRcdHRoaXMucG9zWSA9IHBvc1k7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHR9XG5cdGdldCAocHJvcGVydHkpIHtcblx0XHRyZXR1cm4gdGhpc1twcm9wZXJ0eV07XG5cdH1cblxuXHRibG9ja0hpdChiYWxsKSB7XG5cdFx0dmFyIGhpdCA9IGZhbHNlO1xuXHRcdHZhciBibG9ja1NlY3Rpb24gPSB0aGlzLnBvc1kgKyB0aGlzLmhlaWdodDtcblx0XHRcblx0XHRpZihiYWxsLnBvc1kgLSBiYWxsLnJhZGl1cyA8PSBibG9ja1NlY3Rpb24gJiYgdGhpcy5hY3RpdmUpIHtcblx0XHRcdC8vaXRlcmF0ZSBvdmVyIHRoZSBjaXJjdW1mZXJlbmNlIG9mIHRoZSBiYWxsIGFuZCBjaGVjayBpZiBhbnkgb2YgdGhlIHBvaW50cyBhcmUgaW5zaWRlIHRoZSByZWN0YW5nbGVcblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCAzNjA7IGkrKykgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0XHR2YXIgeCA9IGJhbGwucG9zWCArIGJhbGwucmFkaXVzICogTWF0aC5jb3MoaSAqIE1hdGguUEkvMTgwKTtcblx0XHRcdFx0dmFyIHkgPSBiYWxsLnBvc1kgLSAgYmFsbC5yYWRpdXMgKiBNYXRoLnNpbihpICogTWF0aC5QSS8xODApO1xuXG5cdFx0XHRcdGlmKHggPj0gdGhpcy5wb3NYICYmIHggPD0gdGhpcy5wb3NYICsgdGhpcy53aWR0aCkge1xuXHRcdFx0XHRcdGlmKHkgPD0gdGhpcy5wb3NZICsgdGhpcy5oZWlnaHQgJiYgeSA+PSB0aGlzLnBvc1kpIHtcblx0XHRcdFx0XHRcdGhpdCA9IHRydWU7XG5cdFx0XHRcdFx0XHRiYWxsLnZlbFkgKj0gLTE7XG5cdFx0XHRcdFx0XHQvLyBzY29yZSArPSAoNDAgLSAxMCp0aGlzLmxldmVsICsgMSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cdFx0XG5cdFx0fVxuXHRcdGlmKGhpdCkge1xuXHRcdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gXG5cdFx0cmV0dXJuIGZhbHNlO1x0XG5cdH1cbn1cblxuY2xhc3MgQmxvY2tzIHtcblx0Y29uc3RydWN0b3Ioc2NvcmVCb2FyZCkge1xuXHRcdHRoaXMuc2NvcmVCb2FyZCA9IHNjb3JlQm9hcmQ7XG5cdFx0dGhpcy5ibG9ja0FyciA9IHRoaXMuZ2VuZXJhdGVCbG9ja3MoKTtcblx0fVxuXG5cdC8qIEdlbmVyYXRlIHRoZSBpbnRpYWwgYmxvY2tzICovXG5cdGdlbmVyYXRlQmxvY2tzKCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiYmxvY2tzIGdlbmVyYXRlZFwiKTtcblx0XHR2YXIgd2lkdGggPSA0Mztcblx0XHR2YXIgaGVpZ2h0ID0gMjU7XG5cdFx0dmFyIHBvc1ggPSAwO1xuXHRcdHZhciBwb3NZID0gMDtcblx0XHR2YXIgYmxvY2tDb2xvdXJzID0gWydyZWQnLCAnIzA2NGRmMScsICcjMzNmMTA2JywgJyM4MDM3ZGQnLCAneWVsbG93J107XG5cdFx0dmFyIGluZGV4ID0gMDtcblx0XHR2YXIgYmxvY2tBcnJheSA9IFtdXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuXHRcdFx0cG9zWCA9IDEyO1xuXHRcdFx0cG9zWSArPSBoZWlnaHQgKyA1O1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IDEwOyBqKyspIHtcdFxuXHRcdFx0XHQvL3ZhciBjb2xvckluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjUpO1xuXHRcdFx0XHR2YXIgYmxvY2sgPSBuZXcgQmxvY2soaW5kZXgsIGksIHRydWUsIGJsb2NrQ29sb3Vyc1tpXSwgcG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHRcdGJsb2NrQXJyYXkucHVzaChibG9jayk7XG5cdFx0XHRcdHBvc1ggKz0gd2lkdGggKyA1O1xuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdH1cblx0XHQgICAgICAgICAgXG5cdFx0Ly8gY29uc29sZS5sb2coYmxvY2tBcnJheSk7XG5cdFx0cmV0dXJuIGJsb2NrQXJyYXk7ICAgICAgICAgICAgICBcblx0fVxuXHRyZXNldEJsb2NrcygpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5ibG9ja0Fyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5ibG9ja0FycltpXS5hY3RpdmUgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVCbG9ja3MoYmFsbCkge1xuXHRcdHZhciBtdWx0aUhpdHMgPSAwO1xuXHRcdHZhciBtb3JlQmxvY2tzID0gdHJ1ZTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5ibG9ja0Fyci5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRpZihtb3JlQmxvY2tzICYmIHRoaXMuYmxvY2tBcnJbaV0uYWN0aXZlKSB7XG5cdFx0XHRcdG1vcmVCbG9ja3MgPSBmYWxzZTtcblx0XHRcdH0gXG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLmJsb2Nrc0FycltpXSk7XG5cdFx0XHRpZih0aGlzLmJsb2NrQXJyW2ldLmFjdGl2ZSAmJiB0aGlzLmJsb2NrQXJyW2ldLmJsb2NrSGl0KGJhbGwpKSB7XG5cdFx0XHRcdG11bHRpSGl0cysrO1xuXHRcdFx0XHRpZihtdWx0aUhpdHMgPiAxKSBiYWxsLnZlbFkgKj0gLTE7XG5cdFx0XHRcdHRoaXMuc2NvcmVCb2FyZC51cGRhdGVTY29yZSg0MCAtIDEwKnRoaXMuYmxvY2tBcnJbaV0ubGV2ZWwgKyAxKTtcblxuXG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9XG5cdFx0Ly8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSBibG9ja3MgcmVtYWluaW5nXG5cdFx0aWYobW9yZUJsb2NrcykgeyBcblx0XHRcdGNvbnNvbGUubG9nKCdvdmVyJyk7XG5cdFx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGdhbWVPdmVyKTtcblx0XHR9XG5cdH0gICBcblxuXHRnZXQgKHByb3BlcnR5KSB7XG5cdFx0Y29uc29sZS5sb2cocHJvcGVydHkpXG5cdFx0cmV0dXJuIHRoaXNbcHJvcGVydHldO1xuXHR9XG59XG5cbi8vIERvIHNoaXQgaGVyZVxuXG52YXIgZ2FtZSA9IG5ldyBHYW1lKCk7XG5nYW1lLnN0YXJ0R2FtZSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
