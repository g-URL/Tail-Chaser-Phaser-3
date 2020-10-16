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
    scene: [Menu, GameStart, GameOver],

    // if not set, sometimes when the kittens move the animations will be blurry
    // https://github.com/photonstorm/phaser/blob/v3.19.0/src/core/typedefs/RenderConfig.js
    render: {roundPixels: true
    }
};

var game = new Phaser.Game(config);