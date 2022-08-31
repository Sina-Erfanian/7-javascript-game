let computerChoice = document.querySelector("#computer-choice");
let yourChoice = document.querySelector("#your-choice");
let result = document.querySelector("#result");
let btn = document.querySelectorAll("button");

let userChoice;
let randomly;
let res;
const optionsArray = ["rock", "paper", "scissors"];

btn.forEach((b) => {
  b.addEventListener("click", (e) => {
    userChoice = e.target.id;
    yourChoice.innerHTML = userChoice;
    generateRandom();
    finalResult();
  });
});

function generateRandom() {
  const random = Math.floor(Math.random() * 3);
  const computerRandom = optionsArray[random];
  randomly = computerRandom;
  computerChoice.innerHTML = computerRandom;
}

function finalResult() {
  if (userChoice == randomly) {
    res = "Draw!";
  }
  if (userChoice == "paper" && randomly == "scissors") {
    res = "You Lose!";
  }
  if (userChoice == "scissors" && randomly == "paper") {
    res = "You Win!";
  }
  if (userChoice == "rock" && randomly == "paper") {
    res = "You Lose!";
  }
  if (userChoice == "paper" && randomly == "rock") {
    res = "You Win!";
  }
  if (userChoice == "rock" && randomly == "scissors") {
    res = "You Win!";
  }
  if (userChoice == "scissors" && randomly == "rock") {
    res = "You Lose!";
  }

  result.innerHTML = res;
}
