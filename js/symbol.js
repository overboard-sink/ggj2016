// jscs:disable

RitualSymbol = function (game, symbolId) {
  this.game = game;
  this.children = [];
  this.symbolAnimationComplete = false;
  var coords = [];
  var overlayCoords = {};
  var frames;

  switch (symbolId) {
    case 0:
      coords.push({ x: 325, y: 850 });
      coords.push({ x: 167, y: 410 });
      coords.push({ x: 520, y: 685 });
      coords.push({ x: 140, y: 685 });
      coords.push({ x: 480, y: 410 });
      overlayCoords.x = 90;
      overlayCoords.y = 200;
      frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      break;
    case 1:
      coords.push({ x: 164, y: 380 });
      coords.push({ x: 500, y: 500 });
      coords.push({ x: 164, y: 720 });
      overlayCoords.x = 90;
      overlayCoords.y = 200;
      frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
    case 2:
      coords.push({ x: 128, y: 420 });
      coords.push({ x: 510, y: 745 });
      coords.push({ x: 128, y: 745 });
      coords.push({ x: 510, y: 420 });
      overlayCoords.x = 90;
      overlayCoords.y = 200;
      frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
  }
  this.overlay = this.game.add.sprite(
    overlayCoords.x,
    overlayCoords.y,
    'overlay-' + symbolId,
    0);
  var anim = this.overlay.animations.add('default', frames, 12, false);
  var _this = this;
  anim.onComplete.add(function () {
    _this.symbolAnimationComplete = true;
  });
  this.overlay.visible = false;

  var prevTorch;
  for (var i = 0; i < coords.length; i++) {
    var torch = new Torch(game, coords[i].x, coords[i].y);
    torch.prevTorch = prevTorch;

    if (prevTorch) {
      prevTorch.nextTorch = torch;
    }

    this.children.push(torch);
    prevTorch = torch;
  }
};

RitualSymbol.preload = function (game) {
  game.load.spritesheet('overlay-0', '/img/summon_pentagram.png',
    TILE_W * 8, TILE_H * 8);
  game.load.spritesheet('overlay-1', '/img/summon_archer.png',
    TILE_W * 8, TILE_H * 8);
  game.load.spritesheet('overlay-2', '/img/summon_spears.png',
    TILE_W * 8, TILE_H * 8);
}

RitualSymbol.prototype.update = function () {
  if (this.isComplete() && !this.overlay.visible) {
    this.overlay.visible = true;
    this.overlay.animations.play('default');
  }
};

RitualSymbol.prototype.isComplete = function () {
  for (var i = 0; i < this.children.length; i++) {
    if (!this.children[i].lit) {
      return false;
    }
  }
  return true;
}
