/// <reference path='../ts/phaser.d.ts'/>

class Menu extends Phaser.Scene {
    constructor() {
      //  super({key:'Menu'});
        super('Menu');        
    }

    preload () {
        // https://www.codeandweb.com/free-sprite-sheet-packer
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('menu', 'assets/sprites/menu.png', 'assets/sprites/menu.json');
        this.load.atlas('mother', 'assets/sprites/mother.png', 'assets/sprites/mother.json');
    }

    create () {
        this.add.image(320, 320, 'board', 'board.png');
        this.add.image(320, 320 - 120, 'menu', 'game_title.png');

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        const newGameButton = this.add.image(320, 320 + 150, 'menu', 'new_game_0.png').setInteractive();
        newGameButton.on('pointerover', function() { this.setFrame('new_game_1.png'); });
        newGameButton.on('pointerout', function() { this.setFrame('new_game_0.png'); });
        newGameButton.on('pointerdown', function() { this.scene.start('GameStart'); }, this);

        const enterKey = this.input.keyboard.addKey('ENTER');
        enterKey.on('down', function() { this.scene.start('GameStart'); }, this);

        // from starter code
        const logo = this.physics.add.image(400, 100, 'mother', 'mother_south_0.png');
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }
} 