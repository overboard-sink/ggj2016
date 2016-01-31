// jscs:disable

var MonkChasing = function MonkChasing(game, x, y, demon) {
  MonkBase.call(this, game, x, y, 'monk', 0, demon);

  this.fleeSpeed = 200;
  this.fleeDistance = 100;
  this.chaseSpeed = 100;

  this.fleeing = false;

  this.screamSfx = this.game.add.audio('scream');
};

MonkChasing.prototype = Object.create(MonkBase.prototype);

MonkChasing.prototype.constructor = MonkStanding;

MonkChasing.prototype.update = function update() {
  MonkBase.prototype.update.call(this);

  //Our monk runs away when the demon charges him
  if (!this.fleeing) {
    //var _demon = this.demon;
    if (this.game.physics.arcade.distanceBetween(this, this.demon) < this.fleeDistance) {
      if (this.demon.facing == Phaser.LEFT &&
          this.facing == Phaser.RIGHT) {
        this.fleeing = true;
      } else if (this.demon.facing == Phaser.RIGHT &&
          this.facing == Phaser.LEFT) {
        this.fleeing = true;
      } else if (this.demon.facing == Phaser.UP &&
          this.facing == Phaser.DOWN) {
        this.fleeing = true;
      } else if (this.demon.facing == Phaser.DOWN &&
         this.facing == Phaser.UP) {
        this.fleeing = true;
      }
      if (this.fleeing) {
        var _this = this;
        this.screamSfx.play();
        this.game.time.events.add(1000, function () { _this.fleeing = false }, this);

        this.fleeDirection = { x: this.x + this.demon.body.velocity.x, y: this.y + this.demon.body.velocity.y }
      }
    }
  }

  if (this.fleeing) {
    this.game.physics.arcade.moveToXY(this, this.fleeDirection.x, this.fleeDirection.y, this.fleeSpeed);
  } else {
    this.game.physics.arcade.moveToXY(this, this.demon.x, this.demon.y, this.chaseSpeed);
  }

};
