class World extends THREE.Object3D {
    constructor() {
        super();
        let earthGeometry = new THREE.SphereGeometry(1, 64, 64);

        let earthTexture = new THREE.TextureLoader().load("./src/textures/rgb.jpg");
        let earthTextureE = new THREE.TextureLoader().load("./src/textures/elevate.jpg");

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

        this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(this.earthMesh);
        // this.add(this.cloudMesh);
        // this.createAirports();

        let airports = this.getAirports("http://192.168.178.41:3000/airport");
        for (let i = 0; i < airports.length; i++) {
            this.add(new Airport(airports[i]));
        }
    }

    update() {

    }

    getAirports(fetchUrl) {
        return fetch(fetchUrl)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                return data;
            })
    }
}