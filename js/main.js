// Canvas stuff
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;
var isRunning = false;
var userScore = 0;
var colors = ["Aqua", "white", "green", "blue", "Cornsilk", "DarkOrange", "DarkTurquoise", "MidnightBlue", "RebeccaPurple", "SeaGreen", "YellowGreen", "Teal"];
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

// Function for drawing
function draw() {
  // clears canvas
  ctx.clearRect(0, 0, width, height);
  if(isRunning){
    drawUserPaddle();
    drawUserScore();
    drawEnemyPaddle();
    drawBalls();
  }else{
    ctx.fillStyle = "white";
    ctx.font = "200px Arial";
    ctx.fillText("Click the fuckin screen to start",0,height/2);
  }
}
// Function for updating
function update(progress) {
  for(var i = 0; i < balls.length; i++){
    ball = balls[i];
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    // border detection
    if(ball.x < 0){
      loseGame();
    }else if(ball.x > width){
      winGame();
    }
    if(ball.y < 0 || ball.y > height){
      ball.ySpeed = -ball.ySpeed;
    }
    collideBall = {x: ball.x, y: ball.y, width: ball.width, height: ball.height};
    collidePaddle = {x: 0, y: userPaddle.y, width: userPaddle.width, height: userPaddle.size};
    collideEnemy = {x: width - 20, y: enemyPaddle.y, width: 20, height: enemyPaddle.size};
    if(collision(collidePaddle, collideBall)){
      ball.xSpeed = -ball.xSpeed;
      spawnBall(colors[Math.floor((Math.random() * colors.length))]);
    }
    if(collision(collideEnemy, collideBall)){
      ball.xSpeed = -ball.xSpeed;
    }
    if(balls[i].x > width){
      balls.splice(i, 1);
      userScore += 1;
    }else if(balls[i].x < 0){
      balls.splice(i, 1);
      userScore -= 1;
    }
  }
  move();
}

var limitLoop = function (fn, fps) {
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
function loseGame(){

}
function winGame(){

}
$("#canvas").on("click", function(){
  if(!isRunning){
    isRunning = true;
  }
});
limitLoop(draw, 60);
limitLoop(update, 60);
