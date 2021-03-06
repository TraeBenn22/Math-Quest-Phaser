import Phaser from 'phaser';
import {Player} from './player.js';
import {Enemies} from './enemies.js';



export  class BattleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'battlescene',
        });
    }

        preload() {
                    this.load.spritesheet('player', 'assets/RPG_assets.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('golem', 'assets/images/coppergolem.png');
        this.load.image('ent', 'assets/images/dark-ent.png');
        this.load.image('demon', 'assets/images/demon.png');
        this.load.image('worm', 'assets/images/giant-worm.png');
        this.load.image('wolf', 'assets/images/wolf.png');
        this.load.image('phaser', 'assets/boilerplate/phaser.png');

        }
        create () {
            const battlePlayer = new Player();
            const battleEnemy = new Enemies();
            battlePlayer.createSprite(100, 100);
            // this.cameras.main.setZoom(5);
            battleEnemy.spawnBattleEnemy(110, 110);
            this.scene.start('scene');
        }
}
// class BattleScene extends Phaser.scene {
//     constructor() {
//         super({
//             key: 'BattleScene',
//         })
//     }
//     preload() {
//         this.load.spritesheet('player', 'assets/RPG_assets.png', {
//             frameWidth: 16,
//             frameHeight: 16
//         });
//         this.load.image('golem', 'assets/images/coppergolem.png');
//         this.load.image('ent', 'assets/images/dark-ent.png');
//         this.load.image('demon', 'assets/images/demon.png');
//         this.load.image('worm', 'assets/images/giant-worm.png');
//         this.load.image('wolf', 'assets/images/wolf.png');
//         this.load.image('phaser', 'assets/boilerplate/phaser.png');
//         this.load.tilemapTiledJSON('playground', 'assets/maps/playground.json');
//         this.load.image('roguelikeSheet_transparent', "assets/maps/roguelikeSheet_transparent.png");
//     }
//
//     create() {
//
//     }
//
//     update() {
//
//     }
// }
