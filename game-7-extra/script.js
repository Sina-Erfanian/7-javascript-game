const resultDisplay = document.querySelector("#score");
const squares = Array.from(document.querySelectorAll(".grid div"));
console.log(squares);

let currentShooterIndex = 202;
let invaderId;
let direction = 1;
let result = 0;
const alignsRemoved = [];

const alignInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  alignInvaders.forEach((item, index) => {
    if (!alignsRemoved.includes(index)) {
      squares[item].classList.add("invader");
    }
  });
}

function remove() {
  alignInvaders.forEach((item, index) => {
    squares[item]?.classList.remove("invader");
  });
}

draw();

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");

  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex > 195) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex < 209) currentShooterIndex += 1;
      break;
  }

  squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  remove();
  for (let i = 0; i < alignInvaders.length; i++) {
    alignInvaders[i] += direction;
  }
  draw();
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultDisplay.innerHTML = "GAME OVER :(";
    clearInterval(invaderId);
    document.removeEventListener("keydown", moveShooter);
    document.removeEventListener("keydown", shoot);
  }

  for (let i = 0; i < alignInvaders.length; i++) {
    if (alignInvaders[i] > squares.length + 15) {
      resultDisplay.innerHTML = "GAME OVER";
      clearInterval(invaderId);
    }
  }

  if (alignsRemoved.length === alignInvaders.length) {
    resultDisplay.innerHTML = "YOU WIN :)";
    clearInterval(invaderId);
    document.removeEventListener("keydown", moveShooter);
    document.removeEventListener("keydown", shoot);
  }
}

invaderId = setInterval(moveInvaders, 100);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    if (currentLaserIndex >= 0) {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= 15;
      squares[currentLaserIndex]?.classList.add("laser");
      if (squares[currentLaserIndex]?.classList.contains("invader")) {
        squares[currentLaserIndex]?.classList.remove("laser");
        squares[currentLaserIndex]?.classList.remove("invader");
        result++;
        resultDisplay.textContent = result;
        clearInterval(laserId);
        const alignRemoved = alignInvaders.indexOf(currentLaserIndex);
        alignsRemoved.push(alignRemoved);
      }
    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
      break;
  }
}

document.addEventListener("keydown", shoot);
