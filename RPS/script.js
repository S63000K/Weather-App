const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// Popup Elements
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('popup-close');

// Game Variables
let currentPlayer = 'X';
let gameActive = false;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
  [0, 4, 8], [2, 4, 6]              // Diagonal
];

// Initialize the game
function initializeGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
    cell.style.pointerEvents = 'auto';
  });

  updatePlayerTurn();
  resetButton.style.display = 'inline-block';
  showPopup("Game Started! Player X's turn.");
}

// Update the player turn message with colors
function updatePlayerTurn() {
  message.textContent = `Player ${currentPlayer}'s turn`;
  message.classList.remove('X', 'O');
  message.classList.add(currentPlayer);
}

// Show Popup Message
function showPopup(msg) {
  popupMessage.textContent = msg;  // Set the message for the popup
  popup.classList.remove('hidden'); // Show the popup
}

// Hide Popup
function hidePopup() {
  popup.classList.add('hidden'); // Hide the popup
}

// Handle Reset Game Button
resetButton.addEventListener('click', () => {
  showPopup("Start a new game?"); // Show confirmation popup for reset
});

// Handle start and reset buttons
startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  initializeGame();
});

// Handle Popup Close Button (OK)
closePopup.addEventListener('click', () => {
  hidePopup();
  if (popupMessage.textContent === "Start a new game?") {
    initializeGame();  // Start a new game when confirmed
  }
});

// Handle cell clicks
function handleCellClick(event) {
  if (!gameActive) {
    showPopup("Please click 'Start Game' to begin!");
    return;
  }

  const cell = event.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (boardState[index] !== '') return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    message.classList.remove('X', 'O');
    gameActive = false;
    showPopup(`Player ${currentPlayer} wins!`);
  } else if (boardState.every(cell => cell !== '')) {
    message.textContent = "It's a draw!";
    message.classList.remove('X', 'O');
    gameActive = false;
    showPopup("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurn();
  }
}

// Check win condition
function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Initial message
message.textContent = "Click 'Start Game' to begin.";
