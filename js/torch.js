var Torch = function Torch(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'torch', 0);
  
  this.game.physics.arcade.enable(this);

  this.lit = false;
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
};