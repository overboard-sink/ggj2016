// jscs:disable

RitualSymbol = function (game, symbolId) {
  this.game = game;
  this.children = [];
  var coords = [];
  var overlayCoords = {};

  switch (symbolId) {
    case 0:
      coords.push({ x: 250, y: 250 });
      coords.push({ x: 500, y: 250 });
      coords.push({ x: 375, y: 500 });
      overlayCoords.x = 300;
      overlayCoords.y = 300;
      break;
    case 1:
      coords.push({ x: 250, y: 500 });
      coords.push({ x: 500, y: 500 });
      coords.push({ x: 375, y: 250 });
      overlayCoords.x = 300;
      overlayCoords.y = 300;
      break;
  }
  this.overlay = this.game.add.sprite(overlayCoords.x, overlayCoords.y, 'overlay-' + symbolId, 0);
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
  game.load.image('overlay-0', '/img/overlay.png');
  game.load.image('overlay-1', '/img/overlay-1.png');
}

RitualSymbol.prototype.update = function () {
  if (this.isComplete()) {
    this.overlay.visible = true;
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
