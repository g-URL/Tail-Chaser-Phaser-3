const BLACK = 0x000000;
const WHITE = 0xffffff;

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, input, action, fillColor, fillAlpha=1) {
        super(scene, x, y, width, height, fillColor, fillAlpha);

        // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.setInteractive({ useHandCursor: true })
            .on('pointerover', function() { this.setBlack(); })
            .on('pointerout', function() { this.setWhite(); })
            .on('pointerdown', function() { scene.scene.start(action); });

        // lines 28-30: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/extending%20arcade%20sprite.js
        scene.add.existing(this);

        this.text = scene.add.text(this.x, this.y, input, { fontFamily: 'EightbyFive' }, this)
            .setInteractive({ useHandCursor: true })
            // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
            .on('pointerover', function() { this.setBlack(); }, this)
            .on('pointerout', function() { this.setWhite(); }, this)
            .on('pointerdown', function() { scene.scene.start(action); });

        this.defaultText();

        this.setWhite();
    }

    centerText() {
        // some font elements are taller than others, best guess to center based on fontSize
        let size = this.text.style.fontSize;
        size = size.substring(0, size.length-2);
        this.text.setY(this.y - Phaser.Math.FloorTo(size/8));

        // some elements are wider than others, may also want to consider centering based on this
    }

    defaultText() {
        this.text.setColor('black')
            .setFontStyle('bold')
            // https://www.html5gamedevs.com/topic/40451-bubble-dialog-with-text-centered-container-phaser-3140/
            .setOrigin(0.5);                    
    
        // best guess based on height of button
        this.setFontSize(this.height+'px');
    }

    setFontSize(size) {
        this.text.setFontSize(size);

        this.centerText();
    }

    setBlack() {
        this.setFillStyle(BLACK, 1)
            .setStrokeStyle(2, WHITE, 1);

        this.text.setColor('white');
    }

    setWhite() {
        this.setFillStyle(WHITE, 1)
            .setStrokeStyle(2, BLACK, 1);

        this.text.setColor('black');
    }
}