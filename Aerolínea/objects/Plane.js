class Plane extends THREE.Object3D {
    constructor() {
        super();
        // TODO: Build plane(group/Object3D), Textures, Specific functions etc...
        // Details: Sizes, position, rotation of all parts of the Object3D/group.
        let body = Plane.body();
        let nose = Plane.nose();
        // let wingRight = Plane.wing(1);
        // let wingLeft = Plane.wing(-1);
        // let tail = Plane.tail();

        this.add(body);
        this.add(nose);
        // this.add(wingRight);
        // this.add(wingLeft);
        // this.add(tail);

        this.position.set(0.5, 0.5, 0.5);
        // this.rotation.set();
        // resize object
        this.scale.set(0.1, 0.1, 0.1);
    }

    // CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
    static body() {
        let geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 32);
        let material = new THREE.MeshBasicMaterial(
            {
                color: 0xffffff
            }
        );

        let body = new THREE.Mesh(geometry, material);
        body.position.set(1, 1, 1);

        // body.rotation.set();

        return body;
    }

    // ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
    static nose() {
        let geometry = new THREE.ConeGeometry(0.2, 0.3, 32);
        let material = new THREE.MeshBasicMaterial(
            {
                color: 0xffffff
            }
        );
    }

    // Method for creating the body/middle of the plane

    // Method for creating a wing of the plane
    static wing(multiplier) {
        let geometry = new THREE.Geometry();
        let material = new THREE.MeshBasicMaterial(
            {
                color: 0x000000,
                side: THREE.DoubleSide
            }
        );

        let v1 = new THREE.Vector3(0, 0, 0);
        let v2 = new THREE.Vector3(0.3, 0, 0);
        let v3 = new THREE.Vector3(0.3, 0.3, 0);

        geometry.vertices.push(v1);
        geometry.vertices.push(v2);
        geometry.vertices.push(v3);

        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.computeFaceNormals();

        let wing = new THREE.Mesh(geometry, material);

        wing.position.set(1.2, 1.2, 1.2);

        wing.rotation.x = Math.PI;

        return wing;
    }

    // Method for creating the nose of the plane

    // Method for creating the tail of the plane
    static tail() {
    }

    // Method for creating the wing on the tail of the plane
    static tailWing() {
    }

    // Move the plane
    move() {
    }

    // Rotate the plane
    applyRotation() {
    }
}