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
      SpeedPellet.preload(game);
      PowerPellet.preload(game);

      // Other assets
      game.load.image('bkg', '/img/floor_full.png');
      game.load.image('score-bkg', '/img/score_screen.png');
      game.load.image('intro', '/img/title_screen.png');
    },

    create: function create() {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.antialias = false;

      game.difficulty = 2;
      game.levelGenerator = new LevelGenerator(game);

      game.state.add('intro', new IntroState());
      game.state.add('default', new DefaultState());
      game.state.add('score', new ScoreState());

      game.state.start('intro');
      // game.state.start('score');
    },
  });
}
