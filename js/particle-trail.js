var ParticleTrail = function ParticleTrail(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'torch', 0);

  this.game.physics.arcade.enable(this);

  this.lit = false;
};

ParticleTrail.preload = function preload(game) {
  game.load.image('particle', '/img/particle.png');
};

ParticleTrail.prototype = Object.create(Phaser.Sprite.prototype, {
  constructor: ParticleTrail,

});

ParticleTrail.prototype.update = function () {
  Phaser.Sprite.prototype.update.call(this);
};