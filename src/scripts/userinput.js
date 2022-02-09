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
});