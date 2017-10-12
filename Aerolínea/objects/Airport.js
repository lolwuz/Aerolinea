class Airport extends THREE.Object3D{
    constructor(position) {
        super();
        
        this.rPosition = position;
     
        let Geometry = new THREE.SphereGeometry(0.01, 8, 8);
        let Material = new THREE.MeshStandardMaterial({
            color: 0xFF00FF
        });
        this.Mesh = new THREE.Mesh(Geometry,Material);
        this.add(this.Mesh);
        
        this.position.add(this.getPositionOnSphere(this.rPosition.x, this.rPosition.y, 1));
    }
    
    getPositionOnSphere(long, lat, radius)
    {
        let position = new THREE.Vector3();
        position.y = Math.sin(long) * radius;
        let hypXZ = Math.cos(long);
        
        position.z = Math.sin(-lat) * hypXZ * radius;
        position.x = Math.cos(lat) * hypXZ * radius;
        
        return position;
    }
}