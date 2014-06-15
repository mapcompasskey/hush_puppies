ig.module(
    'game.scenes.screen-title'
)
.requires(
    'impact.game'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Title Screen
    // --------------------------------------------------------------------------
    //
    ScreenTitle = ig.Game.extend({
        
        clearColor: '#000000',
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
            
            // draw logo
            this.imgKarkinos.draw(0, 0);
            
            // draw "Start" button
            this.buttonStart.draw(true);
            
            // draw "About" button
            this.buttonAbout.draw(true);
        },
        
    });
});