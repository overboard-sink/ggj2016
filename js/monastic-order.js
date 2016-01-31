var MonasticOrder = function MonasticOrder(game, difficulty, demon, door) {
  this.game = game;
  this.children = [];
  var numMonks = difficulty < 7 ? difficulty * 2 : difficulty * 3;
  
  for (var i = 0; i < numMonks; i++) {
    var monk;
    var x, y;
    do {
      x = Math.random() * GAME_W;
      y = Math.random() * GAME_H;
    } while (this.game.physics.arcade.distanceToXY(demon, x, y) < 400 &&
             this.game.physics.arcade.distanceToXY(door, x, y) < 150);
    
    switch ((Math.random() * 3) | 0) {
      case 0:
        monk = new MonkStanding(game, x, y, demon);
        break;

      case 1:
        monk = new MonkWalking(game, x, y, demon);
        break;

      case 2:
        monk = new MonkChasing(game, x, y, demon);
        break;
    }

    this.children.push(monk);
  }
};

MonasticOrder.prototype = Object.create(Object.prototype);

MonasticOrder.prototype.constructor = MonasticOrder;

MonasticOrder.prototype.update = function update() {
  // TODO: Do we need this function?
};
