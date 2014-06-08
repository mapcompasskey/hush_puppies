ig.module(
    'game.scenes.level-1'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.knight',
    'game.entities.enemies.archer'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 1
    // Middle Ages: Knights and Archers
    // --------------------------------------------------------------------------
    //
    Level1 = BaseLevel.extend({
        
        skyline: 1,
        levelCode: 'level_1',
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityArcher, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityKnight, x, y );
        },
        
    });
});