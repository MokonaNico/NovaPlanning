const ics_events = [];

async function fetch_events(){

    return  fetch('events.json')
        .then((response) => response.json())

}
