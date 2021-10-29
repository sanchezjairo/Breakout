/* eslint-disable no-const-assign */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const x = canvas.width / 2;
const y = canvas.height - 30;
const dx = 2;
const dy = -2;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width - paddleWidth) / 2;
const rightPressed = false;
const leftPressed = false;
// eslint-disable-next-line no-use-before-define
draw();
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const score = 0;
// eslint-disable-next-line no-unused-vars
const lives = 3;

const bricks = [];
// eslint-disable-next-line no-plusplus
for (const c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  // eslint-disable-next-line no-plusplus
  for (const r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  // eslint-disable-next-line no-plusplus
  for (const c = 0; c < brickColumnCount; c++) {
    // eslint-disable-next-line no-plusplus
    for (const r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(0, 0, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  // eslint-disable-next-line no-use-before-define
  drawScore();
  // eslint-disable-next-line no-use-before-define
  drawLives();
  // eslint-disable-next-line no-use-before-define
  collisionDetection();
  // eslint-disable-next-line no-const-assign
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-plusplus
    lives--;
    if (!lives) {
      // eslint-disable-next-line no-alert
      alert('GAME OVER');
      document.location.reload();
    } else {
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;
      paddleX = (canvas.width - paddleWidth) / 2;
    }
  }
  x += dx;
  y += dy;

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}
// eslint-disable-next-line no-use-before-define
document.addEventListener('keydown', keyDownHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('keyup', keyUpHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  // eslint-disable-next-line no-plusplus
  for (const c = 0; c < brickColumnCount; c++) {
    // eslint-disable-next-line no-plusplus
    for (const r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          // eslint-disable-next-line no-plusplus
          b.status = 0; score++;
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  // eslint-disable-next-line prefer-template
  ctx.fillText('Score: ' + score, 8, 20);
}

// eslint-disable-next-line no-unused-vars
function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  // eslint-disable-next-line prefer-template
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}
