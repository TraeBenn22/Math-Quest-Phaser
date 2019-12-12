export class Enemy {
    constructor() {

    }

    createEnemies(config) {
        config.spawns = config.physics.add.group({
            classType: Phaser.GameObjects.Sprite
        });
        for (let i = 0; i < 8; i++) {
            const location = this.getValidLocation(config);
            let enemy = config.spawns.create(location.x, location.y, this.getEnemySprite());
            enemy.body.setCollideWorldBounds(true);
            enemy.body.setImmovable();
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

}
