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

// this below code sort our array randomly
cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);
const gridDisplay = document.querySelector("#grid");
const result = document.querySelector("#result");
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.append(card);
  }
}

createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("img");
  if (cardChosenIds[0] == cardChosenIds[1]) {
    cards[cardChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/blank.png");
    alert("You have clicked the same image!");
  } else if (cardChosen[0] === cardChosen[1]) {
    alert("You find a match!");
    cards[cardChosenIds[0]].setAttribute("src", "images/white.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/white.png");
    cards[cardChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardChosenIds[1]].removeEventListener("click", flipCard);
    cardsWon.push(cardChosen);
    console.log("Chosen", cardsWon);
  } else {
    cards[cardChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardChosenIds[1]].setAttribute("src", "images/blank.png");
    alert("Sorry try again");
  }

  result.innerHTML = cardsWon.length;
  cardChosen = [];
  cardChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    result.innerHTML = "Congratulations you found them all!";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  console.log(cardId);
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);
  console.log(cardChosen);
  console.log(cardChosenIds);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
