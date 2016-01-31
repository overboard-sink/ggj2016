var Demon = function Demon(game, x, y) {
  BaseSprite.call(this, game, x, y, 'demon', 0);
  this.animations.add('down',  [0,  1,  2,  3,  4,  5,  6,  7],  12);
  this.animations.add('up',    [8,  9,  10, 11, 12, 13, 14, 15], 12);
  this.animations.add('left',  [16, 17, 18, 19, 20, 21, 22, 23], 12);
  this.animations.add('right', [24, 25, 26, 27, 28, 29, 30, 31], 12);
  this.animations.add('dead',  [32, 33, 34, 35, 36, 37, 38], 10, false);
  this.animations.add('idle',  [34, 35, 36, 37], 12);

  this.anchor.setTo(.5, .75);

  game.physics.arcade.enable(this);
  this.body.setSize(70, 75, 0, 20);

  this.rubberbandConst = 0.04;

  this.defaultWalkSpeed = 200;
  this.walkSpeed = this.defaultWalkSpeed;
  this.isVictorious = false;

  this.makeGhosts();
};

Demon.preload = function preload(game) {
  game.load.spritesheet(
    'demon',
    '/img/demon_sheet.png',
    TILE_W * 2,
    TILE_H * 2
  );

  game.load.spritesheet('ghost', '/img/tinyGhost.png', 16, 16);
};

Demon.prototype = Object.create(BaseSprite.prototype);

Demon.prototype.constructor = Demon;

Demon.prototype.update = function() {
  Phaser.Sprite.prototype.update.call(this);

  // movement
  if (this.alive && !this.isDying) {
    if (this.game.physics.arcade.distanceToPointer(this) > 10) {
      this.game.physics.arcade.moveToPointer(this, this.walkSpeed);
      this.faceVelocity();
    } else {
      this.animations.play('idle');
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
  }

  this.updateGhosts();
};

Demon.prototype.kill = function() {
  if (!this.isDying && this.alive) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.isDying = true;
    this.animations.play('dead');
    this.rubberbandConst = -0.08;
    var _this = this;
    this.game.time.events.add(2000, function() {
      BaseSprite.prototype.kill.call(this);
    });
  }
};

Demon.prototype.setWalkSpeed = function(speed) {
  this.walkSpeed = speed;
};

Demon.prototype.makeGhosts = function() {
  // these must be added to the isogroup by the default state
  this.ghosts = [];
  for (var i = 0; i < this.game.difficulty; i++) {
    this.ghosts.push(this.game.make.sprite(this.x, this.y, 'ghost', 0));
    this.ghosts[i].animations.add('default', [0, 1, 2, 3, 4], 12, true);
    this.ghosts[i].animations.play('default');
  }
};

Demon.prototype.updateGhosts = function() {
  // super-lazy rubber-banding effect
  if (this.ghosts.length > 0) {
    this.ghosts[0].x += (this.x - this.ghosts[0].x) * this.rubberbandConst;
    this.ghosts[0].y += (this.y - this.ghosts[0].y) * this.rubberbandConst;
    for (var i = 1; i < this.ghosts.length; i++) {
      this.ghosts[i].x +=
        (this.ghosts[i - 1].x - this.ghosts[i].x) * this.rubberbandConst
        + ((Math.random() - 0.5) * this.rubberbandConst * 2.0);
      this.ghosts[i].y +=
        (this.ghosts[i - 1].y - this.ghosts[i].y) * this.rubberbandConst
        + ((Math.random() - 0.5) * this.rubberbandConst * 2.0);
    }
  }
};
