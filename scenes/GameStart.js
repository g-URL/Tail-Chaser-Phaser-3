/// <reference path='../ts/phaser.d.ts'/>

const CARDINAL_DIRECTIONS = ['north', 'east', 'south', 'west'];
const KITTEN_COLOURS = ['black', 'grey', 'orange'];


class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');

        this.difficulty = 0.5;
        this.kittenSpawnRate = 5;
        this.score = undefined;
        this.scoreText = undefined;
        this.wKey = undefined;
        this.aKey = undefined;
        this.sKey = undefined;
        this.dKey = undefined;
        this.upKey = undefined;
        this.downKey = undefined;
        this.leftKey = undefined;
        this.rightKey = undefined;
        this.enterKey = undefined;

        this.mother = undefined;
        this.direction = undefined;
        this.steps = undefined;

        this.obstacles = undefined;
        this.kittens = undefined;
        this.kindle = undefined;
    }


    preload () {
        // https://www.codeandweb.com/free-sprite-sheet-packer
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('obstacles', 'assets/sprites/obstacles.png', 'assets/sprites/obstacles.json');
        this.load.atlas('cats', 'assets/sprites/cats.png', 'assets/sprites/cats.json');
    }


    createAnimations(catName) {
        // animations
        // https://labs.phaser.io/edit.html?src=src\animation\create%20animation%20from%20sprite%20sheet.js
        this.anims.create({
            key: catName + '_north',
            frames: this.anims.generateFrameNumbers('cats', {  frames: [catName + '_north_0.png', catName + '_north_1.png'] }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: catName + '_east',
            frames: this.anims.generateFrameNumbers('cats', {  frames: [catName + '_east_0.png', catName + '_east_1.png'] }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: catName + '_south',
            frames: this.anims.generateFrameNumbers('cats', {  frames: [catName + '_south_0.png', catName + '_south_1.png'] }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: catName + '_west',
            frames: this.anims.generateFrameNumbers('cats', {  frames: [catName + '_west_0.png', catName + '_west_1.png'] }),
            frameRate: 5,
            repeat: -1,
        });
    }


    // place obstacles on board
    generateObstacles(){
        this.topWall = this.physics.add.sprite(320, 0+16, 'obstacles', 'board_edge_top.png');
        this.bottomWall = this.physics.add.sprite(320, 640-16, 'obstacles', 'board_edge_bottom.png');
        this.leftWall = this.physics.add.sprite(0+16, 320, 'obstacles', 'board_edge_left.png');
        this.rightWall = this.physics.add.sprite(640-16, 320, 'obstacles', 'board_edge_right.png');

        this.litter = this.physics.add.sprite(640-130, 0+98, 'obstacles', 'litter.png');

        this.tunnelTop = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_top.png');
        this.tunnelBottom = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_bottom.png');
        this.tunnelLeftEdge = this.physics.add.sprite(320-128-63+3, 320-32, 'obstacles', 'tunnel_left.png');
        this.tunnelRightEdge = this.physics.add.sprite(320-128+63-3, 320-32, 'obstacles', 'tunnel_right.png');

        this.yarn = this.physics.add.sprite(320+128, 320+128, 'obstacles', 'yarn.png');

        this.foodBowl = this.physics.add.sprite(0+116, 640-84, 'obstacles', 'food_bowl.png');
    }


    create () {
        // add game background and obstacles
        this.add.image(320, 320, 'board', 'board.png');
        this.generateObstacles();
        
        // score
        // https://phaser.io/tutorials/making-your-first-phaser-3-game/part9
        this.score = 0;
        this.scoreText = this.add.text(640-190, 0+85, 'SCORE: 0', { fontSize: '20px', color: '#FFF', stroke: '#000', strokeThickness: 4 });

        // create kitten animations
        this.createAnimations('mother');
        this.createAnimations('kitten_black');
        this.createAnimations('kitten_grey');
        this.createAnimations('kitten_orange');

        // keyboard input
        // https://youtu.be/7cpZ5Y7THmo?t=918
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.enterKey = this.input.keyboard.addKey('ENTER');
        this.enterKey.on('down', function() { this.scene.start('GameOver'); }, this);

        // mother
        this.mother = new CatNode(this, 320, 320, 'cats', 'mother_south_0.png', 'south');

        // keeps track of current direction and steps taken
        this.direction = null;
        this.steps = 33;

        // groups
        this.kittens = this.physics.add.group();

        // https://www.thefreedictionary.com/A-clowder-of-cats-30-fancy-names-for-animal-groups.htm
        this.kindle = this.physics.add.group();

        this.obstacles = this.physics.add.group();
        this.obstacles.addMultiple([this.leftWall,
                                    this.rightWall,
                                    this.topWall,
                                    this.bottomWall,
                                    this.litter, 
                                    this.tunnelLeftEdge, 
                                    this.tunnelRightEdge, 
                                    this.yarn, 
                                    this.foodBowl,
                                    ], 
                                    this,
        );

        // if the mother collides with any obstacles or her kindle then game over
        this.physics.add.collider(this.mother, this.kindle, function() { this.scene.start('GameOver'); }, null, this);
        this.physics.add.collider(this.mother, this.obstacles, function() { this.scene.start('GameOver'); }, null, this);
    }


    // add kittens to the board
    addKittens() {
        for (let i = 0; i < this.kittenSpawnRate; i++) {
            // random colour and direction
            const kittenColour = KITTEN_COLOURS[Phaser.Math.Between(0,2)];
            const kittenDirection = CARDINAL_DIRECTIONS[Phaser.Math.Between(0,3)];

            let kitten = new CatNode(this, 
                                    680,    // spawning outside of board prevents accidental collision with mother (before first move)
                                    680,    // spawning outside of board prevents accidental collision with mother (before first move)
                                    'cats',                                      
                                    'kitten_' + kittenColour + '_' + kittenDirection + '_0.png', 
                                    kittenDirection,
                                    'kitten',
                                    kittenColour,
            );

            const obstacleArray = this.obstacles.getChildren();

            // place kitten such that they don't collide with obstacles or mother/kindle
            let collision = true;
            while (collision) {
                collision = false;
                
                // random position
                kitten.x = Phaser.Math.Between(0+32+16, 640-32-16);
                kitten.y = Phaser.Math.Between(0+32+16, 640-32-16);

                // prevent kitten from colliding with obstacles
                let j = 0;
                while (j < this.obstacles.getLength() && !collision) {           
                    // https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Rectangle.html
                    collision = Phaser.Geom.Rectangle.Overlaps(kitten.getBounds(), obstacleArray[j].getBounds());
                    j++;
                }

                // prevent kitten from colliding with mother or trailing kittens (kindle)
                let cat = this.mother;
                while (cat && !collision) { 
                    // https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Rectangle.html
                    collision = Phaser.Geom.Rectangle.Overlaps(kitten.getBounds(), cat.getBounds());
                    cat = cat.follower;
                }
            }

            this.kittens.add(kitten);
        }

        // ensure kittens walk through tunnel
        this.tunnelTop.depth = this.kittens.getChildren()[4].depth + 1;
    }


    // analyze keyboard input and update mother's position
    updateMotherPosition() {
        // enoughSteps is used to ensure mother only changes directions if she has moved at least her pixel width/height
        // otherwise, kittens will clip and behave strangely
        const enoughSteps = this.steps > 32;

        // if a WASD key is pressed
        if (this.wKey.isDown || this.upKey.isDown && this.direction != 'north' && enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'north';
            this.mother.direction = this.direction;
            this.mother.y -= 1 + this.difficulty;
            this.mother.update();

        } else if (this.dKey.isDown || this.rightKey.isDown && this.direction != 'east' && enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'east';
            this.mother.direction = this.direction;
            this.mother.x += 1 + this.difficulty;
            this.mother.update();

        } else if (this.sKey.isDown || this.downKey.isDown && this.direction != 'south' && enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'south';
            this.mother.direction = this.direction;
            this.mother.y += 1 + this.difficulty;
            this.mother.update();

        } else if (this.aKey.isDown || this.leftKey.isDown && this.direction != 'west' && enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'west';
            this.mother.direction = this.direction;
            this.mother.x -= 1 + this.difficulty;
            this.mother.update();

        // if no key is pressed
        // if it isn't the first move
        } else if (this.direction) {

            if (this.direction == 'north') {
                this.mother.y -= 1 + this.difficulty;

            } else if (this.direction == 'east') {
                this.mother.x += 1 + this.difficulty;

            } else if (this.direction == 'south') {
                this.mother.y += 1 + this.difficulty;

            // west
            } else {
                this.mother.x -= 1 + this.difficulty;
            }

            this.steps +=  1 + this.difficulty;
        }
    }


    // iterate through kindle to update kittens
    updateKindle() {
        let cat = this.mother;
        while (cat.follower != null) {
            cat = cat.follower;

            if (cat.direction == 'north') {
                if (cat.leader.direction == 'north') {
                    cat.y -= 1 + this.difficulty;

                } else if (cat.leader.direction == 'south') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(cat.x, cat.leader.x) > 32) {
                        cat.y = cat.leader.y;
                        cat.direction = cat.leader.direction;
                        cat.update();

                    } else {
                        cat.y -= 1 + this.difficulty;
                    }
                }

            } else if (cat.direction == 'east') {
                if (cat.leader.direction == 'east') {
                    cat.x += 1 + this.difficulty;

                } else if (cat.leader.direction == 'west') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(cat.y, cat.leader.y) > 32) {
                        cat.x = cat.leader.x;
                        cat.direction = cat.leader.direction;
                        cat.update();

                    } else {
                        cat.x += 1 + this.difficulty;
                    }
                }

            } else if (cat.direction == 'south') {
                if (cat.leader.direction == 'south') {
                    cat.y += 1 + this.difficulty;

                } else if (cat.leader.direction == 'north') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(cat.x, cat.leader.x) > 32) {
                        cat.y = cat.leader.y;
                        cat.direction = cat.leader.direction;
                        cat.update();

                    } else {
                        cat.y += 1 + this.difficulty;  
                    }
                }

            // west
            } else {
                if (cat.leader.direction == 'west') {
                    cat.x -= 1 + this.difficulty;

                } else if (cat.leader.direction == 'east') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(cat.y, cat.leader.y) > 32) {
                        cat.x = cat.leader.x;
                        cat.direction = cat.leader.direction;
                        cat.update();

                    } else {
                        cat.x -= 1 + this.difficulty;
                    }
                }
            }
        }
    }


    // if a mother picks up a kitten remove from kittens group and add to kindle group
    addToKindle() {
        const kitten_array = this.kittens.getChildren();

        for (let i = 0; i < this.kittens.getLength(); i++) {
            let kitten = kitten_array[i];

            if (this.physics.collide(kitten, this.mother, null, null, this)) {
                this.kittens.remove(kitten);

                if (this.mother.tail == null) {
                    this.mother.follower = kitten;
                    kitten.leader = this.mother;
                    this.score++;
                    // fist kitten is not added to kindle group
                    // cosmetically this allows kitten to appear close to mother while avoiding a kindle collision

                } else {
                    this.mother.tail.follower = kitten;
                    kitten.leader = this.mother.tail;
                    this.kindle.add(kitten);
                    this.score++;
                }

                this.mother.tail = kitten;
                kitten.direction = kitten.leader.direction;

                if (kitten.direction == 'north') {
                    kitten.x = kitten.leader.x;
                    kitten.y = kitten.leader.y + 33;

                } else if (kitten.direction == 'east') {
                    kitten.x = kitten.leader.x - 33;
                    kitten.y = kitten.leader.y;

                } else if (kitten.direction == 'south') {
                    kitten.x = kitten.leader.x;
                    kitten.y = kitten.leader.y - 33;

                // west
                } else {
                    kitten.x = kitten.leader.x + 33;
                    kitten.y = kitten.leader.y;
                }
                
                kitten.update();
            }
        }
    }


    update() {
        // ensure there are always kittens on the board
        if (this.kittens.countActive() == 0) {
            this.addKittens();
        }

        this.updateMotherPosition();
        this.updateKindle();
        this.addToKindle();

        // https://phaser.io/tutorials/making-your-first-phaser-3-game/part9
        this.scoreText.setText('Score: ' + this.score);
    }
} 