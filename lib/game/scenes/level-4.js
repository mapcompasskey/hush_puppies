ig.module(
    'game.scenes.level-4'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.bandit',
    'game.entities.enemies.outlaw'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 4
    // The Old West: Bandits and Outlaws
    // --------------------------------------------------------------------------
    //
    Level4 = BaseLevel.extend({
        
        skyline: 4,
        levelCode: 'level_4',
        enemyStrengthMax: 5,//50,
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityOutlaw, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityBandit, x, y );
        },
        
    });
});