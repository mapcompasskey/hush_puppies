ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        
        size: {x: 12, y: 12},
        offset: {x: 0, y: 0},
        maxVel: {x: 110, y: 220},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 50,
        animSheet: new ig.AnimationSheet( 'media/player.png', 12, 12 ),
        
        walking_x: false,
        walking_y: false,
        
        type: ig.Entity.TYPE.A, // add to friendly group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
            
            // add the animations
            this.addAnim( 'idle', 1, [0], true );
            this.addAnim( 'walk', 0.2, [1, 2] );
            
            // game instance of this entity
            ig.game.player = this;
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
        
            // update direction facing
            /*if ( ! this.hurting && ! this.dying ) {
                if ( ig.input.state('left') ) {
                    this.flip = true;
                }
                else if ( ig.input.state('right') ) {
                    this.flip = false;
                }
            }*/
            
            // check entity status
            this.isMoving();
            this.animate();
        },
        
        // checking if idle or moving left/right
        isMoving: function() {
            
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
                this.vel.x = ( this.vel.x / 1.5 );
                this.vel.y = ( this.vel.y / 1.5 );
            }
        },
        
        // update entity animation
        animate: function() {
            
            // update animation state
            if ( this.walking_x || this.walking_y ) {
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
        
        // check if this entity needs repositioned
        checkPosition: function() {
            /*
            // if this entity has moved off the map
            if ( this.pos.x < ig.game.camera.offset.x.min ) {
                this.pos.x = ( ig.game.collisionMap.pxWidth - ig.game.camera.offset.x.max - ( this.size.x * 2 ) );
            }
            else if ( ( this.pos.x + this.size.x ) > ( ig.game.collisionMap.pxWidth - ig.game.camera.offset.x.max ) ) {
                this.pos.x = ( ig.game.camera.offset.x.min + this.size.x );
            }
            
            // if this entity has fallen off the map
            if ( this.pos.y > ig.game.collisionMap.pxHeight ) {
                this.pos.y = 0;
            }
            */
        },
        
        // called when overlapping with an entity whose .checkAgainst property matches this entity
        receiveDamage: function( amount, from ) {
            
            /*
            // reduce health
            this.health -= amount;
            
            // if dead
            if ( this.health <= 0 ) {
                this.vel.x = 0;
                this.vel.y = 0;
                this.maxVel.x = 0;
                this.maxVel.y = 0;
                this.dying = true;
                return true;
            }
            
            // update state
            this.hurting = true;
            
            // apply knockback
            this.vel.x = ( from.pos.x > this.pos.x ) ? -200 : 200;
            this.vel.y = -150;
            */
            
            return true;
        }
        
    });
});