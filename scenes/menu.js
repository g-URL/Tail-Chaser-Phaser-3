/// <reference path='../ts/phaser.d.ts'/>

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');        
    }

    preload () {
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('cats', 'assets/sprites/cats.png', 'assets/sprites/cats.json');
    }

    create () {
        this.add.image(320, 320, 'board', 'board.png');

        // DON'T LIKE THIS - but when I use 'TAIL\nCHASER' there's a large gap between the first and second line
        this.add.text(320, 100, 'TAIL', { fontFamily: 'EightbyFive', fontSize: '180px', color: 'black', fontStyle: 'bold', align: 'center' })
            .setOrigin(0.5);

        this.add.text(320, 220, 'CHASER', { fontFamily: 'EightbyFive', fontSize: '180px', color: 'black', fontStyle: 'bold', align: 'center' })
            .setOrigin(0.5);

        // sleeping mother
        this.anims.create({
            key: 'mother_sleepy',
            frames: this.anims.generateFrameNumbers('cats', { frames: ['mother_sleepy_0.png', 'mother_sleepy_1.png', 'mother_sleepy_2.png', 'mother_sleepy_3.png'] }),
            frameRate: 2,
            repeat: -1,
        });
        this.add.sprite(490, 180-2, 'cats', 'mother_south_0.png').play('mother_sleepy');

        new Button(this, 320, 450, 380, 100, 'PLAY GAME', 'Game Start');
        //new Button(this, 320, 500, 340, 80, 'SETTINGS', 'Settings');

        // low-key prod testing/development
        this.input.keyboard.addKey('L')
            .on('down', function() { this.scene.start('Settings'); }, this);
    }
} 