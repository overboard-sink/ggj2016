var IntroState = function IntroState() {
  Phaser.State.call(this);
};

IntroState.prototype = Object.create(Phaser.State);

IntroState.prototype.constructor = IntroState;

IntroState.prototype.create = function create() {
  Phaser.State.prototype.create.call(this);

  this.game.add.image(0, 0, 'intro');  
};

IntroState.prototype.update = function update() {
  if (this.game.input.activePointer.isDown)
  {
    if (this.game.physics.arcade.distanceToXY(this.game.input.activePointer, 315, 683) < 232)
      this.game.state.start('default');
  }
};
