
// ES6: class Door extends BaseSprite { ... }
var Door = function Door(game, x, y) {
  BaseSprite.call(this, game, x, y, 'door', 0);

  this.setupAnimations();

  this.animations.play('closed');
  this.isOpen = false;

  this.game.physics.arcade.enable(this);
};

Door.preload = function preload(game) {
  game.load.spritesheet('door', '/img/door_animation.png', TILE_W, TILE_H);
};

Door.prototype = Object.create(BaseSprite.prototype);

Door.prototype.constructor = Door;

Door.prototype.setupAnimations = function setupAnimations() {
  this.animations.add('closed', [0], 0, false);
  this.animations.add('open', [1, 2, 3, 4, 5, 6, 7], 12, false);
};

Door.prototype.update = function update() {
  // ES6: super.update();
  BaseSprite.prototype.update.call(this);
};

Door.prototype.open = function open() {
  if (!this.isOpen) {
    this.isOpen = true;
    this.animations.play('open');
  }
};
