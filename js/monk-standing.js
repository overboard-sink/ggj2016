var MonkStanding = function MonkStanding(game, x, y) {
  MonkBase.call(this, game, x, y, 'monk', 0);
};

MonkStanding.prototype = Object.create(MonkBase.prototype);

MonkStanding.prototype.constructor = MonkStanding;
