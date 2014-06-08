ig.module(
	'game.entities.enemies.indian-spear'
)
.requires(
	'impact.entity',
    'impact.entity-pool',
    'game.entities.enemies.shooter-bullet'
)
.defines(function() {
    EntityIndianSpear = EntityShooterBullet.extend({
        
        offset: {x: 5, y: 2},
        animSheet: new ig.AnimationSheet( 'media/indian-spear.png', 13, 7 ),
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
        
        // resurrect this entity from the entity pool
        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.prepareEntity();
        },
        
        // update the entity's rotation and hitbox
        setRotation: function( radians ) {
            // set entity rotation
            this.angle = radians;
            
            // position collision box
            /*
            x = h + r * cos(θ) 
            y = k + r * sin(θ) 
            where (h, k) is the center of the circle, r is the radius, and x and y are the co-ordinates of the point
            */
            var radius = 3;
            var x = ( radius * Math.cos(radians) );
            var y = ( radius * Math.sin(radians) );
            this.offset.x = ( this.animSheet.width / 2 ) - ( this.size.x / 2 ) + x;
            this.offset.y = ( this.animSheet.height / 2 ) - ( this.size.y / 2 ) + y;
        },
        
    });
    
    ig.EntityPool.enableFor( EntityIndianSpear );
});