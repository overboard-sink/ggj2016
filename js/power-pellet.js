var PowerPellet = function PowerPellet(game, demon) {
  BasePowerup.call(this, game, 'power-pellet', 0, demon);
};

PowerPellet.preload = function(game) {
  game.load.spritesheet('power-pellet', '/img/power_up_2.png', 27, 32);
};

PowerPellet.prototype = Object.create(BasePowerup.prototype);

// TODO: .activate()

// TODO: .deactive()
