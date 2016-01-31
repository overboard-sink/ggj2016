var SpeedPellet = function SpeedPellet(game, demon) {
  BasePowerup.call(this, game, 'speed-pellet', 0, demon);
};

SpeedPellet.prototype = Object.create(BasePowerup.prototype);

SpeedPellet.prototype.setupAnimations = function() {
  this.animations.add('default', [0], 8, true);
};

SpeedPellet.prototype.activate = function() {
  this.demon.setWalkSpeed(this.demon.defaultWalkSpeed * 2);
  this.game.time.events.add(5000, function() {
    this.demon.setWalkSpeed(this.demon.defaultWalkSpeed);
  }, this);
};

SpeedPellet.preload = function(game) {
  game.load.spritesheet('speed-pellet', '/img/power_up_1.png', 27, 32);
};
