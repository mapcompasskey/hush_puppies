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
        imgCleared: new ig.Image( 'media/buttons/selection-tile-cleared.png' ),
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // add level-1 button
            var settings = {action:'level-1', anchor:{left:'center', bottom:'center', offset:{x:-35, y:-35}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-1.png'};
            this.buttonLevel1 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-2 button
            settings = {action:'level-2', anchor:{left:'center', bottom:'center', offset:{x:0, y:-35}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-2.png'};
            this.buttonLevel2 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-3 button
            settings = {action:'level-3', anchor:{left:'center', bottom:'center', offset:{x:35, y:-35}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-3.png'};
            this.buttonLevel3 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-4 button
            settings = {action:'level-4', anchor:{left:'center', bottom:'center', offset:{x:-35, y:0}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-4.png'};
            this.buttonLevel4 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-5 button
            settings = {action:'level-5', anchor:{left:'center', bottom:'center', offset:{x:35, y:0}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-5.png'};
            this.buttonLevel5 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-6 button
            settings = {action:'level-6', anchor:{left:'center', bottom:'center', offset:{x:-35, y:35}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-6.png'};
            this.buttonLevel6 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-7 button
            settings = {action:'level-7', anchor:{left:'center', bottom:'center', offset:{x:0, y:35}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-7.png'};
            this.buttonLevel7 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add level-8 button
            settings = {action:'level-8', anchor:{left:'center', bottom:'center', offset:{x:35, y:35}}, width:30, height:30, imgSrc:'media/buttons/selection-tile-8.png'};
            this.buttonLevel8 = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // add "Back" button
            settings = {action:'back', anchor:{bottom:5, right:5}, width:50, height:19, imgSrc:'media/buttons/back-white.png'};
            this.buttonBack = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            
            // check if every level is complete 
            this.isGameComplete = true;
            for ( idx in ig.global.levelsComplete ) {
                if ( ig.global.levelsComplete[idx] === false ) {
                    this.isGameComplete = false;
                }
            }
            
            // add "Congratulations" button
            if ( this.isGameComplete ) {
                settings = {action:'congratulations', anchor:{bottom:'center', right:'center'}, width:55, height:55, imgSrc:'media/buttons/crab.png'};
                this.buttonCongratulations = ig.game.spawnEntity( EntityButton, 0, 0, settings );
            }
        },
        
        update: function() {
            this.parent();
            
            // if a level button was pressed
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
            
            // draw level buttons
            this.buttonLevel1.draw(true);
            this.buttonLevel2.draw(true);
            this.buttonLevel3.draw(true);
            this.buttonLevel4.draw(true);
            this.buttonLevel5.draw(true);
            this.buttonLevel6.draw(true);
            this.buttonLevel7.draw(true);
            this.buttonLevel8.draw(true);
            
            // draw cleared tiles
            this.drawClearedTiles();
            
            // draw "Back" button
            this.buttonBack.draw(true);
            
            // draw "Congratulations" button
            if ( this.isGameComplete ) {
                this.buttonCongratulations.draw(true);
            }
        },
        
        // display level cleared symbol
        drawClearedTiles: function() {
        
            if ( ig.global.levelsComplete ) {
                if ( ig.global.levelsComplete.level_1 ) {
                    this.imgCleared.draw( this.buttonLevel1.pos.x, this.buttonLevel1.pos.y );
                }
                if ( ig.global.levelsComplete.level_2 ) {
                    this.imgCleared.draw( this.buttonLevel2.pos.x, this.buttonLevel2.pos.y );
                }
                if ( ig.global.levelsComplete.level_3 ) {
                    this.imgCleared.draw( this.buttonLevel3.pos.x, this.buttonLevel3.pos.y );
                }
                if ( ig.global.levelsComplete.level_4 ) {
                    this.imgCleared.draw( this.buttonLevel4.pos.x, this.buttonLevel4.pos.y );
                }
                if ( ig.global.levelsComplete.level_5 ) {
                    this.imgCleared.draw( this.buttonLevel5.pos.x, this.buttonLevel5.pos.y );
                }
                if ( ig.global.levelsComplete.level_6 ) {
                    this.imgCleared.draw( this.buttonLevel6.pos.x, this.buttonLevel6.pos.y );
                }
                if ( ig.global.levelsComplete.level_7 ) {
                    this.imgCleared.draw( this.buttonLevel7.pos.x, this.buttonLevel7.pos.y );
                }
                if ( ig.global.levelsComplete.level_8 ) {
                    this.imgCleared.draw( this.buttonLevel8.pos.x, this.buttonLevel8.pos.y );
                }
            }
            
        },
        
    });
});