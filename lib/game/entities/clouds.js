ig.module(
    'game.entities.clouds'
)
.requires(
    'impact.entity',
    'game.entities.cloud'
)
.defines(function() {
    EntityClouds = ig.Entity.extend({
        
        size: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        timerCloud: null,
        clouds: 1,
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        _wmIgnore: true, // tells Weltmeister editor to ignore this entity
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            if ( settings.clouds ) {
                this.clouds = settings.clouds;
            }
            
            var xPos = 0;
            var yPos = 0;
            for ( var i = 0; i < 9; i++ ) {
                this.addCloud( i );
            }
            
            // start the timer
            this.timerCloud = new ig.Timer(1);
        },
        
        update: function() {
        
            if ( ig.game.isPaused ) {
                return;
            }
            
            if ( this.timerCloud.delta() > 0 ) {
                this.addCloud(0);
                this.timerCloud.reset();
            }
            
            this.parent();
        },
        
        // position and add the entity
        addCloud: function( i ) {
            xPos = ( Math.random() * 10 ) + ( i * 40 ) - 80;
            yPos = ( Math.random() * 15 ) + ( this.clouds == 1 ? 10 : 0 ) - 35;
            var entity = ig.game.spawnEntity( EntityCloud, xPos, yPos, {clouds:this.clouds} );
            
            // add to drawing array
            if ( this.clouds == 1 ) {
                ig.game.clouds[0].push(entity);
            } else {
                ig.game.clouds[1].push(entity);
            }
        },
        
    });
});