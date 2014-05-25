ig.module(
    'game.entities.giant-crab'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityGiantCrab = ig.Entity.extend({
        
        size: {x: 30, y: 16},
        offset: {x: 5, y: 4},
        maxVel: {x: 0, y: 0},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 0,
        animSheet: new ig.AnimationSheet( 'media/giant-crab.png', 40, 24 ),
        
        name: 'giant-crab',
        health: 100,
        maxHealth: 100,
        percent: 100,
        
        dying: false,
        hurting: false,
        
        type: ig.Entity.TYPE.A, // add to friendly group
        checkAgainst: ig.Entity.TYPE.B, // check collisions against enemy group
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.pos.x -= ( this.size.x / 2 );
            this.pos.y -= ( this.size.y / 2 );
            
            // add the animations
            this.addAnim( 'idle', 1.0, [0], true );
            this.addAnim( 'hurt', 0.5, [1, 2] );
            this.addAnim( 'dead', 0.3, [3, 4, 5, 6], true );
            
            // game instance of this entity
            ig.game.giantCrab = this;
        },
        
        update: function() {
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            if ( ig.game.isGameOver ) {
                if ( ig.game.gameOverReason != 'giant-crab' ) {
                    return;
                }
            }
            
            this.checkStatus();
            this.parent();
            
            // reset hurting
            this.hurting = false;
        },
        
        // check entity status
        checkStatus: function() {
        
            this.isHurting();
            this.animate();
        },
                
        // check if hurting
        isHurting: function() {
            
            // if dying, kill this entity when the animation ends
            if ( this.dying ) {
                if ( this.currentAnim == this.anims.dead ) {
                    if ( this.currentAnim.loopCount ) {
                        //ig.game.giantCrab = null;
                        ig.game.gameOver( 'kill' );
                        //this.kill();
                    }
                }
            }
            
        },
        
        // update entity animation
        animate: function() {
            
            // update animation state
            if ( this.dying ) {
                if ( this.currentAnim != this.anims.dead ) {
                    this.currentAnim = this.anims.dead.rewind();
                }
            }
            else if ( this.hurting ) {
                if ( this.currentAnim != this.anims.hurt ) {
                    this.currentAnim = this.anims.hurt.rewind();
                }
            }
            else {
                if ( this.currentAnim != this.anims.idle ) {
                    this.currentAnim = this.anims.idle.rewind();
                }
            }
            
        },
        
        // called during a .checkAgainst collision
        check: function( other ) {
            
            if ( this.dying ) {
                return;
            }
            
            // if soldier is attacking
            if ( other.name == 'soldier' ) {
                this.hurting = true;
           }
        },
        
        // called by other entity during a .checkAgainst collision
        receiveDamage: function( amount, from ) {
        
            if ( this.dying ) {
                return;
            }
            
            // stop taking damage if the player is dying
            if ( ig.game.player ) {
                if ( ig.game.player.dying ) {
                    return;
                }
            }
            
            if ( from.name == 'soldier' ) {
                this.health -= 1;
                this.percent = Math.ceil( this.health * ( 100 / this.maxHealth ) );
                
                if ( this.health <= 0 ) {
                    this.health = 0;
                    this.percent = 0;
                    this.dying = true;
                    ig.game.gameOver( 'giant-crab' );
                }
            }
        },
        
    });
});