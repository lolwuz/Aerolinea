class RouteLine extends THREE.Line{
    constructor(startAirport, destinationAirport, colour) {
        super();
        
        this.startAirport = startAirport;
        this.destinationAirport = destinationAirport;
        
        let flightLine = this.getFlightLine(this.startAirport, this.destinationAirport, 1, 0.05, 5);
        let smoothFlightLine = this.smoothFlightLine(flightLine, true, true);
        
        this.geometry = this.createGeometry(smoothFlightLine);
        this.material = new THREE.MeshStandardMaterial({ emissive: colour });
        this.spline = new THREE.CatmullRomCurve3(flightLine);
        
        this.length = 0;
        for (let i = 0; i < flightLine.length-1; i++)
        {
            this.length += flightLine[i].distanceTo(flightLine[i+1]);
        }
    }
    
    getFlightLine(start, destination, sphereRadius, travelHeight, count)
    {
        let totalHeight = sphereRadius + travelHeight;
        
            //Get the startPosition and endPosition of the curve at travelheight (These points won't be included into the points array)
        let startPos = start.position.clone().multiplyScalar(travelHeight).lerp(destination.position.clone().multiplyScalar(travelHeight),0).normalize().multiplyScalar(totalHeight);
        let endPos = start.position.clone().multiplyScalar(travelHeight).lerp(destination.position.clone().multiplyScalar(travelHeight),1).normalize().multiplyScalar(totalHeight);
        
            //Create the point array of the curve at travelheight and its start and end position
        let points = [];
        points.push(start.position);
        points = points.concat(this.getPoints(startPos, endPos, totalHeight, count));
        points.push(destination.position);
        
        return points;
    }
    
    getPoints(point_1, point_2, totalHeight, count)
    {
            //Amount of total vertices = 2^count
        
        if (count == 0)
            return [];
        else
        {
            let points = [];
        
            let midPos = point_1.clone().lerp(point_2,0.5).normalize().multiplyScalar(totalHeight);

            points = points.concat(this.getPoints(point_1, midPos, totalHeight, count-1));
            points.push(midPos);
            points = points.concat(this.getPoints(midPos, point_2, totalHeight, count-1));

            return points;
        }
    }
    
    smoothFlightLine(points, smoothBegin, smoothEnd)
    {
            //get the begin and end curve-points
        if (smoothBegin)
        {
            let curvePoints_1 = [];
            for (let i = 0; i < 3; i++)
            {
                curvePoints_1.push(points[i]);
            }
                //Trim the first 3 points off of the array since these are already in curvePoints_1
            points = points.slice(3, points.length)
                //Get the smooth curve
            curvePoints_1 = new THREE.CatmullRomCurve3(curvePoints_1).getPoints(20);
                //Combine curvePoints_1 and points
            points = curvePoints_1.concat(points);
        }
        if (smoothEnd)
        {
            let curvePoints_2 = [];
            for (let i = points.length-3; i < points.length; i++)
            {
                curvePoints_2.push(points[i]);
            }
                //Trim the last 3 points off of the array since these are already in curvePoints_2
            points = points.slice(0, points.length-3);
                //Get the smooth curve
            curvePoints_2 = new THREE.CatmullRomCurve3(curvePoints_2).getPoints(20);
                //Combine points and curvePoints_2
            points = points.concat(curvePoints_2);
        }
        
        return points;
    }
    
    createGeometry(points)
    {
          //create the line geometry
        let geometry = new THREE.Geometry();     
        for (let i = 0; i < points.length; i++)
        {
            geometry.vertices.push(points[i]);
        }
        return geometry;
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
        
        
        
        
        