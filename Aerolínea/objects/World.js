class World extends THREE.Object3D{
    constructor() {
        super();
     
        let earthGeometry = new THREE.SphereGeometry(1, 128, 128);
        let earthTexture = new THREE.TextureLoader().load( "./src/textures/earth8k.jpg" );
        let earthMaterial = new THREE.MeshStandardMaterial({
            map: earthTexture,
            color: 0xFFFFFF
        });
        let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(earthMesh);
    }
    
    update(){
        
    }
}