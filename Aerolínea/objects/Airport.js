class Airport extends THREE.Object3D{
    constructor(position) {
        super();
        
        this.rotationPosition = position
        
        this.pivot = new THREE.Object3D();
     
        let Geometry = new THREE.SphereGeometry(0.01, 128, 128);
        let Material = new THREE.MeshStandardMaterial({
            color: 0xFF00FF
        });
        let Mesh = new THREE.Mesh(Geometry,Material);
        Mesh.position.x = 1;
        this.pivot.add(Mesh);
        this.add(this.pivot);

        this.applyRotation(this.toRad(this.rotationPosition.x), this.toRad(this.rotationPosition.y))
    }
    
    applyRotation(stepZ, stepY)
    {
        // Update ball rotation
        let tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(0, 0, 1), stepZ);
        tempMat.multiply(this.matrix);
        this.matrix = tempMat;
        tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), stepY);
        tempMat.multiply(this.matrix);
        this.matrix = tempMat;
        this.rotation.setFromRotationMatrix(this.matrix);
    }
    
    toRad(degrees)
    {
        return degrees*Math.PI/180;
    }
}