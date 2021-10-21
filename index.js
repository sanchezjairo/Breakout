/* eslint-disable no-const-assign */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const x = canvas.width / 2;
const y = canvas.height - 30;
const dx = 2;
const dy = -2;
const ballRadius = 10;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  // eslint-disable-next-line no-const-assign
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}
setInterval(draw, 10);
