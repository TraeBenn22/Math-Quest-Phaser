export class Enemies {
    constructor(Scene) {
        this.phaser = Scene;
        this.enemy = null;
        this.enemies = [];
    }

    createEnemies() {
        this.phaser.spawns = this.phaser.physics.add.group({
            classType: Phaser.GameObjects.Sprite
        });
        for (let i = 0; i < 8; i++) {
            const location = this.getValidLocation(this.phaser);
            this.enemy = this.phaser.spawns.create(location.x, location.y, this.getEnemySprite());
            this.enemy.body.setCollideWorldBounds(true);
            this.enemy.body.setImmovable();
            this.enemies.push(this.enemy);
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
    createCollision(player) {
           this.phaser.physics.add.collider(player, this.enemies);
    }

}
