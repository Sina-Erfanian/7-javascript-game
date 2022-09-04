const timeLeftDisplay = document.querySelector("#time-left");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carLeft = document.querySelectorAll(".car-left");
const carRight = document.querySelectorAll(".car-right");

let currentIndex = 76;
let timerId;
let currentTime = 30;
let outcomeTimerId;

function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % 9 !== 0) currentIndex -= 1;
      break;
    case "ArrowRight":
      if (currentIndex % 9 < 8) currentIndex += 1;
      break;
    case "ArrowUp":
      if (currentIndex - 9 >= 0) currentIndex -= 9;
      break;
    case "ArrowDown":
      if (currentIndex + 9 < 81) currentIndex += 9;
      break;
  }
  squares[currentIndex].classList.add("frog");
}

function autoMoveElement() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach((element) => logsLeftMove(element));
  logsRight.forEach((element) => logsRightMove(element));
  carLeft.forEach((element) => carLeftMove(element));
  carRight.forEach((element) => carRightMove(element));
}
function logsLeftMove(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}
function logsRightMove(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
}
function carLeftMove(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}
function carRightMove(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
  }
}

function checkOutComes() {
  lose();
  win();
}

function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    alert("You Lose :(");
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
    window.location = location;
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    alert("You Win :)");
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keyup", moveFrog);
    window.location = location;
  }
}

startPauseButton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    timerId = null;
    outcomeTimerId = null;
    document.removeEventListener("keyup", moveFrog);
  } else {
    outcomeTimerId = setInterval(checkOutComes, 50);
    timerId = setInterval(autoMoveElement, 700);
    document.addEventListener("keyup", moveFrog);
  }
});
