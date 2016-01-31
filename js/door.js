
// ES6: class Door extends BaseSprite { ... }
var Door = function Door(game, x, y, demon) {
  BaseSprite.call(this, game, x, y, 'door', 0);

  this.demon = demon;

  this.setupAnimations();

  this.animations.play('closed');
  this.isOpen = false;

  this.game.physics.arcade.enable(this);
  this.anchor.setTo(.5, .5);
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
  BaseSprite.prototype.update.call(this);

  if (this.isOpen) {
    var _this = this;
    this.game.physics.arcade.overlap(this, this.demon, function() {
      _this.game.difficulty += 1;
      _this.game.state.start('default');
    });
  }
};

Door.prototype.open = function open() {
  if (!this.isOpen) {
    this.isOpen = true;
    this.animations.play('open');
  }
};
