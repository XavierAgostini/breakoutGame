"use strict";function draw(){ctx.clearRect(0,0,canvasWidth,canvasHeight),ctx.fillStyle="black",paddlePosition(),ctx.fillRect(paddle.posX,paddle.posY,paddle.width,paddle.height),ballPhysics(),refreshBlocks(blocks),ctx.beginPath(),ctx.arc(ball.posX,ball.posY,ball.radius,0,2*Math.PI,!1),ctx.fillStyle="white",ctx.fill(),ctx.stroke(),updateScore()}function generateInitialBlocks(){for(var l=blockWidth,e=blockHeight,a=0,t=0,o=0,s=[],i=0;i<5;i++){a=12,t+=e+5;for(var c=0;c<10;c++)ctx.fillStyle=blockColors[i],ctx.fillRect(a,t,l,e),s.push({id:o,posX:a,posY:t,color:blockColors[i],level:i,active:!0}),a+=l+5,o++}return s}function refreshBlocks(l){for(var e=0,a=0;a<l.length;a++)blockHit(l[a])&&(e++,e>1&&(ball.velY*=-1)),l[a].active&&(ctx.fillStyle=l[a].color,ctx.fillRect(l[a].posX,l[a].posY,blockWidth,blockHeight))}function blockHit(l){var e=!1,a=blocks[blocks.length-1].posY+blockHeight;if(ball.posY-ball.radius<=a&&l.active)for(var t=({x:ball.posX,y:ball.posY-ball.radius},{x:ball.posX+ball.radius,y:ball.posY},{x:ball.posX,y:ball.posY+ball.radius},{x:ball.posX-ball.radius,y:ball.posY},0);t<360;t++){var o=ball.posX+ball.radius*Math.cos(t*Math.PI/180),s=ball.posY-ball.radius*Math.sin(t*Math.PI/180);if(o>=l.posX&&o<=l.posX+blockWidth&&s<=l.posY+blockHeight&&s>=l.posY){e=!0,ball.velY*=-1,score+=40-10*l.level+1;break}}return!!e&&(blocks[l.id].active=!1,!0)}function paddlePosition(){paddle.posX+=paddle.velX*interval,paddle.posX=paddle.posX>=canvasWidth-paddle.width?canvasWidth-paddle.width:paddle.posX,paddle.posX=paddle.posX<=0?0:paddle.posX}function ballPhysics(){if(ball.posY+=ball.velY*interval,ball.posX+=ball.velX*interval,ball.posY+ball.radius>=canvasHeight&&(console.log("bottom wall hit"),lifeLost()),ball.posY-ball.radius<=0&&(console.log("top wall hit"),ball.velY*=-1),ball.posX+ball.radius>=canvasWidth&&(console.log("right wall hit"),ball.velX*=-1),ball.posX-ball.radius<=0&&(console.log("left wall hit"),ball.velX*=-1),ball.posY>=canvasHeight-paddleHeight-paddleHeightOffset&&ball.posX-ball.radius<=paddle.posX+paddle.width&&ball.posX+ball.radius>=paddle.posX){console.log("paddle hit"),ball.velY*=-1;var l=ball.posX/(paddle.posX+.5*paddle.width)-1;ball.velX=l>.5?.5:l}}function updateScore(){var l="Score: "+score,e="Lives: "+numLives;ctx.font="30px sans-serif",ctx.fillText(l,10,50),ctx.fillText(e,350,50)}function lifeLost(){numLives--,0==numLives&&gameOver(),ball.posY=ballStart}function gameOver(){console.log("Game Over"),clearInterval(game),setTimeout(function(){ctx.clearRect(0,0,canvasWidth,canvasHeight);var l=localStorage.getItem("highScore");score>l?highScore=score:highScore,localStorage.setItem("highScore",highScore),newGameBtn.style.display="inline";var e="GAME OVER",a="Your Score: "+score,t="Your High score: "+highScore;ctx.font="30px sans-serif",ctx.fillText(e,150,50),ctx.fillText(a,150,150),ctx.fillText(t,150,200)},interval)}var canvas=document.getElementById("myCanvas"),canvasOffset=canvas.getBoundingClientRect().left;console.log("offset-left: ",canvasOffset);var canvasHeight=800,canvasWidth=500,ctx=canvas.getContext("2d"),interval=10,blockColors=["red","#064df1","#33f106","#8037dd","yellow"],blockWidth=43,blockHeight=25,blocks=generateInitialBlocks(),paddleHeight=15,paddleHeightOffset=40,paddleSpeed=.5,paddle={posX:(canvasWidth-50)/2,posY:canvasHeight-paddleHeightOffset,velX:0,velY:0,width:100,height:15},ballStart=200,ball={radius:10,posX:400,posY:ballStart,accelX:0,accelY:0,velX:0,velY:.2},score=0,numLives=1,highScore=localStorage.getItem("highScore")||0,newGameBtn=document.getElementById("newGameBtn"),game=setInterval(draw,interval);canvas.addEventListener("mousemove",function(l){var e=l.clientX-canvasOffset;l.clientY;paddle.posX=e}),document.addEventListener("keydown",function(l){37==l.keyCode?paddle.velX=-paddleSpeed:39==l.keyCode&&(paddle.velX=paddleSpeed)}),document.addEventListener("keyup",function(l){37!=l.keyCode&&39!=l.keyCode||(paddle.velX=0)}),newGameBtn.addEventListener("click",function(l){newGameBtn.style.display="none",blocks=generateInitialBlocks(),numLives=1,score=0,game=setInterval(draw,interval)});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrb3V0LmpzIl0sIm5hbWVzIjpbImRyYXciLCJjdHgiLCJjbGVhclJlY3QiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImZpbGxTdHlsZSIsInBhZGRsZVBvc2l0aW9uIiwiZmlsbFJlY3QiLCJwYWRkbGUiLCJwb3NYIiwicG9zWSIsIndpZHRoIiwiaGVpZ2h0IiwiYmFsbFBoeXNpY3MiLCJibG9ja3MiLCJiZWdpblBhdGgiLCJmaWxsIiwiYmFsbCIsInJhZGl1cyIsIk1hdGgiLCJQSSIsInN0cm9rZSIsInVwZGF0ZVNjb3JlIiwiYmxvY2tXaWR0aCIsImluZGV4IiwiYmxvY2tIZWlnaHQiLCJibG9ja0FycmF5IiwiaSIsImJsb2NrQ29sb3JzIiwiaiIsInB1c2giLCJpZCIsImNvbG9yIiwibGV2ZWwiLCJhY3RpdmUiLCJyZWZyZXNoQmxvY2tzIiwibXVsdGlIaXRzIiwiYmxvY2tIaXQiLCJ2ZWxZIiwicmVjdCIsImJsb2NrU2VjdGlvbiIsImxlZnQiLCJ4IiwieSIsInNpbiIsImhpdCIsInNjb3JlIiwidmVsWCIsImludGVydmFsIiwibGlmZUxvc3QiLCJjb25zb2xlIiwibG9nIiwic3BlZWQiLCJwYWRkbGVIZWlnaHQiLCJwYWRkbGVIZWlnaHRPZmZzZXQiLCJsaXZlTWVzc2FnZSIsIm51bUxpdmVzIiwiZmlsbFRleHQiLCJzY29yZU1lc3NhZ2UiLCJnYW1lT3ZlciIsImJhbGxTdGFydCIsImZvbnQiLCJsb2NhbFN0b3JhZ2UiLCJtZXNzYWdlMSIsImNsZWFySW50ZXJ2YWwiLCJtZXNzYWdlMiIsInNldFRpbWVvdXQiLCJtZXNzYWdlMyIsImdldEl0ZW0iLCJjdXJySGlnaFNjb3JlIiwiaGlnaFNjb3JlIiwibmV3R2FtZUJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsImRpc3BsYXkiLCJnYW1lIiwic2V0SW50ZXJ2YWwiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2FudmFzT2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZ2VuZXJhdGVJbml0aWFsQmxvY2tzIiwicGFkZGxlU3BlZWQiLCJhY2NlbFgiLCJhY2NlbFkiLCJldmVudCIsImNsaWVudFgiLCJrZXlDb2RlIl0sIm1hcHBpbmdzIjoiWUFxQ0EsU0FBU0EsUUFFUkMsSUFBSUMsVUFBVSxFQUFHLEVBQUdDLFlBQWFDLGNBR2pDSCxJQUFJSSxVQUFZLFFBQ2hCQyxpQkFHQUwsSUFBSU0sU0FBU0MsT0FBT0MsS0FBTUQsT0FBT0UsS0FBTUYsT0FBT0csTUFBT0gsT0FBT0ksUUFJNURDLGNBR0FaLGNBQUFhLFFBQUFiLElBQUljLFlBTUpkLElBQUllLElBQUpDLEtBQUFSLEtBQUFRLEtBQUFQLEtBQUFPLEtBQUFDLE9BQUEsRUFBQSxFQUFBQyxLQUFBQyxJQUFBLEdBQ0FuQixJQUFJb0IsVUFBSixRQURBcEIsSUFBSWUsT0FHSmYsSUFBQW9CLFNBQ0FDLGNBVUEsUUFBSVoseUJBUUZULElBQUFBLEdBWEVVLEdBQVFZLFdBS1JDLEVBQUpDLFlBQ0lDLEVBQUFBLEVBQ0poQixFQUFRaUIsRUFFUGpCLEVBQVFFLEVBQ1JjLEtBQ0tyQixFQUFBQSxFQUFKc0IsRUFBZ0JDLEVBQUFBLElBQUFBLENBQ2hCM0IsRUFBSU0sR0FDSm1CLEdBQUFBLEVBQWdCLENBQ2hCakIsS0FBQUEsR0FBQUEsR0FBUUUsRUFBQUEsRUFBUixHQUFBa0IsSUFDQUwsSUFBQUEsVUFBQUEsWUFBQUEsR0FDQXZCLElBQUFNLFNBQUFFLEVBQUFDLEVBQUFDLEVBQUFDLEdBQ0RjLEVBQUFJLE1BQUFDLEdBQUFQLEVBQUFmLEtBQUFBLEVBQUFDLEtBQUFBLEVBQUFzQixNQUFBSixZQUFBRCxHQUFBTSxNQUFBTixFQUFBTyxRQUFBLElBQ0R6QixHQUFPaUIsRUFBUCxFQUNBRixJQUdELE1BQUFFLEdBSUUsUUFBQVMsZUFBQVQsR0FFQ1UsSUFBQUEsR0FEREEsR0FBWVYsRUFDWFUsRUFBQUEsRUFBQUEsRUFBQUEsRUFBQUEsT0FBQUEsSUFERUMsU0FBU1gsRUFBV0MsTUFLdkJTLElBQ0dWLEVBQUEsSUFBY1EsS0FBakJJLE9BQXlCLElBSXpCWixFQUFBQyxHQUFBTyxTQUNEakMsSUFBQUksVUFBQXFCLEVBQUFDLEdBQUFLLE1BSEUvQixJQUFJTSxTQUFTbUIsRUFBV0MsR0FBR2xCLEtBQU1pQixFQUFXQyxHQUFHakIsS0FBTWEsV0FBWUUsY0FNcEUsUUFBU1ksVUFBU0UsR0FLakIsR0FBR3RCLElBQUtQLEVBQ1A4QixFQUFjdkIsT0FBSkgsT0FBa0JHLE9BQUEsR0FBWUEsS0FBS0MsV0FHN0MsSUFBQUQsS0FBSXdCLEtBQVFDLEtBQUd6QixRQUFZQSxHQUFnQkEsRUFBS1AsT0FNL0MsSUFBQSxHQUFHZ0MsS0FMSkEsRUFBQXpCLEtBQUFSLEtBQUFrQyxFQUFBMUIsS0FBQVAsS0FBQU8sS0FBQUMsU0FDWXdCLEVBQUdmLEtBQUlsQixLQUFuQlEsS0FBNkJDLE9BQUF5QixFQUFBMUIsS0FBQVAsT0FDZkQsRUFBQUEsS0FBT1EsS0FBS0MsRUFBQUEsS0FBU0MsS0FBQUYsS0FBYUUsU0FDdkNGLEVBQUtQLEtBQUxELEtBQWtCUyxLQUFMQSxPQUFtQjBCLEVBQUwzQixLQUFhRSxNQUV4Q29CLEdBQUs5QixFQUFWLElBQWtCaUMsSUFBS0gsQ0FDekIsR0FBQUcsR0FBR0MsS0FBS0osS0FBQXRCLEtBQVlRLE9BQWpCTixLQUFnQ3dCLElBQUtKLEVBQUs3QixLQUE3Q1UsR0FBbUQsS0FDbER5QixFQUFNNUIsS0FBTlAsS0FBQU8sS0FBQUMsT0FBQUMsS0FBQXlCLElBQUFqQixFQUFBUixLQUFBQyxHQUFBLElBRUEwQixJQUFBQSxHQUFBQSxFQUFVckMsTUFBUThCLEdBQUtOLEVBQWJ4QixLQUFWYyxZQUNBb0IsR0FBQUosRUFBQTdCLEtBQUFlLGFBQUFrQixHQUFBSixFQUFBN0IsS0FBQSxDQUNBbUMsR0FBQSxFQUNENUIsS0FBQXFCLE9BQUEsRUFDRFEsT0FBQSxHQUFBLEdBQUFQLEVBQUFOLE1BQUEsQ0FDRCxRQUtELFFBQUFZLElBQ0EvQixPQUFBeUIsRUFBQVIsSUFBQUcsUUFBQSxHQUhRLEdBZ0NULFFBQVM1QixrQkFVUkUsT0FBQUMsTUFBQUQsT0FBQXVDLEtBQUFDLFNBQ0EvQixPQUFLUCxLQUFRTyxPQUFLcUIsTUFBT1UsWUFBekJ4QyxPQUFBRyxNQUFBUixZQUFBSyxPQUFBRyxNQUFBSCxPQUFBQyxLQUNBUSxPQUFLUixLQUFRUSxPQUFLOEIsTUFBT0MsRUFBekIsRUFBQXhDLE9BQUFDLEtBS0N3QyxRQUFBQSxlQWtDRixHQXhDQ2hDLEtBQUtQLE1BQVFPLEtBQUtxQixLQUFPVSxTQVV6Qi9CLEtBQUFSLE1BQUFRLEtBQUE4QixLQUFBQyxTQUdDL0IsS0FBS3FCLEtBQVNyQixLQUFkQyxRQUFBZCxlQUNBOEMsUUFBQUMsSUFBQSxtQkFSQUYsWUFjQWhDLEtBQUFQLEtBQUFPLEtBQUFDLFFBQUEsSUFSQWdDLFFBQVFDLElBQUksZ0JBVWJsQyxLQUFBcUIsT0FBQSxHQUlDckIsS0FBQVIsS0FBQVEsS0FBQUMsUUFBQWYsY0FSQStDLFFBQVFDLElBQUksa0JBV2JsQyxLQUFBOEIsT0FBQSxHQUlFRyxLQUFBQSxLQUFZakMsS0FBQUMsUUFBWixJQUNBRCxRQUFLcUIsSUFBTCxpQkFDQXJCLEtBQUltQyxPQUFRbkMsR0FLZkEsS0FBU0ssTUFBQUEsYUFBYytCLGFBQUFDLG9CQUVsQkMsS0FBQUEsS0FBQUEsS0FBY3JDLFFBQVlzQyxPQUE5Qi9DLEtBQUFELE9BQUFHLE9BQUFNLEtBQUFSLEtBQUFRLEtBQUFDLFFBQUFWLE9BQUFDLEtBQUEsQ0FDQVIsUUFBQWtELElBQVcsY0FDWGxELEtBQUl3RCxPQUFTQyxDQUNiekQsSUFBSXdELEdBQVNGLEtBQUFBLE1BQWIvQyxPQUErQkMsS0FBL0IsR0FBQUQsT0FBQUcsT0FBQSxDQUVBTSxNQUFBOEIsS0FBQUssRUFBQSxHQUFBLEdBQUFBLEdBSUNPLFFBQUFBLGVBQ0EsR0FBQUQsR0FBQSxVQUFBWixNQUNEN0IsRUFBWTJDLFVBQVpKLFFBQ0F2RCxLQUFBNEQsS0FBQSxrQkFDRDVELElBQUF3RCxTQUFTRSxFQUFXLEdBQUEsSUFDbkJULElBQUFBLFNBQVlLLEVBQVosSUFBQSxJQUdDLFFBQUFOLFlBQ0FoRCxXQVZjLEdBQVp1RCxVQWNGRyxXQUVBRyxLQUFBQSxLQUFBQSxVQVhGLFFBQVNILFlBY1BULFFBQUlhLElBQUFBLGFBQ0pDLGNBQUlDLE1BQ0pDLFdBQUlDLFdBRUpsRSxJQUFJNEQsVUFBTyxFQUFBLEVBQUExRCxZQUFYQyxhQWZELElBbUJHNEMsR0FuQkhjLGFBQUFNLFFBQUEsWUFxQkF0QixPQUFBdUIsRUFBQUMsVUFBQXhCLE1BQUF3QixVQUNEQyxhQUFXQyxRQUFBQSxZQUFYRixXQUNDQyxXQUFXRSxNQUFNQyxRQUFVLFFBRTNCbEIsSUFBQUEsR0FBQSxZQUNBVixFQUFBLGVBQUFBLE1BQ0E2QixFQUFPQyxvQkFBUE4sU0FaQ3JFLEtBQUk0RCxLQUFPLGtCQUNYNUQsSUFBSXdELFNBQVNNLEVBQVUsSUFBSyxJQUM1QjlELElBQUl3RCxTQUFTUSxFQUFVLElBQUssS0FDNUJoRSxJQUFJd0QsU0FBU1UsRUFBVSxJQUFLLE1BQzFCbkIsVUFqUUosR0FBSTZCLFFBQVNDLFNBQVNDLGVBQWUsWUFEckNDLGFBQUFILE9BQUFJLHdCQUFBeEMsSUFDQVMsU0FBSTJCLElBQUFBLGdCQUFrQkUsYUFFdEI3QixJQUFBQSxjQUFZLElBQ1ovQyxZQUFBLElBQ0lDLElBQUFBLE9BQUFBLFdBQW9CLE1BQ3BCRCxTQUFBQSxHQUtKeUIsYUFBQSxNQUFBLFVBQUEsVUFBQSxVQUFBLFVBQ0lBLFdBQUFBLEdBQ0FMLFlBQWEsR0FFakJULE9BQUFvRSx3QkFLSTdCLGFBQWUsR0FDZkMsbUJBQXFCLEdBQ3JCNkIsWUFBYyxHQUNkM0UsUUFBU0MsTUFBT04sWUFBQ0EsSUFBRCxFQUFtQk8sS0FBR0EsYUFBTU4sbUJBQWVrRCxLQUFvQlAsRUFBTVQsS0FBR0EsRUFBTTNCLE1BQUdBLElBQU9DLE9BQUtBLElBRzdHZ0QsVUFBWSxJQUNaM0MsTUFBT0MsT0FBQ0EsR0FBRFQsS0FBYUEsSUFBYkMsS0FBd0JBLFVBQXhCMEUsT0FBeUNBLEVBQXpDQyxPQUFvREEsRUFBcER0QyxLQUErREEsRUFBL0RULEtBQXdFQSxJQUcvRVEsTUFBUSxFQUNSVSxTQUFXLEVBQ1hjLFVBQVlSLGFBQWFNLFFBQVEsY0FBZ0IsRUFDakRHLFdBQWFPLFNBQVNDLGVBQWUsY0FFckNKLEtBQU9DLFlBQVk1RSxLQUFNZ0QsU0FxSDdCOEIsUUFBQUEsaUJBQVNOLFlBQTRCLFNBQUFjLEdBQ3BDLEdBQUE1QyxHQUFBNEMsRUFBQUMsUUFBQVAsWUFDR00sR0FBTUUsT0FDUmhGLFFBQUFBLEtBQUFrQyxJQUdEb0MsU0FBQU4saUJBQUEsVUFBQSxTQUFBYyxHQUVlSCxJQUFkM0UsRUFBT3VDLFFBQ1B2QyxPQUFBdUMsTUFBQW9DLFlBSUUsSUFBQUcsRUFBTUUsVUFDUmhGLE9BQU91QyxLQUFPb0MsZUFJaEJMLFNBQVN4RSxpQkFBaUIsUUFBQSxTQUFBZ0YsR0FFWDlFLElBQWRBLEVBQU9DLFNBQW9DRCxJQUE3QjhFLEVBQWVuRixVQUM3QkssT0FBT0MsS0FBT0QsS0F3RmYrRCxXQUFXQyxpQkFBaUIsUUFBUyxTQUFTYyxHQUM3Q2YsV0FBV0UsTUFBTUMsUUFBVSxPQUMzQjVELE9BQVNvRSx3QkFDVDFCLFNBQVcsRUFDWFYsTUFBUSxFQUNSNkIsS0FBT0MsWUFBWTVFLEtBQU1nRCIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW5pdGlhbGl6ZSBDYW52YXNcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xudmFyIGNhbnZhc09mZnNldCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuY29uc29sZS5sb2coXCJvZmZzZXQtbGVmdDogXCIsIGNhbnZhc09mZnNldCk7XG4vL2NvbnNvbGUubG9nKHJlY3QudG9wLCByZWN0LnJpZ2h0LCByZWN0LmJvdHRvbSwgcmVjdC5sZWZ0KTtcbnZhciBjYW52YXNIZWlnaHQgPSA4MDA7IC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1wiKS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIik7XG52YXIgY2FudmFzV2lkdGggPSA1MDA7IC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1wiKS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKTtcbnZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xudmFyIGludGVydmFsID0gMTA7XG5cblxuLy8gQmxvY2sgUGFyYW1ldGVyc1xudmFyIGJsb2NrQ29sb3JzID0gWydyZWQnLCAnIzA2NGRmMScsICcjMzNmMTA2JywgJyM4MDM3ZGQnLCAneWVsbG93J107XG52YXIgYmxvY2tXaWR0aCA9IDQzO1xudmFyIGJsb2NrSGVpZ2h0ID0gMjU7XG4vLyBkaWN0aW9uYXJ5IG9mIGJsb2NrIFt7aWQsIHBvc1gsIHBvc1ksIGNvbG9yLCBsZXZlbCwgYWN0aXZlfV1cbnZhciBibG9ja3MgPSBnZW5lcmF0ZUluaXRpYWxCbG9ja3MoKTtcblxuXG4vLyBQYWRkbGUgUGFyYW10ZXJzXG52YXIgcGFkZGxlSGVpZ2h0ID0gMTU7XG52YXIgcGFkZGxlSGVpZ2h0T2Zmc2V0ID0gNDA7XG52YXIgcGFkZGxlU3BlZWQgPSAwLjU7XG52YXIgcGFkZGxlID0ge3Bvc1g6IChjYW52YXNXaWR0aCAtIDUwKS8yLCBwb3NZOiBjYW52YXNIZWlnaHQgLSBwYWRkbGVIZWlnaHRPZmZzZXQsIHZlbFg6IDAsIHZlbFk6IDAsIHdpZHRoOiAxMDAsIGhlaWdodDogMTV9O1xuXG4vL2JhbGwgcGFyYW1ldGVyczogcmFkaXVlcywgeC1wb3NpdGlvbiwgeS1wb3NpdGlvbiwgeC1hY2NlbGVyYXRpb24sIHktYWNjZWxlcmF0b2luLCB4LXZlbG9jdHksIHktdmVsb2NpdHlcbnZhciBiYWxsU3RhcnQgPSAyMDA7XG52YXIgYmFsbCA9IHtyYWRpdXM6IDEwLCBwb3NYOiA0MDAsIHBvc1k6IGJhbGxTdGFydCwgYWNjZWxYOiAwLCBhY2NlbFk6IDAsIHZlbFg6IDAsIHZlbFk6IDAuMn07XG5cbi8vIEluaXRpYWxlIFNjb3JlXG52YXIgc2NvcmUgPSAwO1xudmFyIG51bUxpdmVzID0gMTtcbnZhciBoaWdoU2NvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhpZ2hTY29yZVwiKSB8fCAwO1xudmFyIG5ld0dhbWVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ld0dhbWVCdG5cIik7XG4vLyBSZWRyYXcgY2FudmFzIDIweC9zIC0+MS82MCA9IDAuMDVzID0gNTBtc1xudmFyIGdhbWUgPSBzZXRJbnRlcnZhbChkcmF3LCBpbnRlcnZhbCk7XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG5cdC8vY2xlYXIgY2FudmFzIGJlZm9yZSByZWRyYXdpbmdcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcblxuXHQvL2RyYXcgcGFkZGxlXG5cdGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuXHRwYWRkbGVQb3NpdGlvbigpO1xuXHQvL3BhZGRsZS5wb3NYICs9IHBhZGRsZS52ZWxYKmludGVydmFsO1xuXHQvL3BhZGRsZS52ZWxYID0gMDtcblx0Y3R4LmZpbGxSZWN0KHBhZGRsZS5wb3NYLCBwYWRkbGUucG9zWSwgcGFkZGxlLndpZHRoLCBwYWRkbGUuaGVpZ2h0KTtcblxuXHRcblx0XG5cdGJhbGxQaHlzaWNzKCk7XG5cdHJlZnJlc2hCbG9ja3MoYmxvY2tzKTtcblxuXHRjdHguYmVnaW5QYXRoKCk7XG5cdC8vZHJhdyBiYWxsXG5cblx0Ly9jZW50ZXIoeCx5KSwgc3RhcnQgcmFkaWFuLCBlbmQgcmFkaWFuXG5cdGN0eC5hcmMoYmFsbC5wb3NYLCBiYWxsLnBvc1ksIGJhbGwucmFkaXVzLCAwICwgMipNYXRoLlBJLCBmYWxzZSk7XG5cdGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG5cdGN0eC5maWxsKCk7XG5cdGN0eC5zdHJva2UoKTtcblxuXHQvLyBTY29yZVxuXHR1cGRhdGVTY29yZSgpO1xuXG5cbn1cblxuLy8gZ2VuZXJhdGUgYmxvY2tzIG9uIGNhbnZhcyBhbmQgcHVzaCBpbnRvIGJsb2NrIGRpY3Rpb25hcnlcbmZ1bmN0aW9uIGdlbmVyYXRlSW5pdGlhbEJsb2NrcygpIHtcblx0dmFyIHdpZHRoID0gYmxvY2tXaWR0aDtcblx0dmFyIGhlaWdodCA9IGJsb2NrSGVpZ2h0O1xuXHR2YXIgcG9zWCA9IDA7XG5cdHZhciBwb3NZID0gMDtcblxuXHR2YXIgaW5kZXggPSAwO1xuXHR2YXIgYmxvY2tBcnJheSA9IFtdXG5cdGZvcih2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcblx0XHRwb3NYID0gMTI7XG5cdFx0cG9zWSArPSBoZWlnaHQgKyA1O1xuXHRcdGZvcih2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XHRcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBibG9ja0NvbG9yc1tpXTtcblx0XHRcdGN0eC5maWxsUmVjdChwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KTtcblx0XHRcdGJsb2NrQXJyYXkucHVzaCh7aWQ6IGluZGV4LCBwb3NYOiBwb3NYLCBwb3NZOiBwb3NZLCBjb2xvcjogYmxvY2tDb2xvcnNbaV0sIGxldmVsOiBpLCBhY3RpdmU6IHRydWV9KTtcblx0XHRcdHBvc1ggKz0gd2lkdGggKyA1O1xuXHRcdFx0aW5kZXgrKztcblx0XHR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdH0gICAgICAgICAgICAgXG5cdHJldHVybiBibG9ja0FycmF5OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxufVxuXG4vL3JlcmVuZGVyIGJsb2Nrc1xuZnVuY3Rpb24gcmVmcmVzaEJsb2NrcyhibG9ja0FycmF5KSB7XG5cdHZhciBtdWx0aUhpdHMgPSAwO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgYmxvY2tBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdC8vY2hlY2sgaWYgYmxvY2sgaGl0IGJ5IGJhbGxcblx0XHQvL2lmIGJhbGwgaGl0cyBtdWx0aXBsZSBibG9ja3MgYXQgc2FtZSB0aW1lLCB3YW50IHRvIGNhbmNlbCB0aGUgZG91YmxlIG5lZ2F0aW9uXG5cdFx0aWYoYmxvY2tIaXQoYmxvY2tBcnJheVtpXSkpIHtcblx0XHRcdG11bHRpSGl0cysrO1xuXHRcdFx0aWYobXVsdGlIaXRzID4gMSkgYmFsbC52ZWxZICo9IC0xO1xuXHRcdH1cblx0XHRcblx0XHQvL29ubHkgcmVuZGVyIGJsb2NrcyB0aGF0IGhhdmUgYmVlbiBoaXRcblx0XHRpZihibG9ja0FycmF5W2ldLmFjdGl2ZSkge1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGJsb2NrQXJyYXlbaV0uY29sb3I7XG5cdFx0XHRjdHguZmlsbFJlY3QoYmxvY2tBcnJheVtpXS5wb3NYLCBibG9ja0FycmF5W2ldLnBvc1ksIGJsb2NrV2lkdGgsIGJsb2NrSGVpZ2h0KTtcblx0XHR9XHRcdFxuXHR9XG59XG5cbi8vIENoZWNrIGlmIGJhbGwgaGl0cyBibG9jayBoZWxwZXIgbWV0aG9kXG5mdW5jdGlvbiBibG9ja0hpdChyZWN0KSB7XG5cdHZhciBoaXQgPSBmYWxzZTtcblx0dmFyIGJsb2NrU2VjdGlvbiA9IGJsb2Nrc1tibG9ja3MubGVuZ3RoIC0xIF0ucG9zWSArIGJsb2NrSGVpZ2h0O1xuXHQvL2lmIGJhbGwgaXMgaW4gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXG5cblx0aWYoYmFsbC5wb3NZIC0gYmFsbC5yYWRpdXMgPD0gYmxvY2tTZWN0aW9uICYmIHJlY3QuYWN0aXZlKSB7XG5cdFx0dmFyIHRvcCA9IHt4OiBiYWxsLnBvc1gsIHk6IGJhbGwucG9zWSAtIGJhbGwucmFkaXVzfTtcblx0XHR2YXIgcmlnaHQgPSB7eDogYmFsbC5wb3NYICsgYmFsbC5yYWRpdXMsIHk6IGJhbGwucG9zWX07XG5cdFx0dmFyIGJvdHRvbSA9IHt4OiBiYWxsLnBvc1gsIHk6IGJhbGwucG9zWSArIGJhbGwucmFkaXVzfTtcblx0XHR2YXIgbGVmdCA9IHt4OiBiYWxsLnBvc1ggLSBiYWxsLnJhZGl1cywgeTogYmFsbC5wb3NZfTtcblx0XHQvL2l0ZXJhdGUgb3ZlciB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgYmFsbCBhbmQgY2hlY2sgaWYgYW55IG9mIHRoZSBwb2ludHMgYXJlIGluc2lkZSB0aGUgcmVjdGFuZ2xlXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IDM2MDsgaSsrKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHR2YXIgeCA9IGJhbGwucG9zWCArIGJhbGwucmFkaXVzICogTWF0aC5jb3MoaSAqIE1hdGguUEkvMTgwKTtcblx0XHRcdHZhciB5ID0gYmFsbC5wb3NZIC0gIGJhbGwucmFkaXVzICogTWF0aC5zaW4oaSAqIE1hdGguUEkvMTgwKTtcblxuXHRcdFx0aWYoeCA+PSByZWN0LnBvc1ggJiYgeCA8PSByZWN0LnBvc1ggKyBibG9ja1dpZHRoKSB7XG5cdFx0XHRcdGlmKHkgPD0gcmVjdC5wb3NZICsgYmxvY2tIZWlnaHQgJiYgeSA+PSByZWN0LnBvc1kpIHtcblx0XHRcdFx0XHRoaXQgPSB0cnVlO1xuXHRcdFx0XHRcdGJhbGwudmVsWSAqPSAtMTtcblx0XHRcdFx0XHRzY29yZSArPSAoNDAgLSAxMCpyZWN0LmxldmVsICsgMSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XHRcdFxuXHR9XG5cdGlmKGhpdCkge1xuXHRcdGJsb2Nrc1tyZWN0LmlkXS5hY3RpdmUgPSBmYWxzZTtcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9IFxuXHRyZXR1cm4gZmFsc2U7XHRcbn1cblxuXG5cbi8vIEV2ZW50IEhhbmRsZXJzIGZvciBwYWRkbGUgY29udHJvbFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0dmFyIHggPSBldmVudC5jbGllbnRYIC0gY2FudmFzT2Zmc2V0O1xuXHR2YXIgeSA9IGV2ZW50LmNsaWVudFk7XG5cdHBhZGRsZS5wb3NYID0geDtcblx0Ly9jb25zb2xlLmxvZygnbTogJywgeCk7XG59KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdC8vIG1vdmUgcGFkZGxlIHBvcyBsZWZ0IGlmIGxlZnQgYnV0dG9uIHByZXNzZWRcblx0aWYoZXZlbnQua2V5Q29kZSA9PSAzNykge1xuXHRcdHBhZGRsZS52ZWxYID0gLXBhZGRsZVNwZWVkO1xuXHRcdC8vIGNvbnNvbGUubG9nKCd0Jyk7XG5cdH1cblx0Ly9tb3ZlIHBhZGRsZSBwb3MgcmlnaHQgaWYgcmlnaHQgYnV0dG9uIHByZXNzZWRcblx0ZWxzZSBpZihldmVudC5rZXlDb2RlID09IDM5KSB7XG5cdFx0cGFkZGxlLnZlbFggPSBwYWRkbGVTcGVlZDtcblx0fVxufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblx0Ly8gbW92ZSBwYWRkbGUgcG9zIGxlZnQgaWYgbGVmdCBidXR0b24gcHJlc3NlZFxuXHRpZihldmVudC5rZXlDb2RlID09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT0gMzkpIHtcblx0XHRwYWRkbGUudmVsWCA9IDA7XG5cdH1cblx0XG59KTtcbmZ1bmN0aW9uIHBhZGRsZVBvc2l0aW9uKCkge1xuXHRwYWRkbGUucG9zWCArPSBwYWRkbGUudmVsWCAqIGludGVydmFsO1xuXHRwYWRkbGUucG9zWCA9IHBhZGRsZS5wb3NYID49IGNhbnZhc1dpZHRoIC0gcGFkZGxlLndpZHRoID8gY2FudmFzV2lkdGggLSBwYWRkbGUud2lkdGggOiBwYWRkbGUucG9zWDtcblx0cGFkZGxlLnBvc1ggPSBwYWRkbGUucG9zWCA8PSAwID8gMCA6IHBhZGRsZS5wb3NYO1xufVxuXG5cblxuZnVuY3Rpb24gYmFsbFBoeXNpY3MoKSB7XG5cblx0Ly8gVXBkYXRlIEJhbGwgcG9zaXRpb25cblx0YmFsbC5wb3NZICs9IGJhbGwudmVsWSAqIGludGVydmFsO1xuXHRiYWxsLnBvc1ggKz0gYmFsbC52ZWxYICogaW50ZXJ2YWw7XG5cdFxuXHQvL2lmIGJhbGwgaGl0cyBib3R0b20gd2FsbFxuXHRpZihiYWxsLnBvc1kgKyBiYWxsLnJhZGl1cyA+PSBjYW52YXNIZWlnaHQpIHtcblx0XHRjb25zb2xlLmxvZygnYm90dG9tIHdhbGwgaGl0Jyk7XG5cdFx0bGlmZUxvc3QoKTtcblx0XHQvL2JhbGwudmVsWSAqPSAtMTtcblx0fVxuXG5cdC8vaWYgYmFsbCBoaXN0IHRvcCB3YWxsXG5cdGlmKGJhbGwucG9zWSAtIGJhbGwucmFkaXVzIDw9IDApIHtcblx0XHRjb25zb2xlLmxvZygndG9wIHdhbGwgaGl0Jyk7XG5cdFx0YmFsbC52ZWxZICo9IC0xO1xuXHR9XG5cblx0Ly9pZiB2YWxsIGhpdHMgcmlnaHQgd2FsbFxuXHRpZihiYWxsLnBvc1ggKyBiYWxsLnJhZGl1cyA+PSBjYW52YXNXaWR0aCkge1xuXHRcdGNvbnNvbGUubG9nKCdyaWdodCB3YWxsIGhpdCcpO1xuXHRcdGJhbGwudmVsWCAqPSAtMTtcblx0fVxuXG5cdC8vaWYgYmFsbCBoaXRzIGxlZnQgd2FsbFxuXHRpZihiYWxsLnBvc1ggLSBiYWxsLnJhZGl1cyA8PSAwKSB7XG5cdFx0Y29uc29sZS5sb2coJ2xlZnQgd2FsbCBoaXQnKTtcblx0XHRiYWxsLnZlbFggKj0gLTE7XG5cdH1cblxuXG5cdC8vYmFsbCBhdCBwYWRkbGUgbGV2ZWxcblx0aWYoYmFsbC5wb3NZID49IGNhbnZhc0hlaWdodCAtIHBhZGRsZUhlaWdodCAtIHBhZGRsZUhlaWdodE9mZnNldCkge1xuXHRcdC8vYmFsbCBoaXRzIHBhZGRsZVxuXHRcdGlmKChiYWxsLnBvc1ggLSBiYWxsLnJhZGl1cyA8PSBwYWRkbGUucG9zWCArIHBhZGRsZS53aWR0aCkgJiYgKGJhbGwucG9zWCArIGJhbGwucmFkaXVzID49IHBhZGRsZS5wb3NYKSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJwYWRkbGUgaGl0XCIpO1xuXHRcdFx0YmFsbC52ZWxZICo9IC0xO1xuXHRcdFx0dmFyIHNwZWVkID0gYmFsbC5wb3NYLyhwYWRkbGUucG9zWCArIDAuNSpwYWRkbGUud2lkdGgpIC0gMTtcblx0XHRcdGJhbGwudmVsWCA9IHNwZWVkID4gMC41ID8gMC41IDogc3BlZWQ7MTBcblx0XHR9XG5cdH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlKCkge1xuXHR2YXIgc2NvcmVNZXNzYWdlID0gXCJTY29yZTogXCIgKyBzY29yZSBcblx0dmFyIGxpdmVNZXNzYWdlID0gXCJMaXZlczogXCIgKyBudW1MaXZlcztcblx0Y3R4LmZvbnQgPSBcIjMwcHggc2Fucy1zZXJpZlwiO1xuXHRjdHguZmlsbFRleHQoc2NvcmVNZXNzYWdlLCAxMCwgNTApO1xuXHRjdHguZmlsbFRleHQobGl2ZU1lc3NhZ2UsIDM1MCwgNTApO1xuXHRcbn1cbmZ1bmN0aW9uIGxpZmVMb3N0KCkge1xuXHRudW1MaXZlcy0tO1xuXHRpZihudW1MaXZlcyA9PSAwKSB7XG5cdFx0Z2FtZU92ZXIoKTtcblx0fVxuXHRiYWxsLnBvc1kgPSBiYWxsU3RhcnQ7XG59XG5mdW5jdGlvbiBnYW1lT3ZlcigpIHtcblx0Y29uc29sZS5sb2coXCJHYW1lIE92ZXJcIik7XG5cdGNsZWFySW50ZXJ2YWwoZ2FtZSk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0Ly8gQ2xlYXIgQ2FudmFzXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcblxuXHRcdFxuXG5cdFx0dmFyIGN1cnJIaWdoU2NvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhpZ2hTY29yZVwiKTtcblx0XHRzY29yZSA+ICBjdXJySGlnaFNjb3JlID8gaGlnaFNjb3JlID0gc2NvcmUgOiBoaWdoU2NvcmU7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaWdoU2NvcmVcIiwgaGlnaFNjb3JlKTtcblx0XHRuZXdHYW1lQnRuLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuXHRcdFxuXHRcdHZhciBtZXNzYWdlMSA9IFwiR0FNRSBPVkVSXCI7XG5cdFx0dmFyIG1lc3NhZ2UyID0gXCJZb3VyIFNjb3JlOiBcIiArIHNjb3JlOyBcblx0XHR2YXIgbWVzc2FnZTMgPSBcIllvdXIgSGlnaCBzY29yZTogXCIgKyBoaWdoU2NvcmU7XG5cdFx0XG5cdFx0Y3R4LmZvbnQgPSBcIjMwcHggc2Fucy1zZXJpZlwiO1xuXHRcdGN0eC5maWxsVGV4dChtZXNzYWdlMSwgMTUwLCA1MCk7XG5cdFx0Y3R4LmZpbGxUZXh0KG1lc3NhZ2UyLCAxNTAsIDE1MCk7XG5cdFx0Y3R4LmZpbGxUZXh0KG1lc3NhZ2UzLCAxNTAsIDIwMCk7XG5cdH0sIGludGVydmFsKTtcblx0XG59XG5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuXHRuZXdHYW1lQnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0YmxvY2tzID0gZ2VuZXJhdGVJbml0aWFsQmxvY2tzKCk7XG5cdG51bUxpdmVzID0gMTtcblx0c2NvcmUgPSAwO1xuXHRnYW1lID0gc2V0SW50ZXJ2YWwoZHJhdywgaW50ZXJ2YWwpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
