!async function(){
    await fetch('./events.json')
        .then((response) => response.json())
        .then(events => {
        	parse_event(events);
        })
        .catch(error => {
            console.error(error);
        });
}();

function parse_event(events){
	for (const [cursus, courses] of Object.entries(events)) {
		// Loop for each cursus
		var title = document.createElement("h1");
		title.innerHTML = cursus;
		document.body.appendChild(title);

		var table = document.createElement("table");
		document.body.appendChild(table);

		for (const [course, ignore] of Object.entries(courses)) {
			var id = cursus + "_" + course
			var row = document.createElement("tr");
			var checkbox_container = document.createElement("td");
			var checkbox_input = document.createElement("input");
			checkbox_input.id = id
			checkbox_input.type = "checkbox"
			checkbox_input.onclick = onCheck

			var check_stored = JSON.parse(localStorage.getItem(id));
			if(check_stored == null){
				localStorage.setItem(id,false);
				check_stored = false;
			}
			console.log(check_stored );
			checkbox_input.checked = check_stored;

			var label = document.createElement("label");
			label.htmlFor  = id
			label.innerHTML = course;

			checkbox_container.appendChild(checkbox_input);
			checkbox_container.appendChild(label);
			row.appendChild(checkbox_container);
			table.appendChild(row);
		}
	}
}

function onCheck(e) {        
	localStorage.setItem(e.target.id,document.getElementById(e.target.id).checked);
}