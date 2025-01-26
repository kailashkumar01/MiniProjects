let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#rst-btn");
let newBtn = document.querySelector("#new-btn");
let winMsg = document.querySelector("#winMsg");
let msgContainer = document.querySelector(".msgContainer");
//turnX = true => turn is of Player X
let turnX = true;
let cnt=0;
// 8 winning patterns
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("button was clicked");
        cnt++;
       if(turnX) {
        box.innerText = "X";
        turnX = false;
       }
       else {
        box.innerText = "O";
        turnX = true;
       }
       box.disabled = true;
       checkWinner();
    });
});

const resetGame = () => {
    turnX = true;
    msgContainer.classList.add("hide");
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    winMsg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    for(let box of boxes) {
        box.disabled = true;
    }
};

const showDraw = () => {
    winMsg.innerText = "Draw!!";
    msgContainer.classList.remove("hide");
}
const checkWinner = () => {
    for(let pat of winPatterns) {
        let val1 = boxes[pat[0]].innerText;
        let val2 = boxes[pat[1]].innerText;
        let val3 = boxes[pat[2]].innerText;
        if(val1=="" || val2=="" || val3=="") continue;
        if(val1==val2 && val2==val3) {
            // console.log("winner is", val1);
            cnt=0;
            showWinner(val1);
        }
        if(cnt==9) showDraw();
    }
}

newBtn.addEventListener("click",resetGame);
rstBtn.addEventListener("click",resetGame);
