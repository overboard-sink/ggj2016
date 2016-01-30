var MonkWalking = function MonkWalking(game, x, y) {
  MonkBase.call(this, game, x, y, 'monk', 0);
};

MonkWalking.prototype = Object.create(MonkBase.prototype);

MonkWalking.prototype.constructor = MonkStanding;
