/// <reference path='../ts/phaser.d.ts'/>

class GameStart extends Phaser.Scene {
    constructor() {
        super('Game Start');

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

        this.mother = undefined;

        this.obstacles = undefined;
        this.kittens = undefined;
        this.kindle = undefined;
    }

    preload () {
        this.load.atlas('board', 'assets/sprites/board.png', 'assets/sprites/board.json');
        this.load.atlas('obstacles', 'assets/sprites/obstacles.png', 'assets/sprites/obstacles.json');
        this.load.atlas('cats', 'assets/sprites/cats.png', 'assets/sprites/cats.json');
    }

    createAnimations(catName) {
        // animations
        // https://labs.phaser.io/edit.html?src=src\animation\create%20animation%20from%20sprite%20sheet.js

        // will be generalized to other kittens in the future
        if (catName == 'mother') {
        this.anims.create({
            key: catName + '_sleepy',
            frames: this.anims.generateFrameNumbers('cats', {  frames: [catName + '_sleepy_0.png', catName + '_sleepy_1.png', catName + '_sleepy_2.png', catName + '_sleepy_3.png'] }),
            frameRate: 2,
            repeat: -1,        
        })
        }

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
    generateObstacles() {
        this.topWall = this.physics.add.sprite(320, 0+16, 'obstacles', 'board_edge_top.png');
        this.bottomWall = this.physics.add.sprite(320, 640-16, 'obstacles', 'board_edge_bottom.png');
        this.leftWall = this.physics.add.sprite(0+16, 320, 'obstacles', 'board_edge_left.png');
        this.rightWall = this.physics.add.sprite(640-16, 320, 'obstacles', 'board_edge_right.png');

        this.litter = this.physics.add.sprite(640-130, 0+98, 'obstacles', 'litter.png');

        this.tunnelTop = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_top.png');
        this.tunnelBottom = this.add.image(320-128, 320-32, 'obstacles', 'tunnel_bottom.png');
        this.tunnelLeftEdge = this.physics.add.sprite(320-128-63+3, 320-32, 'obstacles', 'tunnel_left.png');
        this.tunnelRightEdge = this.physics.add.sprite(320-128+63-3-0.5, 320-32, 'obstacles', 'tunnel_right.png');

        this.yarn = this.physics.add.sprite(320+128, 320+128, 'obstacles', 'yarn.png');

        this.foodBowl = this.physics.add.sprite(0+116, 640-84, 'obstacles', 'food_bowl.png');
    }

    // assign keyboard input
    assignKeys() {
        // https://youtu.be/7cpZ5Y7THmo?t=918
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    create () {
        // add game background and obstacles
        this.add.image(320, 320, 'board', 'board.png');
        this.generateObstacles();
        
        // score
        // https://phaser.io/tutorials/making-your-first-phaser-3-game/part9
        this.score = 0;
        this.scoreText = this.add.text(640-130, 0+95, 'SCORE: 0', { fontFamily: 'EightbyFive', fontSize: '30px', color: 'black', fontStyle: 'bold', stroke: 'grey', strokeThickness: 3, align: 'center' })
            .setOrigin(0.5);

        // create kitten animations
        this.createAnimations('mother');
        this.createAnimations('kitten_black');
        this.createAnimations('kitten_grey');
        this.createAnimations('kitten_orange');

        // keyboard input
        this.assignKeys();

        // press enter for game over
        this.input.keyboard.addKey('ENTER')
            .on('down', function() { this.scene.start('Game Over', String(this.score)); }, this);

        // mother
        this.mother = new Mother(this);

        // groups
        this.kittens = this.physics.add.group();

        // https://www.thefreedictionary.com/A-clowder-of-cats-30-fancy-names-for-animal-groups.htm
        this.kindle = this.physics.add.group();

        this.obstacles = this.physics.add.group()
            .addMultiple([this.leftWall,
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
        this.physics.add.collider(this.mother, this.kindle, function() { this.scene.start('Game Over', String(this.score)); }, null, this);
        this.physics.add.collider(this.mother, this.obstacles, function() { this.scene.start('Game Over', String(this.score)); }, null, this);

        // required to prevent detecting isDown from Menu selection
        this.input.activePointer.isDown = false;
    }

    // add kittens to the board
    addKittens() {
        for (let i = 0; i < this.kittenSpawnRate; i++) {
            let kitten = new RandomKitten(this, 680, 680);

            let obstacleArray = this.obstacles.getChildren();

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
    }

    // determines the direction the mother should move based on activePointer (mouse click or mobile tap)
    checkCursorMove() {
        if (this.input.activePointer.isDown) {
            let cursorX = this.input.activePointer.x;
            let cursorY = this.input.activePointer.y;

            if (cursorX < 640 && cursorY < 640) {
                let absX = Phaser.Math.Difference(cursorX, this.mother.x);
                let absY = Phaser.Math.Difference(cursorY, this.mother.y);  

                if (absY > absX) {
                    if (cursorY < this.mother.y) {
                        return 'north';
        
                    } else {
                        return 'south';
                    }
                }
            
                // intentionally no else statement here (only want to act on unambiguous input)
                if (absX > absY) {
                    if (cursorX < this.mother.x) {
                        return 'west';
        
                    } else {
                        return 'east';
                    }
                }
            }
        }

        return null;
    }

    // analyze keyboard input and update mother's position
    updateMotherPosition() {
        // enoughSteps is used to ensure mother only changes directions if she has moved at least her pixel width/height
        // otherwise, kittens will clip and behave strangely
        let enoughSteps = this.mother.steps > 32;

        // checks for mouse or mobile input
        let cursorMove = this.checkCursorMove();

        // if a WASD key/mouse is pressed
        if ((this.wKey.isDown || this.upKey.isDown || (cursorMove == 'north')) && this.mother.direction != 'north' && enoughSteps) {
            this.mother.steps = this.difficulty;
            this.mother.direction = 'north';
            this.mother.y -= 1 + this.difficulty;
            this.mother.update();

        } else if ((this.dKey.isDown || this.rightKey.isDown || (cursorMove == 'east')) && this.mother.direction != 'east' && enoughSteps) {
            this.mother.steps = this.difficulty;
            this.mother.direction = 'east';
            this.mother.x += 1 + this.difficulty;
            this.mother.update();

        } else if ((this.sKey.isDown || this.downKey.isDown || (cursorMove == 'south')) && this.mother.direction != 'south' && enoughSteps) {
            this.mother.steps = this.difficulty;
            this.mother.direction = 'south';
            this.mother.y += 1 + this.difficulty;
            this.mother.update();

        } else if ((this.aKey.isDown || this.leftKey.isDown || (cursorMove == 'west')) && this.mother.direction != 'west' && enoughSteps) {
            this.mother.steps = this.difficulty;
            this.mother.direction = 'west';
            this.mother.x -= 1 + this.difficulty;
            this.mother.update();

        // if no key is pressed and if it isn't the first move
        } else if (this.mother.direction) {

            if (this.mother.direction == 'north') {
                this.mother.y -= 1 + this.difficulty;

            } else if (this.mother.direction == 'east') {
                this.mother.x += 1 + this.difficulty;

            } else if (this.mother.direction == 'south') {
                this.mother.y += 1 + this.difficulty;

            // west
            } else {
                this.mother.x -= 1 + this.difficulty;
            }

            this.mother.steps +=  1 + this.difficulty;
        }
    }

    // iterate through kindle to update kittens
    updateKindle() {
        // ensure kittens walk through tunnel
        this.tunnelTop.depth = this.score + this.kittenSpawnRate + 2;

        let cat = this.mother;
        cat.depth = this.score + this.kittenSpawnRate + 1;
        while (cat.follower != null) {
            cat = cat.follower;
            cat.depth = cat.leader.depth - 1;
            if (cat.direction == 'north') {
                if (cat.leader.direction == 'north') {
                    cat.y -= 1 + this.difficulty;

                } else if (cat.leader.direction == 'south') {
                    this.scene.start('Game Over', String(this.score));

                } else {
                    if (Phaser.Math.Difference(cat.x, cat.leader.x) > 32) {
                        cat.changeDirectionEW();

                    } else {
                        cat.y -= 1 + this.difficulty;
                    }
                }

            } else if (cat.direction == 'east') {
                if (cat.leader.direction == 'east') {
                    cat.x += 1 + this.difficulty;

                } else if (cat.leader.direction == 'west') {
                    this.scene.start('Game Over', String(this.score));

                } else {
                    if (cat.leader.direction == 'north') {
                        cat.swapLeaderDepth();                     
                    }

                    if (Phaser.Math.Difference(cat.y, cat.leader.y) > 32) {
                        cat.changeDirectionNW();

                    } else {
                        cat.x += 1 + this.difficulty;
                    }
                }

            } else if (cat.direction == 'south') {
                if (cat.leader.direction == 'south') {
                    cat.y += 1 + this.difficulty;

                } else if (cat.leader.direction == 'north') {
                    this.scene.start('Game Over', String(this.score));

                } else {
                    if (Phaser.Math.Difference(cat.x, cat.leader.x) > 32) {
                        cat.changeDirectionEW();

                    } else {
                        cat.y += 1 + this.difficulty;  
                    }
                }

            // west
            } else {
                if (cat.leader.direction == 'west') {
                    cat.x -= 1 + this.difficulty;

                } else if (cat.leader.direction == 'east') {
                    this.scene.start('Game Over', String(this.score));

                } else {

                    if (cat.leader.direction == 'north') {
                        cat.swapLeaderDepth();                      
                    }

                    if (Phaser.Math.Difference(cat.y, cat.leader.y) > 32) {
                        cat.changeDirectionNW();

                    } else {
                        cat.x -= 1 + this.difficulty;
                    }
                }
            }
        }
    }

    // if a mother picks up a kitten remove from kittens group and add to kindle group
    addToKindle() {
        let kitten_array = this.kittens.getChildren();

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
        this.scoreText.setText('SCORE: ' + this.score);
    }
} 