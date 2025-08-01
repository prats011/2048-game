var board = [];
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function () {
    setBoard();
};

// Following functions sources from yt video: 
// - setBoard()
// - updateTile()

function setBoard() {
    // board = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ];

    for (let r = 0; r < rows; r++) {
        board[r] = []
        for (let c = 0; c < cols; c++) {
            board[r][c] = 0
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    addRandomBlock();
    addRandomBlock();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num < 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

function addRandomBlock() {
    let i = Math.floor(Math.random() * 4);
    let j = Math.floor(Math.random() * 4);

    if (board[i][j] == 0) {
        board[i][j] = 2;
        let tile = document.getElementById(i + "-" + j);
        updateTile(tile, 2);
    }
    else if (emptyTiles() == true) {
        addRandomBlock();
    }

}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        keyLeft();
        
    } else if (event.key === 'ArrowRight') {
        keyRight();
        
    } else if (event.key === 'ArrowUp') {
        keyUp();
        
    } else if (event.key === 'ArrowDown') {
        keyDown();
        
    } else if (event.key === 'Space') {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                board[r][c] = 0;
                let tile = document.getElementById(r + "-" + c);
                updateTile(tile, 0);
            }
        }
        score = 0;
        updateScore();
        gameStart();
    }

});


function keyLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        let newRow = slide(row);
        board[r] = newRow;
        for (let c = 0; c < cols; c++) {
            updateTile(document.getElementById(r + "-" + c), newRow[c]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log("Left arrow pressed");
}

function keyRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        let newRow = slide(row);
        newRow.reverse();
        board[r] = newRow;
        for (let c = 0; c < cols; c++) {
            updateTile(document.getElementById(r + "-" + c), newRow[c]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log("Right arrow pressed");
}

function keyUp() {
    for (let c = 0; c < cols; c++) {
        let col = [];
        for (let r = 0; r < rows; r++) {
            col.push(board[r][c]);
        }
        let newCol = slide(col);
        for (let r = 0; r < rows; r++) {
            board[r][c] = newCol[r];
            updateTile(document.getElementById(r + "-" + c), newCol[r]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log("Up arrow pressed");
}

function keyDown() {
    for (let c = 0; c < cols; c++) {
        let col = [];
        for (let r = rows - 1; r >= 0; r--) {
            col.push(board[r][c]);
        }
        let newCol = slide(col);
        for (let r = rows - 1; r >= 0; r--) {
            board[r][c] = newCol[rows - 1 - r];
            updateTile(document.getElementById(r + "-" + c), board[r][c]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log("Down arrow pressed");
}

function updateScore() {
    document.querySelector('.score').innerText = score;
}

function emptyTiles() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;

}

function slide(row) {
    row = filterZero(row);
    for (let r = 0; r < row.length - 1; r++) {
        if (row[r] === row[r + 1]) {
            row[r] *= 2;
            row[r + 1] = 0;
            score += row[r];
        }
    }
    row = filterZero(row);
    while (row.length < cols) {
        row.push(0);
    }
    return row;
}

function filterZero(row) {
    return row.filter(num => num !== 0);
}


function checkLost() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r < 3 && board[r][c] == board[r + 1][c] || board[r][c] == 0) {
                return;
            }
            if (c < 3 && board[r][c] == board[r][c + 1] || board[r][c] == 0) {
                return;
            }
        }
    }
    alert("Game Over! No more moves possible.");

}


