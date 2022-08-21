function solve() {
    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let stop = {
        next: 'depot'
    };

    async function depart() {
        //get info for next stop
        //display name of next stop
        departBtn.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const response = await fetch(url);
        stop = await response.json();

        label.textContent = `Next stop ${stop.name}`;

        //activate the other button
        arriveBtn.disabled = false;

    }

    function arrive() {
        //display name of current stop
        label.textContent = `Arriving at ${stop.name}`;

        //activate the other button
        departBtn.disabled = false;
        arriveBtn.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();