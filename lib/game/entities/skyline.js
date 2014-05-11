ig.module(
    'game.entities.skyline'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntitySkyline = ig.Entity.extend({
        
        size: {x: 300, y: 50},
        offset: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        img: new ig.Image('media/skyline.png'),
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        _wmIgnore: true, // tells Weltmeister editor to ignore this entity
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        draw: function() {
            this.img.draw( 0, 0 );
        }
        
    });
});