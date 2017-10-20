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

        // this.add(new Plane());

        this.addLight();
        this.add(new axisHelper(5));
        
        this.airplane = new Airplane(0.05, 3, 1000000);
        this.add(this.airplane);
        
        let Geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        let Material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
        this.airport1 = new THREE.Mesh(Geometry, Material);
        this.airport1.position.y = Math.sin(10*Math.PI/180);
        let hypXZ = Math.cos(10*Math.PI/180);
        this.airport1.position.z = Math.sin(-22*Math.PI/180) * hypXZ;
        this.airport1.position.x = Math.cos(22*Math.PI/180) * hypXZ;
        
        this.airport2 = new THREE.Mesh(Geometry, Material);
        this.airport2.position.y = Math.sin(-30*Math.PI/180);
        hypXZ = Math.cos(-30*Math.PI/180);
        this.airport2.position.z = Math.sin(-130*Math.PI/180) * hypXZ;
        this.airport2.position.x = Math.cos(130*Math.PI/180) * hypXZ;
        
        this.routeLine = new RouteLine(this.airport1, this.airport2, 0xFFFF00);
        this.add(this.routeLine);
        
//        this.airplane.position.set(0, 1.3, 0);
//        let lookAtPosition = new THREE.Vector3().copy(this.airplane.position).multiplyScalar(0.5);
//        lookAtPosition.x = 1;
//        lookAtPosition.z = 1;
//        this.airplane.lookAt(lookAtPosition);
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

    update() {
        // Update lighting
        this.sunPivot.rotation.y += 0.001;
        // Update world
        this.world.update();

        this.renderer.render(this, this.camera);

    }
}
