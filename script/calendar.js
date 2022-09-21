!async function(){
    await fetch('./events.json')
        .then((response) => response.json())
        .then(data => {
            let events = []
            for (const [cursus, courses] of Object.entries(data)) {
                for (const [course, course_events] of Object.entries(courses)) {
                    let stored = JSON.parse(localStorage.getItem(cursus+'_'+course));
                    if (stored == null) continue;
                    if (stored){
                        course_events.forEach(function(item){
                            item.title = item.title.replaceAll("\n","\n\n")
                        });
                        events = events.concat(course_events)
                    }
                }
            }
            calendar(events);

            for (let event of events) {

                let date = new Date(event['start'])
                let start = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(),date.getMinutes()]
                date = new Date(event['end'])
                let end = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(),date.getMinutes()]

                let title = event['title']

                let ics_event = {
                    title,
                    start,
                    end,
                }
                ics_events.push(ics_event)
            }
        })
        .catch(error => {
            console.error(error);
        });
}();

function calendar(events) {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'fr',
        initialView: 'dayGridWeek',
        firstDay: 1,
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
            select: {
                theme: 'true',
                text: 'Sélection des cours',
                click: function() {
                    location.href = "config.html";
                }
            },
            ics: {
                theme: 'true',
                text: 'ICS',
                click: function() {
                    download();
                }
            }
        },
        headerToolbar: {
            start: 'select ics',
            center: 'title',
            end: 'today prev,next',
        },
        fixedWeekCount: false
    });
    calendar.render();
}
