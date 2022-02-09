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
    var avaibleSpots = emptyFields(board);
    if(avaibleSpots.length == 0) return;
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 1; i <= 9; i++) {
        if (board[i-1] == 0) {
            let score = minimax(board, i - 1);
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

function emptyFields(board){
    //returns empty fields indexes of board
    var empty = [];
    board.forEach((element, index) => {
        if(element == 0){
            empty.push(index);
        }
    });
    return empty;
}
function checkWin(board, move, ai = false){
    var boardAfter = Array.from(board);
    boardAfter[move] = ai ? 2 : 1;

    var ret = false;
    winCases.forEach(wincase => {
        if(boardAfter[wincase[0]] == boardAfter[wincase[1]] && boardAfter[wincase[1]] == boardAfter[wincase[2]] && boardAfter[wincase[2]] == boardAfter[move]){
            ret = true;
        }
    });
    return ret;
}

function minimax(board, moveIndex, depth = null) {
    var avaibleSpots = emptyFields(board);

    //winning on next move
    if(checkWin(board, moveIndex, true)){ //if ai can win with this field
        return 10;
    }else if(checkWin(board, moveIndex)){ //if user wins with this field
        return -10;
    }
    return Math.floor(Math.random() * -90) - 11;
}

