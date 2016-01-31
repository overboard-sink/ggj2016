var MonkWalking = function MonkWalking(game, x, y, demon) {
  MonkBase.call(this, game, x, y, 'monk', 0, demon);

  this.walking = false;

  this.walkTimer = this.game.time.events.loop(1000, this.changeWalk, this);
};

MonkWalking.prototype = Object.create(MonkBase.prototype);

MonkWalking.prototype.constructor = MonkStanding;

MonkWalking.prototype.update = function update() {
  MonkBase.prototype.update.call(this);
};

MonkWalking.prototype.changeWalk = function changeWalk() {
  this.walking = !this.walking;

  // TODO: Don't walk outside the bounds
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
