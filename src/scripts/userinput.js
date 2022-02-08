document.addEventListener('DOMContentLoaded', _ => {
  var player = 0;
  for(i = 1; i <= 9; i++){
    const field = document.getElementById("field" + i);
    field.addEventListener("click", _ => {
      if(field.innerHTML == ''){
        var playerIcon = player == 0 ? '<div class="x"></div>' : '<div class="o"></div>';
        field.innerHTML = playerIcon;
        player = player == 0 ? 1 : 0;
        field.style.cursor = 'initial';
      }
    });
  }
});