class Scene extends THREE.Scene {
    constructor() {
        super();
        // Add camera to the scene.
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setClearColor(0x4f99ff, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        // Add orbit controlls to the scene.
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.maxDistance = 10;
        this.controls.minDistance = 1.5;
        this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.update();
        
        this.world = new World(); 
        this.add(this.world);
        
        this.addLight();
    }
    
    addLight(){
        let ambient = new THREE.AmbientLight(0xFFFFFF, 0.2);
        let sun = new THREE.DirectionalLight(0xFFFFFF, 0.6);

        this.add(ambient);
        this.add(sun); 
    }
    
    update(){
        this.renderer.render(this, this.camera);
        this.world.update();
    }
}
