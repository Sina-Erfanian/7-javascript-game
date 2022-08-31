const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const img = document.querySelectorAll("img");
const score = document.querySelector("#score");
console.log(img);
let matchArray = [];
let matchArrayIds = [];
let count = 0;

function matchCard() {
  if (matchArrayIds[0] === matchArrayIds[1]) {
    alert("You have clicked the same image!");
    img[matchArrayIds[0]].src = "images/blank.png";
    img[matchArrayIds[1]].src = "images/blank.png";
  } else if (matchArray[0] == matchArray[1]) {
    alert("You find a match!");
    img[matchArrayIds[0]].src = "images/white.png";
    img[matchArrayIds[1]].src = "images/white.png";
    img[matchArrayIds[0]].removeEventListener("click", clickEvent);
    img[matchArrayIds[1]].removeEventListener("click", clickEvent);
    count++;
  } else {
    alert("Try Again");
    img[matchArrayIds[0]].src = "images/blank.png";
    img[matchArrayIds[1]].src = "images/blank.png";
  }
  matchArray = [];
  matchArrayIds = [];
  if (count == 6) {
    score.innerHTML = "Congratulation you find them all!";
  } else {
    score.innerHTML = count;
  }
}

function clickEvent(e) {
  matchArray.push(cardArray[e.target.dataset.id].name);
  matchArrayIds.push(e.target.dataset.id);
  e.target.src = cardArray[e.target.dataset.id].img;
  if (matchArray.length === 2) {
    setTimeout(matchCard, 500);
  }
}

img.forEach((element) => {
  element.addEventListener("click", clickEvent);
});
