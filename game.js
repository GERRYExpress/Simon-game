const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = []
const sounds = [
    new Audio("/sounds/red.mp3"),
    new Audio("/sounds/blue.mp3"),
    new Audio("/sounds/green.mp3"),
    new Audio("/sounds/yellow.mp3"),
    new Audio("/sounds/wrong.mp3")
];

let playerSoundIndex;
let systemSoundIndex;

const handleClick = (event) => {
    let userChosenColour = event.target.id.toString();
    userClickedPattern.push(userChosenColour);
    playerSoundIndex = userChosenColour;
    playSound('user');
    nextSequence();
    console.log(userClickedPattern);
}

// CONTINUE HERE
const animatePress = (currentColor) => {

}

const playClickSound = (index) => {
    sounds.at(index).play();

}

const playSound = (name) => {
    if (name === 'user') {
        playClickSound(playerSoundIndex);
    } else {
        playRandomSound(systemSoundIndex);
    }
}

const playRandomSound = (index) => {
    sounds.at(index).play();
    $(`#${gamePattern.at(gamePattern.length - 1)}`)
        .fadeOut(100)
        .fadeIn(100);
}

// Random the next button
const nextSequence = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    systemSoundIndex = randomNumber;
    playSound('system');
};

nextSequence();

// On button clicked print out the clicked color
$(".btn").click((event) => {
    handleClick(event);
});
