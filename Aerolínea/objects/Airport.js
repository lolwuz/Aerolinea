class Airport extends THREE.Object3D{
    constructor(longtitude, latitude) {
        super();
        
        this.pivot = new THREE.Object3D();
     
        let Geometry = new THREE.SphereGeometry(0.01, 128, 128);
        let Material = new THREE.MeshStandardMaterial({
            color: 0xFF00FF
        });
        let Mesh = new THREE.Mesh(Geometry,Material);
        Mesh.position.x = 1;
        this.pivot.add(Mesh);
        this.add(this.pivot);
        this.rotateY(latitude*Math.PI/180);
        this.rotateZ(longtitude*Math.PI/180);
    }
}