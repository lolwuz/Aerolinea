class Airplane extends THREE.Object3D {
    constructor(scale, textureNum, speed) {
        super();
        
        this.speed = speed;
        
        let tempClass = this;
        
        let textureName = 'models/Boeing787-8/texture' + textureNum + '.png'
        let texture = new THREE.TextureLoader().load(textureName);
        
        let objLoader = new THREE.OBJLoader();
            objLoader.setPath('models/Boeing787-8/');
            objLoader.load('object.obj', function(object) {
                object.traverse(function(child) {
                    if (child instanceof THREE.Mesh)
                        child.material.map = texture;
                })
                
                object.scale.set(scale, scale, scale);
                object.rotateY(Math.PI);

                tempClass.add(object);
            });
    }
}