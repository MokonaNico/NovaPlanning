const ics_events = [];

async function fetch_events(){

    return  fetch('https://github.com/MokonaNico/NovaPlanning/blob/action/events.json')
        .then((response) => response.json())

}
