import Phaser from 'phaser';

export class Player {
    constructor(Scene) {
       this.phaser = Scene;
    }

    createAnimation() {

        this.phaser.anims.create({
            key: 'left',
            frames: this.phaser.anims.generateFrameNumbers('player', {
                frames: [1, 7, 1, 13]
            }),
            frameRate: 10,
            repeat: -1
        });

        this.phaser.anims.create({
            key: 'right',
            frames: this.phaser.anims.generateFrameNumbers('player', {
                frames: [1, 7, 1, 13]
            }),
            frameRate: 10,
            repeat: -1
        });

        this.phaser.anims.create({
            key: 'up',
            frames: this.phaser.anims.generateFrameNumbers('player', {
                frames: [2, 8, 2, 14]
            }),
            frameRate: 10,
            repeat: -1
        });

        this.phaser.anims.create({
            key: 'down',
            frames: this.phaser.anims.generateFrameNumbers('player', {
                frames: [0, 6, 0, 12]
            }),
            frameRate: 10,
            repeat: -1
        });
    }
    updateMovement() {
        this.phaser.player.body.setVelocity(0);

        if (this.phaser.cursors.left.isDown) {
            this.phaser.player.body.setVelocityX(-80);
        } else if (this.phaser.cursors.right.isDown) {
            this.phaser.player.body.setVelocityX(80);
        }

        if (this.phaser.cursors.up.isDown) {
            this.phaser.player.body.setVelocityY(-80);
        } else if (this.phaser.cursors.down.isDown) {
            this.phaser.player.body.setVelocityY(80);
        }
        if (this.phaser.cursors.left.isDown) {
            this.phaser.player.anims.play('left', true);
            this.phaser.player.flipX = true;
        } else if (this.phaser.cursors.right.isDown) {
            this.phaser.player.anims.play('right', true);
            this.phaser.player.flipX = false;
        } else if (this.phaser.cursors.up.isDown) {
            this.phaser.player.anims.play('up', true);
        } else if (this.phaser.cursors.down.isDown) {
            this.phaser.player.anims.play('down', true);
        } else {
            this.phaser.player.anims.stop();
        }
    }

    createSprite() {
        this.phaser.player = this.phaser.physics.add.sprite(50, 100, 'player', 6);
    }
}





