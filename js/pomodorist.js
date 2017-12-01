var workInSeconds = 15;
var timer = document.getElementById('timer');

function isNegative(num) {
    if (isNaN(num)) {
        return false;
    }
    Math.min(num, 0) != 0
}

function countdown() {
    workInSeconds--;
    var minutes = Math.floor(workInSeconds / 60);
    var seconds = Math.floor(workInSeconds % 60);
    timer.innerHTML = "Work time is: " + minutes + "m " + seconds + "s";

    if (isNegative(workInSeconds)) {
        clearInterval(interval);
        timer.innerHTML = "Your work time is over, take a break"
    }
}

var interval = setInterval(countdown, 1000);