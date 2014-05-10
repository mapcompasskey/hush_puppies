ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.game',
    'game.entities.player'
)
.defines(function() {
    
    //
    // --------------------------------------------------------------------------
    // The Game Stage
    // --------------------------------------------------------------------------
    //
    GameStage = ig.Game.extend({
        
        clearColor: '#000000',
        isPaused: false,
        tileSize: 5,
        gravity: 0,
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
            ig.input.bind( ig.KEY.UP_ARROW, 'up' );
            ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
            
            this.loadLevel();
            
            // show collision boxes
            //ig.Entity._debugShowBoxes = true;
        },
        
        update: function() {
            this.parent();
            
            if ( ig.input.pressed('pause') ) {
                this.isPaused = !this.isPaused;
            }
            
            if ( ig.game.isPaused ) {
                return;
            }
        },
        
        draw: function() {
            this.parent();
            
            //this.dot.draw( ( this.tileSize * 20 ) - ig.game.screen.x, ( this.tileSize * 12 ) - ig.game.screen.y );
        },
        
        loadLevel: function() {
            /*
            // spawn fireflies
            var pos_x = 0;
            var pos_y = 0;
            for ( var i = 0; i < 30; i++ ) {
                pos_x = Math.floor( 20 + ( 2 * i ) );
                pos_y = Math.floor( 20 + ( ( Math.random() * 6 ) - 3 ) );
                ig.game.spawnEntity( EntityFirefly, ( pos_x * this.tileSize ), ( pos_y * this.tileSize ) );
            }
            
            // spawn red hornet
            ig.game.spawnEntity( EntityHornet2, ( this.tileSize * 20 ), ( this.tileSize * 12 ) );
            */
            
            // spawn player
            ig.game.spawnEntity( EntityPlayer, ( this.tileSize * 10 ), ( this.tileSize * 10 ) );
        }
    });
    
    
    
    //
    // --------------------------------------------------------------------------
    // Initialize the Game
    // --------------------------------------------------------------------------
    //
    var width = window.innerWidth;
    var height = window.innerHeight;
    ig.main( '#canvas', GameStage, 1, 300, 185, 3 );
});
