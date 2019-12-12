import Phaser from "phaser";
import {Player} from './src/player.js';
import {Enemy} from './src/enemies.js';

const protaganist = new Player();
const enemy = new Enemy();

class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadScene',
            active: 'true'
        });
    }

    preload() {
        this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.tilemapTiledJSON('playground', 'assets/maps/playground.json');
        this.load.image('golem', 'assets/images/coppergolem.png');
        this.load.image('ent', 'assets/images/dark-ent.png');
        this.load.image('demon', 'assets/images/demon.png');
        this.load.image('worm', 'assets/images/giant-worm.png');
        this.load.image('wolf', 'assets/images/wolf.png');
        this.load.image('phaser', 'assets/boilerplate/phaser.png');
        this.load.image('tiles', "assets/maps/roguelikeSheet_transparent.png");
    }

    create() {
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    create() {

        //preferable to move everything here into their own functions//
        // createMap();
        // createPlayer();
        // createEnemies();
        const map = this.make.tilemap({key: 'playground'});
        const tileset = map.addTilesetImage("roguelikeSheet_transparent", 'tiles');
        const ground = map.createStaticLayer('Ground', tileset, 0, 0);
        const ground2 = map.createStaticLayer('Ground2', tileset, 0, 0);
        const decoration = map.createStaticLayer('Decoration', tileset, 0, 0);
        const roof = map.createStaticLayer('Roof', tileset, 0, 0);
        // const obstacles = map.createStaticLayer('Obstacles', tileset, 0, 0);
        // obstacles.setCollisionByExclusion([-1]);
        protaganist.createAnimation(this);
        protaganist.createSprite(this);
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        enemy.createEnemies(this);
    }
    update() {
        protaganist.updateMovement(this);
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
    scene: [
        LoadScene,
        GameScene
    ]
};

window.game = new Phaser.Game(config);
