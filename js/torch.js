var TORCH_OFF = 'TORCH_OFF';
var TORCH_EXPLOSION = 'TORCH_EXPLOSION';
var TORCH_ON = 'TORCH_ON';

var Torch = function Torch(game, x, y) {
  BaseSprite.call(this, game, x, y, 'torch', 0);

  this.setupAnimations();

  this.game.physics.arcade.enable(this);
  this.body.setSize(80, 50, 26, 212);

  this.lit = false;

  this.emitter = this.game.add.emitter(16, 0, 50);
  this.emitter.makeParticles('particle');
  this.addChild(this.emitter);
  this.emitter.minParticleSpeed.setTo(-15, -20);
  this.emitter.maxParticleSpeed.setTo(15, -80);
  this.emitter.gravity = 0;

};

Torch.preload = function preload(game) {
  game.load.spritesheet(
    'torch', '/img/torch.png',
    TILE_W * 2,
    TILE_H * 4
  );
};

Torch.prototype = Object.create(BaseSprite.prototype);

Torch.prototype.constructor = Torch;

Torch.prototype.setupAnimations = function setupAnimations() {
  this.animObjs = {};

  this.animObjs[TORCH_OFF]
    = this.animations.add(TORCH_OFF, [0], 0);

  this.animObjs[TORCH_EXPLOSION]
    = this.animations.add(TORCH_EXPLOSION, [1, 2, 3, 4, 5, 6, 7, 8, 9], 20);

  this.animObjs[TORCH_ON]
    = this.animations.add(TORCH_ON, [10, 11, 12, 13, 14, 15], 20, true);

  var _this = this;
  this.animObjs[TORCH_EXPLOSION].onComplete.add(function() {
    _this.animations.play(TORCH_ON);
  });
};

Torch.prototype.update = function update() {
  BaseSprite.prototype.update.call(this);
};

Torch.prototype.light = function light() {
  this.animations.play(TORCH_EXPLOSION);
  this.lit = true;

  this.emitter.start(false, 1000, 50);
};
