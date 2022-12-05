const ics_events = [];

async function fetch_events(){

    return  fetch('http://localhost:8000/events.json')
        .then((response) => response.json())

}
