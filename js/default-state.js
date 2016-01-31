// jscs:disable

var DefaultState = function DefaultState(symbolId) {
  Phaser.State.call(this);
  this.symbolId = symbolId;
};

DefaultState.prototype = Object.create(Phaser.State.prototype);

DefaultState.prototype.constructor = DefaultState;

DefaultState.prototype.create = function create() {
  Phaser.State.prototype.create.call(this);

  this.bkg = this.game.add.image(0, 0, 'bkg');

  // Iso group is used to ensure sprites are drawn with correct sort order.
  this.isoGroup = this.game.add.group();

  this.demon = new Demon(this.game, 20, 20);
  this.isoGroup.add(this.demon);

  this.symbol = new RitualSymbol(this.game, this.symbolId);

  this.symbol.children.forEach(function (child) {
    this.isoGroup.add(child);
  }, this);

  this.hintTrail = new ParticleTrail(this.game, 20, 20);
  this.game.world.add(this.hintTrail); this.hintTrail.begin();
  this.hintTrail.setTarget(this.symbol.children[0]);

  this.door = new Door(this.game, 80, 0);
  this.isoGroup.add(this.demon);
  this.game.world.add(this.door);

  this.monasticOrder = new MonasticOrder(this.game, 4);
  this.monasticOrder.children.forEach(function (monk) {
    this.isoGroup.add(monk);
  }, this);
};

DefaultState.prototype.update = function update() {
  Phaser.State.prototype.update.call(this);

  var _this = this;

  this.symbol.update();

  // touching torches
  this.game.physics.arcade.overlap(this.demon, this.symbol.children, function (demon, torch) {
    if (!demon.lit && (torch.prevTorch == undefined || torch.prevTorch.lit)) {
      torch.light();
      if (torch.nextTorch) {
        _this.hintTrail.x = torch.x;
        _this.hintTrail.y = torch.y;
        _this.hintTrail.setTarget(torch.nextTorch);
        _this.hintTrail.end();
        _this.hintTrail.begin();
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
      _this.demon.kill();
      _this.demon.visible = true;
      _this.game.time.events.add(1500, function () {
        _this.game.state.restart();
      });
    }
  });

  // exit room
  if (this.door.isOpen) {
    this.game.physics.arcade.overlap(this.demon, this.door, function() {
      if (Math.random() > .5)
        _this.game.state.start('default0');
      else
        _this.game.state.start('default1');
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

    game.debug.text('Demon z-depth: ' + this.demon.z + ' ... Demon y-value: ' + this.demon.y, 10, 20);
    //game.debug.text('Torch1 z-depth: ' + this.symbol.children[0].z + ' ... y-value: ' + this.symbol.children[0].y, 10, 40);
    //game.debug.text('Torch2 z-depth: ' + this.symbol.children[1].z + ' ... y-value: ' + this.symbol.children[1].y, 10, 60);
    //game.debug.text('Torch3 z-depth: ' + this.symbol.children[2].z + ' ... y-value: ' + this.symbol.children[2].y, 10, 80);
    //game.debug.text('Monk z-depth: ' + this.testMonk.z + ' ... Monk y-value: ' + this.testMonk.y, 10, 100);
    game.debug.text('Background z-depth: ' + this.bkg.z, 10, 40);


    this.game.debug.body(this.demon);
    this.symbol.children.forEach(function(child) {
      child &&
      this.game.debug.body(child);
    });
    this.game.debug.body(this.testMonk);
  }
};
