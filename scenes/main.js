/// <reference path='../ts/phaser.d.ts'/>
//import Phaser from './phaser'

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
    },
    scene: [Menu, GameStart, GameOver],

    // if not set, sometimes when the kittens move the animations will be blurry
    // https://github.com/photonstorm/phaser/blob/v3.19.0/src/core/typedefs/RenderConfig.js
    render: {roundPixels: true},
};

var game = new Phaser.Game(config);