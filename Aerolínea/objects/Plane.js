class Plane extends THREE.Object3D {
    constructor() {
        super();

        let body = Plane.body();
        let nose = Plane.nose();
        let wingRight = Plane.wing(1);
        let wingLeft = Plane.wing(-1);
        let tail = Plane.tail();

        this.add(body);
        this.add(nose);
        this.add(wingRight);
        this.add(wingLeft);
        this.add(tail);
    }

    // Move the plane
    move() {
    }

    // Method for creating the body/middle of the plane
    private static body() {
        let geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
        let material = new THREE.MeshBasicMaterial({color: 0xffff00});
        let body = new THREE.Mesh(geometry, material);

        body.position.set();
        body.rotation.set();

        return body;
    }

    // Method for creating the nose of the plane
    private static nose() {
        let geometry = new THREE.ConeGeometry(5, 5, 20, 32);
        let material = new THREE.MeshBasicMaterial({color: 0xffff00});
        let nose = new THREE.Mesh(geometry, material);

        nose.position.set();
        nose.rotation.set();

        return nose;
    }

    // Method for creating a wing of the plane
    private static wing(multiplier) {
        let geometry = new THREE.Geometry();
        let material = new THREE.MeshBasicMaterial({color: 0xffff00});
        let wing = new THREE.Mesh(geometry, material);

        wing.position.set();
        wing.rotation.set();

        return wing;

    }

    // Method for creating the tail of the plane
    private static tail() {
        let geometry = new THREE.Geometry();
        let material = new THREE.MeshBasicMaterial({color: 0xffff0});
        let tail = new THREE.Mesh(geometry, material);

        tail.position.set();
        tail.rotation.set();

        return tail;
    }
}