/// <reference path='../ts/phaser.d.ts'/>

class Menu extends Phaser.Scene {
    constructor() {
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

        // DON'T LIKE THIS - when I use 'TAIL\nCHASER' there's a large gap between the first and second line
        let title1 = this.add.text(320, 100, 'TAIL', { fontFamily: 'EightbyFive', fontSize: '180px', color: 'black', fontStyle: 'bold', align: 'center'});
        title1.setOrigin(0.5);
        let title2 = this.add.text(320, 220, 'CHASER', { fontFamily: 'EightbyFive', fontSize: '180px', color: 'black', fontStyle: 'bold', align: 'center'});
        title2.setOrigin(0.5);     

        new Button(this, 320, 450, 380, 100, 'PLAY GAME', 'GameStart');
        //new Button(this, 320, 500, 340, 80, 'SETTINGS', 'Settings');        

        const enterKey = this.input.keyboard.addKey('ENTER');
        enterKey.on('down', function() { this.scene.start('GameStart'); }, this);

        // low-key prod testing/development
        const lKey = this.input.keyboard.addKey('L');
        lKey.on('down', function() { this.scene.start('Settings'); }, this);

        // from starter code
        const logo = this.physics.add.image(400, 100, 'mother', 'mother_south_0.png');
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }
} 