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
        let newValue = [0, 0, 0, 0];
        let value = 0;
        let counter = 0;
        for (let c = 0; c < cols; c++) {
            let num = board[r][c];
            if (num != 0) {
                if (value === num) {
                    const res = value + num
                    newValue[counter] = res;
                    counter++;
                    value = 0
                    score += res;
                } else {
                    if (value !== 0) {
                        newValue[counter] = value;
                        counter++;
                    }
                    value = num;
                }
            }
        }
        if (value !== 0) {
            newValue[counter] = value;
        }
        for (let c = 0; c < cols; c++) {
            board[r][c] = newValue[c];
            let tile = document.getElementById(r + "-" + c);
            updateTile(tile, newValue[c]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log('Left arrow pressed');

}

function keyRight() {
    for (let r = 0; r < rows; r++) { 
        let newValue = [0, 0, 0, 0];
        let value = 0;
        let counter = 3;
        for (let c = 3; c >= 0; c--) {
            let num = board[r][c];
            if (num != 0) {
                if (value === num) {
                    const res = value + num;
                    newValue[counter] = res;
                    value = 0;
                    counter--;
                    score += res;
                } else {
                    if (value !== 0) {
                        newValue[counter] = value;
                        counter--;
                    }
                    value = num;
                }
            }
        }
        if (value !== 0) {
            newValue[counter] = value;
        }
        for (let c = 3; c >= 0; c--) {
            board[r][c] = newValue[c];
            let tile = document.getElementById(r + "-" + c);
            updateTile(tile, newValue[c]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log('Right arrow pressed!');
}

function keyUp() {
    for (let c = 0; c < cols; c++) {
        let newValue = [0, 0, 0, 0];
        let value = 0;
        let counter = 0;
        for (let r = 0; r < rows; r++) {
            let num = board[r][c];
            if (num != 0) {
                if (value === num) {
                    const res = value + num;
                    newValue[counter] = res;
                    value = 0;
                    counter++;
                    score += res;
                } else {
                    if (value !== 0) {
                        newValue[counter] = value;
                        counter++;
                    }
                    value = num;
                }
            }

        }
        if (value !== 0) {
            newValue[counter] = value;
        }
        for (let r = 0; r < rows; r++) {
            board[r][c] = newValue[r];
            let tile = document.getElementById(r + "-" + c);
            updateTile(tile, newValue[r]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log('Up arrow pressed!');
}

function keyDown() {
    for (let c = 0; c < cols; c++) {
        let newValue = [0, 0, 0, 0];
        let value = 0;
        let counter = 3;
        for (let r = 3; r >= 0; r--) {
            let num = board[r][c];
            if (num != 0) {
                if (value === num) {
                    const res = value + num;
                    newValue[counter] = res;
                    value = 0;
                    counter--;
                    score += res;
                } else {
                    if (value !== 0) {
                        newValue[counter] = value;
                        counter--;
                    }
                    value = num;
                }
            }

        }
        if (value !== 0) {
            newValue[counter] = value;
        }
        for (let r = 3; r >= 0; r--) {
            board[r][c] = newValue[r];
            let tile = document.getElementById(r + "-" + c);
            updateTile(tile, newValue[r]);
        }
    }
    addRandomBlock();
    checkLost();
    updateScore();
    console.log('Down arrow pressed!');
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


