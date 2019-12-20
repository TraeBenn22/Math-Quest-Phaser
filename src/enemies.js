import { BattleScene } from './battleScene.js';



export class Enemies {
    constructor(Scene) {
        this.phaser = Scene;
        this.enemies = [];

    }

    createEnemies(player) {
        this.phaser.spawns = this.phaser.physics.add.group({
            classType: Phaser.GameObjects.Sprite
        });

        for (let i = 0; i < 5; i++) {
    let randomEnemies = this.getEnemySprite();
            const location = this.getValidLocation(this.phaser);
            let enemy = this.phaser.spawns.create(location.x, location.y, randomEnemies);
            enemy.body.setCollideWorldBounds(true);
            enemy.body.setImmovable();

            this.enemies.push(enemy);

            this.phaser.physics.add.collider(enemy, player)

        }
        console.log(this.enemies);


}

    getEnemySprite() {
        let sprites = ['golem', 'ent', 'demon', 'worm', 'wolf'];
        return sprites[Math.floor(Math.random() * sprites.length)];
    }

    getValidLocation(config) {
       let validLocation = false;
        let x, y;
        while (!validLocation) {
            // need to change the last parameter to the width and height of the game view after fixing the resolution
            x = Phaser.Math.RND.between(0, 500);
            y = Phaser.Math.RND.between(0, 500);

            let occupied = false;
            config.spawns.getChildren().forEach((child) => {
                if (child.getBounds().contains(x, y)) {
                    occupied = true;
                }
            });
            if (!occupied) validLocation = true;
        }
        return { x, y };

    }

     // spawnBattleEnemy(x, y) {
    //     return  this.phaser.spawns.create(x, y, this.getEnemySprite());
    // }

    // battleCollision() {
    //     BattleScene();
    // }

    getTargetLocation() {
        let x = Phaser.Math.RND.between(0, 500);
        let y = Phaser.Math.RND.between(0, 500);
        return {x, y};
    }


    movetoTarget(player) {
           this.enemies.forEach( enemy => {
               // if(player) {
               //
               // }
               let randomLocation = this.getTargetLocation();
               this.phaser.physics.accelerateTo(enemy, randomLocation.x, randomLocation.y, 10, 10, 10);
           });

    }

    // timedEvent = this.phaser.time.addEvent({
    //     delay: 5000,
    //     callback: this.updateRandomMovement,
    //     callbackScope: this,
    // });
    //
    // updateRandomMovement() {
    //     if(this.enemies[0].stopAfterDelay(5000) === 60) {
    //         this.enemies[0].acceleration = 0;
    //     }
    // }





}
