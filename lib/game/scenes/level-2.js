ig.module(
    'game.scenes.level-2'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.hoplite',
    'game.entities.enemies.slinger'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 2
    // Ancient Egypt: Hoplites and Slingers
    // --------------------------------------------------------------------------
    //
    Level2 = BaseLevel.extend({
        
        skyline: 2,
        levelCode: 'level_2',
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntitySlinger, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityHoplite, x, y );
        },
        
    });
});