ig.module(
    'game.scenes.level-8'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.slime',
    'game.entities.enemies.eyeball'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 8
    // Unknown - Slime and Eyeball
    // --------------------------------------------------------------------------
    //
    Level8 = BaseLevel.extend({
        
        skyline: 8,
        levelCode: 'level_8',
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityEyeball, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntitySlime, x, y );
        },
        
    });
});