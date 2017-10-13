class Airplane extends THREE.Object3D {
    constructor() {
        super();

        let tempClass = this;

        let texture = new THREE.Texture();

        let imageLoader = new THREE.ImageLoader();
        imageLoader.load('src/galaxy.jpg', function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });


        // OBJLoader:
        let loader = new THREE.OBJLoader();
        loader.load('src/galaxy.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });

            object.scale.set(0.05, 0.05, 0.05);
            object.position.set(1.5, 1.5, 1.5);
            tempClass.add(object);
        });

        // ColladaLoader:
        // let loader = new THREE.ColladaLoader();
        // loader.load("src/galaxy.dae", function (result) {
        //     let boeing = result.scene;
        //
        //     boeing.scale.set(0.0001, 0.0001, 0.0001);
        //     boeing.position.set(1, 1, 1);
        //
        //     // console.log(boeing);
        //
        //     tempClass.add(boeing);
        // });
    }

    applyRotation(stepZ, stepY) {
    }

    setColor() {
    }
}