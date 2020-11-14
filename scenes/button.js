const black = 0x000000;
const white = 0xffffff;

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, input, action, fillColor, fillAlpha=1) {
        super(scene, x, y, width, height, fillColor, fillAlpha);

        // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.setInteractive( {useHandCursor: true} )
        // // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        .on('pointerover', function() { this.setBlack(); })
        .on('pointerout', function() { this.setWhite(); })
        // https://stackoverflow.com/questions/55264077/phaser-3-clickable-sprite-cant-start-scene
        .on('pointerdown', function() { scene.scene.start(action); });

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);

        this.text = scene.add.text(this.x, this.y, input, {fontFamily: 'EightbyFive'}, this).setInteractive( {useHandCursor: true} )
            // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
            .on('pointerover', function() { this.setBlack(); }, this)
            .on('pointerout', function() { this.setWhite(); }, this)
            // https://stackoverflow.com/questions/55264077/phaser-3-clickable-sprite-cant-start-scene
            .on('pointerdown', function() { scene.scene.start(action); });

        this.defaultText();

        this.setWhite();

    }

    getText() {
        return this.text;
    }

    centerText() {
        // some elements of font are taller than others, best guess to center based on fontSize
        let size = this.text.style.fontSize;
        size = size.substring(0, size.length-2);
        this.text.setY(this.y -  Phaser.Math.FloorTo(size/8));
    }

    defaultText() {
        this.text.setColor('black');
        this.text.setFontStyle('bold');

        // https://www.html5gamedevs.com/topic/40451-bubble-dialog-with-text-centered-container-phaser-3140/
        this.text.setOrigin(0.5);

        // best guess based on height of button
        this.setFontSize(this.height+'px');
    }

    setFontSize(size) {
        this.text.setFontSize(size);
        this.centerText();
    }

    setBlack() {
        this.setFillStyle(black, 1);
        this.setStrokeStyle(2, white, 1);
        this.text.setColor('white');
    }

    setWhite() {
        this.setFillStyle(white, 1);
        this.setStrokeStyle(2, black, 1);
        this.text.setColor('black');
    }
}