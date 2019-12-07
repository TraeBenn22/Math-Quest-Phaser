import Phaser from "phaser";

var config = {
    type: Phaser.CANVAS,
    width: 1920,
    height: 1080,
    id: "game",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function preload ()
{
    this.load.image('phaser', 'assets/boilerplate/phaser.png');
    this.load.image('tiles', "assets/maps/roguelikeSheet_transparent.png");
    this.load.tilemapTiledJSON('playground', 'assets/maps/playground.json');
}

function create ()
{
    const map = this.make.tilemap({key: 'playground'});
    const tileset = map.addTilesetImage("roguelikeSheet_transparent", 'tiles');
    const ground = map.createStaticLayer('Ground', tileset, 0, 0);
    const ground2 = map.createStaticLayer('Ground2', tileset, 0, 0);
    const decoration = map.createStaticLayer('Decoration', tileset, 0, 0);
    const roof = map.createStaticLayer('Roof', tileset, 0, 0);
}

function update ()
{
}

class Game extends Phaser.Game {
    constructor() {
        super(config)
    }
}

window.game = new Game();