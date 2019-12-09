import Phaser from "phaser";

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

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {
            frames: [1, 7, 1, 13]
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
            frames: [1, 7, 1, 13]
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', {
            frames: [2, 8, 2, 14]
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', {
            frames: [0, 6, 0, 12]
        }),
        frameRate: 10,
        repeat: -1
    });

    this.player = this.physics.add.sprite(50, 100, 'player', 6);
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
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(80);
    }

    if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
    }
    if (this.cursors.left.isDown) {
        this.player.anims.play('left', true);
        this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
        this.player.anims.play('right', true);
        this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
        this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
        this.player.anims.play('down', true);
    } else {
        this.player.anims.stop();
    }
}

class Game extends Phaser.Game {
    constructor() {
        super(config)
    }
}

 window.game = new Phaser.Game(config);

// let game = new Phaser.Game(config);
