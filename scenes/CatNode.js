class CatNode extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame, direction, type = 'mother', colour = null, leader = null, follower = null) {
        super(scene, x, y, key, frame);

        this.direction = direction;
        this.type = type;
        this.colour = colour;
        this.leader = null;
        this.follower = null;
        this.tail = null;

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update(){
        this.description = this.type;
        
        if (this.type == 'kitten') {
            this.description = this.description.concat('_', this.colour);
            //console.log('KITTEN DETECTED');
        }
        this.description = this.description.concat('_', this.direction);
        //console.log('description: ', this.description);
        this.play(this.description, this);
    }
}