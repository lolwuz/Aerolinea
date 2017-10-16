class Airport extends THREE.Mesh{
    constructor(obj) {
        let Geometry = new THREE.BoxGeometry(0.004, 0.004, 0.004);
        let Material = new THREE.MeshBasicMaterial({
            color: 0xFF00FF
        });

        super(Geometry, Material);
        this.info = obj;
        let position = this.getPositionOnSphere(obj.lat * Math.PI / 180, obj.lon * Math.PI / 180, 1);
        this.position.set(position.x, position.y, position.z);
        this.lookAt(position.multiplyScalar(2));
    }
    
    getPositionOnSphere(long, lat, radius)
    {
        let position = new THREE.Vector3();
        position.y = Math.sin(long) * radius;
        let hypXZ = Math.cos(long);
        
        position.z = Math.sin(-lat) * hypXZ * radius;
        position.x = Math.cos(lat) * hypXZ * radius;

        return position;
    }
}

//
// "iata": "FIV",
//     "iso": "US",
//     "status": 1,
//     "name": "Five Finger CG Heliport",
//     "continent": "NA",
//     "type": "heliport",
//     "size": null