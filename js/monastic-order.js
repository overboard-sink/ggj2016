var MonasticOrder = function MonasticOrder(game, numMonks, demon) {
  this.game = game;
  this.children = [];

  for (var i = 0; i < numMonks; i++) {
    var monk;

    // TODO: add a margin
    var x = Math.random() * GAME_W;
    var y = Math.random() * GAME_H;

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
