class RouteLine extends THREE.Line{
    constructor(startAirport, destinationAirport, sphereRadius, travelHeight, colour) {
        super();
        
        this.startAirport = startAirport;
        this.destinationAirport = destinationAirport;
        
        let flightLine = this.getFlightLine(this.startAirport, this.destinationAirport, sphereRadius, travelHeight, 4);
        let smoothFlightLine = this.smoothFlightLine(flightLine, sphereRadius, travelHeight, true, true);
        
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
        let points = [];
        
            //Check if the distance between airports is big enough for the plane to reach its max travel height.
        if (start.position.distanceTo(destination.position) > travelHeight * 2)
        {
                //Get the startPosition and endPosition of the curve at travelheight (These points won't be included into the points array)
            let startPos = start.position.clone().multiplyScalar(totalHeight).lerp(destination.position.clone().multiplyScalar(totalHeight),0).normalize().multiplyScalar(totalHeight);
            let endPos = start.position.clone().multiplyScalar(totalHeight).lerp(destination.position.clone().multiplyScalar(totalHeight),1).normalize().multiplyScalar(totalHeight);

                //Create the point array of the curve at travelheight and its start and end position
            points.push(start.position);
            points = points.concat(this.getPoints(startPos, endPos, totalHeight, count));
            points.push(destination.position);
            
               //Remove the first and last points of the line at flight-height untill the distance from airport to the first point is at least the sqrt of 2*(travelHeight^2). This causes an angle of 45 degrees at max.
            let distance = Math.sqrt(Math.pow(travelHeight, 2) * 2);
            while (points.length >= 5 && points[0].distanceTo(points[1]) < distance)
            {
                points.splice(1, 1);
                points.splice(points.length-2, 1);
            }
            
            if (points.length >= 5)
            {
                    //Lower the first and last points (in the air) for a better curve
                let newHeight = (travelHeight / 100) * 90 + sphereRadius;
                points[1].normalize().multiplyScalar(newHeight);
                points[points.length-2].normalize().multiplyScalar(newHeight);
            }
        }
        else
        {
                //get the 3 points for the curve
            let midHeight = start.position.distanceTo(destination.position) + sphereRadius;
            points.push(start.position);
            points.push(start.position.lerp(destination.position,0.5).normalize().multiplyScalar(midHeight));
            points.push(destination.position);
            
        }
        
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
    
    smoothFlightLine(points, sphereRadius, travelHeight, smoothBegin, smoothEnd)
    {
        if (points.length < 5)
            points = new THREE.CatmullRomCurve3(points).getPoints(15);
        else if (points.length == 5)       
            points = new THREE.CatmullRomCurve3(points).getPoints(25);
        else
        {
                //Get the begin and end curve-points
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
                curvePoints_1 = new THREE.CatmullRomCurve3(curvePoints_1).getPoints(10);
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
                curvePoints_2 = new THREE.CatmullRomCurve3(curvePoints_2).getPoints(10);
                    //Combine points and curvePoints_2
                points = points.concat(curvePoints_2);
            }
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
        
        
        
        
        