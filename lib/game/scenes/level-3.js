ig.module(
    'game.scenes.level-3'
)
.requires(
    'game.scenes.base-level',
    'game.entities.caveman',
    'game.entities.dinosaur'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 3
    // Prehistoric: Cavemen and Dinosaurs
    // --------------------------------------------------------------------------
    //
    Level3 = BaseLevel.extend({
        
        skyline: 3,
        levelCode: 'level_3',
        enemyStrengthMax: 5,//50,
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityDinosaur, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntityCaveman, x, y );
        },
        
    });
});