ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.game',
    'plugins.touch-button',
    'game.scenes.screen-title',
    'game.scenes.screen-about',
    'game.scenes.screen-game-over',
    'game.scenes.level-1',
    'game.entities.skyline',
    'game.entities.giant-crab',
    'game.entities.player',
    'game.entities.player-wall',
    'game.entities.hud'
)
.defines(function() {
    // Initialize the Game
    var width = window.innerWidth;
    var height = window.innerHeight;
    ig.main( '#canvas', ScreenTitle, 1, 300, 180, 3 );
    //ig.main( '#canvas', ScreenAbout, 1, 300, 180, 3 );
    //ig.main( '#canvas', ScreenGameOver, 1, 300, 180, 3 );
    //ig.main( '#canvas', Level1, 1, 300, 180, 3 );
});
