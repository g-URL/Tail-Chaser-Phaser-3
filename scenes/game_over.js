/// <reference path='../ts/phaser.d.ts'/>

class GameOver extends Phaser.Scene {
    constructor() {
        super('Game Over');
    }

    preload () {
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
    }

    create (score) {
        this.add.image(320, 320, 'board', 'board_red.png');

        // DON'T LIKE THIS - but when I use 'TAIL\nCHASER' there's a large gap between the first and second line
        this.add.text(320, 100, 'GAME', { fontFamily: 'EightbyFive', fontSize: '220px', color: 'black', fontStyle: 'bold', align: 'center' })
            .setOrigin(0.5);

        this.add.text(320, 240, 'OVER', { fontFamily: 'EightbyFive', fontSize: '220px', color: 'black', fontStyle: 'bold', align: 'center' })
            .setOrigin(0.5);

        new Button(this, 320, 400, 340, 80, 'NEW GAME', 'Game Start');
        new Button(this, 320, 500, 340, 80, 'MAIN MENU', 'Menu');

        this.add.text(320, 565, 'SCORE: '+score, { fontFamily: 'EightbyFive', fontSize: '50px', color: 'black', fontStyle: 'bold', align: 'center' })
            .setOrigin(0.5);
    }
} 