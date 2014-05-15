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
        hurting: false,
        dying: false,
        
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
            
            // game instance of this entity
            ig.game.giantCrab = this;
        },
        
        update: function() {
            
            if ( ig.game.isPaused ) {
                return;
            }
            
            this.checkStatus();
            this.parent();
            
            // reset hurting
            this.hurting = false;
        },
        
        // check entity status
        checkStatus: function() {
            this.animate();
        },
        
        // update entity animation
        animate: function() {
            
            // update animation state
            if ( this.hurting ) {
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
            
            // if knight is attacking
            if ( other.name == 'knight' ) {
                this.hurting = true;
           }
        },
        
        // called by other entity during a .checkAgainst collision
        receiveDamage: function( amount, from ) {
            console.log('CRAB: OUCH!');
        },
        
    });
});