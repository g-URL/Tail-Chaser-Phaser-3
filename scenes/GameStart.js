/// <reference path='../ts/phaser.d.ts'/>

class GameStart extends Phaser.Scene {
    constructor() {
        super('GameStart');
    }

    preload () {
        // https://www.codeandweb.com/free-sprite-sheet-packer
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('obstacles', 'assets/sprites/obstacles.png', 'assets/sprites/obstacles.json');
        this.load.atlas('cats', 'assets/sprites/cats.png', 'assets/sprites/cats.json');
    }

    create () {
        this.difficulty = 0.5;
        this.kittenSpawnRate = 5;

        this.cardinalDirections = ['north', 'east', 'south', 'west'];
        this.kittenColours = ['black', 'grey', 'orange'];

        // game background and obstacles
        this.add.image(320, 320, 'board', 'board.png');

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
        
        // score
        // https://phaser.io/tutorials/making-your-first-phaser-3-game/part9
        this.score = 0
        this.scoreText = this.add.text(640-190, 0+85, 'SCORE: 0', { fontSize: '20px', color: '#FFF', stroke: '#000', strokeThickness: 4 });

        // animations
        // https://labs.phaser.io/edit.html?src=src\animation\create%20animation%20from%20sprite%20sheet.js
        this.anims.create({
            key: 'mother_north',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['mother_north_0.png', 'mother_north_1.png'] }),
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
            key: 'mother_south',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['mother_south_0.png', 'mother_south_1.png'] }),
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
            key: 'kitten_black_north',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_black_north_0.png', 'kitten_black_north_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_black_east',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_black_east_0.png', 'kitten_black_east_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_black_south',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_black_south_0.png', 'kitten_black_south_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_black_west',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_black_west_0.png', 'kitten_black_west_1.png'] }),
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
            key: 'kitten_orange_east',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_orange_east_0.png', 'kitten_orange_east_1.png'] }),
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
            key: 'kitten_orange_west',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_orange_west_0.png', 'kitten_orange_west_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_grey_north',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_grey_north_0.png', 'kitten_grey_north_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_grey_east',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_grey_east_0.png', 'kitten_grey_east_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_grey_south',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_grey_south_0.png', 'kitten_grey_south_1.png'] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kitten_grey_west',
            frames: this.anims.generateFrameNumbers('cats', {  frames: ['kitten_grey_west_0.png', 'kitten_grey_west_1.png'] }),
            frameRate: 5,
            repeat: -1
        });       


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
                                    this.foodBowl], 
                                    this);

        // keeps track of current direction and steps taken
        this.direction = null;
        this.steps = 33;
    }

    // IT SEEMS LIKE KITTENS CAN COLLIDE EVEN IF THEY AREN'T OVERLAPPING
    mitigateCollision(kitten, obstacle, collision) {
        this.kitten = kitten;
        this.obstacle = obstacle;
        this.collision = collision;

        // https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Rectangle.html
        if (Phaser.Geom.Rectangle.Overlaps(this.kitten.getBounds(), this.obstacle.getBounds())) {
            this.collision = true;
            this.kitten.x = Phaser.Math.Between(0+32+16, 640-32-16);
            this.kitten.y = Phaser.Math.Between(0+32+16, 640-32-16);            
        }
    }

    update(time, delta) {
        // if the mother collides with any obstacles or her kindle then game over
        this.physics.collide(this.mother, this.obstacles, function() { this.scene.start('GameOver'); }, null, this);
        this.physics.collide(this.mother, this.kindle, function() { this.scene.start('GameOver'); }, null, this);

        // ensure there are always kittens on the board
        if (this.kittens.countActive() == 0) {
            for (this.i = 0; this.i < this.kittenSpawnRate; this.i++) {
                // random position
                this.coordinateX = Phaser.Math.Between(0+32+16, 640-32-16);
                this.coordinateY = Phaser.Math.Between(0+32+16, 640-32-16);

                // random colour and direction
                this.kittenColour = this.kittenColours[Phaser.Math.Between(0,2)];
                this.kittenDirection = this.cardinalDirections[Phaser.Math.Between(0,3)];

                this.kitten = new CatNode(this, 
                                        this.coordinateX, 
                                        this.coordinateY,
                                        'cats',                                      
                                        'kitten_'.concat(this.kittenColour, '_', this.kittenDirection, '_0.png'), 
                                        this.kittenDirection,
                                        'kitten',
                                        this.kittenColour);
                                        
                this.obstacleArray = this.obstacles.getChildren();

                // place kitten such that they don't collide with obstacles or kindle
                this.collision = true;
                while (this.collision) {
                    this.collision = false;

                    // prevent kitten from colliding with obstacles
                    // FIND A BETTER WAY TO DO THIS
                    this.j = 0;
                    while (this.j < this.obstacles.getLength() && !this.collision) {
                        this.mitigateCollision(this.kitten, this.obstacleArray[this.j], this.collision, this);
                        this.j++;
                    }

                    // prevent kitten from colliding with mother or trailing kittens (kindle)
                    // FIND A BETTER WAY TO DO THIS
                    this.cat = this.mother;
                    while (this.cat && !this.collision) {
                        this.mitigateCollision(this.kitten, this.cat, this.collision, this);
                        this.cat = this.cat.follower;
                    }
                }

                this.kittens.add(this.kitten, this);
            }

            // ensure kittens walk through tunnel
            this.tunnelTop.depth = this.kittens.getChildren()[4].depth + 1;
        }

        // enoughSteps is used to ensure mother only changes directions if she has moved at least her pixel width/height
        // otherwise, kittens will clip and behave strangely
        this.enoughSteps = this.steps > 32;

        // if a WASD key is pressed
        if (this.wKey.isDown || this.upKey.isDown && this.direction != 'north' && this.enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'north';
            this.mother.direction = this.direction;
            this.mother.y -= 1 + this.difficulty;
            this.mother.update();

        } else if (this.dKey.isDown || this.rightKey.isDown && this.direction != 'east' && this.enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'east';
            this.mother.direction = this.direction;
            this.mother.x += 1 + this.difficulty;
            this.mother.update();

        } else if (this.sKey.isDown || this.downKey.isDown && this.direction != 'south' && this.enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'south';
            this.mother.direction = this.direction;
            this.mother.y += 1 + this.difficulty;
            this.mother.update();

        } else if (this.aKey.isDown || this.leftKey.isDown && this.direction != 'west' && this.enoughSteps) {
            this.steps = this.difficulty;
            this.direction = 'west';
            this.mother.direction = this.direction;
            this.mother.x -= 1 + this.difficulty;
            this.mother.update();

        // if no key is pressed
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

        // iterate through kindle to update kittens
        this.cat = this.mother;
        while (this.cat.follower != null) {
            this.cat = this.cat.follower;

            if (this.cat.direction == 'north') {
                if (this.cat.leader.direction == 'north') {
                    this.cat.y -= 1 + this.difficulty;

                } else if (this.cat.leader.direction == 'south') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(this.cat.x, this.cat.leader.x) > 32) {
                        this.cat.y = this.cat.leader.y;
                        this.cat.direction = this.cat.leader.direction;
                        this.cat.update();

                    } else {
                        this.cat.y -= 1 + this.difficulty;
                    }
                }

            } else if (this.cat.direction == 'east') {
                if (this.cat.leader.direction == 'east') {
                    this.cat.x += 1 + this.difficulty;

                } else if (this.cat.leader.direction == 'west') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(this.cat.y, this.cat.leader.y) > 32) {
                        this.cat.x = this.cat.leader.x;
                        this.cat.direction = this.cat.leader.direction;
                        this.cat.update();

                    } else {
                        this.cat.x += 1 + this.difficulty;
                    }
                }

            } else if (this.cat.direction == 'south') {
                if (this.cat.leader.direction == 'south') {
                    this.cat.y += 1 + this.difficulty;

                } else if (this.cat.leader.direction == 'north') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(this.cat.x, this.cat.leader.x) > 32) {
                        this.cat.y = this.cat.leader.y;
                        this.cat.direction = this.cat.leader.direction;
                        this.cat.update();

                    } else {
                        this.cat.y += 1 + this.difficulty;  
                    }
                }

            // west
            } else {
                if (this.cat.leader.direction == 'west') {
                    this.cat.x -= 1 + this.difficulty;

                } else if (this.cat.leader.direction == 'east') {
                    this.scene.start('GameOver');

                } else {
                    if (Phaser.Math.Difference(this.cat.y, this.cat.leader.y) > 32) {
                        this.cat.x = this.cat.leader.x;
                        this.cat.direction = this.cat.leader.direction;
                        this.cat.update();

                    } else {
                        this.cat.x -= 1 + this.difficulty;
                    }
                }
            }
        }

        // if a mother picks up a kitten remove from kittens group and add to kindle group
        this.kitten_array = this.kittens.getChildren();

        for (this.i = 0; this.i < this.kittens.getLength(); this.i++) {
            this.kitten = this.kitten_array[this.i];

            if (this.physics.collide(this.kitten, this.mother, null, null, this)) {
                this.kittens.remove(this.kitten);

                if (this.mother.tail == null) {
                    this.mother.follower = this.kitten;
                    this.kitten.leader = this.mother;
                    this.score++;
                    // fist kitten is not added to kindle group
                    // cosmetically this allows kitten to appear close to mother while avoiding a kindle collision

                } else {
                    this.mother.tail.follower = this.kitten;
                    this.kitten.leader = this.mother.tail;
                    this.kindle.add(this.kitten);
                    this.score++;
                }

                this.mother.tail = this.kitten;
                this.kitten.direction = this.kitten.leader.direction;

                if (this.kitten.direction == 'north') {
                    this.kitten.x = this.kitten.leader.x;
                    this.kitten.y = this.kitten.leader.y + 33;

                } else if (this.kitten.direction == 'east') {
                    this.kitten.x = this.kitten.leader.x - 33;
                    this.kitten.y = this.kitten.leader.y;

                } else if (this.kitten.direction == 'south') {
                    this.kitten.x = this.kitten.leader.x;
                    this.kitten.y = this.kitten.leader.y - 33;

                // west
                } else {
                    this.kitten.x = this.kitten.leader.x + 33;
                    this.kitten.y = this.kitten.leader.y;
                }
                
                this.kitten.update();
            }
        }

        // https://phaser.io/tutorials/making-your-first-phaser-3-game/part9
        this.scoreText.setText('Score: ' + this.score);
    }
} 