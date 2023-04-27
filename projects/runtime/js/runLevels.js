var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y)
    {
      var hitZoneSize = 25;
    var damageFromObsticle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObsticle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x=-25;
    obstacleImage.y=-25;
    console.log(sawBladeHitZone);
    }
    

  function createEnemy(x, y){
    var enemy = game.createGameItem('enemy', 25);
    var redSquare = draw.rect(50,50, "red");
    redSquare.x = -25;
    redSquare.y = -25;
    enemy.addChild(redSquare);
    enemy.x = x;
    enemy.y = y;
    game.addGameItem(enemy);
    enemy.velocityX=-1;
    enemy.rotationalVelocity=2;
    enemy.onPlayerCollision = function()
    {
      game.changeIntegrity(-20);
    };
    enemy.onProjectileCollision = function()
    {
      game.increaseScore(100);
      enemy.fadeOut(flyTo(50,50));
    };
    
  }
    


    function createReward(x, y)
    {
      var reward = game.createGameItem("reward",25);
      
      
        var med1 = draw.rect(10,50, "green");
        var med2 = draw.rect(50,10,"green");
        med1.x=20;
        med1.y=0;
        med2.x=0;
        med2.y=20;
        reward.addChild(med1,med2);
        reward.onPlayerCollision = function()
        {
          
          reward.fadeOut();
          game.changeIntegrity(500);
        }
   reward.onProjectileCollision = function()
   {
    reward.fadeOut();
   }
   reward.x=x;
   reward.y=y;
   game.addGameItem(reward);
   reward.velocityX=-1;
  

    }
    function createMarker(x,y)
    {
      var end = game.createGameItem("end", 50);
      var endBar = draw.rect(10,500,"black");
      endBar.x=0;
      endBar.y=0;
     
      end.addChild(endBar);
      end.x = x;
      end.y = y;
       game.addGameItem(end);
      end.velocityX=-1;
     
      end.onPlayerCollision = function()
      {
        
        startLevel();
        end.fadeOut();
      }
      end.onProjectileCollision = function()
      {
        
        startLevel();
        end.fadeOut();
      }
    }
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects=level.gameItems;
      for(var i = 0; i<levelObjects.length; i++)
      {
        if(levelObjects[i].type == "sawblade")
        {createSawBlade(levelObjects[i].x,levelObjects[i].y);}
        if(levelObjects[i].type == "enemy")
        {createEnemy(levelObjects[i].x,levelObjects[i].y);}
        if(levelObjects[i].type == "reward")
        {createReward(levelObjects[i].x,levelObjects[i].y);}
        if(levelObjects[i].type == "end")
        {createMarker(levelObjects[i].x,levelObjects[i].y);}
      }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
