class World extends THREE.Object3D {
    constructor() {
        super();
        let earthGeometry = new THREE.SphereGeometry(1, 64, 64);

        let earthTexture = new THREE.TextureLoader().load("./src/textures/rgb.jpg");
        let earthTextureE = new THREE.TextureLoader().load("./src/textures/elevate.jpg");

        // let earthBump = new THREE.TextureLoader().load("./src/textures/EarthBump2.jpg");
        // let earthRough = new THREE.TextureLoader().load("./src/textures/EarthSpec.jpg");
        let earthMaterial = new THREE.MeshStandardMaterial({
            metalness: 0,
            roughness: 0.7,
            map: earthTexture,
            bumpMap: earthTextureE,
            bumpScale: 0.005,
            color: 0xFFFFFF
        });

        this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.add(this.earthMesh);
        // this.add(this.cloudMesh);
        
        this.airportArray = [];
        this.routeArray = [];

        this.getAirportsFromAPI();
    }

    update(delta) {
        for(let i = 0; i < this.routeArray.length; i++){
            this.routeArray[i].setAirplaneNextPosition(delta);
        }
    }

    async getAirportsFromAPI(){
        const response = await fetch("http://server.lolwuz.com:3000/airport");
        const responseJson = await response.json();

        for(let i = 0; i < responseJson.length; i++){
            let new_airport = new Airport(responseJson[i]);
            this.add(new_airport);
            this.airportArray.push(new_airport);
        }
        this.getRoutesFromAPI();
    }

    async getRoutesFromAPI(){
        const id = "59e9f093a8c44e1774b155a5";
        console.log(getCookie("_id"));
        const response = await fetch("http://server.lolwuz.com:3000/airliner/" + getCookie("_id") + "/route");
        const responseJson = await response.json();
        for(let i = 0; i < responseJson.length; i++){
            let airports = [];
            for(let ii = 0; ii < responseJson[i].destinations.length; ii++){
                for(let iii = 0; iii < this.airportArray.length; iii++){
                    if(responseJson[i].destinations[ii] === this.airportArray[iii].info._id){
                        airports.push(this.airportArray[iii]);
                    }
                }
            }

            if(airports.length > 1){
                let new_route = new Route(airports, new Airplane(0.01, 1, 0.01));
                this.routeArray.push(new_route);
                this.add(new_route); 
            }
        }

        for(let i = 0; i < this.routeArray.length; i++){
            let routeString = "";

            console.log(this.routeArray);
            for(let ii = 0; ii < this.routeArray[i].airports.length; ii++){
                routeString += this.routeArray[i].airports[ii].info.code;
                if(ii !== this.routeArray[i].airports.length - 1){
                    routeString += " -> ";
                }      
            }
            console.log(routeString);
            document.getElementById("existingRouteList").innerHTML += "<li class='list-group-item list-group-item-action'>" + routeString + "</li>"; 
        }
    }
}