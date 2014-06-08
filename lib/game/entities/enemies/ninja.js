ig.module(
    'game.entities.enemies.ninja'
)
.requires(
    'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.shooter',
    'game.entities.enemies.ninja-star'
)
.defines(function() {
    EntityNinja = EntityShooter.extend({
        
        animSheet: new ig.AnimationSheet( 'media/enemies/ninja.png', 16, 16 ),
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        // add custom entity animations
        addAnimations: function() {
            this.addAnim( 'idle', 1.0, [0], true );
            this.addAnim( 'walk', 0.2, [1, 2] );
            this.addAnim( 'attack', 0.5, [3, 4, 4], true );
            this.addAnim( 'hurt', 0.1, [5, 5, 5], true );
            this.addAnim( 'dead', 0.1, [5, 6, 6], true );
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
        
        // check if spawning bullet entity
        checkAttacking: function() {
            if ( ! this.hasAttacked ) {
                if ( this.currentAnim.frame == 1 ) {
                    this.hasAttacked = true;
                    var xPos = this.pos.x;
                    var yPos = this.pos.y;
                    ig.game.spawnEntity( EntityNinjaStar, xPos, yPos );
                }
            }
        },
        
    });
    
    ig.EntityPool.enableFor( EntityNinja );
});