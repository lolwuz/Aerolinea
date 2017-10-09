class World extends THREE.Object3D{
    constructor() {
        super();
     
        let earthGeometry = new THREE.SphereGeometry(50, 128, 128);
        let earthMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF
        });
        let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(earthMesh);
    }
    
    update(){
        
    }
}