!async function () {
    fetch_events().then(events => {
        parse_event(events);
    })
        .catch(error => {
            console.error(error);
        });
}();

function parse_event(events) {
    for (const [cursus, courses] of Object.entries(events)) {
        const title_box = document.createElement("div");
        document.body.appendChild(title_box);

        // Loop for each cursus
        const title = document.createElement("h1");
        title.innerHTML = cursus;
        title_box.appendChild(title);

        const checkall = createRowDiv(cursus, "Tout sélectionner", onCheckAll, "");
        title_box.appendChild(checkall.children[0]);
        title_box.appendChild(checkall.children[0]);


        const table = document.createElement("table");
        document.body.appendChild(table);

        //var row = createRow(cursus,"Tout sélectionner",onCheckAll,"")
        //table.appendChild(row);

        for (const [course, ignore] of Object.entries(courses)) {
            const row = createRow(cursus + "_" + course, course, onCheck, cursus);
            table.appendChild(row);
        }
    }
}

function createRow(id, text, onclick, name) {
    const row = document.createElement("tr");

    const checkbox_container = document.createElement("td");
    row.appendChild(checkbox_container);

    const div = createRowDiv(id, text, onclick, name);
    checkbox_container.appendChild(div);

    return row;
}

function createRowDiv(id, text, onclick, name) {
    const div = document.createElement("div");
    div.className = "checkbox-line";

    const checkbox_input = document.createElement("input");
    checkbox_input.id = id;
    checkbox_input.type = "checkbox";
    checkbox_input.onclick = onclick;
    checkbox_input.name = name;
    div.appendChild(checkbox_input);

    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerHTML = text;
    div.appendChild(label);

    let check_stored = JSON.parse(localStorage.getItem(id));
    if (check_stored == null) {
        localStorage.setItem(id, false);
        check_stored = false;
    }
    checkbox_input.checked = check_stored;

    return div;
}

function onCheckAll(e) {
    const isCheck = document.getElementById(e.target.id).checked;
    const checkboxes = document.getElementsByName(e.target.id);
    for (const checkbox of checkboxes) {
        checkbox.checked = isCheck;
        localStorage.setItem(checkbox.id, isCheck);
    }
    localStorage.setItem(e.target.id, isCheck);
}

function onCheck(e) {
    localStorage.setItem(e.target.id, document.getElementById(e.target.id).checked);
}