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
        this.mother = new CatNode(this, 320, 320, 'cats', 'mother_south_0.png', 'mother_south');
        this.direction = this.mother.direction;
        this.firstMove = true;
        
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
        // if the mother collides with any obstacles (or her clowder - to be added later) then game over
        this.physics.collide(this.mother, this.obstacles, function() { this.scene.start('GameOver'); }, null, this);
        this.physics.collide(this.mother, this.clowder, function() { this.scene.start('GameOver'); }, null, this);

        console.log(this.physics.collide(this.kittens, this.obstacles, null, null, this));
        console.log(this.kittens.countActive());
        console.log(this.clowder.countActive());

        // ensure there are always kittens on the board
        if (this.kittens.countActive() == 0) {
            for (this.i = 0; this.i < 5; this.i++) {
                this.coordinateX = Phaser.Math.Between(32, 568);
                this.coordinateY = Phaser.Math.Between(32, 568);

                this.kittenDescription = 'kitten_'.concat(this.kittenColours[0], '_', this.cardinalDirections[Phaser.Math.Between(0,3)]);
                this.kitten = new CatNode(this, 
                                        this.coordinateX, 
                                        this.coordinateY,
                                        'cats', 
                                        this.kittenDescription.concat('_0.png'), 
                                        this.kittenDescription);

                // place kitten such that they don't collide with existing obstacles
                this.collision = true;
                this.obstacle_array = this.obstacles.getChildren();
                while (this.collision) {
                    this.collision = false;
                    for (this.k = 0; this.k < this.obstacles.getLength(); this.k++) {
                        this.obstacle_boundary = this.obstacle_array[this.k].getBounds();

                        if (this.obstacle_boundary.contains(this.kitten.x, this.kitten.y) ||
                            this.obstacle_boundary.contains(this.kitten.x+16, this.kitten.y+16) ||
                            this.obstacle_boundary.contains(this.kitten.x+16, this.kitten.y-16) ||
                            this.obstacle_boundary.contains(this.kitten.x-16, this.kitten.y+16) ||
                            this.obstacle_boundary.contains(this.kitten.x-16, this.kitten.y-16)) {

                            this.collision = true;
                            this.kitten.x = Phaser.Math.Between(32, 568);
                            this.kitten.y = Phaser.Math.Between(32, 568);
                        }
                    }
                }

                this.kittens.add(this.kitten, this);
            }
        }



        // if a key is pressed
        if (this.wKey.isDown || this.upKey.isDown) {
            this.mother.y--;
            this.direction = 'mother_north';
            this.firstMove = false; // don't like this
        }
        
        else if (this.aKey.isDown || this.leftKey.isDown) {
            this.mother.x--;
            this.direction = 'mother_west';
            this.firstMove = false; // don't like this
        }

        else if (this.sKey.isDown || this.downKey.isDown) {
            this.mother.y++;
            this.direction = 'mother_south';
            this.firstMove = false; // don't like this
        }

        else if (this.dKey.isDown || this.rightKey.isDown) {
            this.mother.x++;
            this.direction = 'mother_east';
            this.firstMove = false; // don't like this
        }

        // if no key is pressed
        else if (!this.firstMove) {

            if (this.direction == 'mother_north') {
                this.mother.y--;
            }

            else if (this.direction == 'mother_west') {
                this.mother.x--;
            }

            else if (this.direction == 'mother_south') {
                this.mother.y++;

            } else {
                this.mother.x++;
            }
        }


        this.mother.direction = this.direction;
        this.mother.update();

        this.cat = this.mother;
        while (this.cat.follower != null) {
            this.cat = this.cat.follower;

            if (this.cat.direction == 'mother_north') {
                if (this.cat.leader.direction == 'mother_north') {
                    //this.cat.y = this.cat.leader.y + 33;
                    this.cat.y--;
                } else if (this.cat.leader.direction == 'mother_south'){
                    this.scene.start('GameOver')
                } else {
                    if (Phaser.Math.Difference(this.cat.x, this.cat.leader.x) > 32) {
                        this.cat.y = this.cat.leader.y;
                        this.cat.direction = this.cat.leader.direction;
                    } else {
                        //this.cat.y = this.cat.leader.y + 33;
                        this.cat.y--;
                    }
                }

            } else if (this.cat.direction == 'mother_south') {
                if (this.cat.leader.direction == 'mother_south') {
                    //this.cat.y = this.cat.leader.y - 33;
                    this.cat.y++;
                } else if (this.cat.leader.direction == 'mother_north') {
                    this.scene.start('GameOver')
                } else {
                    if (Phaser.Math.Difference(this.cat.x, this.cat.leader.x) > 32) {
                        this.cat.y = this.cat.leader.y;
                        this.cat.direction = this.cat.leader.direction;
                    } else {
                        //this.cat.y = this.cat.leader.y - 33;
                        this.cat.y++;  
                    }
                }
            } else if (this.cat.direction == 'mother_east') {
                if (this.cat.leader.direction == 'mother_east') {
                    //this.cat.x = this.cat.leader.x - 33;
                    this.cat.x++;                    
                } else if (this.cat.leader.direction == 'mother_west') {
                    this.scene.start('GameOver')
                } else {
                    if (Phaser.Math.Difference(this.cat.y, this.cat.leader.y) > 32) {
                        this.cat.x = this.cat.leader.x;
                        this.cat.direction = this.cat.leader.direction;
                    } else {
                        //this.cat.x = this.cat.leader.x - 33;
                        this.cat.x++;
                    }
                }
            }
            // must be west
            else {
                if (this.cat.leader.direction == 'mother_west') {
                    //this.cat.x = this.cat.leader.x + 33;
                    this.cat.x--;
                } else if (this.cat.leader.direction == 'mother_east') {
                    this.scene.start('GameOver')
                } else {
                    if (Phaser.Math.Difference(this.cat.y, this.cat.leader.y) > 32) {
                        this.cat.x = this.cat.leader.x;
                        this.cat.direction = this.cat.leader.direction;
                    } else {
                        //this.cat.x = this.cat.leader.x + 33;
                        this.cat.x--;
                    }
                }
            }

            
            // console.log("testestestest");
            // this.cat.direction = this.cat.follower.direction;

            // if (this.cat.direction == 'mother_north') {
            //     this.cat.x = this.cat.follower.x;
            //     this.cat.y--;
            // } 
            
            // else if (this.cat.direction == 'mother_west') {
            //     this.cat.x--;
            //     this.cat.y = this.cat.follower.y;
            // }

            // else if (this.cat.direction == 'mother_south') {
            //     this.cat.x = this.cat.follower.x;
            //     this.cat.y++;
            // }

            // else if (this.cat.direction == 'mother_east') {
            //     this.cat.x++;
            //     this.cat.y = this.cat.follower.y;
            // }

            this.cat.update();
        }
        // if a mother picks up a kitten remove from kittens group and add to clowder group
        this.kitten_array = this.kittens.getChildren();
        for (this.i = 0; this.i < this.kittens.getLength(); this.i++) {
            this.kitten = this.kitten_array[this.i];
            if (this.physics.collide(this.kitten, this.mother, null, null, this)) {

                this.kittens.remove(this.kitten);

                if (this.mother.tail == null) {
                    console.log("FIRST KITTEN");
                    this.mother.follower = this.kitten;
                    this.kitten.leader = this.mother;
                    this.mother.tail = this.kitten;
                }

                else {
                    console.log("SUBSEQUENT KITTEN");
                    this.mother.tail.follower = this.kitten;
                    this.kitten.leader = this.mother.tail;
                    this.mother.tail = this.kitten;
                    this.clowder.add(this.kitten);
                }

                this.kitten.direction = this.kitten.leader.direction;

                if (this.kitten.direction == 'mother_north') {
                    this.kitten.x = this.kitten.leader.x;
                    this.kitten.y = this.kitten.leader.y + 33;
                } 
                
                else if (this.kitten.direction == 'mother_west') {
                    this.kitten.x = this.kitten.leader.x + 33;
                    this.kitten.y = this.kitten.leader.y;
                }
    
                else if (this.kitten.direction == 'mother_south') {
                    this.kitten.x = this.kitten.leader.x;
                    this.kitten.y = this.kitten.leader.y - 33;
                }
    
                else if (this.kitten.direction == 'mother_east') {
                    this.kitten.x = this.kitten.leader.x - 33;
                    this.kitten.y = this.kitten.leader.y;
                }
                this.cat.update();
            }
        }

    }
} 