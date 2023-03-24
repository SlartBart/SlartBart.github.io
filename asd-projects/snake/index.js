/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
    var snake = [ //stores our snake and block ids
      {
        id:"#head",
        x: 400,
        y: 200,
      },
      {
        id:"#pc1",
        x:400,
        y: 220,
      }
    ]
    var head = {//stores current head speed. head won't stop until collision
      speedx : -20,
      speedy : 0,
    }
    var apple  = {
      id:"#apple",
      x:380,
      y:320,
      eaten: 0
    };
    const KEY = {
      up: "ArrowUp",
      down: "ArrowDown",
      left : "ArrowLeft",
      right : "ArrowRight"
    }
    var play=true;
    var allowInput=false;
    
  // one-time setup
  var interval = setInterval(newFrame, 200);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    allowInput=true;
    slitherP1();
    collisions();
    if(play){// if not collided
    regardingTheApple();
    slitherP2();
    }
    
    
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
  if(allowInput){
    if(event.key===KEY.up) // because of how snake traditionally moves, x and y movement are mutually exclusive. 
    {
      head.speedy = -20;
      head.speedx = 0;
    }
    if(event.key===KEY.down)
    {
      head.speedy = 20;
      head.speedx = 0;
    }
    if(event.key===KEY.left)
    {
      head.speedy = 0;
      head.speedx = -20;
    }
    if(event.key===KEY.right)
    {
      head.speedy = 0;
      head.speedx = 20;
    }allowInput=false;
  }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 function regardingTheApple()//places the apple, and on being "eaten" moves it to a new location not occupied by the snake.
 {
  //place apples
  
  
   $(apple.id).css("top", apple.y+"px");
   $(apple.id).css("left", apple.x+"px");

   if(snake[0].x===apple.x&&snake[0].y===apple.y)//check if eaten
   {
    let notSnake=false;//disposable variable
    while(!notSnake)//checks if the region is occupied by one of the snake blocks
    {
      notSnake=true;
      //new random position
      apple.x=Math.floor(Math.random()*40)*20;
      apple.y=Math.floor(Math.random()*30)*20;
      for(var i = 0; i<snake.length; i++)//check all snake blocks, if its on a snake block, reroll. continue untill it isn't
      {
        if(apple.x===snake[i].x&&apple.y===snake[i].y)
        {
          notSnake=false;
        }
      }
    }
    apple.eaten++;//increase point count
    $("#score").text("Score: "+apple.eaten);
    grow();//add new block to the snake
   }
    
    

 }
 function slitherP1()//moves the snake data object, according to the keys pressed.
 {
  for(var i = snake.length-1; i>0; i--)
  {
    snake[i].x=snake[i-1].x;
    snake[i].y=snake[i-1].y;
  }
  //head is moved seperately, since it is special.
  snake[0].x+=head.speedx;
  snake[0].y+=head.speedy;
  
 }
 function slitherP2()//display the snake. by desplaying it after checking for collisions, we remove the bug of where it would cross over itself, and pass the borders
 {
  for(var i = 0; i<snake.length; i++)
  {
    $(snake[i].id).css("top", snake[i].y+"px");
    $(snake[i].id).css("left", snake[i].x+"px");
  }
 }
  function collisions()// check for wall collision, and check for inter-snake collision
  {
    for(var i = 1; i<snake.length; i++)
    {
      if(snake[0].x===snake[i].x&&snake[0].y===snake[i].y)//body collision check
      {
        play=false;
        endGame();
      }
    }
    if(snake[0].x<0||snake[0].x>780||snake[0].y<0||snake[0].y>580)//wall collision check
    {
      play=false;
      endGame();
    }
  }
  function grow()// when apple is eaten, create a new div, and place new snake bit
  {
    $("#board").append("<div id='pc"+snake.length+"' class='body'></div>");
    snake.push({id:"#pc"+(snake.length), x:snake[snake.length-1].x, y:snake[snake.length-1].y});
    $(snake[snake.length-1].id).css("top", snake[snake.length-1].y);
    $(snake[snake.length-1].id).css("left", snake[snake.length-1].x);
    
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    alert("your score is: "+ apple.eaten +" points!");

    // turn off event handlers
    $(document).off();
  }
  
}
