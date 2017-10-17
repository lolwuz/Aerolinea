class Airplane extends THREE.Object3D {
    constructor() {
        super();

        let tempClass = this;
        
        let texture = new THREE.Texture();
        
        let imageloader = new THREE.ImageLoader();
        imageloader.load('models/Boeing787-8/Boeing 787-8 texture.png', function(image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        
        let objLoader = new THREE.OBJLoader();
            objLoader.setPath('models/Boeing787-8/');
            objLoader.load('Boeing 787-8.obj', function(object) {
                object.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                    }
                })
                
                object.scale.set(1, 1, 1);
                object.position.set(1.5, 1.5, 1.5);

                tempClass.add(object);
                console.log(tempClass);
            });
    }

    applyRotation(stepZ, stepY) {
    }

    setColor() {
    }
}