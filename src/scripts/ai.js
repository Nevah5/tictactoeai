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
            let score = minimax(board, i - 1, 3, true);
            if (score > bestScore) {
                bestScore = score;
                bestMove = i; //set "O" for this field
            }
        }
    }
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
function checkWinAfterMove(board, move, ai = false) {
    var boardAfter = Array.from(board);
    boardAfter[move] = ai ? 2 : 1;

    var ret = false;
    winCases.forEach(wincase => {
        if (boardAfter[wincase[0]] == boardAfter[wincase[1]] && boardAfter[wincase[1]] == boardAfter[wincase[2]] && boardAfter[wincase[2]] == boardAfter[move]) {
            ret = true;
        }
    });
    return ret;
}

function minimax(board, moveIndex, depth = null, turn = true) {
    var avaibleSpots = emptyFields(board);
    //return static eval
    if(depth == 0){
        if (checkWinAfterMove(board, moveIndex, true)) { //if ai can win with this field
            return 10;
        } else if (checkWinAfterMove(board, moveIndex)) { //if user wins with this field
            return -10;
        }else if(avaibleSpots.length != 0){
            return 0;
        }
    }

    if(turn){ //ai's turn
        var maxEval = -Infinity;
        avaibleSpots.forEach(spot => {
            //create board with this move
            var newboard = Array.from(board);
            newboard[spot] = 2;
            //calc eval score
            var eval = minimax(newboard, spot, depth - 1, false);
            maxEval = maxEval < eval ? eval : maxEval;
        });
        return maxEval;
    }else{ //if player's turn
        var minEval = +Infinity;
        avaibleSpots.forEach(spot => {
            //create board with this move
            var newboard = Array.from(board);
            newboard[spot] = 2;
            //calc eval score
            var eval = minimax(newboard, spot, depth - 1, true);
            minEval = minEval > eval ? eval : minEval;
        });
        return minEval;
    }
}

