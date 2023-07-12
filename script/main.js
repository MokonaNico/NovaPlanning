const ics_events = [];

async function fetch_events(){

    return  fetch('https://raw.githubusercontent.com/Shinkumons/NovaPlanning/action/events.json')
        .then((response) => response.json())

}
