const wordList = ['javascript', 'hangman', 'python', 'programming', 'html', 'css'];
let selectedWord;
let displayedWord;
let wrongGuesses = [];
let correctGuesses = [];
let maxAttempts = 6;
let attemptsLeft = maxAttempts;

const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const wrongGuessesDisplay = document.getElementById('wrong-guesses');
const hangmanImage = document.getElementById('hangman-img');
const restartButton = document.getElementById('restart-button');
const messageDisplay = document.getElementById('message');

// Start a new game
function startGame() {
  // Pick a random word from the list
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  displayedWord = Array(selectedWord.length).fill('_');
  wrongGuesses = [];
  correctGuesses = [];
  attemptsLeft = maxAttempts;

  // Reset the display
  wordDisplay.textContent = displayedWord.join(' ');
  messageDisplay.textContent = '';
  wrongGuessesDisplay.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessButton.disabled = false;
  hangmanImage.src = `hangman${attemptsLeft}.png`;
  restartButton.style.display = 'none';
}

// Handle the guess
function handleGuess() {
  const guess = guessInput.value.toLowerCase();
  guessInput.value = '';

  if (guess && !wrongGuesses.includes(guess) && !correctGuesses.includes(guess)) {
    if (selectedWord.includes(guess)) {
      correctGuesses.push(guess);
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guess) {
          displayedWord[i] = guess;
        }
      }
      wordDisplay.textContent = displayedWord.join(' ');
    } else {
      wrongGuesses.push(guess);
      wrongGuessesDisplay.textContent = wrongGuesses.join(', ');
      attemptsLeft--;
      hangmanImage.src = `hangman${attemptsLeft}.png`;
    }

    if (displayedWord.join('') === selectedWord) {
      messageDisplay.textContent = 'You won! Congratulations!';
      guessInput.disabled = true;
      guessButton.disabled = true;
      restartButton.style.display = 'inline-block';
    } else if (attemptsLeft === 0) {
      messageDisplay.textContent = `Game Over! The word was: ${selectedWord}`;
      guessInput.disabled = true;
      guessButton.disabled = true;
      restartButton.style.display = 'inline-block';
    }
  }
}

// Event listeners
guessButton.addEventListener('click', handleGuess);
guessInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleGuess();
  }
});
restartButton.addEventListener('click', startGame);

// Start the first game
startGame();
