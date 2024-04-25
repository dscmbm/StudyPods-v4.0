document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let currentPlayer = 'X';
    let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    
    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;
                cellDiv.innerText = cell;
                cellDiv.addEventListener('click', handleCellClick);
                board.appendChild(cellDiv);
            });
        });
    }
    
    function handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        
        if (gameBoard[row][col] === '') {
            gameBoard[row][col] = currentPlayer;
            renderBoard();
            const winner = checkWinner();
            if (winner) {
                alert(`Player ${winner} wins!`);

                resetGame();
            } else if (isBoardFull()) {
                alert("It's a tie!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        } else {
            alert("That spot is already taken!");
        }
    }
    
    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== '') {
                return gameBoard[i][0];
            }
            if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== '') {
                return gameBoard[0][i];
            }
        }
    
        if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== '') {
            return gameBoard[0][0];
        }
        if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== '') {
            return gameBoard[0][2];
        }
    
        return null;
    }
    
    function isBoardFull() {
        return gameBoard.every(row => row.every(cell => cell !== ''));
    }
    
    function resetGame() {
        gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
        currentPlayer = 'X';
        renderBoard();
    }
    
    renderBoard();
});
