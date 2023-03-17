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
  };//player2's data and keys active
  var player1 = 
  {
    UP:"w",
    DOWN:"s",
    score:0,
    UPPress: false,
    DOWNPress: false
  };//player1's data and keys active
  var gameStatus = 
  {
    bounceCount : 0 //stores the # of bounces, 
  }
  var spacebar = " "; //keeps spacebar from being a magic number
  var pause = false; //stores if screen is paused

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
  }  //builds out objects
  var ball = getObject("#ball", Math.floor(Math.random()*5)-2, Math.floor(Math.random()*5)-2);/* automatically randomizes the speed of the ball, creates the ball */
  var paddle1 = getObject("#paddle1", 0, 5); // creates paddle data
  var paddle2 = getObject("#paddle2", 0, 5); // creates paddle data
  var board = getObject("#board", 0, 0); // creates board data


  var limits = {
    top : 0,
    bottom : board.height,
    left : 0,
    right : board.width,
  } // used in checking the boarders and goals. 
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
    if(!pause) // if not paused, allow normal operations, 
    {
      regardingTheBall();
      movePaddle(player1, paddle1);
      movePaddle(player2, paddle2);
      boundCheck(paddle1);
      boundCheck(paddle2);
      checkCollision(paddle1);
      checkCollision(paddle2);
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
      if(!pause)
      {gameStatus.bounceCount=0;} // if paused, reset on spacebar press
      pause=false;
      
    }
  } // checks if a key is pressed to mark it 
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
    if(ball.speedx===0&&ball.speedy===0) //prevents static status
      {
        ball.speedx=1;
        ball.speedy=1;
      }
    if(ball.speedx===0) // prevents unreachable status
    {
      ball.speedx=-1;
    }
  }
  function movePaddle(player, paddle) // player and paddle are used for dry code
  {
    if(player.UPPress)
    {
      paddle.y-=paddle.speedy; // simple! if up move up
    }
    if(player.DOWNPress)
    {
      paddle.y+=paddle.speedy; // also simple! if down move down
    }
  }
  function boundCheck(paddle) // use of paddle for dry code
  {
    if(paddle.y<limits.top)
    {
      paddle.y=limits.top; //keeps paddle from flying out the top
    }
    if(paddle.y>limits.bottom-paddle.height)
    {
      paddle.y=limits.bottom-paddle.height;// heeps paddle from flying out the bottom
    }
  }
  function regardingTheBall() // defines normal bounce behavior, and animates the ball. 
  {
    keepMoving();
    /***** animate the ball *****/
    ball.x+=ball.speedx;
    ball.y-=ball.speedy;
    /******* ball bounds bounce *******/
    if(ball.y<=limits.top){
      if(Math.random()<.25)
      {ball.speedy*=1.1;}
      ball.speedy=-1*ball.speedy;
    }
    if(ball.y>=limits.bottom-ball.height){
      if(Math.random()<.25)
      {ball.speedy*=1.1;}
      ball.speedy=-1*ball.speedy;
    }
  }
  function updateScore()
  {
    var subplayer; // stores who won match
    if(ball.x<limits.left){ // hits left side, player 1 earns point
      player2.score+=Math.floor((gameStatus.bounceCount/4)+1); // increase score by a fourth of the paddle bounces, with a base of 1
      resetBall();
      subplayer = "player 1 ";
    }
    else if(ball.x>limits.right-ball.width){ //hits right side, player 2 earns point
      
      player1.score+=Math.floor((gameStatus.bounceCount/4)+1);
      resetBall();
      subplayer = "player 2 ";
    }
    /* if not paused, don't display pause screen */
    if(pause)
    {
      /* pause screen code */
      $("#pause").css("display", "block");
      $("#player").text(subplayer);
      $("#points").text(Math.floor((gameStatus.bounceCount/4)+1));
      ;//reset bounce count, since it only counts each match

    }
    else
    {
      $("#pause").css("display", "none"); // don't display the screen
    }
    //player 2 on left, player 1 on right, and the conditional returns 
    $("#playerscore1").text(player1.score);
    $("#playerscore2").text(player2.score);
    $("#matchPoint").text(Math.floor(gameStatus.bounceCount/4)+1);//update the current matchvalue always
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
    //resets the position of the paddles
    paddle1.y=150;
    paddle2.y=150;
    
  }
  function checkCollision(paddle)
  {
    if(
      (ball.x<paddle.x+paddle.width)&&
      (ball.x+ball.width>paddle.x)&&
      (ball.y<paddle.y+paddle.height)&&
      (ball.y+ball.height>paddle.y)
      /* collision detected */
      )
      {
        ball.speedx*=-1.1; // always increase ball speed by 1.1 times its origional, and negative it so the ball turns around
        ball.speedy+=Math.floor(Math.random()*4)-2;// randomize speed y to make it fun
        gameStatus.bounceCount+=1;// increase bounce count!!
      }
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
  function endGame() 
  {
    $("#WINNER").css("display", "block"); //display endgame text
    if(player1.score>player2.score)
    {
      $("#WINNER").text("player 1 wins!!!"); 
    }
    else if(player1.score<player2.score)
    {
      $("#WINNER").text("player 2 wins!!!");
    }
    else
    {
      $("winner").text("its....... A TIE!");
    }
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
