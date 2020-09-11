/// <reference path='../ts/phaser.d.ts'/>

class GameStart extends Phaser.Scene {
    constructor() {
        super({key:'GameStart'});
    }

    preload ()
    {
        // https://www.codeandweb.com/free-sprite-sheet-packer
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('obstacles', 'assets/sprites/obstacles.png', 'assets/sprites/obstacles.json');
    }

    create ()
    {
        this.add.image(320, 320, 'board', 'board.png');

        // obstacles
        // board width = 32

        this.rightWall = this.add.sprite(640-16, 320, 'obstacles', 'board_edge_right.png');
        this.leftWall = this.add.sprite(0+16, 320, 'obstacles', 'board_edge_left.png');
        this.topWall = this.add.sprite(320, 0+16, 'obstacles', 'board_edge_top.png');
        this.bottomWall = this.add.sprite(320, 640-16, 'obstacles', 'board_edge_bottom.png');

        this.litter = this.add.sprite(640-130, 0+98, 'obstacles', 'litter.png');

        this.tunnelBottom = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_bottom.png');
        this.tunnelTop = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_top.png');
        this.tunnelLeftEdge = this.add.image(320-128-(126/2)+2, 320-32, 'obstacles', 'tunnel_left.png');
        this.tunnelRightEdge = this.add.image(320-128+(126/2)-2, 320-32, 'obstacles', 'tunnel_right.png');

        this.yarn = this.add.sprite(320+128, 320+128, 'obstacles', 'yarn.png');

        this.foodBowl = this.add.sprite(0+116, 640-84, 'obstacles', 'food_bowl.png');





        //this.add.image(320, 320 - 100, 'menu', 'game_over.png');

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        // this.newGameButton = this.add.image(320, 320 + 150, 'menu', 'new_game_0.png').setInteractive();
        // this.newGameButton.on('pointerover', function() { this.setFrame('new_game_1.png'); });
        // this.newGameButton.on('pointerout', function() { this.setFrame('new_game_0.png'); });
        // this.newGameButton.on('pointerdown', function() { this.scene.start('Menu'); }, this);

        this.keyObj = this.input.keyboard.addKey('ENTER');
        this.keyObj.on('down', function() { this.scene.start('GameOver'); }, this);
    }
} 