var BasePowerup = function BasePowerup(game, key, frame, demon) {
  BaseSprite.call(this, game, 0, 0, key, frame);
  this.game.physics.arcade.enable(this);
  this.demon = demon;
  this.kill();
};

BasePowerup.prototype = Object.create(BaseSprite.prototype);

BasePowerup.prototype.constructor = BasePowerup;

/**
 * Calls .reset() with a random x, y.
 *
 * The only purpose of this method is so that I can have a way of avoiding
 * having to override .reset(x, y) without having to generate x, y from
 * inside it.
 */
BasePowerup.prototype.resetRandom = function() {
  console.log('spawned powerup');
  var tries = 0;
  do {
    var x = Math.random() * GAME_W;
    var y = Math.random() * GAME_H;

    tries++;
    if (tries > 500) {
      console.log('!!!');
      break;
    }
  } while (this.game.physics.arcade.distanceBetween(this, this.demon) < 400);
  this.reset(x, y);
},

/**
 * Standard Phaser.io method to reset a res
 */
BasePowerup.prototype.reset = function(x, y) {
  BaseSprite.prototype.reset.call(this, x, y);

  this.animations.play('default');
};

BasePowerup.prototype.update = function() {
  if (this.alive && game.physics.arcade.overlap(this, this.demon)) {
    this.activate();
    this.kill();
  }
};

BasePowerup.prototype.activate = function() {
  console.log('Powerup activated.');
};
