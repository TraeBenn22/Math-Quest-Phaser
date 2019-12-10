import Phaser from "phaser";




export  class Player  {
    constructor() {
    }

    createAnimation(config) {
        config.anims.create({
            key: 'right',
            frames: config.anims.generateFrameNumbers('player', {
                frames: [1, 7, 1, 13]
            }),
            frameRate: 10,
            repeat: -1
        });

        config.anims.create({
            key: 'up',
            frames: config.anims.generateFrameNumbers('player', {
                frames: [2, 8, 2, 14]
            }),
            frameRate: 10,
            repeat: -1
        });

        config.anims.create({
            key: 'down',
            frames: config.anims.generateFrameNumbers('player', {
                frames: [0, 6, 0, 12]
            }),
            frameRate: 10,
            repeat: -1
        });
    }
    updateMovement(config) {
        config.player.body.setVelocity(0);

        if (config.cursors.left.isDown) {
            config.player.body.setVelocityX(-80);
        } else if (config.cursors.right.isDown) {
            config.player.body.setVelocityX(80);
        }

        if (config.cursors.up.isDown) {
            config.player.body.setVelocityY(-80);
        } else if (config.cursors.down.isDown) {
            config.player.body.setVelocityY(80);
        }
        if (config.cursors.left.isDown) {
            config.player.anims.play('left', true);
            config.player.flipX = true;
        } else if (config.cursors.right.isDown) {
            config.player.anims.play('right', true);
            config.player.flipX = false;
        } else if (config.cursors.up.isDown) {
            config.player.anims.play('up', true);
        } else if (config.cursors.down.isDown) {
            config.player.anims.play('down', true);
        } else {
            config.player.anims.stop();
        }
    }

    createSprite(config) {

        config.player = config.physics.add.sprite(50, 100, 'player', 6);
    }
}

