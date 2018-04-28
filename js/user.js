var userPaddle = {
  size: 300,
  color: "white",
  width: 20,
  y: height/2
}

function drawUserPaddle(){
  //user paddle
  ctx.fillStyle = userPaddle.color;
  ctx.fillRect(0, userPaddle.y, userPaddle.width, userPaddle.size);
}

function drawUserScore(){
  ctx.fillStyle = "white";
  ctx.font = "100px Arial";
  ctx.fillText("User: " + userScore, 0, 100);
}
