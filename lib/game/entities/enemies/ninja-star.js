ig.module(
	'game.entities.enemies.ninja-star'
)
.requires(
	'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.shooter-bullet'
)
.defines(function() {
    EntityNinjaStar = EntityShooterBullet.extend({
        
        animSheet: new ig.AnimationSheet( 'media/enemies/ninja-star.png', 4, 4 ),
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        // resurrect this entity from the entity pool
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
        
        update: function() {
            this.angle += 0.1;
            this.parent();
        }
        
    });
    
    ig.EntityPool.enableFor( EntityNinjaStar );
});