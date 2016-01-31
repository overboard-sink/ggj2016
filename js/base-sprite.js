var BaseSprite = function BaseSprite(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.effectTime = 3000;
  this.setupAnimations && this.setupAnimations();
};

BaseSprite.prototype = Object.create(Phaser.Sprite.prototype);

BaseSprite.prototype.constructor = BaseSprite;

/**
 * Cause the sprite to face in a direction based on current velocity.
 *
 * The sprite must have both a physics body and the animations
 * 'up', 'right', 'left', and 'down'.
 */
BaseSprite.prototype.faceVelocity = function faceVelocity() {
  var vel = this.body.velocity;
  var anim = this.animations;
  if (Math.abs(vel.x) > Math.abs(vel.y)) {
    if (vel.x > 0) {
      anim.play('right');
      this.facing = Phaser.RIGHT;
    } else if (vel.x < 0) {
      anim.play('left');
      this.facing = Phaser.LEFT;
    }
  } else if (Math.abs(vel.x) < Math.abs(vel.y)) {
    if (vel.y > 0) {
      anim.play('down');
      this.facing = Phaser.DOWN;
    } else if (vel.y < 0) {
      anim.play('up');
      this.facing = Phaser.UP;
    }
  }
};
