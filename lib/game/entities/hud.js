ig.module(
    'game.entities.hud'
)
.requires(
    'impact.entity',
	'impact.font'
)
.defines(function() {
    EntityHud = ig.Entity.extend({
        
        size: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        font04b03: new ig.Font( 'media/font.04b03.png' ),
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        _wmIgnore: true, // tells Weltmeister editor to ignore this entity
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        update: function() {
        
            if ( ig.game.isPaused ) {
                return;
            }
            
            this.parent();
        },
        
        // override default draw method
        draw: function() {
            this.drawGiantCrabHealth();
            this.drawEnemyStrength();
        },
        
        // display the giant crab's health
        drawGiantCrabHealth: function() {
            if ( ig.game.giantCrab ) {
                this.font04b03.draw( 'CRAB ' + ig.game.giantCrab.percent + '%', 5, 5, ig.Font.ALIGN.LEFT );
            }
        },
        
        // display the enemies remaining strength
        drawEnemyStrength: function() {
            var maxStrength = 100;
            var strength = ig.game.enemiesDefeated;
            strength = maxStrength - strength;
            strength = ( strength < 0 ? 0 : strength );
            var percent = Math.ceil( strength * ( 100 / maxStrength ) );
            this.font04b03.draw( percent + '% ENEMY', ( ig.system.width - 5 ), 5, ig.Font.ALIGN.RIGHT);
        },
        
    });
});