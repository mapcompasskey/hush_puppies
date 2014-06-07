ig.module(
    'game.entities.enemies.shooter'
)
.requires(
    'impact.entity',
    'plugins.move-to-point'
)
.defines(function() {
    EntityShooter = ig.Entity.extend({
        
        size: {x: 10, y: 12},
        offset: {x: 4, y: 4},
        maxVel: {x: 100, y: 100},
        flip: false,
        speed: 20,
        health: 2,
        maxHealth: 2,
        animSheet: null,
        
        name: 'shooter',
        distance: 0,
        proximity: 10,
        destination: {x:0, y:0},
        canAttack: false,
        hasAttacked: false,
        attackTime: 3.0,
        timerAttack: new ig.Timer( 1.0 ), 
        
        hurting: false,
        dying: false,
        walking: false,
        attacking: false,
        
        type: ig.Entity.TYPE.B, // add to enemy group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        collides: ig.Entity.COLLIDES.NEVER, // don't collide with anything
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            // add the animations
            this.addAnimations();
            this.prepareEntity();
        },
        
        // add custom entity animations
        addAnimations: function() {
            //this.addAnim( 'idle', 1.0, [0], true );
            //this.addAnim( 'walk', 0.2, [1, 2] );
            //this.addAnim( 'attack', 0.5, [3, 3, 4], true );
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
            
            this.distance = 0;
            this.destination = {x:0, y:0};
            this.canAttack = false;
            this.hasAttacked = false;
            
            this.hurting = false;
            this.dying = false;
            this.walking = false;
            this.attacking = false;
            
            // increment enemy counter
            ig.game.shootersCounter++;
            
            // set destination
            this.setDestination();
        },
        
        // set destination
        setDestination: function() {
            if ( ig.game.giantCrab ) {
                
                // if to the right of the crab
                if ( this.pos.x > ig.game.giantCrab.pos.x ) {
                    this.flip = true;
                    this.destination.x = this.pos.x - 50 - ( Math.random() * 20 );
                    this.destination.y = this.pos.y + ( this.size.y / 2 );
                }
                // else, if to the left of the crab
                else {
                    this.flip = false;
                    this.destination.x = this.pos.x + 50 + ( Math.random() * 20 );
                    this.destination.y = this.pos.y + ( this.size.y / 2 );
                }
                
                // set the walking destination
                this.moveToPoint.setDestination( this.destination );
            }
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
        
            // get distance to destination
            var xd = ( this.pos.x - this.destination.x ); 
            var yd = ( this.pos.y - this.destination.y );
            this.distance = Math.sqrt( ( xd * xd ) + ( yd * yd ) );
            
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
            
            // check if the player exist
            if ( ! ig.game.player ) {
                return;
            }
            
            // if can attack
            if ( this.canAttack ) {
            
                // check distance
                this.attacking = ( this.distance < this.proximity ? true : false );
                
                if ( this.currentAnim == this.anims.attack ) {
                    
                    // check if the entity can attack
                    this.checkAttacking();
                    
                    // attack animation has ended
                    if ( this.currentAnim.loopCount ) {
                        this.canAttack = false;
                        this.hasAttacked = false;
                        this.attacking = false;
                        this.timerAttack = new ig.Timer( this.attackTime ); // resetting the timer affects all entities
                    }
                }
            }
            
            // attack again when timer ends
            if ( this.timerAttack.delta() > 0 ) {
                this.canAttack = true;
            }
            
        },
        
        // spawn bullet if entity can attack
        checkAttacking: function() {
            //if ( ! this.hasAttacked ) {
                //if ( this.currentAnim.frame == 1 ) {
                    //this.hasAttacked = true;
                    //var xPos = this.pos.x;
                    //var yPos = this.pos.y;
                    //ig.game.spawnEntity( EntityArcherArrow, xPos, yPos );
                //}
            //}
        },
        
        // is moving
        isMoving: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
            // check distance
            this.walking = ( this.distance > this.proximity ? true : false );
            
            // if walking, move towards the destination
            if ( this.walking ) {
                this.vel = this.moveToPoint.getVelocity( this.speed, this );
            } else {
                this.vel.x = 0;
                this.vel.y = 0;
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
            
            // apply knockback
            this.vel.x = ( from.vel.x / 10 );
            this.vel.y = ( from.vel.y / 10 );
            
            return true;
        },
        
    });
});