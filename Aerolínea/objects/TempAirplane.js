class TempAirplane extends THREE.Object3D{
    constructor(startAirport, destinationAirport) {
        super();
        
        this.startAirport = startAirport;
        this.destinationAirport = destinationAirport;
        
        this.pivot = new THREE.Object3D();
     
        let Geometry = new THREE.CylinderGeometry( 0, 0.01, 0.02, 32 );
        let Material = new THREE.MeshStandardMaterial({
            color: 0xFFFF00
        });
        let Mesh = new THREE.Mesh(Geometry,Material);
        Mesh.position.x = 1;
        this.pivot.add(Mesh);
        this.add(this.pivot);
        
        this.applyRotation(startAirport.longtitude*Math.PI/180, startAirport.latitude*Math.PI/180)

        this.rotateX(Math.PI/2 + Math.sqrt(Math.pow(this.startAirport.latitude*Math.PI/180 - this.destinationAirport.latitude*Math.PI/180, 2) + Math.pow(this.startAirport.longtitude*Math.PI/180 - this.destinationAirport.longtitude*Math.PI/180, 2)));
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
}