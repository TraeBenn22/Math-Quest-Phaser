import Phaser from "phaser";
import {GameScene} from './src/world';
import {BattleScene} from "./src/battleScene";

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
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}
    class MainMenuScene extends Phaser.Scene {
        constructor() {
            super({
                key: 'MainMenuScene'
            })
        }
        create() {
            this.add.image(500, 500, 'titleImage');
            const menuEmitter = new Phaser.Events.EventEmitter();
            menuEmitter.on('click', this.startGame, this);
            const startButton = this.add.text(470, 465, 'Start Game', { fill: '#0f0'});
            const optionsButton = this.add.text(485, 485, 'Options', {fill: '#0f0'});
            startButton.setInteractive();
            startButton.on('pointerup', () => {this.startGame()});
            const music = this.sound.add('title');
            music.play();

        }

        startGame() {
            this.scene.start('GameScene');
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
        MainMenuScene,
        GameScene,
        BattleScene,
    ]
};

window.game = new Phaser.Game(config);
