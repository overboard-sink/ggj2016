var LevelGenerator = function LevelGenerator() {

};

LevelGenerator.prototype = Object.create(Object.prototype);

/**
 * Generate contents for the given level ID in the givne world.
 * Hint: the 'group' is normally the world.
 */
LevelGenerator.prototype.generate = function generate(rng, levelId, group) {

};

LevelGenerator.prototype.genContellation = function generate(rng, levelId) {

};

LevelGenerator.prototype.genMonks = function genMonks(rng, levelId, demon) {
  var monks = [];

};

LevelGenerator.prototype.genDemon = function genDemon(rng, levelId) {
  return new Demon(rng.frac() * GAME_W, rng.frac() * GAME_H);
};

LevelGenerator().prototype.genDoor = function genDoor(rng, levelId) {

};
