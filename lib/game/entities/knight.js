ig.module(
    'game.entities.knight'
)
.requires(
    'impact.entity',
    'impact.entity-pool',
    'plugins.move-to-point'
)
.defines(function() {
    EntityKnight = ig.Entity.extend({
        
        size: {x: 16, y: 16},
        offset: {x: 0, y: 0},
        maxVel: {x: 100, y: 100},
        flip: false,
        speed: 20,
        health: 2,
        maxHealth: 2,
        animSheet: new ig.AnimationSheet( 'media/knight.png', 16, 16 ),
        
        canAttack: false,
        attackTime: 0.5,
        timerAttack: new ig.Timer( 0 ), 
        
        hurting: false,
        dying: false,
        walking: false,
        attacking: false,
        
        type: ig.Entity.TYPE.B, // add to enemy group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        //collides: ig.Entity.COLLIDES.PASSIVE,
        collides: ig.Entity.COLLIDES.NEVER,
        
        init: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
            
            // add the animations
            this.addAnim( 'idle', 1.0, [0], true );
            this.addAnim( 'walk', 0.2, [1, 2] );
            this.addAnim( 'hurt', 0.1, [3, 3, 3] );
            this.addAnim( 'dead', 0.1, [3, 4, 4] );
            this.prepareEntity();
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
            this.prepareEntity();
        },
              
        // reset parameters
        prepareEntity: function() {
            
            // include movement class
            this.moveToPoint = new MoveToPoint();
            
            // reset parameters
            this.health = this.maxHealth;
            
            this.hurting = false;
            this.dying = false;
            this.walking = false;
            this.attacking = false;
            
            // increment enemy counter
            ig.game.enemiesCounter++;
        },
        
        update: function() {
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            this.checkStatus();
            this.checkPosition();
            this.parent();
        },
        
        checkStatus: function() {
            
            if ( ig.game.giantCrab ) {
                /*
                // if the player is within range, move towards the player
                var distance = this.distanceTo( ig.game.giantCrab );
                if ( distance < this.proximity ) {
                    this.moveToPoint.setDestination( ig.game.giantCrab.pos );
                    this.attacking = true;
                }
                // else, if the player is now outside the range, move towards the starting position
                else if ( this.attacking ) {
                    this.moveToPoint.setDestination( this.start );
                    this.returning = true;
                    this.attacking = false;
                }
                */
                if ( ! this.attacking ) {
                    
                    var offset = {x:0, y:0};
                    //offset.x = ( ig.game.giantCrab.size.x / 2 );
                    //offset.y = ( ig.game.giantCrab.size.y / 2 );
                    
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
                    
                    // if below the crab
                    if ( this.pos.y > ( ig.game.giantCrab.pos.y + ig.game.giantCrab.size.y ) ) {
                        offset.x = ( Math.random() * ig.game.giantCrab.size.x );
                        offset.y = ig.game.giantCrab.size.y;
                    }
                    
                    this.moveToPoint.setDestination( ig.game.giantCrab.pos, offset );
                    this.attacking = true;
                }
            }
            
            // check entity status
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
                        ig.game.enemiesCounter--;
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
            /*
            // if mouse left button held down
            this.attacking = ( ig.input.state('click') ? true : false );
            
            // if entity can attack
            if ( this.canAttack ) {
                if ( this.attacking ) {
                    this.canAttack = false;
                    this.timerAttack = new ig.Timer( this.attackTime ); // resetting the timer affects all entities
                    
                    // create player bullet entity
                    var xPos = this.pos.x + 6;
                    var yPos = this.pos.y + 6;
                    ig.game.spawnEntity( EntityPlayerBullet, xPos, yPos );
                }
            }
            // else, entity can't attack again for a moment
            else {
                if ( this.timerAttack.delta() > 0 ) {
                    this.canAttack = true;
                }
            }
            */
            
            // if attacking, move towards the destination
            if ( this.attacking ) {
                this.vel = this.moveToPoint.getVelocity( this.speed, this );
            }
        },
        
        // checking if idle or moving left/right
        isMoving: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
            //this.vel.x = this.speed;
            //this.vel.y = 0;
            
            /*
            // horizontal movement
            if ( ig.input.state('left') ) {
                this.walking_x = true;
                this.vel.x = -this.speed;
            }
            else if ( ig.input.state('right') ) {
                this.walking_x = true;
                this.vel.x = this.speed;
            }
            else {
                this.walking_x = false;
                this.vel.x = 0;
            }
            
            // vertical movement
            if ( ig.input.state('up') ) {
                this.walking_y = true;
                this.vel.y = -this.speed;
            }
            else if ( ig.input.state('down') ) {
                this.walking_y = true;
                this.vel.y = this.speed;
            }
            else {
                this.walking_y = false;
                this.vel.y = 0;
            }
            
            // reduce speed if moving diagonally
            if ( this.walking_x && this.walking_y ) {
                this.vel.x = ( this.vel.x * 0.8 );
                this.vel.y = ( this.vel.y * 0.8 );
            }
            */
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
            //this.currentAnim.flip.x = this.flip;
        },
        
        // check if this entity needs repositioned
        checkPosition: function() {
            /*
            // if this entity has moved off the map
            if ( this.pos.x < 0 ) {
                this.pos.x = ( ig.system.width / 2 );
            }
            else if ( ( this.pos.x + this.size.x ) > ig.system.width ) {
                this.pos.x = ( ig.system.width / 2 );
            }
            
            if ( this.pos.y < 0 ) {
                this.pos.y = ( ig.system.height / 2 );
            }
            else if ( ( this.pos.y + this.size.y ) > ig.system.height ) {
                this.pos.y = ( ig.system.height / 2 );
            }
            */
        },
        
        // opt out of collision
        handleMovementTrace: function( res ) {
            var mx = ( this.vel.x * ig.system.tick );
            var my = ( this.vel.y * ig.system.tick );
            this.pos.x += mx;
            this.pos.y += my;
        },
        
        // called when overlapping with an entity whose .checkAgainst property matches this entity
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
                return true;
            }
            
            // update state
            this.hurting = true;
            
            // apply knockback
            this.vel.x = ( from.pos.x < this.pos.x ? 20 : -20 );
            this.vel.y = 0;
            
            return true;
        }
        
    });
    
    ig.EntityPool.enableFor( EntityKnight );
});