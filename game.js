const Phaser = require("phaser")

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    id: "game",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('phaser', 'assets/boilerplate/phaser.png')
}

function create ()
{
    this.add.image(300, 300, 'phaser')
}

function update ()
{
}