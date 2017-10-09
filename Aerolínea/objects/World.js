class World extends THREE.Object3D {
    constructor() {
        super();

        let earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        let earthTexture = new THREE.TextureLoader().load("./src/textures/Earth.jpg");
        let earthBump = new THREE.TextureLoader().load("./src/textures/EarthBump.jpg");
        let earthRough = new THREE.TextureLoader().load("./src/textures/EarthSpec.jpg");

        let earthMaterial = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.4,
            map: earthTexture,
            bumpMap: earthBump,
            roughnessMap: earthRough,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(earthMesh);
    }

    update() {

    }
}
