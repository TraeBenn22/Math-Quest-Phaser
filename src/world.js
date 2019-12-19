import Phaser from "phaser";
import {Enemies} from "./enemies";
import {Player} from "./player";
import {Map} from "./map";

export class GameScene extends Phaser.Scene {
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
        const enemy = new Enemies(this);
        const protaganist = new Player(this);
        const map = new Map("playground", "roguelikeSheet_transparent", this);
        protaganist.createAnimation();
        protaganist.createSprite();
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setZoom(5);
        this.cursors = this.input.keyboard.createCursorKeys();
        enemy.createEnemies(this.player);
        map.createCollider(this.player);

    }
    update() {
        const protaganist = new Player(this);
        protaganist.updateMovement();
    }

}
