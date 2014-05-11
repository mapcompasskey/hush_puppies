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
        
        size: {x: 14, y: 14},
        offset: {x: 0, y: 0},
        maxVel: {x: 50, y: 50},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 50,
        health: 4,
        maxHealth: 4,
        animSheet: new ig.AnimationSheet( 'media/knight.png', 14, 14 ),
        
        canAttack: false,
        attackTime: 0.5,
        timerAttack: new ig.Timer( 0 ), 
        
        walking: false,
        attacking: false,
        hurting: false,
        dying: false,
        
        type: ig.Entity.TYPE.B, // add to enemy group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        collides: ig.Entity.COLLIDES.PASSIVE,
        
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
            //this.moveToPoint = new MoveToPoint();
            
            // reset parameters
            this.maxVel = {x: 50, y: 50};
            this.health = this.maxHealth;
            
            this.friction.x = 0;
            this.friction.y = 0;
            
            this.walking = false;
            this.attacking = false;
            this.hurting = false;
            this.dying = false;
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
        },
        
        // checking if idle or moving left/right
        isMoving: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
            this.vel.x = 0;
            this.vel.y = 0;
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
            //this.vel.x = ( from.flip ? -80 : 80 );
            //this.vel.y = -10;
            this.vel.x = ( from.pos.x < this.pos.x ? 10 : -10 );
            
            return true;
        }
        
    });
    
    ig.EntityPool.enableFor( EntityKnight );
});