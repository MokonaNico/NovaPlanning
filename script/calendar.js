!async function(){
    await fetch('./events.json')
        .then((response) => response.json())
        .then(events => {
            accept = ["AudioProces","Calcul.et complexité"];
            e = [];

            for (const [key, value] of Object.entries(events)) {
                for (const [key2, value2] of Object.entries(value)) {
                    if(accept.includes(key2)){
                        for (var i = 0; i < value2.length; i++) { 
                            e = e.concat(value2)
                        }
                    }
                }
            }
            calendar(e);
        })
        .catch(error => {
            console.error(error);
        });
}();

function calendar(events) {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'fr',
        initialView: 'dayGridMonth',
        handleWindowResize: true,
        defaultAllDay: false,
        displayEventEnd: true,
        events: events,
        eventDisplay: 'block'
    });
    calendar.render();
};
