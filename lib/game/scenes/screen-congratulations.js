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
        imgCongratulations: new ig.Image( 'media/bg-screen-congratulations.png' ),
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // add "Back" button
            var settings = {action:'back', anchor:{top:5, right:5}, width:50, height:19, imgSrc:'media/buttons/back.png'};
            this.buttonBack = ig.game.spawnEntity( EntityButton, 10, 10, settings );
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
            
            // draw "Back" button
            this.buttonBack.draw(true);
        },
        
    });
});