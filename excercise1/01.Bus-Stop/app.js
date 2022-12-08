async function getInfo() {
    let busStopNameElement = document.getElementById('stopName');
    let inputElementValue = document.getElementById('stopId').value;
    let busesListElement = document.getElementById('buses');   

    try {
        let res = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputElementValue}`);
        let result = await res.json();

        console.log(result);

        if ( result.name === "") {
            busStopNameElement.textContent = 'Error!'
        }else{
            busStopNameElement.textContent = result.name;

            let buses = result.buses;

            console.log(typeof buses);

            Object.entries(buses).forEach(element => {
                let busElement = document.createElement('li');
                let busText = `Bus ${element[0]} arrives in ${element[1]} minutes`;
                busElement.textContent = busText;
                busesListElement.appendChild(busElement);
            });
        }
    } catch (error) {
        busStopNameElement.textContent = 'Error';
        busesListElement.textContent = "";
    }
       
        


   
    
    
}