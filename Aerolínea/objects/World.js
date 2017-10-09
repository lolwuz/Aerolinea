class World extends THREE.Object3D{
    constructor() {
        super();
        
        let earthGeometry = new THREE.SphereGeometry(6, 32, 32);
        let earthMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF
        });
        let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(earthMesh);
    }
}