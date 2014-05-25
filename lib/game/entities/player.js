ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.player-bullet'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        
        size: {x: 8, y: 12},
        offset: {x: 3, y: 2},
        maxVel: {x: 100, y: 100},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 50,
        health: 4,
        maxHealth: 4,
        animSheet: new ig.AnimationSheet( 'media/player.png', 14, 14 ),
        
        name: 'player',
        isInvincible: false,
        direction: 'E',
        canAttack: false,
        attackTime: 0.4,
        timerAttack: new ig.Timer( 0 ), 
        recoverTime: 0.9,
        timerRecover: new ig.Timer( 0 ), 
        
        hurting: false,
        dying: false,
        recovering: false,
        walking_x: false,
        walking_y: false,
        attacking: false,
        
        type: ig.Entity.TYPE.A, // add to friendly group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
            
            // add the animations
            this.addAnim( 'idleE',  1.0, [0], true );
            this.addAnim( 'walkE',  0.2, [1, 2] );
            this.addAnim( 'idleSE', 1.0, [3], true );
            this.addAnim( 'walkSE', 0.2, [4, 5] );
            this.addAnim( 'idleS',  1.0, [6], true );
            this.addAnim( 'walkS',  0.2, [7, 8] );
            this.addAnim( 'idleSW', 1.0, [9], true );
            this.addAnim( 'walkSW', 0.2, [10, 11] );
            this.addAnim( 'idleW',  1.0, [12], true );
            this.addAnim( 'walkW',  0.2, [13, 14] );
            this.addAnim( 'idleNW', 1.0, [15], true );
            this.addAnim( 'walkNW', 0.2, [16, 17] );
            this.addAnim( 'idleN',  1.0, [18], true );
            this.addAnim( 'walkN',  0.2, [19, 20] );
            this.addAnim( 'idleNE', 1.0, [21], true );
            this.addAnim( 'walkNE', 0.2, [22, 23] );
            
            this.addAnim( 'hurt', 0.1, [24, 24] );
            this.addAnim( 'dead', 0.3, [24, 25, 26, 27, 27, 27, 27, 27] );
            
            // game instance of this entity
            ig.game.player = this;
        },
        
        update: function() {
            
            if ( ig.game.isPaused ) {
                return;
            }
            if ( ig.game.isGameOver ) {
                this.currentAnim = this.anims.hurt.rewind();
                return;
            }
            
            this.checkStatus();
            this.checkPosition();
            this.parent();
        },
        
        // check entity status
        checkStatus: function() {
            
            if ( ig.input.mouse ) {
            
                // get angle from player to mouse
                var mx = ( ig.input.mouse.x + ig.game.screen.x );
                var my = ( ig.input.mouse.y + ig.game.screen.y );
                var radians =  Math.atan2(
                    my - ( this.pos.y + ( this.size.y / 2 ) ),
                    mx - ( this.pos.x + ( this.size.x / 2 ) )
                );
                
                // update the player's direction
                var deg = radians.toDeg();
                if ( deg >= 0 && deg < 22.5 ) {
                    this.direction = 'E';
                }
                if ( deg >= 22.5 && deg < 67.5 ) {
                    this.direction = 'SE';
                }
                else if ( deg >= 67.5 && deg < 112.5 ) {
                    this.direction = 'S';
                }
                else if ( deg >= 112.5 && deg < 157.5 ) {
                    this.direction = 'SW';
                }
                else if ( deg >= 157.5 && deg < 180 ) {
                    this.direction = 'W';
                }
                else if ( deg >= -180 && deg < -157.5 ) {
                    this.direction = 'W';
                }
                else if ( deg >= -157.5 && deg < -112.5 ) {
                    this.direction = 'NW';
                }
                else if ( deg >= -112.5 && deg < -67.5 ) {
                    this.direction = 'N';
                }
                else if ( deg >= -67.5 && deg < -22.5 ) {
                    this.direction = 'NE';
                }
                else if ( deg >= -22.5 && deg < 0 ) {
                    this.direction = 'E';
                }
            }
            
            // toggle invincibility
            if ( ig.input.pressed('invincible') ) {
                this.isInvincible = this.isInvincible ? false : true;
            }
            
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
                        //ig.game.player = null;
                        //this.kill();
                        
                        // *just reset the player when killed
                        this.dying = false;
                        this.health = this.maxHealth;
                        this.recovering = true;
                        this.timerRecover = new ig.Timer( this.recoverTime );
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
            
            // invincbile for a bit after taking damage
            if ( this.recovering ) {
                if ( this.timerRecover.delta() > 0 ) {
                    this.recovering = false;
                }
            }
            
        },
        
        // is attacking
        isAttacking: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
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
            
        },
        
        // checking if idle or moving left/right
        isMoving: function() {
            
            if ( this.hurting || this.dying ) {
                return;
            }
            
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
        },
        
        // update entity animation
        animate: function() {
            
            // update entitiy alpha
            if ( this.recovering || this.isInvincible ) {
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
            else if ( this.walking_x || this.walking_y ) {
                if ( this.anims['walk' + this.direction] ) {
                    if ( this.currentAnim != this.anims['walk' + this.direction] ) {
                        this.currentAnim = this.anims['walk' + this.direction].rewind();
                    }
                }
            }
            else {
                if ( this.anims['idle' + this.direction] ) {
                    if ( this.currentAnim != this.anims['idle' + this.direction] ) {
                        this.currentAnim = this.anims['idle' + this.direction].rewind();
                    }
                }
            }
            
        },
        
        // check if this entity needs repositioned
        checkPosition: function() {
            
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
            
        },
        
        // called when overlapping with an entity whose .checkAgainst property matches this entity
        receiveDamage: function( amount, from ) {
            
            if ( this.recovering || this.hurting || this.dying || this.isInvincible ) {
                return;
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
            this.recovering = true;
            this.timerRecover = new ig.Timer( this.recoverTime );
            
            // apply knockback
            this.vel.x = ( from.vel.x / 10 );
            this.vel.y = ( from.vel.y / 10 );
            
            return true;
        }
        
    });
});