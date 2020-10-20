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

    create ()
    {
        this.add.image(320, 320, 'board', 'board_red.png');
        this.add.image(320, 320 - 100, 'menu', 'game_over.png');

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        const newGameButton = this.add.image(320, 320 + 150, 'menu', 'new_game_0.png').setInteractive();
        newGameButton.on('pointerover', function() { this.setFrame('new_game_1.png'); });
        newGameButton.on('pointerout', function() { this.setFrame('new_game_0.png'); });
        newGameButton.on('pointerdown', function() { this.scene.start('Menu'); }, this);

        const keyObj = this.input.keyboard.addKey('ENTER');
        keyObj.on('down', function() { this.scene.start('Menu'); }, this);
    }
} 