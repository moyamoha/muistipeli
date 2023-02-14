const emojies = [
  "😂",
  "😉",
  "✅",
  "💀",
  "👀",
  "🐐",
  "🔥",
  "🎉",
  "💖",
  "🏆",
  "😎",
  "🥰",
  "👽",
  "🦁",
  "🐬",
  "🐧",
  "🕊️",
  "🫦",
  "💪",
  "🤝",
  "👏",
  "🎈",
  "🎁",
  "🕶️",
  "⚽",
  "💍",
  "🎯",
  "🥇",
  "♥️",
  "💻",
  "📕",
  "📔",
  "💵",
  "🍕",
  "☕",
  "🧉",
  "🍉",
  "🍓",
  "🍀",
  "🌺",
  "💐",
  "🏍️",
  "🚀",
  "💧",
  "🌞",
];
const boxes = document.getElementsByClassName("box");
const scoreSpan = document.getElementsByClassName("score")[0];
const triesSpan = document.getElementsByClassName("tries")[0];
const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", handleResetGame);
triesSpan.textContent = `Tries: ${0}`;
scoreSpan.textContent = `0/8`;

let gameWon = false;
let score = 0;
let click = 0;
let previousClickedBox = null;
let clickBlocked = false;
let tries = 0;

function get8RandomEmojiePair() {
  const shuffledArray = emojies.sort((a, b) => 0.5 - Math.random());
  const eightFirst = shuffledArray.slice(0, 8);
  const allAndShuffled = [...eightFirst, ...eightFirst].sort(
    (a, b) => 0.5 - Math.random()
  );
  return allAndShuffled;
}

function initializeBoxData() {
  return {
    clicked: false,
    numberOfTimesClicked: 0,
    clickBlockedOnThis: false,
  };
}

function handleStartGame() {
  const emojies = get8RandomEmojiePair();
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    const content = document.createElement("div");
    content.setAttribute("data", initializeBoxData());
    content.classList.add("content");
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    content.appendChild(front);
    content.appendChild(back);
    box.appendChild(content);
    back.textContent = emojies[i];

    content.data = initializeBoxData(i);

    content.addEventListener("click", function () {
      handleClickOnBox(content);
    });
  }
}

function handleClickOnBox(content) {
  if (isGameWon() || clickBlocked || content.data.clickBlockedOnThis) {
    return;
  }
  content.classList.add("flipped");
  if (content.data.clicked) {
    content.classList.remove("flipped");
    content.data.clicked = false;
    return;
  }
  content.data.clicked = true;
  if (click === 2) {
    unflipBoxes();
    return;
  }
  if (click === 1) {
    click += 1;
    const areSame = compare(
      content.textContent,
      previousClickedBox.textContent
    );
    clickBlocked = true;
    setTimeout(() => {
      if (areSame) {
        incrementScore();
        content.data.clickBlockedOnThis = true;
        previousClickedBox.data.clickBlockedOnThis = true;
      } else {
        unflipBoxes(content, previousClickedBox);
      }
      click = 0;
      clickBlocked = false;
      incrementTries();
    }, 800);
  } else {
    click += 1;
    previousClickedBox = content;
  }
}

function isGameWon() {
  return score === 8;
}

function incrementScore() {
  updateScore(score + 1);
}

function incrementTries() {
  updateTries(tries + 1);
}

function updateScore(newScore) {
  score = newScore;
  scoreSpan.textContent = `${score}/8`;
}

function updateTries(newValue) {
  tries = newValue;
  triesSpan.textContent = `Tries: ${tries}`;
}

function unflipBoxes(first, second) {
  first.classList.remove("flipped");
  first.data.clicked = false;
  second.classList.remove("flipped");
  second.data.clicked = false;
  click = 0;
}

function unflipAll() {
  const allBoxes = document.getElementsByClassName("content");
  for (let contentBox of allBoxes) {
    contentBox.classList.remove("flipped");
  }
}

function compare(first, second) {
  return first === second;
}

window.addEventListener("load", () => {
  handleStartGame();
});

function handleResetGame() {
  updateScore(0);
  click = 0;
  previousClickedBox = null;
  gameWon = false;
  clickBlocked = false;
  tries = 0;
  unflipAll();
  setTimeout(() => {
    resetBoxesData();
  }, 500);
}

function resetBoxesData() {
  const emojies = get8RandomEmojiePair();
  const contentBoxes = document.getElementsByClassName("content");
  for (let i = 0; i < boxes.length; i++) {
    const cb = contentBoxes[i];
    cb.data = initializeBoxData();
    cb.getElementsByClassName("back")[0].textContent = emojies[i];
  }
}
