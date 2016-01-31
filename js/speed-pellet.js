var SpeedPellet = function SpeedPellet(game, demon) {
  BasePowerup.call(this, game, 'speed-pellet', 0, demon);
};

SpeedPellet.preload = function(game) {
  game.load.spritesheet('speed-pellet', '/ggj2016/img/power_up_1.png', 27, 32);
};

SpeedPellet.prototype = Object.create(BasePowerup.prototype);

SpeedPellet.prototype.activate = function() {
  this.demon.setWalkSpeed(this.demon.defaultWalkSpeed * 2);
};

SpeedPellet.prototype.deactivate = function() {
  this.demon.setWalkSpeed(this.demon.defaultWalkSpeed);
};
