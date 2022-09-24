!async function(){
    fetch_events().then((events_fetch)=> {
        let events = []


        for (let [key,value] of Object.entries(localStorage) ){
            if(value != ""){
                localStorage.removeItem(key)
            }

            let spliced = key.split('_')
            let cursus = spliced[0]
            let course = spliced[1]
            if(!course) continue;
            
            let course_events = events_fetch[cursus][course]
            course_events.forEach((item)=>{
                item.title = item.title.replaceAll("\n","\n\n");
            });
            events = events.concat(course_events)
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
        slotEventOverlap:false,
        expandRows: true,
        allDaySlot:false,
        nowIndicator:true,
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
                click:() => {
                    location.href = "config.html";
                }
            },
            ics: {
                theme: 'true',
                text: 'ICS',
                click: () => download_ics(),
            },
        },
        headerToolbar: {
            start: 'select ics',
            center: 'title',
            end: 'today prev,next timeGridWeek,dayGridMonth',
        },
        fixedWeekCount: false,
        eventDidMount: function(info) {
          var tooltip = new Tooltip(info.el, {
            title: info.event.title.replaceAll("\n\n","<br/><br/>"),
            placement: 'top',
            trigger: 'hover',   
            container: 'body',
            html: true
          });
        },
    });
    calendar.render();
}
