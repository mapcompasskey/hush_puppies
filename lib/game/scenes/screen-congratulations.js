ig.module(
    'game.scenes.screen-congratulations'
)
.requires(
    'impact.game'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Game Complete Screen
    // --------------------------------------------------------------------------
    //
    ScreenCongratulations = ig.Game.extend({
        
        clearColor: '#000000',
        imgCongratulations: new ig.Image( 'media/congratulations.png' ),
        
        // initialize your game here
        init: function() {
            
            // add the buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'back', {right: 5, top: 5}, 50, 19, new ig.Image( 'media/buttons/back.png' ) ),
            ]);
            this.buttons.align();
        },
        
        update: function() {
            this.parent();
            
            // if "Back" button is pressed
            if ( ig.input.released('back') ) {
                ig.system.setGame( ScreenTitle );
            }
        },
        
        draw: function() {
            this.parent();
            
            // draw background
            this.imgCongratulations.draw(0, 0);
            
            // draw buttons
            if ( this.buttons ) {
                this.buttons.draw();
            }
        },
        
    });
});