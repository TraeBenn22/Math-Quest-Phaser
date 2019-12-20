import Phaser from "phaser";
import {GameScene} from './src/world';
// import {BattleScene} from "./src/battleScene";
import {StartMenu} from './src/startMenu';

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
        this.load.image('titleImage','assets/images/MainMenuImage.png');
        this.load.audio('title', 'assets/audio/NomenEstOmen_4NobodysJig.mp3');
        this.load.image('startButton', 'assets/images/button_start-game.png');
        this.load.image('optionsButton', 'assets/images/button_options.png');
    }

    create() {
        this.scene.start('StartMenu');
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
        StartMenu,
        GameScene,
        // BattleScene,
    ]
};

window.game = new Phaser.Game(config);
