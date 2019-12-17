import Phaser from "phaser";
import {Player} from './src/player.js';
import {Enemies} from './src/enemies.js';
import { Map } from "./src/map.js";



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
        this.load.image('roguelikeSheet_transparent', "assets/maps/roguelikeSheet_transparent.png");
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
        const enemy = new Enemies(this, this.player);
        const protaganist = new Player(this);
        const map = new Map("playground", "roguelikeSheet_transparent", this);
        protaganist.createAnimation();
        protaganist.createSprite();
        enemy.createCollision(this.player);
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setZoom(5);
        this.cursors = this.input.keyboard.createCursorKeys();
        enemy.createEnemies();
        map.createCollider(this.player);
    }
    update() {
        const protaganist = new Player(this);
        protaganist.updateMovement();
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
