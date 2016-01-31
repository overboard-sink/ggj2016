var MonasticOrder = function MonasticOrder(game, difficulty, demon, door) {
  this.game = game;
  this.children = [];
  var numMonks = difficulty < 7 ? difficulty * 2 : difficulty * 3;

  var baseChance = 0;

  var standingChance = 1 - Math.max(difficulty * .10, .95);

  baseChance += standingChance;

  var walkingChance = baseChance + 1 - Math.max(difficulty * .10, .95);

  baseChance += walkingChance;

  for (var i = 0; i < numMonks; i++) {
    var monk;
    var x, y;
    do {
      x = Math.random() * GAME_W;
      y = Math.random() * GAME_H;
    } while (this.game.physics.arcade.distanceToXY(demon, x, y) < 400 &&
             this.game.physics.arcade.distanceToXY(door, x, y) < 150);

    var dieRoll = Math.random();

    if (dieRoll < standingChance)
      monk = new MonkStanding(game, x, y, demon);
    else if (dieRoll < walkingChance)
      monk = new MonkWalking(game, x, y, demon);
    else
      monk = new MonkChasing(game, x, y, demon);


    this.children.push(monk);
  }
};

MonasticOrder.prototype = Object.create(Object.prototype);

MonasticOrder.prototype.constructor = MonasticOrder;

MonasticOrder.prototype.update = function update() {
  // TODO: Do we need this function?
};
