ig.module(
    'game.entities.player-wall'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityPlayerWall = ig.Entity.extend({
        
        size: {x: 10, y: 10},
        offset: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        direction: 'x',
        
        checkAgainst: ig.Entity.TYPE.A,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            if ( settings.direction ) {
                this.direction = settings.direction;
            }
        },
        
        // called when overlapping with ig.Entity.TYPE.A entities
        check: function( other ) {
            if ( other.playerWallCollision ) {
                other.playerWallCollision( this.direction );
            }
        }
    });
});