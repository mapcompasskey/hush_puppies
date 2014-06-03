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
        imgSkyline: new ig.Image('media/skyline.png'),
        
        skyline: 0,
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        _wmIgnore: true, // tells Weltmeister editor to ignore this entity
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            // update skyline tile
            if ( settings.skyline ) {
                this.skyline = settings.skyline;
            }
        },
        
        draw: function() {
            
            switch ( this.skyline )
            {
                case 1: // castle skyline
                    this.imgSkyline.drawTile( 0, 0, 0, 300, 50 );
                    break;
                    
                case 2: // egyptian skyline
                    this.imgSkyline.drawTile( 0, 0, 1, 300, 50 );
                    break;
                    
                case 3: // prehistoric skyline
                    this.imgSkyline.drawTile( 0, 0, 2, 300, 50 );
                    break;
                    
                case 4: // wild west skyline
                    this.imgSkyline.drawTile( 0, 0, 3, 300, 50 );
                    break;
            }
        },
        
    });
});