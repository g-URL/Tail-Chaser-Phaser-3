class CatNode extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame, direction, leader = null, follower = null) {
        super(scene, x, y, key, frame);

        this.direction = direction;
        this.leader = null;
        this.follower = null;
        this.tail = null;

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update(){
        this.play(this.direction, this);
    }
}