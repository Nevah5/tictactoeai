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
        if (board[i-1] == 0) {
            let score = minimax(board);
            console.log("Score: " + score, "\nField: " + i + "\n---------");
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    console.log("Best Move: " + bestMove);
    const fieldUpdate = document.getElementById("field" + bestMove);
    fieldUpdate.innerHTML = '<div class="o"></div>';
    fieldUpdate.style.cursor = 'initial';
}

function minimax(board) {
    return 1;
}

