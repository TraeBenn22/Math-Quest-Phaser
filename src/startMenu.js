import Phaser from "phaser";


export class StartMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartMenu'
        })
    }
    create() {
        const horizontalCenter = this.centerX=game.config.width/2;
        const verticalCenter = this.centerX=game.config.height/2;
        this.add.image(horizontalCenter, verticalCenter, 'titleImage');
        const menuEmitter = new Phaser.Events.EventEmitter();
        menuEmitter.on('click', this.startGame, this);
        const startButton = this.add.image(horizontalCenter, verticalCenter, 'startButton').setInteractive();
        const optionsButton = this.add.image(horizontalCenter, verticalCenter + 50, 'optionsButton').setInteractive();

        startButton.on('pointerup', () => {this.startGame()});
        const music = this.sound.add('title');
        music.play();

    }

    startGame() {
        this.scene.start('GameScene');
    }
}
