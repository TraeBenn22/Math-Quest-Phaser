import Phaser from "phaser";

export class Map {

    /**
     * Constructor takes in the map key and atlas key for storage, along with the scene
     *
     * @param {string} mapKey
     * @param {string} atlasKey
     * @param {Phaser.Scene} scene
     */
    constructor(mapKey, atlasKey, scene) {
        this.scene = scene;
        this.mapKey = mapKey;
        this.atlasKey = atlasKey;
        this.layers = [];
        this.createMap();
    }

    createMap() {
        this.map = this.scene.make.tilemap({key: this.mapKey});
        this.tileset = this.map.addTilesetImage(this.atlasKey, this.atlasKey);
        this.widthInPixels = this.map.widthInPixels;
        this.heightInPixels = this.map.heightInPixels;

        this.map.layers.forEach((layer, index) => {
            if (layer.properties[0].value) {
                this.layers.push(this.map.createStaticLayer(layer.name, this.tileset, 0, 0).setCollisionByProperty({collides: true}));
                if (layer.name == "Roof") {
                    this.layers[index].setDepth(10);
                }
            } else {
              this.layers.push(this.map.createDynamicLayer(layer.name, this.tileset, 0, 0).setCollisionByProperty({collides: true}));
            }


        });
    }

    createCollider(collisionObject) {
        this.layers.forEach((layer) => {
             this.scene.physics.add.collider(collisionObject, layer)
        })
    }
}
