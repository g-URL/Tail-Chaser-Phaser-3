const black = 0x000000;
const white = 0xffffff;

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, input=null, fillColor=white, fillAlpha=1) {
        super(scene, x, y, width, height, fillColor, fillAlpha);

        this.input = input;
        this.scene = scene;

        this.setWhite();

        // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.setInteractive()
            .on('pointerover', function() { this.setBlack(); })
            .on('pointerout', function() { this.setWhite(); });


        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        this.scene.add.existing(this);

        this.text = this.scene.add.text(this.x, this.y, this.input, {fontFamily: 'EightbyFive'}, this).setInteractive()
            .on('pointerover', function() { this.setBlack(); }, this)
            .on('pointerout', function() { this.setWhite(); }, this);

        this.defaultText();
    }

    defaultText() {
        this.text.setColor('black');
        this.text.setFontStyle('bold');

        // best guess based on height of button
        this.text.setFontSize(this.height+'px');

        // https://www.html5gamedevs.com/topic/40451-bubble-dialog-with-text-centered-container-phaser-3140/
        this.text.setOrigin(0.5);

        // some elements of font are taller than others, best guess to center based on height of button
        this.text.setY(this.y - Phaser.Math.FloorTo(this.height/8));
    }

    getText() {
        return this.text;
    }

    centerText() {
        // MAKE THIS LATER
    }

    setBlack() {
        this.setFillStyle(black, 1);
        this.setStrokeStyle(2, white, 1);

        if (this.text) { this.text.setColor('white'); }
    }

    setWhite() {
        this.setFillStyle(white, 1);
        this.setStrokeStyle(2, black, 1);

        if (this.text) { this.text.setColor('black'); }
    }
}