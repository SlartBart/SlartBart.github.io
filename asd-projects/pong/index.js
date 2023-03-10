/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var player1 = 
  {
    UP:"ArrowUp",
    DOWN:"ArrowDown",
    score:0,
  };
  var player2 = 
  {
    UP:"w",
    DOWN:"s",
    score:0,
  };
  var spacebar = " ";
  // Game Item Objects
  function getObject(id, speedx, speedy)
  {
    var object = {};
    object.id=id;
    object.x = parseFloat($(id).css("left"));
    object.y = parseFloat($(id).css("top"));
    object.width = $(id).width();
    object.height = $(id).height();
    object.speedx=speedx;
    object.speedy=speedy;
    return object;
  }  
  var ball = getObject("#ball", Math.floor(Math.random()*5)-2, Math.floor(Math.random()*5)-2);/* automatically randomizes the speed of the ball */
  var paddle1 = getObject("#paddle1", 0, 5);
  var paddle2 = getObject("#paddle2", 0, 5);
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    updateScore();
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    /*player1 movement */
    if(event.key===player1.UP && paddle1.y>0)
    {
      paddle1.y-=paddle1.speedy;
    }
    else if(event.key===player1.DOWN && paddle1.y<300)
    {
      paddle1.y+=paddle1.speedy;
    }
    /*player2 movement */
    if(event.key===player2.UP && paddle2.y>0)
    {
      paddle2.y-=paddle2.speedy; 
    }
    else if(event.key===player2.DOWN && paddle1.y<300)
    {
      paddle2.y+=paddle2.speedy;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function keepMoving()/*keeps the ball moving, since there is a chance that the x any y speed get set to zero at gamestart  */
  {
    if(ball.speedx===0&&ball.speedy===0)
      {
        ball.speedx=1;
        ball.speedy=1;
      }
  }
  function updateScore()
  {
    /*insert conditionals for changing score after the ball passes a certain bound*/
    $("#playerscore1").text(player1.score);
    $("#playerscore2").text(player2.score);
  }
  function updatePosition(id)/* use to move items paddle, and ball */
  {

  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
