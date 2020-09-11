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
        this.load.atlas('mother', 'assets/sprites/mother.png', 'assets/sprites/mother.json');
    }

    create ()
    {
        this.add.image(320, 320, 'board', 'board.png');

        // obstacles
        this.rightWall = this.add.sprite(640-(32/2), 320, 'obstacles', 'board_edge_right.png');
        this.leftWall = this.add.sprite(0+(32/2), 320, 'obstacles', 'board_edge_left.png');
        this.topWall = this.add.sprite(320, 0+(32/2), 'obstacles', 'board_edge_top.png');
        this.bottomWall = this.add.sprite(320, 640-(32/2), 'obstacles', 'board_edge_bottom.png');

        this.litter = this.add.sprite(640-130, 0+98, 'obstacles', 'litter.png');

        this.tunnelBottom = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_bottom.png');
        this.tunnelLeftEdge = this.add.sprite(320-128-(126/2)+3, 320-32, 'obstacles', 'tunnel_left.png');
        this.tunnelRightEdge = this.add.sprite(320-128+(126/2)-3, 320-32, 'obstacles', 'tunnel_right.png');

        this.yarn = this.add.sprite(320+128, 320+128, 'obstacles', 'yarn.png');

        this.foodBowl = this.add.sprite(0+116, 640-84, 'obstacles', 'food_bowl.png');

        // https://labs.phaser.io/edit.html?src=src\animation\create%20animation%20from%20sprite%20sheet.js
        this.anims.create({
            key: 'mother_north',
            frames: this.anims.generateFrameNumbers('mother', {  frames: ['mother_north_0.png', 'mother_north_1.png'] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'mother_south',
            frames: this.anims.generateFrameNumbers('mother', {  frames: ['mother_south_0.png', 'mother_south_1.png'] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'mother_east',
            frames: this.anims.generateFrameNumbers('mother', {  frames: ['mother_east_0.png', 'mother_east_1.png'] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'mother_west',
            frames: this.anims.generateFrameNumbers('mother', {  frames: ['mother_west_0.png', 'mother_west_1.png'] }),
            frameRate: 8,
            repeat: -1
        });

        // mother
        this.mother = this.add.sprite(320, 320);
        this.mother.play('mother_south');

        // https://youtu.be/7cpZ5Y7THmo?t=918
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);




        //this.add.image(320, 320 - 100, 'menu', 'game_over.png');

        // https://www.html5gamedevs.com/topic/36850-solvederror-thisaddbutton-is-not-a-function/
        // this.newGameButton = this.add.image(320, 320 + 150, 'menu', 'new_game_0.png').setInteractive();
        // this.newGameButton.on('pointerover', function() { this.setFrame('new_game_1.png'); });
        // this.newGameButton.on('pointerout', function() { this.setFrame('new_game_0.png'); });
        // this.newGameButton.on('pointerdown', function() { this.scene.start('Menu'); }, this);

        this.keyObj = this.input.keyboard.addKey('ENTER');
        this.keyObj.on('down', function() { this.scene.start('GameOver'); }, this);



        this.tunnelTop = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_top.png');


    }

    update()
    {
        if (this.wKey.isDown) {
            this.mother.y--;
            this.mother.play('mother_north');
        }

        if (this.aKey.isDown) {
            this.mother.x--;
            this.mother.play('mother_west');
        }

        if (this.sKey.isDown) {
            this.mother.y++;
            this.mother.play('mother_south');
        }

        if (this.dKey.isDown) {
            this.mother.x++;
            this.mother.play('mother_east');
        }

    }
} 