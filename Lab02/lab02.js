// lab2.js
const prompt = require('prompt');
prompt.start();

// Ask user for input
prompt.get(['userSelection'], function (a, b) {
    if (a) {
        console.log("error",a);
    }
    let userSel = b.userSelection.toLowerCase();

    let randomNum = Math.random();
    let computerSel;
    if (randomNum <= 0.34) {
        computerSel = "paper";
    } else if (randomNum <= 0.67) {
        computerSel = "scissors";
    } else {
        computerSel = "rock";
    }

    // Show choices
    console.log("User choice: " + userSel);
    console.log("Computer choice: " + computerSel);
    //Checking outcomes
    let outcome;
    if (userSel === computerSel) {
        outcome = "It's a tie!";
    } else if (
        (userSel === "rock" && computerSel === "scissors") ||
        (userSel === "paper" && computerSel === "rock") ||
        (userSel === "scissors" && computerSel === "paper")
    ) {
        outcome = "User Wins!";
    } else {
        outcome = "Computer Wins!";
    }

    // Print result
    console.log(outcome);
});
