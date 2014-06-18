ig.module(
    'game.scenes.screen-title'
)
.requires(
    'impact.game',
    'game.entities.clouds'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Title Screen
    // --------------------------------------------------------------------------
    //
    ScreenTitle = ig.Game.extend({
        
        clearColor: '#7a0e00',
        imgBackground: new ig.Image( 'media/bg-screen-title.png' ),
        imgKarkinos: new ig.Image( 'media/the-call-of-karkinos.png' ),
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // add "Start" button
            var settings = {action:'start', anchor:{top:5, right:5, offset:{x:-55, y:0}}, width:50, height:19, imgSrc:'media/buttons/start.png'};
            this.buttonStart = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add "About" button
            settings = {action:'about', anchor:{top:5, right:5}, width:50, height:19, imgSrc:'media/buttons/about.png'};
            this.buttonAbout = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add clouds
            ig.game.clouds = [[], []];
            this.clouds1 = ig.game.spawnEntity( EntityClouds, 0, 0, {clouds:1} );
            this.clouds2 = ig.game.spawnEntity( EntityClouds, 0, 0, {clouds:2} );
        },
        
        update: function() {
            this.parent();
            
            // if "Start" button is pressed
            if ( ig.input.released('start') ) {
                ig.system.setGame( LevelSelection );
            }
            
            // if "About" button is pressed
            else if ( ig.input.released('about') ) {
                ig.system.setGame( ScreenAbout );
            }
            
        },
        
        draw: function() {
            this.parent();
            
            // draw background
            this.imgBackground.draw(0, 0);
            
            // draw clouds
            if ( ig.game.clouds.length ) {
                for ( var i = 0; i < ig.game.clouds.length; i++ ) {
                    if ( ig.game.clouds[i].length ) {
                        for ( var j = 0; j < ig.game.clouds[i].length; j++ ) {
                            ig.game.clouds[i][j].draw();
                        }
                    }
                }
            }
            
            // draw logo
            this.imgKarkinos.draw(0, 0);
            
            // draw "Start" button
            this.buttonStart.draw(true);
            
            // draw "About" button
            this.buttonAbout.draw(true);
        },
        
    });
});