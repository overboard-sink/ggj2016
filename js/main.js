var GAME_W = 640;
var GAME_H = 1120;
var GAME_MAIN_ID = 'main';

var TILE_W = 64;
var TILE_H = 64;

/**
 * Global containing the Phaser.Game object
 */
var game;

/**
 * Entry point
 */
function main() {
  game = new Phaser.Game(GAME_W, GAME_H, Phaser.AUTO, GAME_MAIN_ID, {
    preload: function preload() {

      // Object-specific assets
      Demon.preload(game);
      ParticleTrail.preload(game);
      Torch.preload(game);
      RitualSymbol.preload(game);
      MonkBase.preload(game);
      Door.preload(game);

      // Other assets
      game.load.image('bkg', '/img/floor_full.png');
    },

    create: function create() {
      game.state.add('default0', new DefaultState(0));
      game.state.add('default1', new DefaultState(1));
      game.state.start('default0');
    },
  });
}
