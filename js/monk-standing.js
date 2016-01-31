var MonkStanding = function MonkStanding(game, x, y, demon) {
  MonkBase.call(this, game, x, y, 'monk', 0, demon);
};

MonkStanding.prototype = Object.create(MonkBase.prototype);

MonkStanding.prototype.constructor = MonkStanding;
