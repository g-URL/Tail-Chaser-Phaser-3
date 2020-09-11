/// <reference path='../ts/phaser.d.ts'/>

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    },
    scene: [Menu, GameStart, GameOver]
};

var game = new Phaser.Game(config);