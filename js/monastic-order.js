var MonasticOrder = function MonasticOrder(game, difficulty, demon, door) {
  this.game = game;
  this.children = [];

  var numMonks = Math.min(Math.floor(difficulty * 1.3), 15);
  
  var standingChance = .25;//1 - Math.min(difficulty * .10, .65);
  
  var walkingChance = .25;//standingChance + (1 - Math.min(difficulty * .2, .65));

  var chasingChance = .25;//walkingChance + (1 - Math.min(difficulty * .2, .85));

  for (var i = 0; i < numMonks; i++) {
    var monk;
    var x, y;
    do {
      x = Math.random() * GAME_W;
      y = Math.random() * GAME_H;
    } while (this.game.physics.arcade.distanceToXY(demon, x, y) < 400 ||
             this.game.physics.arcade.distanceToXY(door, x, y) < 250);

    var dieRoll = Math.random();

    if (dieRoll < standingChance || i < 1) //First monk is always standing
      monk = new MonkStanding(game, x, y, demon);
    else if (dieRoll < walkingChance)
      monk = new MonkWalking(game, x, y, demon);
    else if (dieRoll < chasingChance)
      monk = new MonkChasing(game, x, y, demon);
    else
      monk = new MonkRamming(game, x, y, demon);


    this.children.push(monk);
  }
};

MonasticOrder.prototype = Object.create(Object.prototype);

MonasticOrder.prototype.constructor = MonasticOrder;

MonasticOrder.prototype.update = function update() {
  // TODO: Do we need this function?
};
