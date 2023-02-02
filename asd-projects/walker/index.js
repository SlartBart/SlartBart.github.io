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
    borders();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.key===KEY.DOWN)
    {
      yspeed = 5;//move down
    }
    else if(event.key===KEY.UP)
    {
      yspeed = -5;//move up
    }
    else if(event.key===KEY.LEFT)
    {
      xspeed = -5;//move left
    }
    else if(event.key===KEY.RIGHT)
    {
      xspeed = 5;//move right
    }
    // possible kink to work out. hitting an opposing key causes the box to move that way

  }
  function handleKeyUp(event)
  {
    if(event.key===KEY.RIGHT||event.key===KEY.LEFT)
    {
      xspeed = 0;//stops moving left or right when left or right key is released
    }
    if(event.key===KEY.UP||event.key===KEY.DOWN)
    {
      yspeed = 0;//stops moving up or down when up or down key is released
    }
    //basically: fixed glitch where you could still hold a key and it not move in that direction
    //specifically if you were to hit up/down and left/right and released one it would stop. 
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem()
  {
    ypos += yspeed;//walker increases by y, moving down or up

    xpos += xspeed;//walker increases by x, moving right or left
  }
  function redrawGameItem()
  {//places the walker at its new location
    $("#walker").css("top", ypos);
    $("#walker").css("left", xpos);
  }
  function borders()
  {
    if(ypos<0){ypos=0;}
    if(ypos>390){ypos=390;}
    if(xpos<0){xpos=0;}
    if(xpos>390){xpos=390};
  }
  //the borders function keeps the ball from leaving the box, even if the player wants it to.
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
