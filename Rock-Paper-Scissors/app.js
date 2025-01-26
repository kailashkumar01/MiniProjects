const choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let user_score = document.querySelector("#userScore");
let comp_score = document.querySelector("#compScore");
let userScore = 0;
let compScore = 0;

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    let idx = Math.floor(Math.random()*3);
    return options[idx];
}

const showDraw = () => {
    msg.innerText = "Game Was Draw! Try Again!!";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        msg.innerText = `You win!! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScore++;
        user_score.innerText = userScore;
    }
    else {
        msg.innerText = `You lose. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compScore++;
        comp_score.innerText = compScore;
    }
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if(compChoice === userChoice) {
        showDraw();
    }
    else {
        let userWin = true;
        if(compChoice === "rock") {
            userWin = userChoice === "paper" ? true: false;
        } 
        else if(compChoice === "paper") {
            userWin = userChoice === "scissors" ? true: false;
        }
        else {
            userWin = userChoice === "rock" ? true: false;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const choiceId = choice.getAttribute("id");
        playGame(choiceId);
    });
});