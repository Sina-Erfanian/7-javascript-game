const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

const startPosition = [230, 10];
let currentPosition = startPosition;

const ballPosition = [270, 40];
let ballCurrentPosition = ballPosition;

let xDirection = 2;
let yDirection = 2;
let score = 0;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + 100, yAxis];
    this.topLeft = [xAxis, yAxis + 20];
    this.topRight = [xAxis + 100, yAxis + 20];
  }
}

const blocksArray = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
console.log(blocksArray);

function addBlock() {
  blocksArray.forEach((item, index) => {
    const block = document.createElement("div");
    block.style.left = blocksArray[index].bottomLeft[0] + "px";
    block.style.bottom = blocksArray[index].bottomLeft[1] + "px";
    block.classList.add("block");
    grid.appendChild(block);
  });
}

addBlock();

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

const user = document.createElement("div");
drawUser();
user.classList.add("user");
grid.appendChild(user);

const ball = document.createElement("div");
drawBall();
ball.classList.add("ball");
grid.appendChild(ball);

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < 460) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

let timerId = setInterval(moveBall, 20);

function checkForCollisions() {
  blocksArray.forEach((item, index) => {
    if (
      ballCurrentPosition[0] > blocksArray[index].bottomLeft[0] &&
      ballCurrentPosition[0] < blocksArray[index].bottomRight[0] &&
      ballCurrentPosition[1] + 20 > blocksArray[index].bottomLeft[1] &&
      ballCurrentPosition[1] < blocksArray[index].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[index].classList.remove("block");
      blocksArray.splice(index, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocksArray.length == 0) {
        scoreDisplay.innerHTML = "You Win!";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  });
  if (
    ballCurrentPosition[0] >= 540 ||
    ballCurrentPosition[1] >= 280 ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + 100 &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + 20
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You Lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
