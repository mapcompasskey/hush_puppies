ig.module(
    'game.scenes.screen-title'
)
.requires(
    'impact.game'
)
.defines(function() {
    ScreenTitle = ig.Game.extend({
        
        clearColor: '#000000',
        
        // initialize your game here
        init: function() {
            
            // add the buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'start', {left: 'center', bottom: 'center', offset: {x: -30, y: 0}}, 50, 19, new ig.Image( 'media/buttons/start.png' ) ),
                new ig.TouchButton( 'about', {left: 'center', bottom: 'center', offset: {x:  30, y: 0}}, 50, 19, new ig.Image( 'media/buttons/about.png' ) ),
            ]);
            this.buttons.align();
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
            
            // draw buttons
            if ( this.buttons ) {
                this.buttons.draw();
            }
        },
        
    });
});