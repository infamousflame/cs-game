// Canvas stuff
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;
var userScore = 0;
var colors = ["Aqua", "white", "green", "blue", "Cornsilk", "DarkOrange", "DarkTurquoise", "MidnightBlue", "RebeccaPurple", "SeaGreen", "YellowGreen", "Teal"];
var audio = new Audio("death.mp3");
var counter = 0;
var end;
var resize = function() {
  width = window.innerWidth * 2;
  height = window.innerHeight * 2;
  canvas.width = width;
  canvas.height = height;
}
window.onresize = resize;
resize();
// End Canvas Stuff

// Paddle Initialization
$("#canvas").mousemove(function(event){
  userPaddle.y = (event.clientY + event.offsetY) - userPaddle.size / 2;
});

function winGame(){
  end = true;
  ctx.fillStyle = "white";
  ctx.font = "200px Arial";
  ctx.fillText("Hooray you win :)",0,height/2);
  ctx.fillText("Click to play again",0,height/1.5);
}

function loseGame(){
  end = true;
  ctx.fillStyle = "white";
  ctx.font = "200px Arial";
  ctx.fillText("Your score was " + userScore, 0, height/2.5)
  ctx.fillText("Lol u suck",0,height/2);
  ctx.fillText("Click to play again",0,height/1.5);
}

function reset(){
  userScore = 0;
  balls = [];
  end = false;
  spawnBall();
}

//FIX THIS LATER
function collision(rect1, rect2){
  if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
     return true;
  }else{
     return false;
   }
}

function startScreen(){
  if(counter == 0){
    ctx.fillStyle = "white";
    ctx.font = "200px Arial";
    ctx.fillText("Click the darn screen to start",0,height/2);
    ctx.fillText("You win at 200 btw",0,height/1.5);
  }
}

// Function for drawing
function draw() {
  // clears canvas
  if(counter > 0 && !end){
    ctx.clearRect(0, 0, width, height);
    drawUserPaddle();
    drawUserScore();
    drawEnemyPaddle();
    drawBalls();
  }
}
// Function for updating
function update(progress) {
  if(!end){
    for(var i = 0; i < balls.length; i++){
      ball = balls[i];
      ball.x += ball.xSpeed;
      ball.y += ball.ySpeed;
      // border detection
      if(ball.y < 0 || ball.y > height){
        ball.ySpeed = -ball.ySpeed;
      }
      collideBall = {x: ball.x, y: ball.y, width: ball.width, height: ball.height};
      collidePaddle = {x: 0, y: userPaddle.y, width: userPaddle.width, height: userPaddle.size};
      collideEnemy = {x: width - 20, y: enemyPaddle.y, width: 20, height: enemyPaddle.size};
      // if(collision(collidePaddle, collideBall)){
      //   ball.xSpeed = -ball.xSpeed;
      //   spawnBall(colors[Math.floor((Math.random() * colors.length))]);
      // }
      if(collision(collideEnemy, collideBall)){
        ball.xSpeed = -ball.xSpeed;
      }
      if(collideBall.x < 30 && collidePaddle.y - collidePaddle.height < collideBall.y && collidePaddle.y + collidePaddle.height > collideBall.y){
        ball.xSpeed = -ball.xSpeed;
        spawnBall(colors[Math.floor((Math.random() * colors.length))]);
        userPaddle.size = Math.floor((Math.random() * 600) + 200);
      }
      if(balls[i].x > width){
        balls.splice(i, 1);
        userScore += 1;
        if(userScore > 200){
          winGame();
        }
      }else if(balls[i].x < 0){
        if(balls.length > 1){
          balls.splice(i, 1);
          userScore -= 1;
          audio.play();
        }else{
          loseGame();
        }
      }
    }
  }
  move();
}
var limitLoop = function (fn, fps, isActive) {
      var then = new Date().getTime();
      fps = fps || 60;
      var interval = 1000 / fps;
      return (function loop(time){
          requestAnimationFrame(loop);
          var now = new Date().getTime();
          var delta = now - then;
          if (delta > interval) {
              then = now - (delta % interval);
              fn();
          }
      }(0));
};

$("#canvas").on("click", function(){
  counter++;
  isStart();
  if(end){
    reset();
  }
});
function isStart(){
  if(counter == 0){
    limitLoop(startScreen, 30);
  }else if(counter == 1){
    limitLoop(draw, 60);
    limitLoop(update, 60);
  }
}
isStart();
