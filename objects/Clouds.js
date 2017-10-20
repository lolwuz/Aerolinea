class Clouds extends THREE.Mesh {
    constructor() {
        let geometry = new THREE.Geometry();

        let texture = new THREE.TextureLoader().load('src/textures/cloud2.png');
        texture.magFilter = THREE.LinearMipMapLinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        // Create a blue fog.
        let fog = new THREE.Fog(0x3390ed, -100, 5000);

        let material = new THREE.ShaderMaterial({
            uniforms: {
                "map": {type: "t", value: texture},
                "fogColor": {type: "c", value: fog.color},
                "fogNear": {type: "f", value: fog.near},
                "fogFar": {type: "f", value: fog.far},
            },
            depthWrite: false,
            depthTest: false,
            transparent: true
        });

        super(geometry, material);

        this.position.y = 1.5;
        this.scale.set(10, 10, 10);
    }
}