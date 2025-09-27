// lab2.js
const prompt = require('prompt');

// Start the prompt
prompt.start();

// Ask user for input
prompt.get(['userSelection'], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }

    // Normalize user input (uppercase for consistency)
    let userSelection = result.userSelection.toUpperCase();

    // Generate computer choice
    let randomNumber = Math.random();
    let computerSelection;
    if (randomNumber <= 0.34) {
        computerSelection = "PAPER";
    } else if (randomNumber <= 0.67) {
        computerSelection = "SCISSORS";
    } else {
        computerSelection = "ROCK";
    }

    // Show choices
    console.log("User chose: " + userSelection);
    console.log("Computer chose: " + computerSelection);

    // Determine winner
    let outcome;
    if (userSelection === computerSelection) {
        outcome = "It's a tie!";
    } else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        outcome = "User Wins!";
    } else {
        outcome = "Computer Wins!";
    }

    // Print result
    console.log(outcome);
});
