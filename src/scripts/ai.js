function bestMove() {
    //convert playfield into array
    var board = [];
    for (i = 1; i <= 9; i++) {
        const field = document.getElementById("field" + i);
        if (field.innerHTML == '') {
            board[i - 1] = 0;
        } else if (field.innerHTML == '<div class="x"></div>') {
            board[i - 1] = 1;
        } else if (field.innerHTML == '<div class="o"></div>') {
            board[i - 1] = 2;
        }
    }
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 1; i <= 9; i++) {
        if (board[i - 1] == 0) {
            let score = minimax(board, i - 1); //returns 1 for now
            if (score > bestScore) { //only true for first empty field
                bestScore = score;
                bestMove = i; //set O for this field
            }
        }
    }
    //play
    const fieldUpdate = document.getElementById("field" + bestMove);
    fieldUpdate.innerHTML = '<div class="o"></div>';
    fieldUpdate.style.cursor = 'initial';
}


function freefields(board) {
    var empty = [];
    board.forEach((element, index) => {
        if (element == 0) {
            empty.push(index)
        }
    });
    return empty;
}


function minimax(board, index) {
    var availSpots = freefields(board)

    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
}

