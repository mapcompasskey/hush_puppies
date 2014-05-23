ig.module(
    'game.scenes.screen-game-over'
)
.requires(
    'impact.game'
)
.defines(function() {
    ScreenGameOver = ig.Game.extend({
        
        clearColor: '#000000',
        
        // game over text
        textGameOver: new ig.Font( 'media/font.04b03.png' ),
        textGameOverParams: {
            text: 'GAME OVER',
            pos: {x: 0, y: 0}
        },
        
        // initialize your game here
        init: function() {
        
            // add and align buttons
            this.buttons = new ig.TouchButtonCollection([
                //new ig.TouchButton( 'menu', {left: 'center', bottom: 50, offset: {x: -120, y: 0}}, 150, 55, new ig.Image( 'media/buttons/menu.png' ) ),
                //new ig.TouchButton( 'again', {left: 'center', bottom: 50, offset: {x: 100, y: 0}}, 220, 55, new ig.Image( 'media/buttons/try-again.png' ) ),
                new ig.TouchButton( 'start', {left: 'center', bottom: 20, offset: {x: -30, y: 0}}, 50, 19, new ig.Image( 'media/buttons/start.png' ) ),
                new ig.TouchButton( 'about', {left: 'center', bottom: 20, offset: {x:  30, y: 0}}, 50, 19, new ig.Image( 'media/buttons/about.png' ) ),
            ]);
            
            // the game over message
            /*if ( ig.gameOverReason == 'player death' ) {
                this.textGameOverParams.text = 'YOU WERE DEFEATED';
            }
            else if ( ig.gameOverReason == 'building destoryed' ) {
                this.textGameOverParams.text = 'THE BUILDING WAS DESTROYED';
            }
            ig.gameOverReason = '';*/
            
            // the zombies killed and time played
            /*var playTime = Math.floor(ig.gameOverTime);
            var minutes = Math.floor(playTime / 60);
            var seconds = Math.floor(playTime % 60);
            var readable = '';
            if ( minutes > 0 ) {
                readable = minutes + (minutes == 1 ? ' minute' : ' minutes');
            }
            readable += (readable == '' ? '' : ' and ');
            readable += seconds + (seconds == 1 ? ' second' : ' seconds');
            ig.gameOverTime = readable;
            */
            
            // add the player score to the game over message
            //this.textGameOverParams.text += '\n\n';
            //this.textGameOverParams.text += ig.gameOverZombies + ' Zombie' + ( ig.gameOverZombies == 1 ? '' : 's') + ' Defeated,';
            //this.textGameOverParams.text += '\n';
            //this.textGameOverParams.text += 'Survived for ' + ig.gameOverTime;
            
            // position everyting
            //this.resizeGame();
            this.align();
        },
        
        update: function() {
            this.parent();
            
            /*
            // if "Menu" button is pressed
            if ( ig.input.released('menu') ) {
                ig.system.setGame( GameScreenTitle );
            }
            
            // if "Try Again" button is pressed
            else if ( ig.input.released('again') ) {
                ig.system.setGame( GameStage1 );
            }
            */
        },
        
        draw: function() {
            this.parent();
            
            // draw About text
            if ( this.textGameOver ) {
                this.textGameOver.draw( this.textGameOverParams.text, this.textGameOverParams.pos.x, this.textGameOverParams.pos.y, ig.Font.ALIGN.CENTER );
            }
            
            // draw buttons
            if ( this.buttons ) {
                this.buttons.draw();
            }
        },
        
        // position everything
        align: function() {
            
            // reposition Game Over text
            if ( this.textGameOver ) {
                this.textGameOverParams.pos.x = ( ig.system.width / 2 );
                this.textGameOverParams.pos.y = 10;
            }
            
            // repositon buttons
            if ( this.buttons ) {
                this.buttons.align();
            }
        }
        
    });
});