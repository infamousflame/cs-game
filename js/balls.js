var balls = [];
function spawnBall(color){
  balls.push(
              {
                x: 40,
                y: 200,
                xSpeed: Math.floor((Math.random() * 20) + 5),
                ySpeed: Math.floor((Math.random() * 10) + 1),
                color: color,
                width: 30,
                height: 30
              }
            );
}
spawnBall();

function drawBalls(){
  for(var i = 0; i < balls.length; i++){
    ball = balls[i];
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    // console.log(ball);
  }
}
