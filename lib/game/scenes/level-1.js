ig.module(
    'game.scenes.level-1'
)
.requires(
    'impact.game',
    'game.entities.knight',
    'game.entities.archer'
)
.defines(function() {
    //
    // --------------------------------------------------------------------------
    // Level 1
    // Knights and Archers
    // --------------------------------------------------------------------------
    //
    Level1 = ig.Game.extend({
        
        clearColor: '#000000',
        isPaused: false,
        isGameOver: false,
        tileSize: 5,
        gravity: 0,
        
        font04b03: new ig.Font( 'media/font.04b03.png' ),
        imgTextBg: new ig.Image( 'media/black.png' ),
        
        soldiersMax: 10,
        soldiersCounter: 0,
        shootersMax: 5,
        shootersCounter: 0,
        enemyTime: 1.2,
        enemiesDefeated: 0,
        timerEnemy: new ig.Timer( 0 ), 
        
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
            
            // add the buttons
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'back', {right: 10, bottom: 10}, 50, 19, new ig.Image( 'media/buttons/back.png' ) ),
            ]);
            this.buttons.align();
        },
        
        update: function() {
            this.parent();
            
            if ( ig.input.pressed('pause') ) {
                this.isPaused = !this.isPaused;
            }
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            // check if new enemies need to be made
            this.addEnemies();
        },
        
        draw: function() {
            this.parent();
            
            // draw the game over text
            if ( this.isGameOver ) {
                this.drawGameOverText();
                
                // draw buttons
                if ( this.buttons ) {
                    this.buttons.draw();
                }
            }
        },
        
        loadLevel: function() {
        
            // add skyline
            ig.game.spawnEntity( EntitySkyline, 0, 0 );
            
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
        
        // add enemies
        addEnemies: function() {
        
            if ( this.isGameOver ) {
                return;
            }
            
            // attempt to add an enemy
            if ( this.timerEnemy.delta() > 0 ) {
                    
                // 0, 1, 2, or 3
                var rand = Math.round( Math.random() * 3 );
                
                // add archer (25%)
                if ( rand == 0 ) {
                    if ( this.shootersCounter < this.shootersMax ) {
                        this.addEnemyArcher();
                    } else {
                        rand = 1;
                    }
                }
                
                // add knight (75%)
                if ( rand != 0 ) {
                    if ( this.soldiersCounter < this.soldiersMax ) {
                        this.addEnemyKnight();
                    }
                }
                
                // reset the timer
                this.timerEnemy = new ig.Timer( this.enemyTime );
            }
            
        },
        
        // add Archer
        addEnemyArcher: function() {
        
            var xPos = 0;
            var yPos = 0;
            
            // 0 or 1
            var rand = Math.round( Math.random() * 1 );
                        
            // set x/y position
            switch ( rand ) {
                case 1: // west side
                    xPos = -20;
                    yPos = ( ( Math.random() * ( ig.system.height - 80 ) ) + 50 );
                    break;
                
                case 0: // east side
                default:
                    xPos = ( ig.system.width + 20 );
                    yPos = ( ( Math.random() * ( ig.system.height - 80 ) ) + 50 );
            }
            
            // spawn new enemy
            ig.game.spawnEntity( EntityArcher, xPos, yPos );
        },
        
        // add Knight
        addEnemyKnight: function() {
        
            var xPos = 0;
            var yPos = 0;
            
            // 0, 1, or 2
            var rand = Math.round( Math.random() * 2 );
            
            // set x/y position
            switch ( rand ) {
                case 2: // west side
                    xPos = -20;
                    yPos = ( ( Math.random() * ( ig.system.height - 50 ) ) + 50 );
                    break;
                    
                case 1: // south side
                    xPos = ( Math.random() * ig.system.width );
                    yPos = ( ig.system.height + 20 );
                    break;
                    
                case 0: // east side
                default:
                    xPos = ( ig.system.width + 20 );
                    yPos = ( ( Math.random() * ( ig.system.height - 50 ) ) + 50 );
            }
            
            // spawn new enemy
            ig.game.spawnEntity( EntityKnight, xPos, yPos );
        },
        
        // the giant crab was destroyed
        gameOver: function() {
            this.isGameOver = true;
        },
        
        drawGameOverText:function() {
            
            var msg = this.gameOverText();
            
            // draw text background
            var yStart = ( ig.system.height / 2 );
            var yCount = 1;
            var xCount = Math.ceil( ig.system.width / this.imgTextBg.width );
            for (var y = 0; y <= yCount; y++) {
                for (var x = 0; x <= xCount; x++) {
                    this.imgTextBg.draw( ( this.imgTextBg.width * x ), ( ( this.imgTextBg.width * y ) + yStart ) );
                }
            }
            
            // draw help text
            this.font04b03.draw( msg, ( ig.system.width / 2 ), ( ( ig.system.height / 2 ) + 2 ), ig.Font.ALIGN.CENTER );
        },
        
        gameOverText:function() {
            var msg = '';
            msg += 'The Giant Crab in this time period was defeated. ';
            msg += '\nReturn to the time selection screen and try again. ';
            return msg;
        },
        
    });
});