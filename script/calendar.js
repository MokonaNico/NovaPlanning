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
    console.log(events);
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'fr',
        initialView: 'dayGridMonth',
        handleWindowResize: true,
        defaultAllDay: false,
        displayEventEnd: true,
        events: events,
        eventDisplay: 'block',
        height: 'auto',
        titleFormat: {
            month: 'long',
            year: 'numeric'
        },
        customButtons: {
            myCustomButton: {
                theme: 'true',
                text: 'Sélection des cours',
                click: function() {
                    location.href = "config.html";
                }
            }
        },
        headerToolbar: {
            start: 'myCustomButton',
            center: 'title',
            end: 'today prev,next',
        }
    });
    calendar.render();
};
