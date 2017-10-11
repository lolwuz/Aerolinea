class World extends THREE.Object3D {
    constructor() {
        super();

        let earthGeometry1 = new THREE.SphereGeometry(1, 64, 64, 0, 1.575);
        let earthGeometry2 = new THREE.SphereGeometry(1, 64, 64, 0, 1.575);
        let earthGeometry3 = new THREE.SphereGeometry(1, 64, 64, 0, 1.575);
        let earthGeometry4 = new THREE.SphereGeometry(1, 64, 64, 0, 1.575);

        let earthTexture1 = new THREE.TextureLoader().load("./src/textures/e1.png");
        let earthTexture2 = new THREE.TextureLoader().load("./src/textures/e2.png");
        let earthTexture3 = new THREE.TextureLoader().load("./src/textures/e3.png");
        let earthTexture4 = new THREE.TextureLoader().load("./src/textures/e4.png");


        // let earthBump = new THREE.TextureLoader().load("./src/textures/EarthBump2.jpg");
        // let earthRough = new THREE.TextureLoader().load("./src/textures/EarthSpec.jpg");
        let earthMaterial1 = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.5,
            map: earthTexture1,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        let earthMaterial2 = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.5,
            map: earthTexture2,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        let earthMaterial3 = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.5,
            map: earthTexture3,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        let earthMaterial4 = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.5,
            map: earthTexture4,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        let earthMesh1 = new THREE.Mesh(earthGeometry1, earthMaterial1);
        let earthMesh2 = new THREE.Mesh(earthGeometry2, earthMaterial2);
        let earthMesh3 = new THREE.Mesh(earthGeometry3, earthMaterial3);
        let earthMesh4 = new THREE.Mesh(earthGeometry4, earthMaterial4);

        earthMesh2.rotation.set(0, 90 / 180 * Math.PI, 0);
        earthMesh3.rotation.set(0, 180 / 180 * Math.PI, 0);
        earthMesh4.rotation.set(0, 270 / 180 * Math.PI, 0);

        this.add(earthMesh1);
        this.add(earthMesh2);
        this.add(earthMesh3);
        this.add(earthMesh4);
        
        // this.createAirports();
    }

    createAirports() {
        
    }

    update() {

    }
}
