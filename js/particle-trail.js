var ParticleTrail = function ParticleTrail(game, source, useBig) {
  var keyName = 'particle'
  if (useBig) {
    keyName += '-big';
  }
  Phaser.Sprite.call(this, game, source.x, source.y, keyName, 0);

  this.source = source;

  this.emitter = this.game.add.emitter(0, 0, 50);

  this.emitter.makeParticles(keyName);

  this.addChild(this.emitter);

  this.emitter.minParticleSpeed.setTo(-20, -15);
  this.emitter.maxParticleSpeed.setTo(-100, 15);
  this.emitter.gravity = 0;
  this.emitter.start(false, 1000, 50);
  this.emitter.on = false;

  this.game.physics.arcade.enable(this);

  this.pulseFrequency = 0;
  
};

ParticleTrail.preload = function preload(game) {
  game.load.image('particle', '/img/particle.png');
  game.load.image('particle-big', '/img/particle-big.png');
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

  this.visible = true;  

  if (this.stopEvent) {
    this.stopEvent.timer.remove(this.stopEvent);
    this.stopEvent = undefined;
  }

  if (this.loopEvent) {
    this.loopEvent.timer.remove(this.loopEvent);
    this.loopEvent = undefined;
  }
  this.emitter.on = true;
  this.stopEvent = this.game.time.events.add(Phaser.Timer.SECOND * 3, this.end, this, true);
};

ParticleTrail.prototype.end = function (loop) {
  this.emitter.on = false;
  this.visible = false;
  if (loop)
    this.loopEvent = this.game.time.events.add(Phaser.Timer.SECOND * this.pulseFrequency, this.begin, this);
};