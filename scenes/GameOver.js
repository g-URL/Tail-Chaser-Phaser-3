/// <reference path='../ts/phaser.d.ts'/>

class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload ()
    {
        // https://www.codeandweb.com/free-sprite-sheet-packer
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('menu', 'assets/sprites/menu.png', 'assets/sprites/menu.json');
    }

    create (score)
    {
        this.add.image(320, 320, 'board', 'board_red.png');

        // DON'T LIKE THIS - when I use 'TAIL\nCHASER' there's a large gap between the first and second line
        let title1 = this.add.text(320, 100, 'GAME', { fontFamily: 'EightbyFive', fontSize: '220px', color: 'black', fontStyle: 'bold', align: 'center' });
        title1.setOrigin(0.5);
        let title2 = this.add.text(320, 240, 'OVER', { fontFamily: 'EightbyFive', fontSize: '220px', color: 'black', fontStyle: 'bold', align: 'center' });
        title2.setOrigin(0.5);     

        new Button(this, 320, 400, 340, 80, 'NEW GAME', 'GameStart');
        new Button(this, 320, 500, 340, 80, 'MAIN MENU', 'Menu');

        let scoreText = this.add.text(320, 565, 'SCORE: '+score, { fontFamily: 'EightbyFive', fontSize: '50px', color: 'black', fontStyle: 'bold', align: 'center' });
        scoreText.setOrigin(0.5);

        const keyObj = this.input.keyboard.addKey('ENTER');
        keyObj.on('down', function() { this.scene.start('GameStart'); }, this);
    }
} 