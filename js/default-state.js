var DefaultState = function DefaultState(symbolId) {
  Phaser.State.call(this);
  this.symbolId = symbolId;
};

DefaultState.prototype = Object.create(Phaser.State.prototype);

DefaultState.prototype.constructor = DefaultState;

DefaultState.prototype.create = function create() {
  Phaser.State.prototype.create.call(this);
  this.demon = new Demon(this.game, 20, 20);
  this.game.world.add(this.demon);

  this.symbol = new RitualSymbol(this.game, this.symbolId);

  this.door = game.add.sprite(80, 0, 'door_vert', 0);
  this.door.alpha = 0.5;
  this.door.open = false;
  this.game.physics.arcade.enable(this.door);
};

DefaultState.prototype.update = function update() {
  Phaser.State.prototype.update.call(this);

  // touching torches
  this.game.physics.arcade.overlap(this.demon, this.symbol, function(a, b) {
    b.light();
  });

  if (this.symbol.isComplete()) {
    this.door.open = true;
    this.door.alpha = 1.0;
  }

  // exit room
  if (this.door.open) {
    var _this = this;
    this.game.physics.arcade.overlap(this.demon, this.door, function (a, b) {
      if (Math.random() > .5)
        _this.game.state.start('default0');
      else
        _this.game.state.start('default1');
    });
  }
};
