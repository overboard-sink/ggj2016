var MonkA = function MonkA(game, x, y) {
  MonkBase.call(this, game, x, y, 'monk', 0);
};

MonkA.prototype = Object.create(MonkBase.prototype);

MonkA.prototype.constructor = MonkA;
