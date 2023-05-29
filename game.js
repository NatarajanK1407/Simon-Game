var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var start = false;
var level = 0;

$("body").keypress(function () {
    if (start === false) {
        start = true;
        nextSequence();
        $("h1").text("Level " + level);
    }
})

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    playsound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    level = level + 1;
    $("h1").text("Level " + level);
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); /*To Flash*/
    playsound(randomChosenColour);
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    }
    else {
        console.log("Wrong");
        playsound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    start = false;
    level = 0;
    gamePattern = []
}