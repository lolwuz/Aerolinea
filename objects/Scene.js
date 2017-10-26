class Scene extends THREE.Scene {
    constructor() {
        super();
        // Add camera to the scene.
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.x = 3;
        this.camera.position.y = 0.5;
        this.renderer = new THREE.WebGLRenderer(
            {
                antialias: true,
                canvas: gameCanvas
            }
        );
        this.renderer.setClearColor(0x4f99ff, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Add orbit controlls to the scene.
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        //this.controls.maxDistance = 10;
        //this.controls.minDistance = 1.6;
        //this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.01;
        this.controls.update();

        this.world = new World();
        this.add(this.world);

        this.addLight();
        this.add(new axisHelper(5));
        
        this.airplane = new Airplane(0.05, 3, 0.1);


        let Geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        let Material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
    
    }

    addLight() {
        this.ambient = new THREE.AmbientLight(0xFFFFFF, 0.6);
        this.add(this.ambient);
        
        this.sunPivot = new THREE.Object3D();
        this.sun = new THREE.SpotLight(0xFFFFFF, 1);
        this.sun.lookAt(this.world); 
        this.sun.position.set(0,0,10);
        this.sunPivot.add(this.sun);
        
        this.add(this.sunPivot);
    }

    update(delta) {
        // Update lighting
        this.sunPivot.rotation.y += 0.001 * delta;
        // Update world
        this.world.update(delta);

        this.renderer.render(this, this.camera);

    }
}
