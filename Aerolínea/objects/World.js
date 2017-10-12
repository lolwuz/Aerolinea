class World extends THREE.Object3D {
    constructor() {
        super();
        let earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        let cloudGeometry = new THREE.SphereGeometry(1.02, 64, 64);

        let earthTexture = new THREE.TextureLoader().load("./src/textures/rgb.jpg");
        let earthTextureE = new THREE.TextureLoader().load("./src/textures/elevate.jpg");
        let earthTextureC = new THREE.TextureLoader().load("./src/textures/cloud8.png");

        // let earthBump = new THREE.TextureLoader().load("./src/textures/EarthBump2.jpg");
        // let earthRough = new THREE.TextureLoader().load("./src/textures/EarthSpec.jpg");
        let earthMaterial = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.5,
            map: earthTexture,
            bumpMap: earthTextureE,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        var cloudMaterial = new THREE.MeshPhongMaterial({
            map: earthTextureC,
            transparent: true,
            bumpScale: 0.1,
            side: THREE.DoubleSide
        })

        this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
        this.add(this.earthMesh);
        // this.add(this.cloudMesh);
        // this.createAirports();
    }

    createAirports() {

    }

    update() {
        this.cloudMesh.rotation.y -= 0.0001;    
    }
}
