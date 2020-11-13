/// <reference path='../ts/phaser.d.ts'/>

class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');        
    }

    preload () {
        // https://www.codeandweb.com/free-sprite-sheet-packer
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
    }

    create () {
        this.add.image(320, 320, 'board', 'board.png');
        let myText = this.add.text(200,200,'VEST vest', {fontFamily: 'EightbyFive', fontSize: '32px', fontStyle: 'italic', color: 'black'});
        //myText.style.setFontSize(32);

        const test = this.add.rectangle(400, 400, 32, 32, 0xffffff, 1).setInteractive();
        test.on('pointerover', function() { this.setFillStyle(0x000000,1) });
        test.on('pointerout', function() { this.setFillStyle(0xffffff,1) });


        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        this.choice = new Button(this, 320, 320, 400, 40, 'THE QUICK BROWN FOX\n JUMPS OVER THE LAZY DOG\n the quick brown\n fox jumps over the lazy dog\n0123456789\n!@#$%^&*()+=[]{},.<>/?');
        //let text = this.choice.getText();
        //text.setFontSize('40px');

        this.add.rectangle(200, 200, 128, 32, 0xffffff, 1);
    }
} 