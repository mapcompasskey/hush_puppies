ig.module(
    'game.scenes.level-5'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.indian',
    'game.entities.enemies.warrior'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 5
    // Pre-Columbian: Indians and Warriors
    // --------------------------------------------------------------------------
    //
    Level5 = BaseLevel.extend({
        
        skyline: 5,
        levelCode: 'level_5',
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityWarrior, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityIndian, x, y );
        },
        
    });
});