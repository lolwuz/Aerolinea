class Airliner {
    constructor(){
        this.data;
        this.update();       
    }

    async update(){
        const response = await fetch("http://server.lolwuz.com:3000/airliner/" + getCookie("_id"));
        const data = await response.json();
        this.data = data;

        // Update scrreen
        document.getElementById("airlinerName").innerText = this.data.name;
        document.getElementById("airlinerRoutes").innerText = this.data.routes.length;
        document.getElementById("airlinerPlanes").innerText = this.data.planes.length;
    }
}