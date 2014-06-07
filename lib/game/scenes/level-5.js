ig.module(
    'game.scenes.level-5'
)
.requires(
    'game.scenes.base-level',
    'game.entities.indian-tomahawk',
    'game.entities.indian-spearman'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 5
    // Pre-Columbian: Indian Tomahawk and Indian Spearman
    // --------------------------------------------------------------------------
    //
    Level5 = BaseLevel.extend({
        
        skyline: 5,
        levelCode: 'level_5',
        enemyStrengthMax: 5,//50,
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityIndianSpearman, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityIndianTomahawk, x, y );
        },
        
    });
});