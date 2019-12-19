import { BattleScene } from './battleScene.js';


export class Enemies {
    constructor(Scene) {
        this.phaser = Scene;
        this.enemies = new Map();

    }

    createEnemies(player) {
        this.phaser.spawns = this.phaser.physics.add.group({
            classType: Phaser.GameObjects.Sprite
        });

        for (let i = 0; i < 10; i++) {
    let randomEnemies = this.getEnemySprite();
            const location = this.getValidLocation(this.phaser);
            let enemy = this.phaser.spawns.create(location.x, location.y, randomEnemies);
            enemy.body.setCollideWorldBounds(true);
            enemy.body.setImmovable();
            this.enemies.set(randomEnemies, 'enemy ' + randomEnemies);
            this.phaser.physics.add.collider(enemy, player, this.battleCollision)
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

    spawnBattleEnemy(x, y) {
        return  this.phaser.spawns.create(x, y, this.getEnemySprite());
    }

    battleCollision() {
        BattleScene();
    }

}
