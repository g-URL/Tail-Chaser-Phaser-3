const CARDINAL_DIRECTIONS = ['north', 'east', 'south', 'west'];
const KITTEN_COLOURS = ['black', 'grey', 'orange'];

class CatNode extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key='cats', frame=null, type=null, direction=null,  leader=null, follower=null) {
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
    // spawning outside of board at (680,680) prevents accidental collision with mother before the game starts
    constructor(scene, x=680, y=680, key, frame, type, direction, leader, follower) {
        super(scene, x, y, key, frame, type, direction, leader, follower);

        this.randomizeKitten();
    }

    randomizeKitten() {
        this.type = 'kitten_' + KITTEN_COLOURS[Phaser.Math.Between(0,2)];
        this.setFrame(this.type + '_' + CARDINAL_DIRECTIONS[Phaser.Math.Between(0,3)] + '_0.png');
    }
}


class MotherNode extends CatNode {
    // spawning mother in middle of board (320,320)
    constructor(scene, x=320, y=320, key, frame='mother_south_0.png', type='mother', direction=null, leader=null, follower=null, tail=null, steps=33) {
        super(scene, x, y, key, frame, type, direction, leader, follower);

        this.tail = tail;
        this.steps = steps;

        this.play('mother_sleepy');
    }
}