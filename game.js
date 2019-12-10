import Phaser from "phaser";
 import {Player} from './src/player.js';

const protaganist = new Player();

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
        // this.load.spritesheet('enemy', 'assets/dark-ent.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('phaser', 'assets/boilerplate/phaser.png');
        this.load.image('tiles', "assets/maps/roguelikeSheet_transparent.png");
        this.load.tilemapTiledJSON('playground', 'assets/maps/playground.json');
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

    function onMeetEnemy(player, zone) {
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.scene.world.bounds.height);
    }


    this.spawns = this.physics.add.group({
        classType: Phaser.GameObjects.Zone
    });
    for (let i = 0; i < 30; i++) {
    let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    // parameters are x, y, width, height
    this.spawns.create(x, y, 20, 20);
}
// add collider
this.physics.add.overlap(this.player, this.spawns, onMeetEnemy, false, this);
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


