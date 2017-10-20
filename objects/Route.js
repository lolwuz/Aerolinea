class Route extends THREE.Object3D {
    constructor(airports, airplane) {
        super();
        
        this.airports = airports;
        this.airplane = airplane;
        this.routeLines = [];
        this.onLine = 0;
        
        this.percentInFlight = 0.0;
        
        this.colour = Math.random() * 0xffffff;
        for (let i = 0; i < this.airports.length-1; i++)
            this.routeLines.push(new RouteLine(airports[i], airports[i+1], this.colour));
        
            //Add all child-object to the current object so that they will be visible in the scene
        this.add(this.airplane);
        for (let i = 0; i < this.routeLines.length; i++)
            this.add(this.routeLines[i]);
    }
    
    setAirplaneNextPosition()
    {
        this.onLine = Math.floor(this.percentInFlight * this.routeLines.length);
        let routeLine = this.routeLines[this.onLine];
        
            //save its old flightPos
        let percentInFlight_old = (this.percentInFlight * this.routeLines.length) - this.onLine;
        
            //Set new position (in % along its path)
        this.percentInFlight += (this.airplane.speed * delta) / routeLine.length;      // percentInFlight == > 0 && < 1
        
        
        if (this.percentInFlight <= 1)
        {
                //Get the new position of the Airplane (in 3D space)
            let newPos = routeLine.spline.getPoint((this.percentInFlight * this.routeLines.length) - this.onLine);  
                //Set its position and rotation (facing away from its old position)
            this.airplane.position.set(newPos.x, newPos.y, newPos.z);
            this.airplane.up = newPos.multiplyScalar(2);
            this.airplane.lookAt(routeLine.spline.getPoint(percentInFlight_old));  
        }
    }
}