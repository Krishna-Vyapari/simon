var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = []; //red, green , blue , red, red 
var userClickedPattern = [];//red, green , blue , red, red 
var started = false;
var level = 0 ;

//First step 

// $(document).on("keypress", function(){ });
$("#level-title").on("click" , function() {
    if (!started) {
        $("h2").text("");
        $("#level-title").html("Level " +level);
        nextSequence();
        started = true;
    };
});

$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id"); //red
    userClickedPattern.push(userChoosenColour); //red[0]
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer((userClickedPattern.length) - 1); //red[0]
});

function checkAnswer(currentLevel) { //0
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) { // red == red
        
        if(gamePattern.length == userClickedPattern.length){
        setTimeout(function() {nextSequence() }, 1000);
        }
    }
    else{
        var wrongAudio = (new Audio('sounds/wrong.mp3')).play();
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over")}, 200);
        if ((level-1) >= 10) {
            $("h2").text("Score: " + (level-1) + ". You did an amazing job!");
        }
        else if((level - 1) < 10 && (level - 1) > 5 ) {
            $("h2").text("Score: " + (level-1) + ". You would have done better!");
        }
        else {
            $("h2").text("Score: " + (level-1) + ". Very Bad!!!");
        }
        $("h1").text('Game Over, Press Any Key to Restart!');
        startOver();
    }
    
}

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").html("Level " +level);
    var randomNumber = Math.round(Math.random() * 3);
    var buttonChoosen = buttonColours[randomNumber]; // red

    gamePattern.push(buttonChoosen);  //red[0]

    $("#"+buttonChoosen).fadeOut(100).fadeIn(100);
    playSound(buttonChoosen);
}

function playSound(name){
    var sound = (new Audio("sounds/" + name+ ".mp3")).play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {$("." + currentColour).removeClass("pressed")}, 100);
}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



