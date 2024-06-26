const gameBoard = document.querySelector("#game-board");
const context = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "orange";
const scoreText =document.querySelector("#score")
const resetBtn = document.querySelector("#reset-btn")


//Defining the snake
const snakeColor = "#e9edc9";
const snakeBorder = "green";
const snakeFood = "red";

const unitSize = 25; //size of snake
let running = false;
let xAxis = unitSize; // shows how far the snake moves on the x axis on the board if its a positive number the snake will move to the right. 
                     // If number is negative then the snake will move to the left.
let yAxis = 0; 
let foodX = 0; //store the x and y coordinates of the food.
let foodY = 0;
let score = 0;
let snake = [
    //an array of objects where each object represents a five parts of the snake. 
    {x:unitSize *4, y:0},
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0} 
]; 

window.addEventListener("keydown", changeDirection); //Listens for key presses to change the snake's direction and clicks on the reset button to restart the game.
resetBtn.addEventListener("click", resetGame);

 gameStart();

 function gameStart(){ //Initializes the game by setting the running state to true, displaying the score, creating the first food piece, and starting the game loop.
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
 };
 function nextTick(){ //This loop is controlled by the setTimeout, ensuring the game updates every 100 milliseconds. 
    if(running){
        setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick ();
        }, 100)
    }
        else{
            displayGameOver();
        }
    };
 
 function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect  (0, 0, gameWidth, gameHeight);
 }; //clears the game board

 function createFood(){
    function randomFood(min, max){ //will find a random place on the board to place the food item.
        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize; //numbers are divisible by 25
        return randomNumber;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
 }; 
 function drawFood(){
    context.fillStyle = snakeFood; //Draws the food at its current position.
    context.fillRect (foodX, foodY, unitSize, unitSize);
 };

 function drawSnake(){ //Draws the five parts of the snake.
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach (snakePart => {
      context.fillRect  (snakePart.x, snakePart.y, unitSize, unitSize);
      context.strokeRect  (snakePart.x, snakePart.y, unitSize, unitSize);
    })
 };

 function moveSnake(){ //Updates the position of the snake based on its direction.
    const head = {x: snake[0].x + xAxis,
                 y:snake[0].y + yAxis };
                 snake.unshift(head);
                 //if the food has been eaten
                 if(snake[0].x == foodX && snake[0].y == foodY){ //moves the snake by adding a new head to the front of the array
                   score+=1;
                   scoreText.textContent = score;
                   createFood();
                 }
                 else{
                    snake.pop();
                 }
 };

 function changeDirection(){ //Changes the snake's direction based on arrow key pressed.
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yAxis == -unitSize);
    const goingDown = (yAxis == unitSize);
    const goingRight = (xAxis == unitSize);
    const goingLeft = (xAxis == -unitSize);

    switch(true){
    case(keyPressed == LEFT && !goingRight):
         xAxis = -unitSize;
         yAxis = 0;
         break;
    case(keyPressed == UP && !goingDown):
         xAxis = 0;
         yAxis = -unitSize;
         break;
    case(keyPressed == RIGHT && !goingLeft):
         xAxis = unitSize;
         yAxis = 0;
         break;
    case(keyPressed == DOWN && !goingUp):
         xAxis = 0;
         yAxis = unitSize;
         break;
    }
 };
 
 function checkGameOver(event){  //Checks if the snake hits the walls or itself, which would end the game.
       switch(true){
       case (snake[0].x < 0):
       running = false;
       break;
       case (snake[0].x >= gameWidth):
        running = false;
        break;
        case (snake[0].y < 0):
        running = false;
        break;
        case (snake[0].y >= gameHeight):
        running = false;
        break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){{
         running = false  // If any parts of the snake overlap with the head, the game will end because running is set to false.
        }
      }
    }
 };
 function displayGameOver(){ //Checks if the snake hits the walls or itself, which would end the game.
   context.font = "40px san serf";
   context.fillStyle = "red";
   context.textAlign = "center";
   context.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
   running = false
 };
 function resetGame(){ //Resets the game to its initial state and starts it again.
    score = 0;
    xAxis = unitSize;
    yAxis = 0;
    snake = [
    //creating five body parts using arrays again
    {x:unitSize *4, y:0},
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0} //arrays used to creat snake body
   ]; 
   gameStart();
 };






