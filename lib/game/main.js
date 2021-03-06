ig.module( 
	'game.main' 
)
.requires(
    //'impact.debug.debug',
	'impact.game',
    //'plugins.touch-button',
    'game.scenes.screen-title',
    'game.scenes.screen-about',
    'game.scenes.screen-game-over',
    'game.scenes.screen-congratulations',
    'game.scenes.level-selection',
    'game.scenes.base-level',
    'game.scenes.level-1',
    'game.scenes.level-2',
    'game.scenes.level-3',
    'game.scenes.level-4',
    'game.scenes.level-5',
    'game.scenes.level-6',
    'game.scenes.level-7',
    'game.scenes.level-8',
    'game.entities.button',
    'game.entities.skyline',
    'game.entities.giant-crab',
    'game.entities.player',
    'game.entities.player-wall',
    'game.entities.hud'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Game Variables
    // --------------------------------------------------------------------------
    //
    ig.global.levelsComplete = {
        level_1: false,
        level_2: false,
        level_3: false,
        level_4: false,
        level_5: false,
        level_6: false,
        level_7: false,
        level_8: false
    };
    
    
    
    //
    // --------------------------------------------------------------------------
    // ImpactJS Overrides
    // --------------------------------------------------------------------------
    //
    ig.Input.inject({
        initMouse: function() {
            this.parent();
            
            // add new listeners to help track the mouse when it leaves the canvas
            window.addEventListener('mousedown', this.keydown.bind(this), false );
            window.addEventListener('mouseup', this.keyup.bind(this), false );
            window.addEventListener('mousemove', this.mousemove.bind(this), false );
        }
    });
    
    
    
    //
    // --------------------------------------------------------------------------
    // Initialize the Game
    // --------------------------------------------------------------------------
    //
    var width = window.innerWidth;
    var height = window.innerHeight;
    ig.main( '#canvas', ScreenTitle, 1, 300, 180, 3 );
    //ig.main( '#canvas', ScreenAbout, 1, 300, 180, 3 );
    //ig.main( '#canvas', ScreenGameOver, 1, 300, 180, 3 );
    //ig.main( '#canvas', ScreenCongratulations, 1, 300, 180, 3 );
    //ig.main( '#canvas', LevelSelection, 1, 300, 180, 3 );
    //ig.main( '#canvas', Level8, 1, 300, 180, 3 );
});
