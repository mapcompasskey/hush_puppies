ig.module(
    'game.scenes.level-selection'
)
.requires(
    'impact.game'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level Selection Screen
    // --------------------------------------------------------------------------
    //
    LevelSelection = ig.Game.extend({
        
        clearColor: '#000000',
        isGameComplete: false,
        font04b03: new ig.Font( 'media/font.04b03.png' ),
        imgCleared: new ig.Image( 'media/selection-tile-cleared.png' ),
        
        // initialize your game here
        init: function() {
            
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // add the buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'level-1', {left: 'center', bottom: 'center', offset: {x: -35, y: -35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-1.png' ) ),
                new ig.TouchButton( 'level-2', {left: 'center', bottom: 'center', offset: {x:   0, y: -35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-2.png' ) ),
                new ig.TouchButton( 'level-3', {left: 'center', bottom: 'center', offset: {x:  35, y: -35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-3.png' ) ),
                new ig.TouchButton( 'level-4', {left: 'center', bottom: 'center', offset: {x: -35, y:   0}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-4.png' ) ),
                new ig.TouchButton( 'level-5', {left: 'center', bottom: 'center', offset: {x:  35, y:   0}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-5.png' ) ),
                new ig.TouchButton( 'level-6', {left: 'center', bottom: 'center', offset: {x: -35, y:  35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-6.png' ) ),
                new ig.TouchButton( 'level-7', {left: 'center', bottom: 'center', offset: {x:   0, y:  35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-7.png' ) ),
                new ig.TouchButton( 'level-8', {left: 'center', bottom: 'center', offset: {x:  35, y:  35}}, 30, 30, new ig.Image( 'media/buttons/selection-tile-8.png' ) ),
                new ig.TouchButton( 'back', {right: 10, bottom: 10}, 50, 19, new ig.Image( 'media/buttons/back-white.png' ) ),
            ]);
            this.buttons.align();
            
            // check if every stage is complete 
            this.isGameComplete = true;
            for ( idx in ig.global.levelsComplete ) {
                if ( ig.global.levelsComplete[idx] === false ) {
                    this.isGameComplete = false;
                }
            }
            
            // game complete button
            if ( this.isGameComplete ) {
                this.buttons2 = new ig.TouchButtonCollection([
                    new ig.TouchButton( 'congratulations', {left: 'center', bottom: 'center'}, 55, 55, new ig.Image( 'media/buttons/crab.png' ) ),
                ]);
                this.buttons2.align();
            }
        },
        
        update: function() {
            this.parent();
            
            // if a Level was choosen
            if ( ig.input.released('level-1') ) {
                ig.system.setGame( Level1 );
            }
            if ( ig.input.released('level-2') ) {
                ig.system.setGame( Level2 );
            }
            if ( ig.input.released('level-3') ) {
                ig.system.setGame( Level3 );
            }
            if ( ig.input.released('level-4') ) {
                ig.system.setGame( Level4 );
            }
            if ( ig.input.released('level-5') ) {
                ig.system.setGame( Level5 );
            }
            if ( ig.input.released('level-6') ) {
                ig.system.setGame( Level6 );
            }
            if ( ig.input.released('level-7') ) {
                ig.system.setGame( Level7 );
            }
            if ( ig.input.released('level-8') ) {
                ig.system.setGame( Level8 );
            }
            
            // if "Back" button is pressed
            if ( ig.input.released('back') ) {
                console.log('level-selection back');
                ig.system.setGame( ScreenTitle );
            }
            
            // if "Congratulations" button is pressed
            if ( this.isGameComplete ) {
                if ( ig.input.released('congratulations') ) {
                    ig.system.setGame( ScreenCongratulations );
                }
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
            
            // draw game complete button
            if ( this.buttons2 ) {
                this.buttons2.draw();
            }
            
            // draw cleared tiles
            this.drawClearedTiles();
        },
        
        // display level cleared symbol
        drawClearedTiles: function() {
        
            if ( ig.global.levelsComplete ) {
            
                var xCenter = ( ig.system.width / 2 );
                var yCenter = ( ig.system.height / 2 );
                var wd = 17.5;
                var hg = 17.5;
                
                if ( ig.global.levelsComplete.level_1 ) {
                    var xOffset = xCenter - wd - 35;
                    var yOffset = yCenter - hg - 35;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_2 ) {
                    var xOffset = xCenter - wd - 0;
                    var yOffset = yCenter - hg - 35;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_3 ) {
                    var xOffset = xCenter - wd + 35;
                    var yOffset = yCenter - hg - 35;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_4 ) {
                    var xOffset = xCenter - wd - 35;
                    var yOffset = yCenter - hg - 0;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_5 ) {
                    var xOffset = xCenter - wd + 35;
                    var yOffset = yCenter - hg - 0;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_6 ) {
                    var xOffset = xCenter - wd - 35;
                    var yOffset = yCenter - hg + 35;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_7 ) {
                    var xOffset = xCenter - wd + 0;
                    var yOffset = yCenter - hg + 35;
                    this.imgCleared.draw( xOffset, yOffset );
                }
                
                if ( ig.global.levelsComplete.level_8 ) {
                    var xOffset = xCenter - wd + 35;
                    var yOffset = yCenter - hg + 35;
                    this.imgCleared.draw( xOffset, yOffset );
                }
            }
            
        },
        
    });
});