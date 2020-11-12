const black = 0x000000;
const white = 0xffffff;

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, input = null, fillColor=white, fillAlpha=1) {
        super(scene, x, y, width, height, fillColor, fillAlpha);

        this.input = input;
        this.text;

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.addText();

    }

    addText() {
        this.text = this.scene.add.text(this.x, 
                                        this.y, 
                                        this.input, 
                                        {fontFamily: 'EightbyFive',
                                         fontSize: this.height+'px',    // best guess based on height of button
                                         fontStyle: 'bold',
                                         color: 'black',
                                        },
                                        this,
                                        );

        // https://www.html5gamedevs.com/topic/40451-bubble-dialog-with-text-centered-container-phaser-3140/
        this.text.setOrigin(0.5);
        this.text.setFontSize(64);

        // some elements of font are taller than others, best guess to center based on height of button
        let size = this.text.style.fontSize;
        size = size.substring(0, size.length-2);
        this.text.setY(this.y - size/8);

        //this.text.setY(this.y - this.text.style.fontSize/8);
        console.log(size);
    }

    setText(newText) {
        this.text.setText(newText);
    }

    setTextSize(size) {
        this.text.setSize(size);
    }

    setTextStyle(style) {
        this.text.setStyle(style);
    }

    setTextColor(color) {
        this.text.setColor(color);
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