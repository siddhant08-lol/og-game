let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
let birdImg;


   let birdWidth = 50;
   let birdHeight = 36;

   let birdX = boardWidth/8;
   let birdY = boardHeight/2;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight

}


let pipeArray = [];
let pipeWidth = 205;
let pipeHeight = 404;
let pipeX = boardWidth;
let pipeY = 0;


let topPipeImg;
let bottomPipeImg;


let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;


   let score = 0;


window.onload = function () {
    board = document.getElementById("board");

    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

     birdImg = new Image();

    birdImg.src = "image/bird.png";

    birdImg.onload = function () {
        context.drawImage(
            birdImg,
            bird.x,
            bird.y,
            bird.width,
            bird.height
        );
    };

topPipeImg = new Image();
topPipeImg.src = "image/pipe2.png";


bottomPipeImg = new Image();
bottomPipeImg.src = "image/pipe.png";





    requestAnimationFrame(update);
    setInterval(placepipes, 1500);
    document.addEventListener("keydown", moveBird);
}



function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

          velocityY += gravity;

bird.y = Math.max(bird.y + velocityY, 0);
context.drawImage(
    birdImg,
    bird.x,
    bird.y,
    bird.width,
    bird.height
);
   
if (bird.y > board.height){
    gameOver = true;
}



    for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
       context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height );

       if(!pipe.passed && bird.x > pipe.x + pipe.width ){
        score += 0.5;
        pipe.passed = true;
       }

       if (detectCollision(bird, pipe)){
        gameOver = true;
       }


    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
    }

    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

if (gameOver){
    context.fillText("GameOver", 5, 90);
}

}

function placepipes(){

    if (gameOver) {
        return;
    }

    //pipe height let gooooo

   let randompipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);

    let openingSpace = board.height/4;


    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randompipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

     pipeArray.push(topPipe);


     let bottompipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randompipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
     }

     pipeArray.push(bottompipe);


}


function moveBird(e){
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "keyX"){
        e.preventDefault();
        velocityY = -6;



        if(gameOver){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}





function detectCollision(a, b) {
    let collisionX = b.x + 75;
    let collisionWidth = 55;

    let collisionY = b.y;
    let collisionHeight = b.height;

    return a.x < collisionX + collisionWidth &&
           a.x + a.width > collisionX &&
           a.y < collisionY + collisionHeight &&
           a.y + a.height > collisionY;
}