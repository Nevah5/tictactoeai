document.addEventListener("DOMContentLoaded", _ => {
  //for each move
  document.querySelector("div.board").addEventListener("click", _ => {
    var board = [];
    //convert playfield into array
    for(i = 1; i <= 9; i++){
      const field = document.getElementById("field"+i);
      if(field.innerHTML == ''){
        board[i-1] = 0;
      }else if(field.innerHTML == '<div class="x"></div>'){
        board[i-1] = 1;
      }else if(field.innerHTML == '<div class="o"></div>'){
        board[i-1] = 2;
      }
    }
    //test if user or ai has won
    const winCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    winCases.forEach(wincase => {
      if(board[wincase[0]] == board[wincase[1]] && board[wincase[1]] == board[wincase[2]] && board[wincase[2]] != 0){
        userWon(board[wincase]);
      }
    });
  });
});