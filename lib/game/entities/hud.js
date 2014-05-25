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
        font04b03red: new ig.Font( 'media/font.04b03-red.png' ),
        
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
            this.drawEnemyHealth();
            
            // draw help text
            this.font04b03red.draw( 'WASD to move - MOUSE to aim and fire', 5, ( ig.system.height - 10 ) );
        },
        
        // display the giant crab's health
        drawGiantCrabHealth: function() {
            if ( ig.game.giantCrab ) {
                this.font04b03.draw( 'CRAB ' + ig.game.giantCrab.percent + '%', 5, 5, ig.Font.ALIGN.LEFT );
            }
        },
        
        drawEnemyHealth: function() {
            var maxHealth = 100;
            var health = ig.game.enemiesDefeated;
            health = maxHealth - health;
            health = ( health < 0 ? 0 : health );
            var percent = Math.ceil( health * ( 100 / maxHealth ) );
            this.font04b03.draw( percent + '% ENEMY', ( ig.system.width - 5 ), 5, ig.Font.ALIGN.RIGHT);
        },
        
    });
});