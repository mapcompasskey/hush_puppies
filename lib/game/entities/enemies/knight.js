ig.module(
    'game.entities.enemies.knight'
)
.requires(
    'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.soldier'
)
.defines(function() {
    EntityKnight = EntitySoldier.extend({
        
        animSheet: new ig.AnimationSheet( 'media/knight.png', 16, 16 ),
        
        init: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
        },
        
        // add custom entity animations
        addAnimations: function() {
            this.addAnim( 'idle', 1.0, [0], true );
            this.addAnim( 'walk', 0.2, [2, 3] );
            this.addAnim( 'attack', 0.5, [1, 0] );
            this.addAnim( 'hurt', 0.1, [4, 4, 4], true );
            this.addAnim( 'dead', 0.1, [4, 5, 5], true );
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function( x, y, settings ) {
            this.parent( x, ( y - this.size.y ), settings );
            this.prepareEntity();
        },
        
    });
    
    ig.EntityPool.enableFor( EntityKnight );
});