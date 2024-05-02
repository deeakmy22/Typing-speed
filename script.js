const startButton = document.getElementById('start-button');
const containerElement = document.getElementById('second-section');
const timerElement = document.getElementById('timer');
const RANDOM_TEXT_API_URL = 'https://api.quotable.io/random';
const textDisplayElement = document.createElement('p');
const textInputElement = document.createElement('textarea');
let correctWords = 0;
let correctWordsCount = 0;

async function getRandomText() {
  const response = await fetch(RANDOM_TEXT_API_URL);
  const data = await response.json();
  return data.content;
}

async function renderNewText() {
  const text = await getRandomText()
  textDisplayElement.innerHTML = '';
  correctWords = correctWordsCount;
  text.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    textDisplayElement.appendChild(characterSpan);
  });
  textInputElement.value = '';
}

textInputElement.addEventListener('input', () => {
  const arrayText = textDisplayElement.innerText.split(' ');
  const arrayValue = textInputElement.value.trim().split(' ');
  
  let correctWordsCount = 0;
  arrayText.forEach((word, index) => {
    if (arrayValue[index] === word) {
      correctWordsCount++;
    }
  });
  correctWords = correctWordsCount;

  const arrayChars = textDisplayElement.querySelectorAll('span');
  const inputChars = textInputElement.value.split('');
  
  let correct = true;
  arrayChars.forEach((charSpan, index) => {
    const char = inputChars[index];
    if (char ==  null) {
      charSpan.classList.remove('correct', 'incorrect');
      correct  = false;
    } else if (char === charSpan.innerText) {
      charSpan.classList.add('correct');
      charSpan.classList.remove('incorrect');
    } else {
      charSpan.classList.remove('correct');
      charSpan.classList.add('incorrect');
      correct = false;
    }
  });
  if (correct) renderNewText();
});

const stopGame = () => {
  textInputElement.style.display = 'none';
  containerElement.classList.add('display-correct-words');
  containerElement.innerText = `Correct Words: ${correctWords}`;
  clearInterval(intervalID);
}

let timer = 60;
const startTimer = () => {
  --timer;
  timerElement.innerText = `Time: ${timer}`;
  if (timer === 0) {
    stopGame();
  }
}

const startGame = () => {
  startButton.style.display = "none";
  textDisplayElement.classList.add('text-display');
  textInputElement.autofocus = true;
  textInputElement.classList.add('text-input');
  textInputElement.placeholder='Enter the text:';
  containerElement.classList.add('container');
  containerElement.appendChild(textDisplayElement);
  containerElement.appendChild(textInputElement);
  intervalID = setInterval(startTimer, 1000);
  renderNewText();
};

timerElement.innerText = 'Time: ' + timer;
