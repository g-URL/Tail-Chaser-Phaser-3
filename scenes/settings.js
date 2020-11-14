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

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        this.choice = new Button(this, 320, 320, 200, 80, 'TESTESTEST');
    }
} 