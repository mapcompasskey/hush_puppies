ig.module(
    'game.scenes.level-selection'
)
.requires(
    'impact.game'
)
.defines(function() {
    LevelSelection = ig.Game.extend({
        
        clearColor: '#000000',
        font04b03: new ig.Font( 'media/font.04b03.png' ),
        
        // initialize your game here
        init: function() {
            
            // add the buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'level-1', {left: 'center', bottom: 'center', offset: {x: -35, y: -35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-1.png' ) ),
                new ig.TouchButton( 'level-2', {left: 'center', bottom: 'center', offset: {x:   0, y: -35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
                new ig.TouchButton( 'level-3', {left: 'center', bottom: 'center', offset: {x:  35, y: -35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
                new ig.TouchButton( 'level-4', {left: 'center', bottom: 'center', offset: {x: -35, y:   0}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
                new ig.TouchButton( 'level-5', {left: 'center', bottom: 'center', offset: {x:  35, y:   0}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
                new ig.TouchButton( 'level-6', {left: 'center', bottom: 'center', offset: {x: -35, y:  35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
                new ig.TouchButton( 'level-7', {left: 'center', bottom: 'center', offset: {x:   0, y:  35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
                new ig.TouchButton( 'level-8', {left: 'center', bottom: 'center', offset: {x:  35, y:  35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-0.png' ) ),
            ]);
            this.buttons.align();
            
        },
        
        update: function() {
            this.parent();
            
            if ( ig.input.released('level-1') ) {
                ig.system.setGame( Level1 );
            }
            if ( ig.input.released('level-2') ) {
                console.log('level 2');
            }
            if ( ig.input.released('level-3') ) {
                console.log('level 3');
            }
            if ( ig.input.released('level-4') ) {
                console.log('level 4');
            }
        },
        
        draw: function() {
            this.parent();
            
            // level selection text
            this.font04b03.draw( 'Select a time period below to travel to:', ( ig.system.width / 2 ), 20, ig.Font.ALIGN.CENTER );
            
            // draw buttons
            if ( this.buttons ) {
                this.buttons.draw();
            }
        },
        
    });
});