// jscs:disable

var Demon = function Demon(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'demon', 0);
  this.anchor.setTo(.5, .5);
  this.animations.add('down', [0], 0);
  this.animations.add('left', [1], 0);
  this.animations.add('right', [2], 0);
  this.animations.add('up', [3], 0);
  game.physics.arcade.enable(this);
};

Demon.preload = function preload(game) {
  game.load.spritesheet('demon', '/img/demon_4facing.png', 64, 64);
};

Demon.prototype = Object.create(Phaser.Sprite.prototype, {
  constructor: Demon,

});


Demon.prototype.update = function () {
    Phaser.Sprite.prototype.update.call(this);

    // movement
    this.game.physics.arcade.moveToPointer(this, 200);

    // animation
    var vel = this.body.velocity;
    var anim = this.animations;
    if (Math.abs(vel.x) > Math.abs(vel.y)) {
        if (vel.x > 0) {
            anim.play('right');
        } else if (vel.x < 0) {
            anim.play('left');
        }
    } else if (Math.abs(vel.x) < Math.abs(vel.y)) {
        if (vel.y > 0) {
            anim.play('down');
        } else if (vel.y < 0) {
            anim.play('up');
        }
    }
}
