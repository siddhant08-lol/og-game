let board;
let boardWidth = 360;
let boardHeight = 640;
let context;


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




   


window.onload = function () {
    board = document.getElementById("board");

    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    let birdImg = new Image();

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
};
