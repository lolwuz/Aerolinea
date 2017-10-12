class Airplane extends THREE.Object3D {
    constructor() {
        super();

        let tempClass = this;
        let loader = new THREE.ColladaLoader();
        loader.load("src/galaxy.dae", function (result) {
            let boeing = result.scene;

            boeing.scale.set(0.0001, 0.0001, 0.0001);
            boeing.position.set(1, 1, 1);

            // console.log(boeing);

            tempClass.add(boeing);
        });
    }

    applyRotation(stepZ, stepY) {
    }

    setColor() {
    }
}