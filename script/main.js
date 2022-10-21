const ics_events = [];

async function fetch_events(){

    return  fetch('https://raw.githubusercontent.com/MokonaNico/Master1Calendar/action/events.json')
        .then((response) => response.json())

}
