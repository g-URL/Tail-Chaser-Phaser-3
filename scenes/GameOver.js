/// <reference path='../ts/phaser.d.ts'/>

class GameOver extends Phaser.Scene {
    constructor() {
        super({key:'GameOver'});
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
        this.newGameButton = this.add.image(320, 320 + 150, 'menu', 'new_game_0.png').setInteractive();
        this.newGameButton.on('pointerover', function() { this.setFrame('new_game_1.png'); });
        this.newGameButton.on('pointerout', function() { this.setFrame('new_game_0.png'); });
        this.newGameButton.on('pointerdown', function() { this.scene.start('Menu'); }, this);

        this.keyObj = this.input.keyboard.addKey('ENTER');
        this.keyObj.on('down', function() { this.scene.start('Menu'); }, this);
    }
} 