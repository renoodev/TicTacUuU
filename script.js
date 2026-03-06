const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('#status span');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== "" || !gameActive) return;

    gameState[clickedIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `${currentPlayer} Menang! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "Seri! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = currentPlayer;
}

resetBtn.addEventListener('click', () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = "X";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

