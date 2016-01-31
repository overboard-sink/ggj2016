var MonkBase = function MonkBase(game, x, y, key, frame, demon) {
  if (this instanceof MonkRamming) {
    this.deathAnimation = game.add.sprite(0, 0, 'monk-rammer-death', 0);
  } else {
    this.deathAnimation = game.add.sprite(0, 0, 'monk-death', 0);
  }
  this.deathAnimation.visible = false;
  this.deathAnimation.anchor.set(.5, .875);

  BaseSprite.call(this, game, x, y, key, frame);

  this.animations.play('down');

  this.game.physics.arcade.enable(this);
  
  this.demon = demon;
  
  this.anchor.setTo(.5, .75);

};

MonkBase.preload = function preload(game) {
  // TODO: move to base
  game.load.spritesheet('monk', '/img/monk_walk.png', TILE_W, TILE_H);
  game.load.spritesheet('monk-rammer', '/img/monk_attack_walk.png', TILE_W, TILE_H);
  game.load.spritesheet('monk-death', '/img/monk_explode.png', TILE_W * 2, TILE_H * 2);
  game.load.spritesheet('monk-rammer-death', '/img/monk_attack_explode.png', TILE_W * 2, TILE_H * 2);
};

MonkBase.prototype = Object.create(BaseSprite.prototype);

MonkBase.prototype.constructor = MonkBase;

MonkBase.prototype.setupAnimations = function setupAnimations() {
  this.animations.add('down', [0, 1, 2, 3], 8, true);
  this.animations.add('left', [4, 5, 6, 7], 8, true);
  this.animations.add('up', [8, 9, 10, 11], 8, true);
  this.animations.add('right', [12, 13, 14, 15], 8, true);

  var deathAnim = this.deathAnimation.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, false);
  var _this = this;
  deathAnim.onComplete.add(function () {
    _this.deathAnimation.kill();
  });
};

MonkBase.prototype.update = function update() {
  BaseSprite.prototype.update.call(this);

  this.faceVelocity();
};

MonkBase.prototype.kill = function kill() {
  BaseSprite.prototype.kill.call(this);

  this.deathAnimation.x = this.x;
  this.deathAnimation.y = this.y;
  this.deathAnimation.visible = true;
  this.deathAnimation.play('explode');  
};
