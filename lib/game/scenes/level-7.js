ig.module(
    'game.scenes.level-7'
)
.requires(
    'game.scenes.base-level',
    'game.entities.enemies.swashbuckler',
    'game.entities.enemies.pirate'
)
.defines(function() {

    //
    // --------------------------------------------------------------------------
    // Level 7
    // Golden Age of Piracy: Pirates and Swashbucklers
    // --------------------------------------------------------------------------
    //
    Level7 = BaseLevel.extend({
        
        skyline: 7,
        levelCode: 'level_7',
        
        // initialize your game here
        init: function() {
            this.parent();
        },
        
        // spawn shooter type enemy
        spawnEnemyShooter: function( x, y ) {
            ig.game.spawnEntity( EntityPirate, x, y );
        },
        
        // spawn shooter type enemy
        spawnEnemySoldier: function( x, y ) {
            ig.game.spawnEntity( EntitySwashbuckler, x, y );
        },
        
    });
});