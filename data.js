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

export function get18RandomEmojiePair() {
  const shuffledArray = emojies.sort((a, b) => 0.5 - Math.random());
  const eightFirst = shuffledArray.slice(0, 18);
  const allAndShuffled = [...eightFirst, ...eightFirst].sort(
    (a, b) => 0.5 - Math.random()
  );
  return allAndShuffled;
}

export function initializeBoxData() {
  return {
    clicked: false,
    numberOfTimesClicked: 0,
    clickBlockedOnThis: false,
  };
}
