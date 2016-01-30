var MonkChasing = function MonkChasing(game, x, y) {
  MonkBase.call(this, game, x, y, 'monk', 0);

  this.walking = false;

  this.walkTimer = this.game.time.events.loop(1000, this.changeWalk, this);
};

MonkChasing.prototype = Object.create(MonkBase.prototype);

MonkChasing.prototype.constructor = MonkStanding;

MonkChasing.prototype.update = function update() {
  MonkBase.prototype.update.call(this);
};

MonkChasing.prototype.changeWalk = function changeWalk() {
  this.walking = !this.walking;

  var vel = this.body.velocity;
  if (this.walking) {
    switch ((Math.random() * 4) | 0) {
      case 0:
        vel.x = 0;
        vel.y = 60;
        break;

      case 1:
        vel.x = -60;
        vel.y = 0;
        break;

      case 2:
        vel.x = 0;
        vel.y = -60;
        break;

      case 3:
        vel.x = 60;
        vel.y = 0;
        break;
    }
  } else {
    vel.x = 0;
    vel.y = 0;
  }
};
