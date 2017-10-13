var globeRadius = 1;
var vec3_origin = new THREE.Vector3(0,0,0);

class RouteLine extends THREE.Object3D{
    constructor(startAirport, destinationAirport, colour) {
        super();
        
        this.startAirport = startAirport;
        this.destinationAirport = destinationAirport;
        
        let lineGeometry = this.makeConnectionLineGeometry(this.startAirport, this.destinationAirport, 1, 1.05, 4);
        let material = new THREE.MeshStandardMaterial({ emissive: colour });
        this.line = new THREE.Line(lineGeometry, material);
        
        this.add(this.line);
        
    }
    
    makeConnectionLineGeometry(start, destination, sphereRadius, travelHeight, count)
    {
        let length = sphereRadius * travelHeight;
        
        let startPos = start.position.clone().multiplyScalar(travelHeight).lerp(destination.position.clone().multiplyScalar(travelHeight),0).normalize().multiplyScalar(length);
        let endPos = start.position.clone().multiplyScalar(travelHeight).lerp(destination.position.clone().multiplyScalar(travelHeight),1).normalize().multiplyScalar(length);
        
        let points = [];
        points.push(start.position);
        //points.push(startPos);
        points = points.concat(this.getPoints(startPos, endPos, length, count));
        //points.push(endPos);
        points.push(destination.position);
        
        
        
        
          //create a line geometry
        let geometry = new THREE.Geometry();     
        for (let i = 0; i < points.length; i++)
        {
            geometry.vertices.push(points[i]);
        }
//        let curve = new THREE.CatmullRomCurve3(points);
//        var path = new THREE.Path( curve.getPoints( 50 ) );
//        var geometry = path.createPointsGeometry( 50 );
        
        return geometry;
    }
    
    getPoints(point_1, point_2, length, count)
    {
            //Amount of total vertices = 2^count
        
        if (count == 0)
            return [];
        else
        {
            let points = [];
        
            let midPos = point_1.clone().lerp(point_2,0.5).normalize().multiplyScalar(length);

            points = points.concat(this.getPoints(point_1, midPos, length, count-1));
            points.push(midPos);
            points = points.concat(this.getPoints(midPos, point_2, length, count-1));

            return points;
        }
        
        

    }

class axisHelper extends THREE.Object3D{
    constructor(length) {
        super();
        
        this.add(new THREE.ArrowHelper( new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), length, 0xFF0000, 0.01, 0.01));
        this.add(new THREE.ArrowHelper( new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), length, 0x00FF00, 0.01, 0.01));
        this.add(new THREE.ArrowHelper( new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), length, 0x0000FF, 0.01, 0.01));
    }
}
        
        
        
        
        