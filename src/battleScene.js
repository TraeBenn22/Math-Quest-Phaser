class LoadScene extends Phaser.scene {
    constructor() {
        super( {
            key: 'LoadScene',
            active: 'false'
        })
    }
    preload() {

    }

    create() {
        this.scene.start('BattleScene');
    }
}

class BattleScene extends Phaser.scene {
    constructor() {
        super({
            key: 'BattleScene',
        })
    }

    create() {

    }

    update() {

    }
}
