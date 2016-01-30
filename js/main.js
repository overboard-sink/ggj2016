var GAME_WIDTH = 640;
var GAME_HEIGHT = 1120;
var GAME_MAIN_ID = 'main';

/**
 * Global containing the Phaser.Game object
 */
var game;

/**
 * Entry point
 */
function main() {
  game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_MAIN_ID, {
    preload: function preload() {
      Demon.preload(game);
      ParticleTrail.preload(game);
      Torch.preload(game);
      RitualSymbol.preload(game);
      game.load.image('door_vert', '/img/door_vert.png');
    },

    create: function create() {
      game.state.add('default', new DefaultState());
      game.state.start('default');
    },
  });
}
