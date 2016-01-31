// jscs:disable

RitualSymbol = function (game, symbolId) {
  this.game = game;
  this.children = [];
  var coords = [];
  var overlayCoords = {};

  switch (symbolId) {
    case 0:
      coords.push({ x: 325, y: 850 });
      coords.push({ x: 167, y: 410 });
      coords.push({ x: 520, y: 685 });
      coords.push({ x: 140, y: 685 });
      coords.push({ x: 480, y: 410 });
      overlayCoords.x = 300;
      overlayCoords.y = 300;
      break;
    case 1:
      coords.push({ x: 164, y: 380 });
      coords.push({ x: 500, y: 500 });
      coords.push({ x: 164, y: 720 });
      overlayCoords.x = 300;
      overlayCoords.y = 300;
      break;
    case 2:
      coords.push({ x: 128, y: 420 });
      coords.push({ x: 510, y: 745 });
      coords.push({ x: 128, y: 745 });
      coords.push({ x: 510, y: 420 });
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
  game.load.image('overlay-2', '/img/overlay-2.png');
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
