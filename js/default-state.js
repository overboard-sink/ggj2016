// jscs:disable

var DefaultState = function DefaultState() {
  Phaser.State.call(this);
};

DefaultState.prototype = Object.create(Phaser.State.prototype);

DefaultState.prototype.constructor = DefaultState;

DefaultState.prototype.create = function create() {
  Phaser.State.prototype.create.call(this);

  this.bkg = this.game.add.image(0, 0, 'bkg');

  // Iso group is used to ensure sprites are drawn with correct sort order.
  this.isoGroup = this.game.add.group();

  //This function handles hydrating the demon, symbol, monasticOrder, and door properties
  this.game.levelGenerator.generate(this, this.game.difficulty, this.isoGroup);

  // add the demon's ghosts to depth map
  this.demon.ghosts.forEach(function (ghost) {
    this.isoGroup.add(ghost);
  }, this);

  // pre-generate powerups
  // must happen after hydration because we need references to the demon
  this.powerups = [
    new SpeedPellet(this.game, this.demon),
    new PowerPellet(this.game, this.demon),
  ];
  this.powerups.forEach(function (powerup) {
    this.isoGroup.add(powerup);
  }, this);
  this.lastPowerup = null;

  this.powerupTimer = this.game.time.events.loop(6000, this.spawnPowerup, this);
};

DefaultState.prototype.update = function update() {
  Phaser.State.prototype.update.call(this);

  var _this = this;

  this.symbol.update();

  // touching torches
  this.game.physics.arcade.overlap(this.demon, this.symbol.children, function (demon, torch) {
    if (!torch.lit && (torch.prevTorch == undefined || torch.prevTorch.lit)) {
      torch.light();
      if (torch.nextTorch) {
        _this.hintTrail.resetTarget(torch.nextTorch);
      } else {
        _this.hintTrail.resetTarget(_this.door);
      }
    }
  });

  // open door
  if (this.symbol.isComplete()) {
    // NOTE: .open() is idempotent
    this.door.open();
  }

  // demon gets hit by monks
  this.game.physics.arcade.overlap(this.demon, this.monasticOrder.children,
  function (demon, monk) {
    if (_this.demon.alive) {
      if (_this.demon.starPower) {
        monk.kill();
      } else {
        _this.demon.kill();
        _this.demon.visible = true;
        _this.game.time.events.add(2500, function () {
          _this.game.state.start('score');
        });
      }
    }
  });

  // exit room
  if (this.door.isOpen) {
    this.game.physics.arcade.overlap(this.demon, this.door, function () {
      _this.game.difficulty += 1;
      _this.game.state.start('default');
    });
  }

  // Custom sorting
  this.isoGroup.children.forEach(function (child) {
    child.sortValue = child.y + child.height - (child.anchor.y * child.height);
  });

  this.isoGroup.sort('sortValue', Phaser.Group.SORT_ASCENDING);
};

var DRAW_DEBUG_BOXES = false;

DefaultState.prototype.render = function render() {
  Phaser.State.prototype.render.call(this);

  if (DRAW_DEBUG_BOXES) {

    //game.debug.text('Demon z-depth: ' + this.demon.z + ' ... Demon y-value: ' + this.demon.y, 10, 20);
    //game.debug.text('Torch1 z-depth: ' + this.symbol.children[0].z + ' ... y-value: ' + this.symbol.children[0].y, 10, 40);
    //game.debug.text('Torch2 z-depth: ' + this.symbol.children[1].z + ' ... y-value: ' + this.symbol.children[1].y, 10, 60);
    //game.debug.text('Torch3 z-depth: ' + this.symbol.children[2].z + ' ... y-value: ' + this.symbol.children[2].y, 10, 80);
    //game.debug.text('Monk z-depth: ' + this.testMonk.z + ' ... Monk y-value: ' + this.testMonk.y, 10, 100);
    //game.debug.text('Background z-depth: ' + this.bkg.z, 10, 40);


    this.game.debug.body(this.demon);
    this.game.debug.body(this.door);
    this.symbol.children.forEach(function (child) {
      child &&
      this.game.debug.body(child);
    });

    this.monasticOrder.children.forEach(function (child) {
      child &&
      this.game.debug.body(child);
    });

  }

};

DefaultState.prototype.destroy = function destroy() {
  Phaser.Sprite.prototype.destroy.apply(this, arguments);
  this.game.time.events.remove(this.powerupTimer);
};

DefaultState.prototype.spawnPowerup = function () {
  console.log('Trying to spawn powerup...');
  //if (Math.random() > .5 && (!this.lastPowerup || !this.lastPowerup.alive)) {
    var i = 1;//(this.powerups.length * Math.random()) | 0;
    this.lastPowerup = this.powerups[i];
    this.lastPowerup.resetRandom();
  //}
};
