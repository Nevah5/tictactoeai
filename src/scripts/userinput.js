var turnBegin = true;
var difficulty = 7;
document.addEventListener('DOMContentLoaded', _ => {
  for (i = 1; i <= 9; i++) {
    const field = document.getElementById("field" + i);
    field.addEventListener("click", _ => {
      if (field.innerHTML == '') {
        var playerIcon = '<div class="x"></div>';
        field.innerHTML = playerIcon;
        field.style.cursor = 'initial';
        var ifWin = checkWin();
        if(!ifWin){
          bestMove();
          checkWin();
        }
      }
    });
  }

  //for difficulties
  const easy = document.querySelector(".difficulties #easy");
  easy.addEventListener("click", _ => {
    difficulty = 3;
    resetGame();
    easy.classList.add("selected");
  });
  const hard = document.querySelector(".difficulties #hard");
  hard.addEventListener("click", _ => {
    difficulty = 5;
    resetGame();
    hard.classList.add("selected");
  });
  const impossible = document.querySelector(".difficulties #impossible");
  impossible.addEventListener("click", _ => {
    difficulty = 7;
    resetGame();
    impossible.classList.add("selected");
  });
});

function resetGame() {
  turnBegin = true;
  document.getElementById("userscore").innerHTML = "0";
  document.getElementById("tiescore").innerHTML = "0";
  document.getElementById("aiscore").innerHTML = "0";
  clearBoard();
  playerScores = [0, 0, 0];
  document.querySelectorAll(".difficulties *").forEach((element) => {
    element.classList.remove("selected");
  });
}