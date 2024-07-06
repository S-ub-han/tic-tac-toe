const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    
    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            messageElement.textContent = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn.`;
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winConditions.some(condition => 
        condition.every(index => board[index] === currentPlayer)
    );
}

function initializeGame() {
    boardElement.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    });
    messageElement.textContent = `Player ${currentPlayer}'s turn.`;
    gameActive = true;
}

restartButton.addEventListener('click', () => {
    board.fill('');
    currentPlayer = 'X';
    initializeGame();
});

initializeGame();
