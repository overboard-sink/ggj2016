var ParticleTrail = function ParticleTrail(game, source) {
  Phaser.Sprite.call(this, game, source.x, source.y, 'particle', 0);

  this.source = source;

  this.emitter = this.game.add.emitter(0, 0, 50);

  this.emitter.makeParticles('particle');

  this.addChild(this.emitter);

  this.emitter.minParticleSpeed.setTo(-20, -15);
  this.emitter.maxParticleSpeed.setTo(-100, 15);
  this.emitter.gravity = 0;

  this.game.physics.arcade.enable(this);

  this.pulseFrequency = 0;
  
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

ParticleTrail.prototype.resetTarget = function (target) {
  this.end(false);
  
  this.target = target;
  this.begin();
  
}

ParticleTrail.prototype.begin = function () {
  this.x = this.source.x;
  this.y = this.source.y;

  this.rotation = this.game.physics.arcade.moveToXY(this, this.target.x, this.target.y - 125, 0, 3000);

  this.emitter.start(false, 1000, 50);
  this.visible = true;  

  if (this.stopEvent) {
    this.stopEvent.timer.remove(this.stopEvent);
    this.stopEvent = undefined;
  }

  if (this.loopEvent) {
    this.loopEvent.timer.remove(this.loopEvent);
    this.loopEvent = undefined;
  }

  this.stopEvent = this.game.time.events.add(Phaser.Timer.SECOND * 3, this.end, this, true);
};

ParticleTrail.prototype.end = function (loop) {
  this.emitter.kill();
  this.visible = false;
  if (loop)
    this.loopEvent = this.game.time.events.add(Phaser.Timer.SECOND * this.pulseFrequency, this.begin, this);
};