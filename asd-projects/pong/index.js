/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var player2 = 
  {
    UP:"ArrowUp",
    DOWN:"ArrowDown",
    score:0,
    UPPress: false,
    DOWNPress: false
  };
  var player1 = 
  {
    UP:"w",
    DOWN:"s",
    score:0,
    UPPress: false,
    DOWNPress: false
  };
  var gameStatus = 
  {
    bounceCount : 0,
    newMatchScreen : false,
  }
  var spacebar = " ";
  var pause = false;

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
  var board = getObject("#board", 0, 0);


  var limits = {
    top : 0,
    bottom : board.height,
    left : 0,
    right : board.width,
  }
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', startmove);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', stopmove);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    updateScore();
    if(!pause)
    {
      regardingTheBall();
      movePaddle(player1, paddle1);
      movePaddle(player2, paddle2);
      boundCheck(paddle1);
      boundCheck(paddle2);
      updatePosition();
    }
    if(player1.score+player2.score>=20)
    {
      endGame();
    }
  }
  /* 
  Called in response to events.
  */
  function startmove(event) {
    /*player1 movement */
    console.log('pressed');
    if(event.key===player1.UP)
    {
      player1.UPPress = true;
    }
   if(event.key===player1.DOWN)
    {
      player1.DOWNPress = true;
    }
    /*player2 movement */
    if(event.key===player2.UP)
    {
      player2.UPPress = true;
    }
    if(event.key===player2.DOWN)
    {
      player2.DOWNPress = true;
    }
    if(event.key===spacebar)
    {
      pause=false;
    }
  }
  function stopmove(event)
  {
    console.log("depressed");
    if(event.key===player1.UP)
    {
      player1.UPPress = false;
    }
   if(event.key===player1.DOWN)
    {
      player1.DOWNPress = false;
    }
    /*player2 movement */
    if(event.key===player2.UP)
    {
      player2.UPPress = false;
    }
    if(event.key===player2.DOWN)
    {
      player2.DOWNPress = false;
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
    if(ball.speedx===0)
    {
      ball.speedx=-1;
    }
  }
  function movePaddle(player, paddle)
  {
    if(player.UPPress)
    {
      paddle.y-=paddle.speedy;
    }
    if(player.DOWNPress)
    {
      paddle.y+=paddle.speedy;
    }
  }
  function boundCheck(paddle)
  {
    if(paddle.y<limits.top)
    {
      paddle.y=limits.top;
    }
    if(paddle.y>limits.bottom-paddle.height)
    {
      paddle.y=limits.bottom-paddle.height;
    }
  }
  function regardingTheBall()
  {
    keepMoving();
    /***** animate the ball *****/
    ball.x+=ball.speedx;
    ball.y-=ball.speedy;
    /******* ball bounds bounce *******/
    if(ball.y<=limits.top){
      if(Math.random()<.25)
      {ball.speedy*=1.5;}
      ball.speedy=-1*ball.speedy;
    }
    if(ball.y>=limits.bottom-ball.height){
      if(Math.random()<.25)
      {ball.speedy*=1.5;}
      ball.speedy=-1*ball.speedy;
    }
  }
  function updateScore()
  {
    var subplayer;
    if(ball.x<limits.left){
      player2.score+=Math.floor((gameStatus.bounceCount/4)+1);
      resetBall();
      subplayer = "player 2 ";
    }
    else if(ball.x>limits.right-ball.width){
      
      player1.score+=Math.floor((gameStatus.bounceCount/4)+1);
      resetBall();
      subplayer = "player 1 ";
    }
    /* if not paused, don't display pause screen */
    if(pause)
    {
      $("#pause").css("display", "block");
      $("#player").text(subplayer);
      $("#points").text(Math.floor((gameStatus.bounceCount/4)+1));
    }
    else
    {
      $("#pause").css("display", "none");
    }
    //player 2 on left, player 1 on right, and the conditional returns 
    /*insert conditionals for changing score after the ball passes a certain bound*/
    $("#playerscore1").text(player1.score);
    $("#playerscore2").text(player2.score);
  }
  function resetBall()
  {
    
    /* wait for spacebar to continue */
      pause=true;
    /* reset ball location at random 200 by 200 px , randomize speed */
    ball.x = Math.floor(Math.random()*200)+285;
    ball.y = Math.floor(Math.random()*200)+85;
    ball.speedx = Math.floor(Math.random()*5)-2
    ball.speedy = Math.floor(Math.random()*5)-2
    paddle1.y=150;
    paddle2.y=150;
    
  }
  function updatePosition()  /* use jquery to move items paddle, and ball */
  {
    
    /* paddle section */
    $(paddle1.id).css("top", paddle1.y + "px");
    $(paddle2.id).css("top", paddle2.y + "px");
    /* ball section */
    $(ball.id).css("top", ball.y + "px");
    $(ball.id).css("left", ball.x + "px");
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
