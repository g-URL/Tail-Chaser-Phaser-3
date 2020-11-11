const black = 0x000000;
const white = 0xffffff;

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, text=null) {
        super(scene, x, y, width, height);

        this.text = text;

        this.setWhite();
        this.setText(this.text);

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    setText(input) {
        this.text = this.scene.add.text(this.x, this.y, input);
    }


    setBlack() {
        this.setFillStyle(black, 1);
        this.setStrokeStyle(1, white, 1);
    }

    setWhite() {
        this.setFillStyle(white, 1);
        this.setStrokeStyle(1, black, 1);
    }
}