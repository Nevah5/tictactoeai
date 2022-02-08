// number of drops created.
var nbDrop = 200;

// function to generate a random number range.
function randRange(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

    for (i = 1; i < nbDrop; i++) {
        var dropLeft = randRange(0, window.innerWidth);
        var dropTop = randRange(-1000, 1400);

        document.querySelector('.rain').innerHTML += '<div class="drop" id="drop' + i + '"></div>';
        document.getElementById('drop' + i).style.left = dropLeft + "px";
        document.getElementById('drop' + i).style.top = dropTop + "px";
        // document.getElementById('drop' + i).style.top = dropTop;
    }

}
// Make it rain
createRain();