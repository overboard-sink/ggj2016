var Torch = function Torch(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'torch', 0);
  
  this.game.physics.arcade.enable(this);

  this.lit = false;

  this.emitter = this.game.add.emitter(16, 0, 50);

  this.emitter.makeParticles('particle');

  this.addChild(this.emitter);

  this.emitter.minParticleSpeed.setTo(-15, -20);
  this.emitter.maxParticleSpeed.setTo(15, -80);
  this.emitter.gravity = 0;
  
};

Torch.preload = function preload(game) {
    game.load.spritesheet('torch', '/img/torch.png', 32, 32);
};

Torch.prototype = Object.create(Phaser.Sprite.prototype, {
  constructor: Torch,

});


Torch.prototype.update = function () {
    Phaser.Sprite.prototype.update.call(this);
};

Torch.prototype.light = function () {
    this.frame = 1;
    this.lit = true;

    this.emitter.start(false, 1000, 50);
};