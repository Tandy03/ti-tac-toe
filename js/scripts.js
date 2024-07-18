const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const modal = document.getElementById('modal');
const winningMessageTextElement = document.getElementById('winning-message-text');
const restartButton = document.getElementById('restartButton');
const closeButton = document.getElementById('close');
const startForm = document.getElementById('start-form');
const startButton = document.getElementById('startButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let oTurn;
let playerX = '';
let playerO = '';

startButton.addEventListener('click', () => {
    playerX = playerXInput.value;
    playerO = playerOInput.value;
    if (playerX && playerO) {
        startForm.style.display = 'none';
        board.style.display = 'grid';
        startGame();
    } else {
        alert('Будь ласка, введіть імена обох гравців.');
    }
});

restartButton.addEventListener('click', startGame);
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    modal.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Нічия!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? playerO : playerX} переміг!`;
    }
    modal.style.display = 'block';
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
