import Phaser from "phaser";
 import {Player} from './src/player.js';

const protaganist = new Player();

class Game extends Phaser.Game {
    constructor() {
        super(config)
    }
}


const config = {
    type: Phaser.CANVAS,
    width: 1920,
    height: 1080,
    pixelArt: true,
    id: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true // set to true to view zones
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function preload ()
{
    this.load.spritesheet('player', 'assets/RPG_assets.png', {
        frameWidth: 16,
        frameHeight: 16
    });
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
    // const obstacles = map.createStaticLayer('Obstacles', tileset, 0, 0);
    // obstacles.setCollisionByExclusion([-1]);
    protaganist.createAnimation(this);
    // this.player.setCollideWorldBounds(true);

    protaganist.createSprite(this);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.cursors = this.input.keyboard.createCursorKeys();
}
//need to convert movement to switch statement
function update ()
{
    protaganist.updateMovement(this);
}


 window.game = new Phaser.Game(config);

// let game = new Phaser.Game(config);
