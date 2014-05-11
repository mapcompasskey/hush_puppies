ig.module(
	'game.entities.player-bullet'
)
.requires(
	'impact.entity',
    'impact.entity-pool'
)
.defines(function() {
    EntityPlayerBullet = ig.Entity.extend({
        
        size: {x: 3, y: 3},
        offset: {x: 0, y: 0},
        maxVel: {x: 100, y: 100},
        flip: false,
        speed: 120,
        gravityFactor: 0,
        canDamage: false,
        decayTime: 2.0,
        timerDecay: new ig.Timer( 2.0 ),
        animSheet: new ig.AnimationSheet( 'media/player-bullet.png', 3, 3 ),
        
        type: ig.Entity.TYPE.A, // add to friendly group
        checkAgainst: ig.Entity.TYPE.B, // check collisions enemy group
        collides: ig.Entity.COLLIDES.PASSIVE,
        _wmIgnore: true,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
            
            // add the animations
            this.addAnim( 'idle', 1, [0], true );
        },
        
        // resurrect this entity from the entity pool
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
              
        // reset parameters
        prepareEntity: function() {
        
            // reset parameters
            this.canDamage = true;
            this.timerDecay = new ig.Timer( this.decayTime );
            
            // move towards mouse
            if ( ig.input.mouse ) {
                // get angle from entity to mouse in radians
                var mx = ( ig.input.mouse.x + ig.game.screen.x );
                var my = ( ig.input.mouse.y + ig.game.screen.y );
                var radians =  Math.atan2(
                    my - ( this.pos.y + ( this.size.y / 2 ) ),
                    mx - ( this.pos.x + ( this.size.x / 2 ) )
                );
                var xVel = ( Math.cos( radians ) * this.speed );
                var yVel = ( Math.sin( radians ) * this.speed );
                
                this.maxVel.x = this.vel.x = this.accel.x = xVel;
                this.maxVel.y = this.vel.y = this.accel.y = yVel;
            }
        },
        
        update: function() {
        
            if ( ig.game.isPaused ) {
                return;
            }
            
            this.checkStatus();
            this.parent();
        },
        
        checkStatus: function() {
        
            // if decayed
            if ( this.timerDecay.delta() > 0 ) {
                this.kill();
            }
            
        },
        
        // opt out of collision
        handleMovementTrace: function( res ) {
            var mx = ( this.vel.x * ig.system.tick );
            var my = ( this.vel.y * ig.system.tick );
            this.pos.x += mx;
            this.pos.y += my;
        },
        
        // when overlapping with .checkAgainst entities
        check: function( other ) {
            if ( this.canDamage ) {
                other.receiveDamage( 1, this );
            }
        },
        
        // kill player when colliding with EntityPlayerWall
        playerWallCollision: function() {
            this.kill();
        },
        
    });
    
    ig.EntityPool.enableFor( EntityPlayerBullet );
});