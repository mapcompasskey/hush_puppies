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
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            ig.input.bind( ig.KEY.W, 'scrollup' );
            ig.input.bind( ig.KEY.S, 'scrolldown' );
            ig.input.bind( ig.KEY.UP_ARROW, 'scrollup' );
            ig.input.bind( ig.KEY.DOWN_ARROW, 'scrolldown' );
            
            // add "Back" button
            var settings = {action:'back', anchor:{top:0, right:0}, width:20, height:20, imgSrc:'media/buttons/close.png'};
            this.buttonBack = ig.game.spawnEntity( EntityButton, 10, 10, settings );
            
            // add "Scroll Up" button
            var settings = {action:'scrollup', anchor:{top:25, right:0}, width:20, height:20, imgSrc:'media/buttons/scroll-up.png'};
            this.buttonScrollUp = ig.game.spawnEntity( EntityButton, 10, 10, settings );
            
            // add "Scroll Down" button
            var settings = {action:'scrolldown', anchor:{bottom:0, right:0}, width:20, height:20, imgSrc:'media/buttons/scroll-down.png'};
            this.buttonScrollDown = ig.game.spawnEntity( EntityButton, 10, 10, settings );
            
            // position everything
            this.align();
        },
        
        update: function() {
            this.parent();
            
            // if "Back" button is pressed
            if ( ig.input.released('back') ) {
                ig.system.setGame( ScreenTitle );
            }
            
            // draw scroll buttons
            if ( this.minScrollY < 0 ) {
            
                // if "Scoll Up" button is pressed
                if ( ig.input.state('scrollup') ) {
                    this.scroll( 1 );
                }
                
                // if "Scroll Down" button is pressed
                else if ( ig.input.state('scrolldown') ) {
                    this.scroll( -1 );
                }
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
            
            // draw back button
            if ( this.buttonBack ) {
                this.buttonBack.draw(true);
            }
            
            // draw scroll buttons
            if ( this.minScrollY < 0 ) {
                if ( this.buttonScrollUp ) {
                    this.buttonScrollUp.draw(true);
                }
                if ( this.buttonScrollDown ) {
                    this.buttonScrollDown.draw(true);
                }
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
            'THE CALL OF KARKINOS' + 
            '\n\n' +
            'CONCEPT:' + '\n' + 
            '"a shooting game where you time travel with giant crabs before the apocalypse"' +
            '\n\n' +
            'STORY:' + '\n' +
            'The era of man has reached an end. ' + 
            'Travel through time, gathering together the Giant Crab\'s that will bring about the apocalypse of mankind! ' + 
            '\n\n' +
            'CONTROLS: ' + '\n' +
            'WASD keys to move ' + '\n' +
            'MOUSE to aim and fire' +
            '\n\n' +
            'ABOUT:' + '\n' +
            'The concept for this game was randomly generated at: ' + '\n' + 
            'http://orteil.dashnet.org/gamegen';
            return str;
        },
        
    });
});