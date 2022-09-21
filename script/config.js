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

		var div = document.createElement("div");
		div.className = "checkbox-line";

		var row = document.createElement("tr");
		var checkbox_container = document.createElement("td");
		var checkall = document.createElement("input");
		checkall.type = "checkbox";
		checkall.id = cursus;
		checkall.onclick = onCheckAll;

		var check_stored = JSON.parse(localStorage.getItem(cursus));
		if(check_stored == null){
			localStorage.setItem(cursus, false);
			check_stored = false;
		}
		checkall.checked = check_stored;

		var label = document.createElement("label");
		label.innerHTML = "Tout sélectionner";

		div.appendChild(checkall);
		div.appendChild(label);
		checkbox_container.appendChild(div);
		row.appendChild(checkbox_container);
		table.appendChild(row);

		for (const [course, ignore] of Object.entries(courses)) {
			var div = document.createElement("div");
			div.className = "checkbox-line";
			var id = cursus + "_" + course;
			var row = document.createElement("tr");
			var checkbox_container = document.createElement("td");
			var checkbox_input = document.createElement("input");
			checkbox_input.id = id;
			checkbox_input.type = "checkbox";
			checkbox_input.onclick = onCheck;
			checkbox_input.name = cursus;

			var check_stored = JSON.parse(localStorage.getItem(id));
			if(check_stored == null){
				localStorage.setItem(id,false);
				check_stored = false;
			}
			checkbox_input.checked = check_stored;

			var label = document.createElement("label");
			label.htmlFor  = id;
			label.innerHTML = course;

			div.appendChild(checkbox_input);
			div.appendChild(label);
			checkbox_container.appendChild(div);
			row.appendChild(checkbox_container);
			table.appendChild(row);
		}
	}
}

function onCheckAll(e) {
	var isCheck = document.getElementById(e.target.id).checked;
	checkboxes = document.getElementsByName(e.target.id);
	for(const checkbox of checkboxes) {
		checkbox.checked = isCheck;
		localStorage.setItem(checkbox.id, isCheck);
	}
	localStorage.setItem(e.target.id, isCheck);
}

function onCheck(e) {        
	localStorage.setItem(e.target.id,document.getElementById(e.target.id).checked);
	console.log(document.getElementById(e.target.id).checked);
}