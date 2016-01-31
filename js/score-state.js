var ScoreState = function ScoreState() {
  Phaser.State.call(this);
};

ScoreState.prototype = Object.create(Phaser.State);

ScoreState.prototype.constructor = ScoreState;

ScoreState.prototype.create = function create() {
  Phaser.State.prototype.create.call(this);
  
  this.bkg = this.game.add.image(0, 0, 'score-bkg');

  var _this = this;

  var preTimeout = 250;
  var ghostTime = 2500;
  var finalTimeout = 500;
  var maxCols = 5;
  var offsetX = 200;
  var offsetY = 100;
  var spacingX = 24;
  var spacingY = 24;
  this.canExit = false;

  var i = 0;
  var j = 0;
  var k = 0;
  var time = this.game.difficulty < 10 ? 250 : 100;

  var _this = this;

  function nextGhost() {
    var x = j * spacingX + offsetX;
    var y = k * spacingY + offsetY;

    var spr = this.game.add.sprite(x, y, 'ghost', 0);
    spr.animations.add('default', [0, 1, 2, 3, 4], 10, true);
    spr.animations.play('default');

    i++;
    j++;

    if (j >= maxCols) {
      j = 0;
      k++;
    }

    if (i < this.game.difficulty) {
      this.game.time.events.add(time, nextGhost);
    } else {
      this.game.time.events.add(finalTimeout, function () {
        _this.canExit = true;
      });
    }
  }

  this.game.time.events.add(preTimeout, nextGhost);
};

ScoreState.prototype.update = function update() {
  if (this.canExit && this.game.input.activePointer.isDown)
  {
        this.game.difficulty = 0;
        this.game.state.start('default');
  }
};