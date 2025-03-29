let gameSeq = [];
let userSeq = [];


let btns =  ["yello","red", "purple", "green"];

let started = false;
let level = 0;
let highscore = 0;
let gameOver = false;


let h2 = document.querySelector("h2")
let h3 = document.querySelector("h3")

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game is started");
        started = true;

        levelUp()
        
    }
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    


    //chose random color and generate
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(randColor)
    // console.log(randIdx)
    // console.log(randbtn)
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn)
};


function checkAns(idx){
    // console.log("current level", level);

    

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
        console.log(`same value`);
        
        
        
    } else {
        gameOver = true;
        // GameOver();
        playMusic();
        h2.innerHTML = `Game over! Your score was <b>${level}<b> <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        if(level > highscore){
            highscore = level;
            h3.innerText = `Highest score is ${level}`;
        }
        

        
        reset();
        
        
        
    }

   
};

function btnPress(){
    if (gameOver) return; // Stop execution if the game is over

    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor)

    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")

for (btn of allBtns){
    btn.addEventListener("click",btnPress)
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    gameOver = false;
}

function playMusic(){
    if(gameOver){
        let audio2 = new Audio("gameover.mp3");
        audio2.play();
        
    } else if(gameOver==false){
        let audio1 = new Audio("audio2.mp3");
        audio1.play();
            allBtns.forEach(button => {
                button.addEventListener("click", playMusic);
            });
    }

    
}

// //Add event listener to each button
allBtns.forEach(button => {
    button.addEventListener("click", playMusic);
});

// function GameOver(){
//     let audio2 = new Audio("gameover.mp3");
//     audio2.play().catch(error => console.log("Error playing game over sound:", error));
// }


