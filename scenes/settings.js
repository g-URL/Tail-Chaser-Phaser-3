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

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        let choice = new Button(this, 320, 320, 128, 32, 'TESTING');
        //choice.on('pointerover', function() { choice.setBlack(); });
        //choice.on('pointerout', function() { choice.setWhite(); });

        this.add.rectangle(200, 200, 128, 32, 0xffffff, 1);
    }
} 