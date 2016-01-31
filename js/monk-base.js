var MonkBase = function MonkBase(game, x, y, key, frame, demon) {
  BaseSprite.call(this, game, x, y, key, frame);

  this.setupAnimations();

  this.animations.play('down');

  this.game.physics.arcade.enable(this);
  
  this.demon = demon;
};

MonkBase.preload = function preload(game) {
  // TODO: move to base
  game.load.spritesheet('monk', '/img/monk_walk.png', TILE_W, TILE_H);
};

MonkBase.prototype = Object.create(BaseSprite.prototype);

MonkBase.prototype.constructor = MonkBase;

MonkBase.prototype.setupAnimations = function setupAnimations() {
  this.animations.add('down', [0, 1, 2, 3], 8, true);
  this.animations.add('left', [4, 5, 6, 7], 8, true);
  this.animations.add('up', [8, 9, 10, 11], 8, true);
  this.animations.add('right', [12, 13, 14, 15], 8, true);
};

MonkBase.prototype.update = function update() {
  BaseSprite.prototype.update.call(this);

  this.faceVelocity();
};
