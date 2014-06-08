ig.module(
	'game.entities.enemies.slinger-rock'
)
.requires(
	'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.shooter-bullet'
)
.defines(function() {
    EntitySlingerRock = EntityShooterBullet.extend({
        
        animSheet: new ig.AnimationSheet( 'media/enemies/shooter-bullet.png', 3, 3 ),
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        // resurrect this entity from the entity pool
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
    });
    
    ig.EntityPool.enableFor( EntitySlingerRock );
});