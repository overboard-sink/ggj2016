var ScoreState = function ScoreState() {
  Phaser.State.call(this);
};

ScoreState.prototype = Object.create(Phaser.State);

ScoreState.prototype.constructor = ScoreState;

ScoreState.prototype.create = function create() {
  Phaser.State.prototype.create.call(this);

  var _this = this;

  var displayTime = 4000;
  var ghostTime = 2000;
  var maxCols = 5;
  var offsetX = 200;
  var offsetY = 100;
  var spacingX = 24;
  var spacingY = 24;

  this.game.difficulty = 20;

  var i = 0;
  var j = 0;
  var k = 0;
  var time = (ghostTime / this.game.difficulty) | 0;

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
    }
  }

  this.game.time.events.add(time, nextGhost);

  this.game.time.events.add(displayTime, function() {
    this.game.state.start('default');
  });
};
