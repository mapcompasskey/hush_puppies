ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.game',
    'game.entities.player',
    'game.entities.player-wall'
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
            ig.input.bind( ig.KEY.A, 'left' );
            ig.input.bind( ig.KEY.D, 'right' );
            ig.input.bind( ig.KEY.W, 'up' );
            ig.input.bind( ig.KEY.S, 'down' );
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // load the level
            this.loadLevel();
            
            // show collision boxes
            ig.Entity._debugShowBoxes = true;
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
        
            // add player
            ig.game.spawnEntity( EntityPlayer, ( this.tileSize * 20 ), ( this.tileSize * 20 ) );
            
            // add player left wall
            for (var i = 0; i < 13; i++) {
                var xPos = 0;
                var yPos = ( 10 * i + 40 );
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos, {direction:'x'} );
            }
            
            // add player right wall
            for (var i = 0; i < 13; i++) {
                var xPos = ( ig.system.width - 10 );
                var yPos = ( 10 * i + 40 );
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos, {direction:'x'} );
            }
            
            // add player north wall
            for (var i = 1; i < 29; i++) {
                var xPos = ( i * 10 );
                var yPos = 30;
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos, {direction:'y'} );
            }
            
            // add player south wall
            for (var i = 1; i < 29; i++) {
                var xPos = ( i * 10 );
                var yPos = ( ig.system.height - 10 );
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos, {direction:'y'} );
            }
        }
    });
    
    
    
    //
    // --------------------------------------------------------------------------
    // Initialize the Game
    // --------------------------------------------------------------------------
    //
    var width = window.innerWidth;
    var height = window.innerHeight;
    ig.main( '#canvas', GameStage, 1, 300, 180, 3 );
});
