let sessionLength = 25;
let breakLength = 5;

const SessionStates = Object.freeze({
    SESSION: 1,
    BREAK: 0
})
const TimerStates = Object.freeze({
    PAUSED: 0,
    PLAYING: 1,
    STOPPED: 2
})

let sessionState = SessionStates.SESSION;
let timerState = TimerStates.STOPPED;

let timeLeft = 25 * 60;

$("#session-decrement").on("click", function () {
    console.log("session-decrement was pressed.");

    if (timerState == TimerStates.STOPPED) {
        if (sessionLength > 1) {
            sessionLength -= 1
        }
        timeLeft = sessionLength * 60;
        update_timer();
        $("#session-length").text(sessionLength);
    }
});

$("#session-increment").on("click", function () {
    console.log("session-increment was pressed.");

    if (timerState == TimerStates.STOPPED) {
        if (sessionLength < 60) {
            sessionLength += 1
        }
        timeLeft = sessionLength * 60;
        update_timer();
        $("#session-length").text(sessionLength);
    }
});

$("#break-decrement").on("click", function () {
    console.log("break-decrement was pressed.");

    if (timerState == TimerStates.STOPPED) {

        if (breakLength > 1) {
            breakLength -= 1
        }
        update_timer();
        $("#break-length").text(breakLength);
    }
});

$("#break-increment").on("click", function () {
    console.log("break-increment was pressed.");

    if (timerState == TimerStates.STOPPED) {

        if (breakLength < 60) {
            breakLength += 1
        }
        update_timer();
        $("#break-length").text(breakLength);
    }
});


$("#start_stop").on("click", function () {
    console.log("start_stop was pressed.");
    if (timerState == TimerStates.PAUSED || timerState == TimerStates.STOPPED) {
        timerState = TimerStates.PLAYING;
        console.log("playing");

    } else if (timerState == TimerStates.PLAYING) {
        timerState = TimerStates.PAUSED;
        console.log("pausing");
    }
});

$("#reset").on("click", function () {
    console.log("reset was pressed.");
    $("#beep").pause();
    $("#beep").load();

    sessionLength = 25;
    $("#session-length").text(sessionLength);

    breakLength = 5;
    $("#break-length").text(breakLength);

    timerState = TimerStates.STOPPED;
    sessionState = SessionStates.SESSION;
    timeLeft = sessionLength * 60;
    update_timer();
})

setInterval(function () {
    if (timerState == TimerStates.PLAYING) {
        timeLeft -= 1;
        update_timer();
    }
}, 10) //TODO: change back to 1000

function update_timer() {
    if (timeLeft >= 0) {
        $("#time-left").text(formatTime(timeLeft));
    } else {  // if timer reaches 0
        $("#beep").play();
        if (sessionState==SessionStates.SESSION) {
            sessionState=SessionStates.BREAK;
            timeLeft=breakLength*60;
            $("#time-left").text(formatTime(timeLeft));
            $("#timer-label").text("Break");

        } else if (sessionState==SessionStates.BREAK) {
            sessionState=SessionStates.SESSION;
            timeLeft=sessionLength*60;
            $("#time-left").text(formatTime(timeLeft));
            $("#timer-label").text("Session");

        }
    }
    console.log(formatTime(timeLeft));

    function formatTime(seconds) {
        let minute = Math.floor(seconds / 60);
        let second = seconds % 60;
        if (second < 10) { second = "0" + second }
        return `${minute}:${second}`
    }
}