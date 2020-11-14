# Tail Chaser
A snake game, but with cats. The objective of the game is to pickup as many kittens as possible without colliding with trailing kittens (kindle) or board obstacles.

Click [HERE](https://g-url.github.io/Tail-Chaser-Phaser-3/) to play the game!

### Gameplay
* Initially the cat controlled by the player, the pink mother cat, is at rest.
* Once a WASD/arrow key is pressed or mouseclick/screen tap is detected the mother will begin to move.
* The mother cat can only change directions after moving the width of her body. This allows her to make tight turns without colliding with her kindle.
* Kittens spawn in groups of 5.
* Kittens are cunning and hide in the tunnel.
* Pressing the Enter key will end the game.

### History and Motivation
I was looking for a project to learn JavaScript and it occured to me that it would be fun if my [old](https://github.com/g-URL/Tail-Chaser) Tail Chaser game, originally created using pygame, could be made easily available to everyone. Remaking the game also gave me the opportunity to improve the game and implement techniques I should have the first time round.

### Built With
* [Phaser 3](https://phaser.io/phaser3) - The game framework
* [Free Sprite Sheet Packer](https://www.codeandweb.com/free-sprite-sheet-packer) - Packing sprite sheets
* [BitFontMaker2](http://www.pentacom.jp/pentacom/bitfontmaker2/) - Used to create original EightbyFive font and bitmap
* [GIMP](https://www.gimp.org/) - Sprites and artwork
* [Krita](https://krita.org/en/) - Sprites and artwork
* [XAMPP](https://www.apachefriends.org/index.html) - Web server

### Getting Started
1. Clone the repo.
```
git clone https://github.com/g-URL/Tail-Chaser-Phaser-3.git
```

2. Setup a local web server.

To run the game locally, you will need to setup a local web server and adjust the root/directory from the default to your Git directory. I used [XAMPP](https://www.apachefriends.org/index.html). For other options or additional information the [Getting Started with Phaser 3](https://phaser.io/tutorials/getting-started-phaser3/part2) tutorial is very helpful.

Using XAMPP, configure the httpd.conf file:
```
#DocumentRoot "C:/xampp/htdocs"
DocumentRoot "C:/Users/Your-Name/Documents/GitHub/Tail-Chaser-Phaser-3"
#<Directory "C:/xampp/htdocs">
<Directory "C:/Users/Your-Name/Documents/GitHub/Tail-Chaser-Phaser-3">
```
3. Run the web server and in the address bar of your internet browser type 'localhost'.

### Acknowledgements 
* I would like to thank my friends K. Jorgensen and G. Gonzaga for coming up with the idea for the [original](https://github.com/g-URL/Tail-Chaser) game.
* PurpleBooth for the README [template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).

### Future Work
1. Improve sprites and animations.
2. Adding a screen to set the game difficulty and/or configure kitten spawn rate.
3. Decompose food/water bowl obstacle into smaller rectangles to remove invisible corner.