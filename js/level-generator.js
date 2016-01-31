// jscs:disable

var LevelGenerator = function LevelGenerator(game) {
  this.game = game;
};

LevelGenerator.prototype = Object.create(Object.prototype);

/**
 * Generate contents for the given level ID in the givne world.
 * Hint: the 'group' is normally the world.
 */
LevelGenerator.prototype.generate = function generate(state, difficulty, group) {
  state.demon = this.genDemon(difficulty);
  state.symbol = this.genConstellation(difficulty);
  state.door = this.genDoor(difficulty);
  state.monasticOrder = this.genMonks(difficulty, state.demon, state.door);

  state.symbol.children.forEach(function (child) {
    group.add(child);
  }, state);

  group.add(state.demon);

  group.add(state.door);

  state.monasticOrder.children.forEach(function (monk) {
    group.add(monk);
  }, state);

  state.hintTrail = this.genHintTrail(difficulty, state.demon, state.symbol);

};

LevelGenerator.prototype.genConstellation = function generate(difficulty) {
  return new RitualSymbol(this.game, Math.random() > .5 ? 0 : 1);
};

LevelGenerator.prototype.genHintTrail = function genHintTrail(difficulty, demon, symbol) {
  var trail = new ParticleTrail(this.game, demon);
  this.game.world.add(trail);

  trail.pulseFrequency = difficulty < 10 ? difficulty : 10;

  trail.resetTarget(symbol.children[0]);

  return trail;
};

LevelGenerator.prototype.genMonks = function genMonks(difficulty, demon, door) {
  return new MonasticOrder(this.game, difficulty, demon, door);
};

LevelGenerator.prototype.genDemon = function genDemon(difficulty) {
  return new Demon(this.game, Math.random() * GAME_W, GAME_H - 64);
};

LevelGenerator.prototype.genDoor = function genDoor(difficulty) {
  return new Door(this.game, GAME_W / 2, 0);
};
