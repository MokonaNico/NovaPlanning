!async function () {
    fetch_events().then(events => {
        parse_event(events);
    })
        .catch(error => {
            console.error(error);
        });
}();

function parse_event(events) {
    for (const [option, cursus_list] of Object.entries(events)){
        const button_course = document.createElement("button");
        button_course.innerHTML = option;
        button_course.id = option;
        button_course.appendChild(document.getElementById("sbl-course"))


        for (const [cursus, courses] of Object.entries(cursus_list)) {
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

            for (const [course, _] of Object.entries(courses)) {
                const row = createRow(cursus + "_" + course, course, onCheck, cursus);
                table.appendChild(row);
            }
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

function onClickScrollBarRoll() {
    const x = document.getElementById("sbl-course");
    if (x.style.display == "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
    
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

    checkbox_input.checked = localStorage.getItem(id) === "";

    return div;
}

function onCheckAll(e) {
    const isCheck = document.getElementById(e.target.id).checked;
    const checkboxes = document.getElementsByName(e.target.id);
    for (const checkbox of checkboxes) {
        if(isCheck && !checkbox.checked){
            checkbox.checked = true;
            toggle_course(checkbox.id);
        }
        else if (!isCheck && checkbox.checked){
            checkbox.checked = false;
            toggle_course(checkbox.id);
        }
    }
    toggle_course(e.target.id);
}

function onCheck(e) {
    const isCheck = document.getElementById(e.target.id).checked;
    toggle_course(e.target.id);
}

function toggle_course(id, remove=false){
    if (remove || localStorage.getItem(id) === ""){
        localStorage.removeItem(id)
    }else {
        localStorage.setItem(id,"")

    }
}
