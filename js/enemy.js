var enemyPaddle = {
  size : 500,
  color: "white",
  y: 200
}

function drawEnemyPaddle(){
  //ai paddle
  ctx.fillStyle = enemyPaddle.color;
  ctx.fillRect(width - 20, enemyPaddle.y, 20, enemyPaddle.size);
}

function move(){
  var closest = balls[0];
  for(var i = 0; i < balls.length; i++){
    if(balls[i].x > closest.x){
      closest = balls[i];
    }
  }
  if(enemyPaddle.y < closest.y){
    enemyPaddle.y += 400;
  }else if(enemyPaddle.y > closest.y){
    enemyPaddle.y -= 400;
  }
}
