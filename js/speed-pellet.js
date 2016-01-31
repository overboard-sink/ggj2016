var SpeedPellet = function SpeedPellet(game, demon) {
  BasePowerup.call(this, game, 'speed-pellet', 0, demon);
};

SpeedPellet.prototype = Object.create(BasePowerup.prototype);

SpeedPellet.prototype.setupAnimations = function() {
  this.animations.add('default', [0], 8, true);
};

SpeedPellet.prototype.activate = function() {
  var oldSpeed = this.demon.walkSpeed;
  this.demon.setWalkSpeed(oldSpeed * 2);
  this.game.time.events.add(5000, function() {
    this.demon.setWalkSpeed(oldSpeed);
  }, this);
};

SpeedPellet.preload = function(game) {
  game.load.spritesheet('speed-pellet', '/img/power_up_1.png', 27, 32);
};
