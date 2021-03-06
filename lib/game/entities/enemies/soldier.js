ig.module(
    'game.entities.enemies.soldier'
)
.requires(
    'impact.entity',
    'plugins.move-to-point'
)
.defines(function() {
    EntitySoldier = ig.Entity.extend({
        
        size: {x: 10, y: 12},
        offset: {x: 4, y: 4},
        maxVel: {x: 100, y: 100},
        flip: false,
        speed: 20,
        health: 2,
        maxHealth: 2,
        animSheet: null,
        
        name: 'soldier',
        canAttack: false,
        attackTime: 0.5,
        timerAttack: new ig.Timer( 0 ), 
        
        hurting: false,
        dying: false,
        walking: false,
        attacking: false,
        
        type: ig.Entity.TYPE.B, // add to enemy group
        checkAgainst: ig.Entity.TYPE.A, // check collisions against friendly group
        collides: ig.Entity.COLLIDES.NEVER, // don't collide with anything
        
        init: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
            
            // add the animations
            this.addAnimations();
            this.prepareEntity();
        },
        
        // add custom entity animations
        addAnimations: function() {
            //this.addAnim( 'idle', 1.0, [0], true );
            //this.addAnim( 'walk', 0.2, [1, 2] );
            //this.addAnim( 'attack', 0.5, [3, 4] );
            //this.addAnim( 'hurt', 0.1, [5, 5, 5], true );
            //this.addAnim( 'dead', 0.1, [5, 6, 6], true );
        },
              
        // reset parameters
        prepareEntity: function() {
            
            if ( this.animSheet === null ) {
                this.kill();
            }
            
            // include movement class
            this.moveToPoint = new MoveToPoint();
            
            // reset parameters
            this.health = this.maxHealth;
            
            this.hurting = false;
            this.dying = false;
            this.walking = false;
            this.attacking = false;
            
            // increment enemy counter
            ig.game.soldiersCounter++;
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
            this.isHurting();
            this.isAttacking();
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
                    }
                }
            }
            
        },
        
        // is attacking
        isAttacking: function() {
        
            if ( this.hurting || this.dying ) {
                return;
            }
            
            // if touching the giant crab
            if ( ig.game.giantCrab ) {
                this.attacking = this.touches( ig.game.giantCrab );
            }
            
            // if entity can attack
            if ( this.canAttack ) {
                if ( this.attacking ) {
                    this.canAttack = false;
                    this.timerAttack = new ig.Timer( this.attackTime ); // resetting the timer affects all entities
                }
            }
            // else, entity can't attack again for a moment
            else {
                if ( this.timerAttack.delta() > 0 ) {
                    this.canAttack = true;
                }
            }
            
        },
        
        // is moving
        isMoving: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
            if ( this.attacking ) {
                this.vel.x = 0;
                this.vel.y = 0;
                return;
            }
            
            // if not walking, set destination
            if ( ! this.walking ) {
                if ( ig.game.giantCrab ) {
                    
                    var offset = {x:0, y:0};
                    
                    // if below the crab
                    if ( this.pos.y > ( ig.game.giantCrab.pos.y + ig.game.giantCrab.size.y ) ) {
                        offset.x = ( Math.random() * ig.game.giantCrab.size.x );
                        offset.y = ig.game.giantCrab.size.y;
                    }
                    else {
                        // if to the right of the crab
                        if ( this.pos.x > ig.game.giantCrab.pos.x ) {
                            offset.x = ig.game.giantCrab.size.x;
                            offset.y = ( Math.random() * ig.game.giantCrab.size.y );
                        }
                        // else, if to the left of the crab
                        else {
                            offset.x = 0;
                            offset.y = ( Math.random() * ig.game.giantCrab.size.y );
                        }
                    }
                    
                    // set direction facing
                    var xGiantCrabCenter = ( ig.game.giantCrab.pos.x + ( ig.game.giantCrab.size.x / 2 ) );
                    this.flip = ( ( this.pos.x > xGiantCrabCenter ) ? true : false );
                    
                    // set the walking destination
                    this.moveToPoint.setDestination( ig.game.giantCrab.pos, offset );
                    this.walking = true;
                }
            }
            
            // if walking, move towards the destination
            if ( this.walking ) {
                this.vel = this.moveToPoint.getVelocity( this.speed, this );
            }
            
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
            else if ( this.attacking ) {
                if ( this.currentAnim != this.anims.attack ) {
                    this.currentAnim = this.anims.attack.rewind();
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
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
            // damage player
            if ( other.name == 'player' ) {
                other.receiveDamage( 1, this );
            }
            // else, damage giant crab
            else if ( other.name == 'giant-crab' ) {
                if ( this.attacking && this.canAttack ) {
                    other.receiveDamage( 1, this );
                }
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
                ig.game.soldiersCounter--;
                ig.game.enemiesDefeated++;
                return true;
            }
            
            // update state
            this.hurting = true;
            
            // apply knockback
            this.vel.x = ( from.vel.x / 10 );
            this.vel.y = ( from.vel.y / 10 );
            
            return true;
        },
        
    });
});