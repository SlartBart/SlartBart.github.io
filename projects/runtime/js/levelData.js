var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
          { type: "enemy", x: 500, y: groundY-50}, 
          { type: "enemy", x: 700, y: groundY-50},
          { type: "reward", x:300, y: groundY-50},
          { type: "end", x:1500, y: groundY-50}
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 500, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
          { type: "sawblade", x: 1200, y: groundY-100 },
          { type: "enemy", x:700, y: groundY-20},
          { type: "enemy", x:1000, y: groundY-30},
          { type: "enemy", x:1100, y: groundY-70},
          { type: "reward", x:300, y:groundY-50},
          { type: "end", x:2000, y:groundY-50}
        ],
      },
      {
        name: "Domo Arigato",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x:400, y: groundY-150},
          { type: "sawblade", x:500, y:groundY},
          { type: "sawblade", x:600, y:groundY-150},
          { type: "enemy", x:650, y:groundY-50},
          { type: "enemy", x:700, y:groundY-50},
          { type: "enemy", x:750, y:groundY-50},
          { type: "sawblade", x:800, y:groundY},
          { type: "sawblade", x:950, y:groundY},
          { type: "reward", x:300, y:groundY-50},
          {type: "end", x:2000, y:groundY-50}
        ]
      }
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
