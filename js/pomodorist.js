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

// functions for pomodoro timer
(function() {

    "use strict";


    // Initialisation
    var breakLength = 300;
    var sessionLength = 1500;
    var clockTime = sessionLength;
    var timerPaused = true;
    var onBreak = false;
    var CLOCK_PIXEL_HEIGHT = 286;

    // Setters / Getters
    function setBreakLength(newLength) {
        breakLength = (newLength <= 0) ? 0 : newLength;
        notify();
    }

    function setSessionLength(newLength) {
        sessionLength = (newLength <= 0) ? 0 : newLength;
        notify();
    }

    function setClockTime(secs) {
        clockTime = secs;
        notify();
    }

    function getClockTime() {
        return clockTime;
    }

    // Timer
    var intervalTimer;

    window.toggleTimer = function() {
        timerPaused = !timerPaused;
        if (!timerPaused) startTimer();
        else stopTimer();
    };

    function startTimer() {
        notify();
        intervalTimer = setInterval(tick, 1000);
    }

    function stopTimer() {
        clearInterval(intervalTimer);
    }

    function tick() {
        if (getClockTime() <= 0) {
            stopTimer();
            toggleBreak();
            return;
        }
        setClockTime(getClockTime() - 1);
    }

    function toggleBreak() {
        onBreak = !onBreak;
        setClockTime(onBreak ? breakLength : sessionLength);
        startTimer();
    }

    /*
      Controls
    */

    window.breakMinus = function() {
        incrementBreakLength(-60);
    };
    window.breakPlus = function() {
        incrementBreakLength(60);
    };
    window.sessionMinus = function() {
        incrementSessionLength(-60);
    };
    window.sessionPlus = function() {
        incrementSessionLength(60);
    };

    window.reset = function() {
        stopTimer();
        timerPaused = true;
        onBreak = false;
        setClockTime(sessionLength);
    };


    // Increment break length. If on break, and timer paused, reset clock to new length.
    function incrementBreakLength(increment) {
        setBreakLength(breakLength + increment);
        if (timerPaused && onBreak) {
            setClockTime(breakLength);
        }
    }

    // Increment session length. If in session, and timer paused, reset clock to new length.
    function incrementSessionLength(increment) {
        setSessionLength(sessionLength + increment);
        if (timerPaused && !onBreak) {
            setClockTime(sessionLength);
        }
    }

    /*
      Update View Function
    */
    var notify = (function() {
        var prevBreakLength;
        var prevSessionLength;

        return function() {
            // Just always update clock.
            document.getElementById('timer').innerHTML = formatClockDisplay();
            document.getElementById('title').innerHTML = onBreak ? 'Break' : 'Work time';
            document.getElementById('fill').style.backgroundColor = onBreak ? 'red' : 'green';
            document.getElementById('fill').style.height = fillHeight();

            // Update Break Length
            if (prevBreakLength !== breakLength) {
                document.getElementById('break-length').innerHTML = breakLength / 60;
                prevBreakLength = breakLength;
            }

            // Update Session Length
            if (prevSessionLength !== sessionLength) {
                document.getElementById('session-length').innerHTML = sessionLength / 60;
                prevSessionLength = sessionLength;
            }
        };

    })();
    /*
      Helpers
    */
    function formatClockDisplay() {
        var time = getClockTime();
        var mins = Math.floor(time / 60);
        var secs = clockTime % 60;
        secs = secs < 10 ? '0' + secs : secs;
        return (timerPaused && time === sessionLength) ? mins : mins + ':' + secs;
    }

    var fillHeight = (function() {
        var fillBreakLength = breakLength;
        var fillSessionLength = sessionLength;
        var prevOnBreak = onBreak;

        return function() {
            if (timerPaused || prevOnBreak !== onBreak) {
                fillBreakLength = breakLength;
                fillSessionLength = sessionLength;
                prevOnBreak = onBreak;
            }
            var period = onBreak ? fillBreakLength : fillSessionLength;
            var left = getClockTime();
            return (period - left) / period * CLOCK_PIXEL_HEIGHT + 'px';
        };

    })();

    // init view
    document.addEventListener("DOMContentLoaded", function() {
        notify();
    }, false);

})();