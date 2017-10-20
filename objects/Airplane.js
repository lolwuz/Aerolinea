class Airplane extends THREE.Object3D {
    constructor(scale, textureNum, speed) {
        super();
        
        this.speed = speed;
        this.percentInFlight = 0.0;
        
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
        this.add(new axisHelper(1));
    }
    
    setNextPosition(routeLine, delta)
    {
            //save its old flightPos
        let percentInFlight_old = this.percentInFlight;
        
            //Set new position (in % along its path)
        this.percentInFlight += routeLine.length/this.speed * delta;      // percentInFlight == > 0 && < 1
        
        if (this.percentInFlight <= 1)
        {
                //Get the new position of the Airplane (in 3D space)
            let newPos = routeLine.spline.getPoint(this.percentInFlight);  
                //Set its position and rotation (facing away from its old position)
            this.position.set(newPos.x, newPos.y, newPos.z);
            this.up = newPos.multiplyScalar(2);
            this.lookAt(routeLine.spline.getPoint(percentInFlight_old));  
        }
    }
}