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

        let title = this.add.text(320, 100, 'SETTINGS', { fontFamily: 'EightbyFive', fontSize: '160px', color: 'black', fontStyle: 'bold'});
        title.setOrigin(0.5);

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        new Button(this, 320, 300, 340, 80, 'DIFFICULTY', 'Menu');
        new Button(this, 320, 400, 340, 80, 'SPAWN RATE', 'Menu');       
        new Button(this, 320, 500, 340, 80, 'MAIN MENU', 'Menu');
    }
} 