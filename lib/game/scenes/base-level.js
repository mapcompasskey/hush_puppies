ig.module(
    'game.scenes.base-level'
)
.requires(
    'impact.game'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Base Level Class
    // --------------------------------------------------------------------------
    //
    BaseLevel = ig.Game.extend({
        
        clearColor: '#000000',
        isPaused: false,
        tileSize: 5,
        gravity: 0,
        
        skyline: 1,
        levelCode: 'level_1',
        isLevelComplete: false,
        levelCompleteTextIndex: 0,
        isGameOver: false,
        gameOverTextIndex: 0,
        gameOverReason: null,
        displayGameOverText: null,
        
        enemyStrengthMax: 50,
        enemyStrengthPercent: 100,
        soldiersMax: 10,
        soldiersCounter: 0,
        shootersMax: 5,
        shootersCounter: 0,
        enemyTime: 1.2,
        enemiesDefeated: 0,
        timerEnemy: new ig.Timer( 0 ), 
        font04b03: new ig.Font( 'media/font.04b03-red.png' ),
        imgTextBackground: new ig.Image( 'media/text-background.png' ),
        
        // initialize your game here
        init: function() {
            
            // bind keys
            ig.input.bind( ig.KEY.I, 'invincible' );
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
            ig.input.bind( ig.KEY.UP_ARROW, 'up' );
            ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
            ig.input.bind( ig.KEY.A, 'left' );
            ig.input.bind( ig.KEY.D, 'right' );
            ig.input.bind( ig.KEY.W, 'up' );
            ig.input.bind( ig.KEY.S, 'down' );
            ig.input.bind( ig.KEY.MOUSE1, 'click' );
            
            // load the level
            this.loadLevel();
            
            // show collision boxes
            //ig.Entity._debugShowBoxes = true;
            
            // add "Back" button
            var settings = {action:'back', anchor:{bottom:5, right:5}, width:50, height:19, imgSrc:'media/buttons/back-white.png'};
            this.buttonBack = ig.game.spawnEntity( EntityButton, 10, 10, settings );
        },
        
        update: function() {
            this.parent();
            
            if ( ig.input.pressed('pause') ) {
                this.isPaused = !this.isPaused;
            }
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            // game has ended and text is being displayed
            if ( this.isGameOver && this.displayGameOverText ) {
                
                // if mouse click show all text
                if ( ig.input.released('click') ) {
                    this.gameOverTextIndex = 1000;
                }
                
                // if "Back" button is pressed
                if ( ig.input.released('back') ) {
                    ig.system.setGame( LevelSelection );
                }
            }
            
            // level complete and text is being displayed
            if ( this.isLevelComplete ) {
            
                // if mouse click show all text
                if ( ig.input.released('click') ) {
                    this.levelCompleteTextIndex = 1000;
                }
                
                // if "Back" button is pressed
                if ( ig.input.released('back') ) {
                    ig.system.setGame( LevelSelection );
                }
            }
            
            // update enemy strength
            this.updateEnemeyStrength();
            
            // check if new enemies need to be made
            this.addEnemies();
        },
        
        draw: function() {
            this.parent();
            
            // game has ended and text is being displayed
            if ( this.isGameOver && this.displayGameOverText ) {
            
                // draw the game over text
                this.drawGameOverText();
                
                // add "Back" button
                this.buttonBack.draw(true);
            }
            
            // level complete and text is being displayed
            if ( this.isLevelComplete ) {
            
                // draw the victory text
                this.drawLevelCompleteText();
                
                // add "Back" button
                this.buttonBack.draw(true);
            }
        },
        
        loadLevel: function() {
            
            // add skyline
            ig.game.spawnEntity( EntitySkyline, 0, 0, {skyline: this.skyline} );
            
            // add giant crab
            ig.game.spawnEntity( EntityGiantCrab, ( ig.system.width / 2 ), ( ( ig.system.height / 2 ) ) );
            
            // add player
            ig.game.spawnEntity( EntityPlayer, ( this.tileSize * 20 ), ( this.tileSize * 20 ) );
            
            // add player left wall
            for (var i = 0; i < 13; i++) {
                var xPos = 0;
                var yPos = ( 10 * i + 40 );
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos );
            }
            
            // add player right wall
            for (var i = 0; i < 13; i++) {
                var xPos = ( ig.system.width - 10 );
                var yPos = ( 10 * i + 40 );
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos );
            }
            
            // add player north wall
            for (var i = 1; i < 29; i++) {
                var xPos = ( i * 10 );
                var yPos = 30;
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos );
            }
            
            // add player south wall
            for (var i = 1; i < 29; i++) {
                var xPos = ( i * 10 );
                var yPos = ( ig.system.height - 10 );
                ig.game.spawnEntity( EntityPlayerWall, xPos, yPos );
            }
            
            // add level HUD
            ig.game.spawnEntity( EntityHud, 0, 0 );
        },
        
        // update the enemies strength
        updateEnemeyStrength: function() {
            
            if ( this.isLevelComplete ) {
                return;
            }
            
            var strength = this.enemiesDefeated;
            strength = ( this.enemyStrengthMax - strength );
            if ( strength <= 0 ) {
                strength = 0;
                this.isLevelComplete = true;
                ig.global.levelsComplete[this.levelCode] = true;
            }
            
            this.enemyStrengthPercent = Math.ceil( strength * ( 100 / this.enemyStrengthMax ) );
        },
            
        // add enemies
        addEnemies: function() {
        
            if ( this.isGameOver || this.isLevelComplete ) {
                return;
            }
            
            // attempt to add an enemy
            if ( this.timerEnemy.delta() > 0 ) {
                    
                // 0, 1, 2, or 3
                var rand = Math.round( Math.random() * 3 );
                
                // add shooter (25%)
                if ( rand == 0 ) {
                    if ( this.shootersCounter < this.shootersMax ) {
                        this.addEnemyShooter();
                    } else {
                        rand = 1;
                    }
                }
                
                // add soldier (75%)
                if ( rand != 0 ) {
                    if ( this.soldiersCounter < this.soldiersMax ) {
                        this.addEnemySoldier();
                    }
                }
                
                // reset the timer
                this.timerEnemy = new ig.Timer( this.enemyTime );
            }
            
        },
        
        // add shooter type enemy
        addEnemyShooter: function() {
        
            var xPos = 0;
            var yPos = 0;
            
            // 0 or 1
            var rand = Math.round( Math.random() * 1 );
                        
            // set x/y position
            switch ( rand ) {
                case 1: // west side
                    xPos = -20;
                    yPos = ( ( Math.random() * ( ig.system.height - 80 ) ) + 60 );
                    break;
                
                case 0: // east side
                default:
                    xPos = ( ig.system.width + 20 );
                    yPos = ( ( Math.random() * ( ig.system.height - 80 ) ) + 60 );
            }
            
            // spawn enemy
            this.spawnEnemyShooter( xPos, yPos );
        },
        
        // add soldier type enemy
        addEnemySoldier: function() {
        
            var xPos = 0;
            var yPos = 0;
            
            // 0, 1, or 2
            var rand = Math.round( Math.random() * 2 );
            
            // set x/y position
            switch ( rand ) {
                case 2: // west side
                    xPos = -20;
                    yPos = ( ( Math.random() * ( ig.system.height - 70 ) ) + 70 );
                    break;
                    
                case 1: // south side
                    xPos = ( Math.random() * ig.system.width );
                    yPos = ( ig.system.height + 20 );
                    break;
                    
                case 0: // east side
                default:
                    xPos = ( ig.system.width + 20 );
                    yPos = ( ( Math.random() * ( ig.system.height - 70 ) ) + 70 );
            }
            
            // spawn enemy
            this.spawnEnemySoldier( xPos, yPos );
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            // spawn custom shooter entity here
        },
        
        // spawn soldier type enemy
        spawnEnemySoldier: function( x, y ) {
            // spawn custom soldier entity here
        },
            
        // the player was defeated
        gameOver: function( reason ) {
            
            // start displaying game over
            if ( reason == 'kill' ) {
                this.displayGameOverText = true;
            }
            
            // else, update for all the entities on the screen
            else {
                this.isGameOver = true;
                this.gameOverReason = reason;
            }
        },
        
        // draw the game over text
        drawGameOverText:function() {
            
            // if the player was defeated
            if ( this.gameOverReason == 'player' ) {
            
                // the message
                var msg = '';
                msg += 'You were defeated in this time period! ';
                msg += '\nReturn to the time selection screen and try again. ';
            }
            
            // else, if the Giant Crab was defeated
            else if ( this.gameOverReason == 'giant-crab' ) {
            
                // the message
                var msg = '';
                msg += 'The Giant Crab in this time period was destroyed! ';
                msg += '\nReturn to the time selection screen and try again. ';
            }
            
            if ( msg ) {
                // display the message one letter at a time
                if ( this.gameOverTextIndex < ( msg.length * 5 ) ) {
                    var end = Math.ceil( this.gameOverTextIndex / 5 );
                    msg = msg.substring(0, end);
                    this.gameOverTextIndex++;
                }
                
                // draw text background
                var yStart = 20;
                var yCount = 1;
                var xCount = Math.ceil( ig.system.width / this.imgTextBackground.width );
                for (var y = 0; y <= yCount; y++) {
                    for (var x = 0; x <= xCount; x++) {
                        this.imgTextBackground.draw( ( this.imgTextBackground.width * x ), ( ( this.imgTextBackground.width * y ) + yStart ) );
                    }
                }
                
                // draw help text
                this.font04b03.draw( msg, ( ig.system.width / 2 ), ( yStart + 3 ), ig.Font.ALIGN.CENTER );
            }
            
        },
        
        // draw the level complete text
        drawLevelCompleteText: function() {
                        
            // the message
            var msg = '';
            msg += 'The Giant Crab has been saved in this time period! ';
            msg += '\nReturn to the time selection screen ';
            msg += '\nand choose another time period to visit. ';
            
            // display the message one letter at a time
            if ( this.levelCompleteTextIndex < ( msg.length * 5 ) ) {
                var end = Math.ceil( this.levelCompleteTextIndex / 5 );
                msg = msg.substring(0, end);
                this.levelCompleteTextIndex++;
            }
                
            // draw text background
            var yStart = 20;
            var yCount = 2;
            var xCount = Math.ceil( ig.system.width / this.imgTextBackground.width );
            for (var y = 0; y <= yCount; y++) {
                for (var x = 0; x <= xCount; x++) {
                    this.imgTextBackground.draw( ( this.imgTextBackground.width * x ), ( ( this.imgTextBackground.width * y ) + yStart ) );
                }
            }
            
            // draw help text
            this.font04b03.draw( msg, ( ig.system.width / 2 ), ( yStart + 3 ), ig.Font.ALIGN.CENTER );
        },
        
    });
});