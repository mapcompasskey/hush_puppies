ig.module(
    'game.entities.cloud'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function() {
    EntityCloud = ig.Entity.extend({
        
        size: {x: 78, y: 60},
        vel: {x: 10, y: 0},
        maxVel: {x: 100, y: 0},
        clouds: 1,
        imgCloud1: new ig.Image( 'media/cloud-1.png' ),
        imgCloud2: new ig.Image( 'media/cloud-2.png' ),
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        _wmIgnore: true, // tells Weltmeister editor to ignore this entity
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            if ( settings.clouds ) {
                this.clouds = settings.clouds;
            }
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            if ( settings.clouds ) {
                this.clouds = settings.clouds;
            }
        },
        
        update: function() {
        
            if ( ig.game.isPaused ) {
                return;
            }
            
            // if this entity has moved off the map
            if ( this.pos.x > ( ig.system.width + 5 ) ) {
                this.kill();
            }
            
            this.parent();
        },
        
        draw: function() {
            if ( this.clouds == 1 ) {
                this.imgCloud1.draw( this.pos.x, this.pos.y );
            } else {
                this.imgCloud2.draw( this.pos.x, this.pos.y );
            }
        },
        
    });
    
    ig.EntityPool.enableFor( EntityCloud );
});