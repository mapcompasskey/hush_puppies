ig.module(
    'game.entities.giant-crab'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityGiantCrab = ig.Entity.extend({
        
        size: {x: 40, y: 24},
        offset: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        friction: {x: 0, y: 0},
        flip: false,
        speed: 0,
        animSheet: new ig.AnimationSheet( 'media/giant-crab.png', 40, 24 ),
        
        type: ig.Entity.TYPE.A, // add to friendly group
        checkAgainst: ig.Entity.TYPE.NONE, // check collisions against nothing
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.pos.x -= ( this.size.x / 2 );
            this.pos.y -= ( this.size.y / 2 );
            
            // add the animations
            this.addAnim( 'idle', 1.0, [0], true );
            
            // game instance of this entity
            ig.game.giantCrab = this;
        },
        
        update: function() {
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            this.checkStatus();
            this.parent();
        },
        
        checkStatus: function() {
            
            // check entity status
            this.animate();
        },
        
        // update entity animation
        animate: function() {
            /*
            // update animation state
            if ( this.anims.idle ) {
                if ( this.currentAnim != this.anims.idle ) {
                    this.currentAnim = this.anims.idle.rewind();
                }
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