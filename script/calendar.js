!async function(){
    fetch_events().then((events_fetch)=> {
        let events = []
        for (const [cursus, courses] of Object.entries(events_fetch)) {
            for (const [course, course_events] of Object.entries(courses)) {
                let stored = JSON.parse(localStorage.getItem(cursus+'_'+course));
                if (stored == null) continue;
                if (stored){
                    course_events.forEach((item)=>{
                        item.title = item.title.replaceAll("\n","\n\n");
                        item.location = "test"
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
    }).catch(error => {
        console.error(error);
    });


}();

function calendar(events) {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        eventMinHeight:20,
        locale: 'fr',
        initialView: 'timeGridWeek',
        slotMinTime:"08:00:00",
        slotMaxTime:"21:00:00",
        expandRows: true,
        allDaySlot:false,
        nowIndicator:true,
        firstDay: 1,
        handleWindowResize: true,
        defaultAllDay: false,
        displayEventEnd: true,
        events: events,
        eventDisplay: 'block',
        titleFormat: {
            month: 'long',
            year: 'numeric'
        },
        customButtons: {
            select: {
                theme: 'true',
                text: 'Sélection des cours',
                click:() => {
                    location.href = "config.html";
                }
            },
            ics: {
                theme: 'true',
                text: 'ICS',
                click: () => download(),
            }
        },
        headerToolbar: {
            start: 'select ics',
            center: 'title',
            end: 'today prev,next timeGridWeek,dayGridMonth',
        },
        fixedWeekCount: false
    });
    calendar.render();
}
