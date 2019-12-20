import { BattleScene } from './battleScene.js';
import {Player} from "./player";

export class Enemies {
    constructor(Scene, player) {
        this.phaser = Scene;
        this.player = player;
        this.enemies = [];
    }

    createEnemies() {
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
            this.phaser.physics.add.collider(enemy, this.player)

        }


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


    movetoTarget() {
        // console.log(this.player);
        // console.log(this.enemies);
           this.enemies.forEach( enemy => {
               let searchResults = this.phaser.physics.overlapCirc(enemy.x, enemy.y, 100);
               if(this.checkForPlayer(searchResults) === true) {
                   console.log(this.checkForPlayer(searchResults));
                   this.phaser.physics.accelerateTo(enemy, this.player.x, this.player.y, 40, 40, 40);
               } else {
                   let randomLocation = this.getTargetLocation();
                   this.phaser.physics.accelerateTo(enemy, randomLocation.x, randomLocation.y, 20, 20, 20);
               }

           });

    }

    checkForPlayer(array) {
        array.forEach(index => {
            if(index.gameObject.texture.key === 'player') {
                console.log(index.gameObject.texture.key);
                return true;
            }
        })
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
