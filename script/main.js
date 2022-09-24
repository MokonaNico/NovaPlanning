const ics_events = [];

async function fetch_events(){

    return  fetch('https://cdn.jsdelivr.net/gh/MokonaNico/Master1Calendar@action/events.json')
        .then((response) => response.json())

}