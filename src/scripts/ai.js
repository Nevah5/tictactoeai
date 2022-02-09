function bestMove() {
    const field = document.getElementById("field");
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (field[i][j] == '') {
                field[i][j] = ai;
                let score = minimax(field);
                field[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { i, j };
                }
            }
        }
    }
    field[bestMove.i][bestMove.j] = ai;
    currentPlayer = human;
}

function minimax(field) {
    return 1;
}

