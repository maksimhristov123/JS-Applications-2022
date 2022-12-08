function solve() {
    let result = {};
    
    let urlString = 'http://localhost:3030/jsonstore/bus/schedule/'
    let nextStop = 'depot';

    let infoContainer = document.getElementById('info');
    let infoSpanContainer = document.querySelector('.info');
    let departButtong = document.getElementById('depart');
    let arriveButtong = document.getElementById('arrive');

    async function depart() {

        let res = await fetch(urlString + nextStop);
        result = await res.json();

        infoSpanContainer.textContent = `Next stop ${result.name}`
        nextStop = result.next;
        departButtong.disabled = "true";
        arriveButtong.removeAttribute('disabled');    
    }

    function arrive() {
        departButtong.removeAttribute('disabled'); 
        arriveButtong.disabled = "true";
        infoSpanContainer.textContent = `Arriving at ${result.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();