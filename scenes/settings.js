/// <reference path='../ts/phaser.d.ts'/>

class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }

    preload () {
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
    }

    create () {
        this.add.image(320, 320, 'board', 'board.png');

        this.add.text(320, 100, 'SETTINGS', { fontFamily: 'EightbyFive', fontSize: '160px', color: 'black', fontStyle: 'bold' })
            .setOrigin(0.5);

        new Button(this, 320, 300, 340, 80, 'DIFFICULTY', 'Menu');
        new Button(this, 320, 400, 340, 80, 'SPAWN RATE', 'Menu');
        new Button(this, 320, 500, 340, 80, 'MAIN MENU', 'Menu');
    }
} 