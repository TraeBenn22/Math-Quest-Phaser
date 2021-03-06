import Phaser from "phaser";
import {Enemies} from "./enemies";
import {Player} from "./player";
import {Map} from "./map";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene',

        });
        this.enemies = new Enemies(this, this.player);
        this.protaganist = new Player(this);
    }

    create() {
        const map = new Map("playground", "roguelikeSheet_transparent", this);
        this.protaganist.createAnimation();
        this.protaganist.createSprite();
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        // this.cameras.main.setZoom(5);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.enemies.createEnemies(this.player);
        map.createCollider(this.player);
        this.enemies.movetoTarget();

        let timedEvent = this.time.addEvent({
            delay: 5000,
            callback: this.enemies.movetoTarget,
            callbackScope: this.enemies,
            repeat: -1,
        });

    }
    update() {
        this.protaganist.updateMovement();


    }

}
