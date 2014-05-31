ig.module(
    'game.entities.dinosaur'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function() {
    EntityDinosaur = ig.Entity.extend({
        
        size: {x: 11, y: 10},
        offset: {x: 10, y: 10},
        maxVel: {x: 100, y: 100},
        accel: {x: 0, y: 0},
        flip: false,
        speed: 60,
        health: 2,
        maxHealth: 2,
        animSheet: new ig.AnimationSheet( 'media/dinosaur.png', 22, 22 ),
        
        name: 'shooter',
        canAttack: false,
        xVelocity: 0,
        yVelocity: 0,
        decayTime: 6.0,
        timerDecay: new ig.Timer( 0 ),
        
        hurting: false,
        dying: false,
        walking: false,
        
        type: ig.Entity.TYPE.B, // add to enemy group
        checkAgainst: ig.Entity.TYPE.A, // check collisions against friendly group
        collides: ig.Entity.COLLIDES.NEVER, // don't collide with anything
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            // add the animations
            this.addAnim( 'idle', 1.0, [0], true );
            this.addAnim( 'walk', 0.2, [0, 1] );
            this.addAnim( 'hurt', 0.1, [2, 2, 2], true );
            this.addAnim( 'dead', 0.1, [2, 3, 3], true );
            this.prepareEntity();
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
              
        // reset parameters
        prepareEntity: function() {
            
            // reset parameters
            this.health = this.maxHealth;
            this.canAttack = true;
            this.timerDecay = new ig.Timer( this.decayTime );
            
            this.hurting = false;
            this.dying = false;
            this.walking = true;
            
            // increment enemy counter
            ig.game.shootersCounter++;
            
            // move towards player
            if ( ig.game.player ) {
                
                // get angle from entity to player in radians
                var mx = ( ig.game.player.pos.x + ( ig.game.player.size.x / 2 ) );
                var my = ig.game.player.pos.y;
                var radians =  Math.atan2(
                    ( my - this.pos.y ),
                    ( mx - this.pos.x )
                );
                
                // use angle to determine velocity
                var xVel = ( Math.cos( radians ) * this.speed );
                var yVel = ( Math.sin( radians ) * this.speed );
                this.xVelocity = xVel;
                this.yVelocity = yVel;
            }
            
            // set direction facing
            this.flip = ( ( this.pos.x < 0 ) ? false : true );
            
            // update bounding box
            this.offset.x = ( this.flip ? 1 : 10 );
        },
        
        update: function() {
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            if ( ig.game.isGameOver ) {
                return;
            }
             
            if ( ig.game.isLevelComplete ) {
                this.vel.x = 0;
                this.vel.y = 0;
                this.dying = true;
            }
            
            this.checkStatus();
            this.parent();
        },
        
        // check entity status
        checkStatus: function() {
            
            // if decayed
            if ( this.timerDecay.delta() > 0 ) {
                ig.game.shootersCounter--;
                this.kill();
            }
            
            this.isHurting();
            this.isMoving();
            this.animate();
        },
        
        // check if hurting
        isHurting: function() {
            
            // if dying, kill this entity when the animation ends
            if ( this.dying ) {
                if ( this.currentAnim == this.anims.dead ) {
                    if ( this.currentAnim.loopCount ) {
                        this.kill();
                    }
                }
            }
            
            // stop hurting when the animation ends
            if ( this.hurting ) {
                if ( this.currentAnim == this.anims.hurt ) {
                    if ( this.currentAnim.loopCount ) {
                        this.hurting = false;
                        this.canAttack = true;
                    }
                }
            }
            
        },
        
        // is moving
        isMoving: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
            // keep entity off the skyline
            if ( this.pos.y < 40 ) {
                this.yVelocity = 0
            }
            
            // set movement speed
            this.vel.x = this.xVelocity;
            this.vel.y = this.yVelocity;
            
        },
        
        // update entity animation
        animate: function() {
            
            // update entitiy opacity
            if ( this.hurting || this.dying ) {
                this.currentAnim.alpha = 0.5;
            }
            else if ( this.currentAnim.alpha < 1 ) {
                this.currentAnim.alpha = 1;
            }
            
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
            else if ( this.walking ) {
                if ( this.currentAnim != this.anims.walk ) {
                    this.currentAnim = this.anims.walk.rewind();
                }
            }
            else {
                if ( this.currentAnim != this.anims.idle ) {
                    this.currentAnim = this.anims.idle.rewind();
                }
            }
            
            // update facing direction
            this.currentAnim.flip.x = this.flip;
        },
        
        // called during a .checkAgainst collision
        check: function( other ) {
            if ( this.canAttack ) {
                other.receiveDamage( 1, this );
            }
        },
        
        // called by other entity during a .checkAgainst collision
        receiveDamage: function( amount, from ) {
            
            if ( this.hurting || this.dying ) {
                return false;
            }
            
            // reduce health
            this.health -= amount;
            
            // if dead
            if ( this.health <= 0 ) {
                this.vel.x = 0;
                this.vel.y = 0;
                this.dying = true;
                ig.game.shootersCounter--;
                return true;
            }
            
            // update state
            this.hurting = true;
            this.canAttack = false;
            
            // apply knockback
            this.vel.x = ( from.vel.x / 10 );
            this.vel.y = ( from.vel.y / 10 );
            
            return true;
        },
        
    });
    
    ig.EntityPool.enableFor( EntityDinosaur );
});