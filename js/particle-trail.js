var ParticleTrail = function ParticleTrail(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'particle', 0);

  this.emitter = this.game.add.emitter(0, 0, 50);

  this.emitter.makeParticles('particle');

  this.addChild(this.emitter);

  this.emitter.minParticleSpeed.setTo(-20, -15);
  this.emitter.maxParticleSpeed.setTo(-100, 15);
  this.emitter.gravity = 0;

  this.game.physics.arcade.enable(this);
  
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

ParticleTrail.prototype.setTarget = function (target) {
  this.rotation = this.game.physics.arcade.moveToObject(this, target, 0, 5000);
}

ParticleTrail.prototype.begin = function () {
  this.emitter.start(false, 1000, 50);
  this.visible = true;  

  if (this.stopEvent)
    this.stopEvent.timer.remove(this.timer);

  this.stopEvent = this.game.time.events.add(Phaser.Timer.SECOND * 5, this.end, this);
};

ParticleTrail.prototype.end = function () {
  this.emitter.kill();
  this.visible = false;
};