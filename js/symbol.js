// jscs:disable

RitualSymbol = function (game, symbolId) {
  this.game = game;
  this.children = [];
  var coords = [];
  var overlayCoords = {};
  var frames;

  switch (symbolId) {
    case 0:
      coords.push({ x: 250, y: 250 });
      coords.push({ x: 500, y: 250 });
      coords.push({ x: 375, y: 500 });
      overlayCoords.x = 0;
      overlayCoords.y = 0;
      frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
    case 1:
      coords.push({ x: 250, y: 500 });
      coords.push({ x: 500, y: 500 });
      coords.push({ x: 375, y: 250 });
      overlayCoords.x = 0;
      overlayCoords.y = 0;
      frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
  }
  this.overlay = this.game.add.sprite(
    overlayCoords.x,
    overlayCoords.y,
    'overlay-' + symbolId,
    0);
  this.overlay.animations.add('default', frames, 12, false);
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
