!async function(){
    await fetch('./events.json')
        .then((response) => response.json())
        .then(data => {
            var events = []
            for (const [cursus, courses] of Object.entries(data)) {
                for (const [course, course_events] of Object.entries(courses)) {
                    var stored = JSON.parse(localStorage.getItem(cursus+'_'+course));
                    if (stored == null) continue;
                    if (stored){
                        events = events.concat(course_events)
                    }
                }
            }
            calendar(events);
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
        eventDisplay: 'block',
        height: 'auto'
    });
    calendar.render();
};
