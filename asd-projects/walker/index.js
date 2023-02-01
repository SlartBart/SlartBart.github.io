/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = 
  {
    "UP":"ArrowUp",
    "DOWN":"ArrowDown",
    "LEFT":"ArrowLeft",
    "RIGHT":"ArrowRight"
  }
  var xpos = 0;
  var ypos = 0;
  var xspeed = 0;
  var yspeed = 0;
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.key===KEY.DOWN)
    {
      console.log("down pressed");
      yspeed = 5;//move down
    }
    else if(event.key===KEY.UP)
    {
      console.log("up pressed");
      yspeed = -5;//move up
    }
    else if(event.key===KEY.LEFT)
    {
      console.log("left pressed");
      xspeed = -5;//move left
    }
    else if(event.key===KEY.RIGHT)
    {
      console.log("right pressed");
      xspeed = 5;//move right
    }
    


  }
  function handleKeyUp()
  {
    xspeed = 0;
    yspeed = 0;
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem()
  {
    ypos+=yspeed;//walker increases y, moving down

    xpos+=xspeed;//walker decreases x, moving right
  }
  function redrawGameItem()
  {//places the walker at its new location
    $("#walker").css("top", ypos);
    $("#walker").css("left", xpos);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
