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
var playerScores = [0, 0];
function clearBoard(){}
function userWon(userWinRow, playfield){
  if(document.querySelector(".line")) return;
  const board = document.querySelector(".board");

  //add line where win
  const line = document.createElement("div");
  line.setAttribute("id", "l" + winCases.indexOf(userWinRow));
  line.setAttribute("class", "line");
  board.appendChild(line);

  //increment scoreboard
  const playerWin = playfield[userWinRow[0]];
  const scoreSelector = playerWin == 1 ? "#userscore" : "#aiscore";
  playerScores[playerWin - 1]++;
  document.querySelector(scoreSelector).textContent = playerScores[playerWin - 1];

  //add restart "screen"
  const restartDiv = document.createElement("div");
  restartDiv.setAttribute("class", "restart");
  restartDiv.addEventListener("click", _ => {
    clearBoard();
  });
  const span = document.createElement("span");
  span.innerHTML = "Click to<br> restart!";
  restartDiv.appendChild(span);
  board.appendChild(restartDiv);
}
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
    winCases.forEach(wincase => {
      if(board[wincase[0]] == board[wincase[1]] && board[wincase[1]] == board[wincase[2]] && board[wincase[2]] != 0){
        userWon(wincase, board);
      }
    });
  });
});