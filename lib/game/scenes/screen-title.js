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
        imgKarkinos: new ig.Image( 'media/the-call-of-karkinos.png' ),
        
        // initialize your game here
        init: function() {
            
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // add the buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'start', {right: 60, top: 5}, 50, 19, new ig.Image( 'media/buttons/start.png' ) ),
                new ig.TouchButton( 'about', {right: 5, top: 5}, 50, 19, new ig.Image( 'media/buttons/about.png' ) ),
            ]);
            this.buttons.align();
        },
        
        update: function() {
            this.parent();
            
            // if "Start" button is pressed
            if ( ig.input.released('start') ) {
                console.log('screen-title start');
                ig.system.setGame( LevelSelection );
            }
            
            // if "About" button is pressed
            else if ( ig.input.released('about') ) {
                console.log('screen-title about');
                ig.system.setGame( ScreenAbout );
            }
            
            if ( ig.input.released('back') ) {
                console.log('hey');
            }
            
        },
        
        draw: function() {
            this.parent();
            
            // draw background
            this.imgKarkinos.draw(0, 0);
            
            // draw buttons
            if ( this.buttons ) {
                this.buttons.draw();
            }
        },
        
    });
});