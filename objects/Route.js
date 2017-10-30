class Route extends THREE.Object3D {
    constructor(airports, airplane, colour) {
        super();
        
        this.airports = airports;
        this.airplane = airplane;
        this.routeLines = [];
        this.onLine = 0;
        this.direction = 0;
        
        this.sphereRadius = 1;
        this.travelHeight = 0.03;
        this.onAirportDefaultTime = 3;
        this.onAirportTimer = 3;
        
        this.percentInFlight = 0.0;
        this.percentOnLine = 0.0;

            //If the route is given a colour as parameter, use that one. Otherwise use a random colour
        this.colour = (this.colour === undefined) ? (Math.random() * 0xffffff) : this.colour;
        
            //Create a routeLine between airport 1 and 2, 2 and 3, etc.
        for (let i = 0; i < this.airports.length-1; i++)
            this.routeLines.push(new RouteLine(airports[i], airports[i+1], this.sphereRadius, this.travelHeight, this.colour));
        
            //Add all child-object to the current object so that they will be visible in the scene
        this.add(this.airplane);
        for (let i = 0; i < this.routeLines.length; i++)
            this.add(this.routeLines[i]);
    }
    
    setAirplaneNextPosition(delta)
    {
        if (this.onAirportTimer >= 0)
            this.onAirportTimer -= delta;
        else 
        {
                //Get the current line that it is flying on
            this.onLine = Math.floor(this.percentInFlight * this.routeLines.length);
            if (this.onLine == this.routeLines.length)
                this.onLine--;
            let routeLine = this.routeLines[this.onLine];

                //save its old flightPos
            let percentOnLine_old = this.percentOnLine;

                //Set new position (in % along its path)
            if (this.direction == 0)
                this.percentInFlight += ((this.airplane.speed / this.routeLines.length) * delta) / routeLine.length;
            else
                this.percentInFlight -= ((this.airplane.speed / this.routeLines.length) * delta) / routeLine.length;

            this.percentOnLine = (this.percentInFlight * this.routeLines.length) - this.onLine;
            if (this.percentOnLine <= 1 && this.percentOnLine >= 0)
            {
                    //Get the new position of the Airplane (in 3D space)
                let newPos = routeLine.spline.getPoint(this.percentOnLine);
                let newPosLength = Math.round(newPos.length()*10000)/10000;
                if (newPosLength < this.travelHeight + this.sphereRadius)
                {
                    let newScale = (newPos.length() - this.sphereRadius) / this.travelHeight;
                    this.airplane.scale.set(newScale, newScale, newScale)
                }
                
                    //Set its position and rotation (facing away from its old position)
                this.airplane.position.set(newPos.x, newPos.y, newPos.z);
                this.airplane.up = newPos.multiplyScalar(2);
                this.airplane.lookAt(routeLine.spline.getPoint(percentOnLine_old));  
            }
            else if (this.percentInFlight > 1)
            {
                this.percentInFlight = 1;
                this.direction = 1;
            }
            else if (this.percentInFlight < 0)
            {
                this.percentInFlight = 0;
                this.direction = 0;
            }
            
                //If the airplane hit the end of a line, set its position to the center of the earth to make it invisible and reset the onAirportTimer
            if (this.percentOnLine >= 1 || this.percentOnLine <= 0)
            {
                this.onAirportTimer = this.onAirportDefaultTime;
                
                this.airplane.position.set(0, 0, 0);
                this.percentOnLine = Math.round(this.percentOnLine);
            }
        }
    }
}