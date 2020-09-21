class CatNode extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        //super(scene, x, y, 'mother', direction, previous=null, next=null)

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);
        scene.physics.add.existing(this);


       // this.play(this.direction);
        // add cat to linked list or group
    }

    update(){
     //   this.play(this.direction);
    }
}