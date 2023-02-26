export function unflipBoxes(first, second) {
  first.classList.remove("flipped");
  first.data.clicked = false;
  second.classList.remove("flipped");
  second.data.clicked = false;
  click = 0;
}

export function unflipAll() {
  const allBoxes = document.getElementsByClassName("content");
  for (let contentBox of allBoxes) {
    contentBox.classList.remove("flipped");
  }
}
