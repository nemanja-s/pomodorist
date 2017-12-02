// funtions for timer
var workInSeconds = 1500;
var timer = document.getElementById('timer');

function isNegative(num) {
    if (isNaN(num)) {
        return false;
    }
    return Math.min(num, 0) != 0;
}

function countdown() {
    workInSeconds--;
    var minutes = Math.floor(workInSeconds / 60);
    var seconds = Math.floor(workInSeconds % 60);
    timer.innerHTML = minutes + "m " + seconds + "s";

    if (isNegative(workInSeconds)) {
        clearInterval(interval);
        timer.innerHTML = "Your work time is over, take a break"
    }
}

var interval = setInterval(countdown, 1000);

// functions for to-do list
var ul = document.getElementById('list'),
    removeAll = document.getElementById('removeAll'),
    add = document.getElementById('add');

function addLi(targetUl) {
    var inputText = document.getElementById('text').value,
        li = document.createElement('li'),
        textNode = document.createTextNode(inputText + ' '),
        removeButton = document.createElement('button');

    if (inputText.split(' ').join('').length === 0) {
        //     Check for empty inputs (only spaces are not enough)
        alert('No input');
        return false;
    }

    removeButton.className = 'removeMe';
    removeButton.innerHTML = ' DONE!';
    removeButton.setAttribute('onclick', 'removeMe(this);');

    li.appendChild(textNode);
    li.appendChild(removeButton);

    targetUl.appendChild(li);

}

function removeMe(item) {
    var parent = item.parentElement;
    parent.parentElement.removeChild(parent);
}

add.onclick = function() {
    addLi(ul);
};

removeAll.onclick = function() {
    ul.innerHTML = '';
};