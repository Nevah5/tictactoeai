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
    const bestMove = minimax(board, 7, true)[1];
    //play
    const fieldUpdate = document.getElementById("field" + bestMove);
    fieldUpdate.innerHTML = '<div class="o"></div>';
    fieldUpdate.style.cursor = 'initial';
}
function emptyFields(board) {
    //returns empty fields indexes of board
    var empty = [];
    board.forEach((element, index) => {
        if (element == 0) {
            empty.push(index);
        }
    });
    return empty;
}
function checkWinAfterMovePlayer(board, ai = false) {
    var ret = false;
    let player = ai ? 2 : 1;
    winCases.forEach(wincase => {
        if (board[wincase[0]] == board[wincase[1]] && board[wincase[1]] == board[wincase[2]] && board[wincase[2]] == player) {
            ret = true;
        }
    });
    return ret;
}
function checkWinAfterMove(board) {
    var ret = false;
    winCases.forEach(wincase => {
        if (board[wincase[0]] == board[wincase[1]] && board[wincase[1]] == board[wincase[2]] && board[wincase[2]] != 0) {
            ret = true;
        }
    });
    return ret;
}
function minimax(board, depth, ai) {
    let avaibleSpots = emptyFields(board);
    if (depth == 0 || avaibleSpots.length == 0 || checkWinAfterMove(board)) {
        if (checkWinAfterMovePlayer(board, true)) {
            return [10];
        } else if (checkWinAfterMovePlayer(board, false)) {
            return [-10];
        } else {
            return [0];
        }
    }

    if (ai) {
        let bestMove;
        var maxEval = -Infinity;
        var allEvals = [];
        avaibleSpots.forEach(spot => {
            var newBoard = Array.from(board);
            newBoard[spot] = 2;
            let eval = minimax(newBoard, depth - 1, false)[0];
            allEvals.push(eval);
            if (eval > maxEval) {
                maxEval = eval;
                bestMove = spot + 1;
            }
        });
        return [maxEval, bestMove];
    } else {
        let bestMove;
        var minEval = +Infinity;
        avaibleSpots.forEach(spot => {
            var newBoard = Array.from(board);
            newBoard[spot] = 1;
            let eval = minimax(newBoard, depth - 1, true)[0];
            if (eval < minEval) {
                minEval = eval;
                bestMove = spot + 1;
            }
        });
        return [minEval, bestMove];
    }
}
