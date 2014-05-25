ig.module(
    'game.scenes.screen-about'
)
.requires(
    'impact.game'
)
.defines(function() {
    //
    // --------------------------------------------------------------------------
    // About Screen
    // --------------------------------------------------------------------------
    //
    ScreenAbout = ig.Game.extend({
        
        clearColor: '#000000',
        pos: {x: 0, y: 0},
        minScrollY: 0,
        padding: 10,
        
        // about text
        textAbout: new ig.Font( 'media/font.04b03.png' ),
        textAboutParams: {
            text: '',
            message: '',
            height: 0,
            start: {x: 0, y: 0},
            pos: {x: 0, y: 0}
        },
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind( ig.KEY.W, 'scrollup' );
            ig.input.bind( ig.KEY.S, 'scrolldown' );
            ig.input.bind( ig.KEY.UP_ARROW, 'scrollup' );
            ig.input.bind( ig.KEY.DOWN_ARROW, 'scrolldown' );
            
            // add and align buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'back', {right: 0, top: 0, offset: {x: 0, y: 0}}, 20, 20, new ig.Image( 'media/buttons/close.png' ) ),
                new ig.TouchButton( 'scrollup', {right: 0, top: 25}, 20, 20, new ig.Image( 'media/buttons/scroll-up.png' ) ),
                new ig.TouchButton( 'scrolldown', {right: 0, bottom: 0}, 20, 20, new ig.Image( 'media/buttons/scroll-down.png' ) ),
            ]);
            
            // position everything
            this.align();
        },
        
        update: function() {
            this.parent();
            
            // if "Back" button is pressed
            if ( ig.input.released('back') ) {
                ig.system.setGame( ScreenTitle );
            }
            
            // if "Scoll Up" button is pressed
            if ( ig.input.state('scrollup') ) {
                this.scroll( 1 );
            }
            
            // if "Scroll Down" button is pressed
            else if ( ig.input.state('scrolldown') ) {
                this.scroll( -1 );
            }
            
            // update text y-axis
            this.textAboutParams.pos.y = ( this.pos.y + this.textAboutParams.start.y );
        },
        
        draw: function() {
            this.parent();
            
            // draw About text
            if ( this.textAbout ) {
                this.textAbout.draw( this.textAboutParams.message, this.textAboutParams.pos.x, this.textAboutParams.pos.y, ig.Font.ALIGN.LEFT );
            }
            
            // draw close button
            if ( this.buttons ) {
                this.buttons.buttons[0].draw();
            }
            
            // draw scroll buttons
            if ( this.minScrollY < 0 ) {
                this.buttons.buttons[1].draw();
                this.buttons.buttons[2].draw();
            }
        },
        
        // scroll the page
        scroll: function( yPos ) {
            if ( this.minScrollY < 0 ) {
                if ( ( this.pos.y + yPos ) > 0 ) {
                    this.pos.y = 0;
                } else if ( ( this.pos.y + yPos ) < this.minScrollY ) {
                    this.pos.y = this.minScrollY;
                } else {
                    this.pos.y += yPos;
                }
            }
        },
        
        // position everything
        align: function() {
        
            var yPos = 0;
            
            // scroll back to the top
            this.pos.y = 0;
            
            // update buttons
            if ( this.buttons ) {
                this.buttons.align();
            }
            
            // update About text position
            if ( this.textAboutParams ) {
                this.textAboutParams.text = this.getAboutText();
                this.textAboutParams.message = this.wrapMessage( this.textAboutParams.text, ( ig.system.width - 40 ) );
                this.textAboutParams.height = this.textAbout.heightForString( this.textAboutParams.message );
                this.textAboutParams.start.x = 10;
                this.textAboutParams.start.y = ( yPos + this.padding );
                this.textAboutParams.pos.x = this.textAboutParams.start.x;
                this.textAboutParams.pos.y = this.textAboutParams.start.y;
                yPos = ( this.textAboutParams.start.y + this.textAboutParams.height );
            }
            
            // update the minimum scroll y-axis value
            this.minScrollY = -( yPos - ig.system.height + this.padding + 10 );
        },
        
        // line wrap a string of text
        wrapMessage: function( msg, width ) {
            var maxLineWidth = width;
            var newMessage = '';
            var words = msg.split(' ');
            var lines = new Array();
            var line = '';
            
            for ( var i = 0; i < words.length; i++ ) {
                var space = ( i == 0 ? '' : ' ' );
                var str = line + space + words[i];
                if ( this.textAbout.widthForString(str) <= maxLineWidth ) {
                    line = str;
                } else {
                    lines.push( line );
                    line = words[i];
                }
            }
            
            if ( line != '' ) {
                lines.push( line );
            }
            
            for ( var i = 0; i < lines.length; i++ ) {
                if ( i != 0 ) {
                    newMessage += "\n";
                }
                newMessage += lines[i];
            }
            
            return newMessage;
        },
        
        // the about page text
        getAboutText: function() {
            var str =
            'SMALLBOX IS UNDER ATTACK!' +
            '\n\n' +
            'The SmallBox team finally purchased their new building in Broad Ripple and its already under attack by zombies. ' +
            'Help Jeb Banner, CEO and vinyl record enthusiast, defend for as long as he can. ' +
            'As with every zombie apocalypse, it\'s a hopeless game of attrition. ' +
            'So just hold out for as long as you can and take as many of those rotten bastages with you!' +
            '\n\n' +
            'The game will end when the player\'s health is completely depleted. ' +
            'The player\'s health appears as red hearts in the top right of the game screen. ' +
            'The player loses half a heart every time a zombie hits them. ' +
            'The player can defeat zombies by hitting them with the vinyl records. ' +
            'Press the attack button to throw a record. ' +
            'The button can be held down to continuously throw records. ' +
            'The player can also jump over zombies to avoid them. ' +
            'The longer the jump button is pressed, the higher the player will jump. ' +
            '\n\n' +
            'The game will also end when the building\'s health has reached 0%. ' +
            'The buildings health appears in the top left of the game screen next to the SmallBox logo. ' +
            'If the logo is flashing the building is being attacked by zombies. ';
            
            return str;
        },
        
    });
});