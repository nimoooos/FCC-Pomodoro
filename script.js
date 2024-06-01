let sessionLength=25;
let breakLength=5;

const SessionStates = Object.freeze({
    SESSION: 1,
    BREAK: 0
})
const TimerStates = Object.freeze({
    PAUSED: false,
    PLAYING: true
})

let sessionState=SessionStates.SESSION;
let timerState=TimerStates.PAUSED;

let timeLeft=25*60;

$("#session-decrement").on("click", function(){
    console.log("session-decrement was pressed.");
    if (sessionLength>1) {
        sessionLength -= 1
    }
    $("#session-length").text(sessionLength);
});

$("#session-increment").on("click", function(){
    console.log("session-increment was pressed.");
    if (sessionLength<60) {
        sessionLength += 1
    }
    $("#session-length").text(sessionLength);
});

$("#break-decrement").on("click", function(){
    console.log("break-decrement was pressed.");
    if (breakLength>1) {
        breakLength -= 1
    }
    $("#break-length").text(breakLength);
});

$("#break-increment").on("click", function(){
    console.log("break-increment was pressed.");
    if (breakLength<60) {
        breakLength += 1
    }
    $("#break-length").text(breakLength);
});


$("#start_stop").on("click", function(){
    console.log("start_stop was pressed.");
    if(timerState==TimerStates.PAUSED){
        timerState=TimerStates.PLAYING;
        console.log("Timer is unpaused.")

    };
});
