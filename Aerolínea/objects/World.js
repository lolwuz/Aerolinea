class World extends THREE.Object3D {
    constructor() {
        super();
        let earthGeometry = new THREE.SphereGeometry(1, 32, 32);

        let earthTexture = new THREE.TextureLoader().load("./src/textures/rgb.jpg");
        let earthTextureE = new THREE.TextureLoader().load("./src/textures/elevate.jpg");

        // let earthBump = new THREE.TextureLoader().load("./src/textures/EarthBump2.jpg");
        // let earthRough = new THREE.TextureLoader().load("./src/textures/EarthSpec.jpg");
        let earthMaterial = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.5,
            map: earthTexture,
            bumpMap: earthTextureE,
            bumpScale: 0.003,
            color: 0xFFFFFF
        });

        let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(earthMesh);
        // this.createAirports();
    }

    createAirports() {
        
    }

    update() {

    }
}
