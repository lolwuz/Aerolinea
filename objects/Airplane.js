class Airplane extends THREE.Object3D {
    constructor() {
        super();

        let tempClass = this;

        let mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('src/');
        mtlLoader.load('Airbus A310.mtl', function(materials) {
            materials.preload();

            console.log(materials);

            let objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('src/');
            objLoader.load('Airbus A310.obj', function(object) {

                object.scale.set(0.05, 0.05, 0.05);
                object.position.set(1.5, 1.5, 1.5);

                tempClass.add(object);
            });

        });

        // OBJLoader:
        // let loader = new THREE.OBJLoader();
        // loader.load('src/Airbus A310.obj', function (object) {
        //     object.traverse(function (child) {
        //         if (child instanceof THREE.Mesh) {
        //             child.material.map = texture;
        //         }
        //     });
        //
        //     object.scale.set(0.05, 0.05, 0.05);
        //     object.position.set(1.5, 1.5, 1.5);
        //
        //     // console.log(object);
        //
        //     tempClass.add(object);
        // });

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