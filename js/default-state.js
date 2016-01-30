// jscs:disable

var DefaultState = function DefaultState(symbolId) {
  Phaser.State.call(this);
  this.symbolId = symbolId;
};

DefaultState.prototype = Object.create(Phaser.State.prototype);

DefaultState.prototype.constructor = DefaultState;

DefaultState.prototype.create = function create() {
  this.bkg = this.game.add.image(0, 0, 'bkg');  

  this.isoGroup = this.game.add.group();

  Phaser.State.prototype.create.call(this);

  this.demon = new Demon(this.game, 20, 20);
  
  this.isoGroup.add(this.demon)
  
  this.symbol = new RitualSymbol(this.game, this.symbolId);
  var _isoGroup = this.isoGroup;

  this.symbol.children.forEach(function (child) {
    _isoGroup.add(child);
  });

  this.hintTrail = new ParticleTrail(this.game, 20, 20);
  this.game.world.add(this.hintTrail); this.hintTrail.begin();
  this.hintTrail.setTarget(this.symbol.children[0]);

  this.door = game.add.sprite(80, 0, 'door_vert', 0);
  this.door.alpha = 0.5;
  this.door.open = false;
  this.game.physics.arcade.enable(this.door);
  
  this.testMonk = new MonkChasing(this.game, 120, 120);
  this.isoGroup.add(this.testMonk);
};

DefaultState.prototype.update = function update() {
  Phaser.State.prototype.update.call(this);

  this.symbol.update();

  var _this = this;
  // touching torches
  this.game.physics.arcade.overlap(this.demon, this.symbol.children, function (a, b) {
    if (!b.lit && (b.prevTorch == undefined || b.prevTorch.lit)) {
      b.light();
      if (b.nextTorch) {
        _this.hintTrail.x = b.x + TILE_W;
        _this.hintTrail.y = b.y + TILE_H * 2;
        _this.hintTrail.setTarget(b.nextTorch);
        _this.hintTrail.end();
        _this.hintTrail.begin();
      }
    }
  });

  if (this.symbol.isComplete()) {
    this.door.open = true;
    this.door.alpha = 1.0;
  }

  // exit room
  if (this.door.open) {
    var _this = this;
    this.game.physics.arcade.overlap(this.demon, this.door, function(a, b) {
      if (Math.random() > .5)
        _this.game.state.start('default0');
      else
        _this.game.state.start('default1');
    });
  }

  //Custom sorting
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
