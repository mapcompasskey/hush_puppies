ig.module(
    'game.scenes.level-6'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.shinobi',
    'game.entities.enemies.ninja'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 6
    // Feudal Japan: Shinobi and Ninja
    // --------------------------------------------------------------------------
    //
    Level6 = BaseLevel.extend({
        
        skyline: 6,
        levelCode: 'level_6',
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityNinja, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityShinobi, x, y );
        },
        
    });
});