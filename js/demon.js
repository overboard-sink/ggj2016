// jscs:disable

var Demon = function Demon(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'demon', 0);
  this.animations.add('down', [0], 0);
  this.animations.add('left', [2], 0);
  this.animations.add('right', [3], 0);
  this.animations.add('up', [1], 0);

  this.anchor.setTo(.5, .75);

  game.physics.arcade.enable(this);
  this.body.setSize(70, 75, 0, 20);
};

Demon.preload = function preload(game) {
  game.load.spritesheet(
    'demon',
    '/img/demon_sheet.png',
    TILE_W * 2,
    TILE_H * 2
  );
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
