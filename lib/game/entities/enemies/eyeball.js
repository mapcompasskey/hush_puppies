ig.module(
    'game.entities.enemies.eyeball'
)
.requires(
    'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.shooter',
    'game.entities.enemies.eyeball-beam'
)
.defines(function() {
    EntityEyeball = EntityShooter.extend({
        
        size: {x: 10, y: 10},
        offset: {x: 3, y: 3},
        animSheet: new ig.AnimationSheet( 'media/eyeball.png', 16, 16 ),
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        // add custom entity animations
        addAnimations: function() {
            this.addAnim( 'idle', 0.5, [0, 1] );
            this.addAnim( 'walk', 0.5, [1, 2] );
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
                    var xPos = this.pos.x + ( this.size.x / 2 );
                    var yPos = this.pos.y + ( this.size.y / 2 );
                    ig.game.spawnEntity( EntityEyeballBeam, xPos, yPos );
                }
            }
        },
        
    });
    
    ig.EntityPool.enableFor( EntityEyeball );
});