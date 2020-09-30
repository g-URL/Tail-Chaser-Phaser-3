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
        this.load.atlas('cats', 'assets/sprites/cats.png', 'assets/sprites/cats.json');
    }

    create ()
    {
        
        this.cardinalDirections = ['north', 'east', 'south', 'west'];
        this.kittenColours = ['orange'];
        
        this.add.image(320, 320, 'board', 'board.png');

        // obstacles
        this.rightWall = this.physics.add.sprite(640-(32/2), 320, 'obstacles', 'board_edge_right.png');
        this.leftWall = this.physics.add.sprite(0+(32/2), 320, 'obstacles', 'board_edge_left.png');
        this.topWall = this.physics.add.sprite(320, 0+(32/2), 'obstacles', 'board_edge_top.png');
        this.bottomWall = this.physics.add.sprite(320, 640-(32/2), 'obstacles', 'board_edge_bottom.png');

        this.litter = this.physics.add.sprite(640-130, 0+98, 'obstacles', 'litter.png');

        this.tunnelBottom = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_bottom.png');
        this.tunnelLeftEdge = this.physics.add.sprite(320-128-(126/2)+3, 320-32, 'obstacles', 'tunnel_left.png');
        this.tunnelRightEdge = this.physics.add.sprite(320-128+(126/2)-3, 320-32, 'obstacles', 'tunnel_right.png');

        this.yarn = this.physics.add.sprite(320+128, 320+128, 'obstacles', 'yarn.png');

        this.foodBowl = this.physics.add.sprite(0+116, 640-84, 'obstacles', 'food_bowl.png');

        // https://labs.phaser.io/edit.html?src=src\animation\create%20animation%20from%20sprite%20sheet.js
        this.anims.create({
            key: 'mother_north',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['mother_north_0.png', 'mother_north_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'mother_south',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['mother_south_0.png', 'mother_south_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'mother_east',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['mother_east_0.png', 'mother_east_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'mother_west',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['mother_west_0.png', 'mother_west_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_orange_north',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_orange_north_0.png', 'kitten_orange_north_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_orange_south',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_orange_south_0.png', 'kitten_orange_south_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_orange_east',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_orange_east_0.png', 'kitten_orange_east_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_orange_west',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_orange_west_0.png', 'kitten_orange_west_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        // mother
        this.brother = this.physics.add.sprite(320, 320);
        console.log("hello", this.brother.getBounds().contains(20,20));
        this.mother = new CatNode(this, 320, 320, 'cats', 'mother_south_0.png', 'mother_south');
        this.direction = this.mother.direction;
        
        // https://youtu.be/7cpZ5Y7THmo?t=918
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.keyObj = this.input.keyboard.addKey('ENTER');
        this.keyObj.on('down', function() { this.scene.start('GameOver'); }, this);


        this.tunnelTop = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_top.png');

        this.kittens = this.physics.add.group();
        this.clowder = this.physics.add.group();

        this.obstacles = this.physics.add.group();
        this.obstacles.addMultiple([this.leftWall,
                                    this.rightWall,
                                    this.topWall,
                                    this.bottomWall,
                                    this.litter, 
                                    this.tunnelLeftEdge, 
                                    this.tunnelRightEdge, 
                                    this.yarn, 
                                    this.foodBowl], 
                                    this);
    }

    update(time, delta)
    {

        this.physics.collide(this.mother, this.obstacles, function() { this.scene.start('GameOver'); }, null, this);
       // console.log(this.physics.collide(this.mother, this.kittens, function() { this.scene.start('GameOver'); }, null, this));
        console.log(this.physics.collide(this.kittens, this.obstacles, null, null, this));

       // this.kittens.add(this.mother, this)

        if (this.kittens.countActive() == 0) {
            for (this.i = 0; this.i < 5; this.i++) {

                console.log(this.i);
                this.coordinateX = Phaser.Math.Between(0, 600);
                this.coordinateY = Phaser.Math.Between(0, 600);

                this.kittenDescription = 'kitten_'.concat(this.kittenColours[0], '_', this.cardinalDirections[Phaser.Math.Between(0,3)]);
                this.kitten = new CatNode(this, 
                                        this.coordinateX, 
                                        this.coordinateY,
                                        'cats', 
                                        this.kittenDescription.concat('_0.png'), 
                                        this.kittenDescription);


                for (this.j = 0; this.j < this.obstacles.getLength(); this.j++){
                    console.log("a", this.j);

                    if (this.obstacles.getChildren()[this.j].getBounds().contains(this.coordinateX, this.coordinateY)) {
                        console.log("COLLISSIOOOONNNN");
                    }
                }

                this.kittens.add(this.kitten, this);
                this.kittens.preUpdate(this.time, this.delta);
                this.obstacles.preUpdate(time, delta);

                console.log(this.physics.overlap(this.kittens, this.obstacles, null, null, this));


                
            }
        }



        if (this.wKey.isDown || this.upKey.isDown) {
            this.mother.y--;
            this.direction = 'mother_north';
        }
        
        else if (this.aKey.isDown || this.leftKey.isDown) {
            this.mother.x--;
            this.direction = 'mother_west';
        }

        else if (this.sKey.isDown || this.downKey.isDown) {
            this.mother.y++;
            this.direction = 'mother_south';
        }

        else if (this.dKey.isDown || this.rightKey.isDown) {
            this.mother.x++;
            this.direction = 'mother_east';
        }

        this.mother.direction = this.direction;
        this.mother.update();

    }
} 