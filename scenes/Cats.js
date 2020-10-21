class CatNode extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame, type, direction=null,  leader=null, follower=null) {
        super(scene, x, y, key, frame);

        this.type = type;
        this.direction = direction;
        this.leader = leader;
        this.follower = follower;

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update(){
        this.play(this.type + '_' + this.direction, this);
    }
}

class RandomKitten extends CatNode {
    
}

class MotherNode extends CatNode {
    constructor(scene, x, y, key, frame, type='mother', direction=null, leader=null, follower=null, tail=null, steps=33) {
        super(scene, x, y, key, frame, type, direction, leader, follower);

        this.tail = tail;
        this.steps = steps;
    }
}