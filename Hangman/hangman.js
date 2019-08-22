
let firstWord;
let secondWord;
let gameStarted = false;
let player1Guesses = [];
let player2Guesses = [];
let player1Turn = false;
let player2Turn = false;

const getUnderscores = (word, guessed) => {
    let result = [];
    for (let i = 0; i < word.length; i++) {
       if (guessed.includes(word[i])) {
        result.push(word[i]);
       } else if (word[i] === ' ') {
        result.push('\u00a0');
       } else {
        result.push('_');
       }
    }
    return result.join(' ');
}

document.onkeydown = function(event){
    event = event || window.event;
    let key = event.which || event.keyCode;
    let character = String.fromCharCode(key);

    if (gameStarted && isLetter(character)) {
        if (player1Turn) {
            // Player 1's turn
            if (!player1Guesses.includes(character)) {
                player1Guesses.push(character);
                document.getElementById("guessedLetters1").innerText += character
                if (firstWord.includes(character)) {
                    updateHiddenWords();
                    if (!document.getElementById("hiddenWord1").innerText.includes('_')) {
                        document.getElementById("playerTurn").innerText = 'Player 1 Won';
                        gameStarted = false;
                        document.getElementById("playAgain").style.display = 'block';

                    }
                } else {
                    player1Turn = false;
                    player2Turn = true;
                    document.getElementById("playerTurn").innerText = "Player 2 Turn";
                }
            }
        } else if (player2Turn) {
            // Player 2's turn
            if (!player2Guesses.includes(character)) {
                player2Guesses.push(character);
                document.getElementById("guessedLetters2").innerText += character
                if (secondWord.includes(character)) {
                    updateHiddenWords();
                    if (!document.getElementById("hiddenWord2").innerText.includes('_')) {
                        document.getElementById("playerTurn").innerText = 'Player 2 Won';
                        gameStarted = false;
                        document.getElementById("playAgain").style.display = 'block';
                    }
                } else {
                    player1Turn = true;
                    player2Turn = false;
                    document.getElementById("playerTurn").innerText = "Player 1 Turn";
                }
            }
        }
    }
}

const isLetter = (character) => {
    let letters = /^[A-Z0-9]$/;
    if (character.match(letters)) {
        return true;
    } else {
        return false;
    }
}

const startGame = () => {
    // Read words and store in firstWord and secondWord
    firstWord = document.getElementById("firstWord").value.toUpperCase();
    secondWord = document.getElementById("secondWord").value.toUpperCase();

    for (let i = 0; i < firstWord.length; i++) {
        if (!isLetter(firstWord[i]) && firstWord[i] != ' ') {
            alert('Player 1: Please use characters from A to Z and 0 to 9');
            return;
        }
    }

    for (let i = 0; i < secondWord.length; i++) {
        if (!isLetter(secondWord[i]) && secondWord[i] != ' ') {
            alert('Player 2: Please use characters from A to Z and 0 to 9');
            return;
        }
    }

    // Check input is valid
    if (firstWord === "" || secondWord === "") {
        // alert("Please write all words to guess");
        alert("Please write all words to guess");
        return;
    }

    gameStarted = true;
    player1Turn = true;
    player2Turn = false;

    // Update hidden word underscores based on count of input words
    updateHiddenWords();
    document.getElementById("playerTurn").innerText = "Player 1 Turn";
    
    // Hide intro div and show game div
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "block";
}

const updateHiddenWords = () => {
    document.getElementById("hiddenWord1").innerText = getUnderscores(firstWord, player1Guesses);
    document.getElementById("hiddenWord2").innerText = getUnderscores(secondWord, player2Guesses);
};

const playAgain = () => {
    document.getElementById("intro").style.display = "block";
    document.getElementById("game").style.display = "none";
    firstWord = '';
    secondWord = '';
    gameStarted = false;
    player1Guesses = [];
    player2Guesses = [];
    player1Turn = false;
    player2Turn = false;
    document.getElementById("firstWord").value = '';
    document.getElementById("secondWord").value = '';
    document.getElementById("guessedLetters1").innerText = '';
    document.getElementById("guessedLetters2").innerText = '';
};