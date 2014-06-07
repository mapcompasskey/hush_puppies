ig.module(
    'game.entities.enemies.slinger'
)
.requires(
    'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.shooter',
    'game.entities.enemies.slinger-rock'
)
.defines(function() {
    EntitySlinger = EntityShooter.extend({
        
        animSheet: new ig.AnimationSheet( 'media/slinger.png', 16, 16 ),
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        // add custom entity animations
        addAnimations: function() {
            this.addAnim( 'idle', 1.0, [0], true );
            this.addAnim( 'walk', 0.2, [1, 2] );
            this.addAnim( 'attack', 0.2, [3, 4, 5, 3, 4, 5, 6], true );
            this.addAnim( 'hurt', 0.1, [7, 7, 7], true );
            this.addAnim( 'dead', 0.1, [7, 8, 8], true );
        },
        
        // resurrect this entity from the entity pool (pooling enabled below)
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
        
        // check if spawning bullet entity
        checkAttacking: function() {
            if ( ! this.hasAttacked ) {
                if ( this.currentAnim.frame == 6 ) {
                    this.hasAttacked = true;
                    var xPos = this.pos.x + 6;
                    var yPos = this.pos.y + 6;
                    ig.game.spawnEntity( EntitySlingerRock, xPos, yPos );
                }
            }
        },
        
    });
    
    ig.EntityPool.enableFor( EntitySlinger );
});