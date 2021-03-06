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
var playerScores = [0, 0, 0];
function clearBoard() {
  for (i = 1; i <= 9; i++) {
    document.getElementById("field" + i).innerHTML = "";
  }
  const restartDiv  = document.querySelector(".restart");
  if(restartDiv != null){
    restartDiv.remove();
  }
  const line = document.querySelector(".line");
  if (line != null) {
    document.querySelector(".line").remove();
  }

  //enable cursors on fields again
  for (i = 1; i <= 9; i++) {
    const field = document.getElementById("field" + i);
    field.style.cursor = "pointer";
  }
  document.querySelector(".rating .score span#score").style.height = "50%";
  document.querySelector(".rating .score span#score").innerHTML = "0";
  document.querySelector(".rating .scorebar div.aiscore").style.height = "50%";
}
function userWon(userWinRow, playfield) {
  if (document.querySelector(".line")) return;
  const board = document.querySelector(".board");

  //add line where win
  const line = document.createElement("div");
  line.setAttribute("id", "l" + winCases.indexOf(userWinRow));
  line.setAttribute("class", "line");
  board.appendChild(line);

  //other player/ai begins now
  turnBegin = turnBegin ? false : true;
  //increment scoreboard
  const playerWin = playfield[userWinRow[0]];
  const scoreSelector = playerWin == 1 ? "#userscore" : "#aiscore";
  playerScores[playerWin - 1]++;
  const score  = document.querySelector(scoreSelector);
  score.textContent = playerScores[playerWin - 1];
  score.style.transform = "scale(1.3)";
  setTimeout(_ => {
    score.style.transform = "scale(1)";
  }, 700);

  //if user won
  if (document.querySelector("#userscore").textContent == 3) {
    document.querySelector(".winscreen").style.display = "flex";
  }
  //if user lost
  if (document.querySelector("#aiscore").textContent == 3) {
    document.querySelector(".loosescreen").style.display = "flex";
  }

  //add restart "screen"
  const restartDiv = document.createElement("div");
  restartDiv.setAttribute("class", "restart");
  restartDiv.style.cursor = "initial";
  setTimeout(_ => {
    restartDiv.style.cursor = "pointer";
    restartDiv.addEventListener("click", _ => {
      clearBoard();
      if(!turnBegin){
        bestMove();
      }
    });
  }, 2000);
  const span = document.createElement("span");
  span.innerHTML = "Click to<br> restart!";
  restartDiv.appendChild(span);
  board.appendChild(restartDiv);
}
function userTie() {
  if (document.querySelector(".restart")) return;
  const board = document.querySelector(".board");

  //increment scoreboard
  playerScores[2]++;
  const score = document.querySelector("#tiescore");
  score.textContent = playerScores[2];
  score.style.transform = "scale(1.3)";
  setInterval(_ => {
    score.style.transform = "scale(1)";
  }, 600);

  //add restart "screen"
  const restartDiv = document.createElement("div");
  restartDiv.setAttribute("class", "restart");
  setInterval(_ => {
    restartDiv.addEventListener("click", _ => {
      clearBoard();
    });
  }, 2000);
  const span = document.createElement("span");
  span.innerHTML = "Tie!<br>Click to<br> restart!";
  restartDiv.appendChild(span);
  board.appendChild(restartDiv);
}
function checkWin(board) {
  var board = [];
  //convert playfield into array
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
  var ret = null;
  winCases.forEach(wincase => {
    if (board[wincase[0]] == board[wincase[1]] && board[wincase[1]] == board[wincase[2]] && board[wincase[2]] != 0) {
      userWon(wincase, board);
      ret = true;
    }
  });
  //test if no tie
  if (!board.includes(0)) {
    userTie();
    ret = true;
  }
  return ret;
}
function updateRatingBar(board){
  var board = [];
  //convert playfield into array
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
  var score = minimax(board, difficulty, true);
  var height = "50%";
  if(score[0] == -10){
    height = "0%";
  }else if(score[0] == 10){
    height = "100%";
  }
  document.querySelector(".rating .score span#score").style.height = score[0] != -10 ? height : "20px";
  document.querySelector(".rating .score span#score").innerHTML = score[0];
  document.querySelector(".rating .scorebar div.aiscore").style.height = height;
}