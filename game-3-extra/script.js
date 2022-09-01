const score = document.querySelector("#score");
const timeLeft = document.querySelector("#time-left");
const squares = document.querySelectorAll(".square");

let squareId = null;
let result = 0;
let currentTime = 60;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let generateRandom = squares[Math.floor(Math.random() * 9)];
  generateRandom.classList.add("mole");
  squareId = generateRandom.id;
}

let randomly = setInterval(randomSquare, 700);

squares.forEach((square) => {
  square.addEventListener("mousedown", (e) => {
    if (e.target.id === squareId) {
      result++;
      score.textContent = result;
    }
  });
});

function mouseDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(mouseDownTimer);
    clearInterval(randomly);
    alert(`Your final score is ${result}`);
    squareId = null;
  }
}

let mouseDownTimer = setInterval(mouseDown, 1000);
