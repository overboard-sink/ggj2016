// jscs:disable

var Demon = function Demon(game, x, y) {
  BaseSprite.call(this, game, x, y, 'demon', 0);
  this.animations.add('down',  [0,  1,  2,  3,  4,  5,  6,  7],  12);
  this.animations.add('up',    [8,  9,  10, 11, 12, 13, 14, 15], 12);
  this.animations.add('left',  [16, 17, 18, 19, 20, 21, 22, 23], 12);
  this.animations.add('right', [24, 25, 26, 27, 28, 29, 30, 31], 12);
  this.animations.add('dead',  [32], 0.5);

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

Demon.prototype = Object.create(BaseSprite.prototype);

Demon.prototype.constructor = Demon;

Demon.prototype.update = function () {
  Phaser.Sprite.prototype.update.call(this);

  // movement
  this.game.physics.arcade.moveToPointer(this, 200);

  if (this.alive) {
    if (this.body.velocity.x || this.body.velocity.y) {
      this.faceVelocity();
    }
  }
}

Demon.prototype.kill = function () {
  BaseSprite.prototype.kill.call(this);
  this.animations.play('dead');
};
