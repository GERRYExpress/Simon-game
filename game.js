const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let index = 0;
const sounds = [
    new Audio("/sounds/red.mp3"),
    new Audio("/sounds/blue.mp3"),
    new Audio("/sounds/green.mp3"),
    new Audio("/sounds/yellow.mp3"),
    new Audio("/sounds/wrong.mp3")
];

const startOver = () => {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    console.log("Game Restarted!");

}

const handleClick = (event) => {
    if (gamePattern.length === 0) {
        window.alert("The game hasn't started yet!")
    } else {
        let userChosenColour = event.target.id.toString();
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(level);
        console.log(userClickedPattern);
    }
}

// Add animation on the clicked button
const animatePress = (currentColor) => {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}

const playSound = (name) => {
    if (name === 'green') {
        sounds[2].play();
    } if (name === 'red') {
        sounds[0].play();
    } if (name === 'yellow') {
        sounds[3].play();
    } if (name === 'blue') {
        sounds[1].play();
    }
}

// Random the next button
const nextSequence = () => {
    level++;
    $('#level-title').text(`Level ${level}`);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(50).fadeIn(50);
    systemSoundIndex = randomNumber;
    console.log(gamePattern);
};

// Check answer
const checkAnswer = (currentLevel) => {
    const lastIndex = userClickedPattern.length - 1;
    if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    } else {
        sounds[4].play();
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text(`Game Over, Press Any Key to Restart`);
    }
}


// On button clicked print out the clicked color
$(".btn").click((event) => {
    handleClick(event);
});

// Restart the game
$(window).keypress(() => {
    if (gamePattern.length > 0) {
        $('#level-title').text('Press A Key to Start');
        startOver();
    } else {
        $('#level-title').text('Level 0');
        nextSequence();
    }
});
