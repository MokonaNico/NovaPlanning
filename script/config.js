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
        button_course.className = "buttonList";
        button_course.onclick = onClickButtonList;
        document.getElementById("sbl-course").appendChild(button_course)

        const cursus_div = document.createElement("div");
        cursus_div.id = option;
        cursus_div.style.display= "none";
        document.getElementById("cursus-content").appendChild(cursus_div);

        for (const [cursus, courses] of Object.entries(cursus_list)) {
            const year_container = document.createElement("div");
            cursus_div.appendChild(year_container);

            
            const title_box = document.createElement("div");
            title_box.className = "title-box";
            year_container.appendChild(title_box);

            const img = document.createElement("img");
            img.src = "./arrow.png";
            img.className = "arrow-img";
            img.onclick = derollCourses;
            title_box.appendChild(img);

            // Loop for each cursus
            const title = document.createElement("h1");
            title.innerHTML = cursus;
            title.onclick = derollCourses;
            title_box.appendChild(title);

            const checkall = createRowDiv(cursus, "Tout sélectionner", onCheckAll, "", true);
            title_box.appendChild(checkall.children[0]);
            title_box.appendChild(checkall.children[0]);

            const table = document.createElement("table");
            table.style.display = "none";
            table.id = cursus;
            year_container.appendChild(table);

            //var row = createRow(cursus,"Tout sélectionner",onCheckAll,"")
            //table.appendChild(row);

            for (const [course, _] of Object.entries(courses)) {
                const row = createRow(cursus + "_" + course, course, onCheck, cursus);
                row.id = cursus + "_" + course;
                
                table.appendChild(row);
            }
        }
    }
}

function derollCourses(e) {
    table = e.target.parentElement.parentElement.lastChild;
    img = e.target.parentElement.firstChild;
    if (table.style.display == "none") {
        table.style.display = "inline";
        img.src = "./arrow-close.png";
    } else {
        table.style.display = "none";
        img.src = "./arrow.png";
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

function onClickButtonList(e) {
    let cursus = document.getElementById("cursus-content").childNodes;

    for (let i=1; i<cursus.length; i++) {
        cursus[i].style.display = "none";
    }

    document.getElementById(e.target.innerHTML).style.display = "inline";
    document.getElementById("scrlbtn").innerHTML = e.target.innerHTML;
}

function createRowDiv(id, text, onclick, name, title=false) {
    const div = document.createElement("div");
    div.className = "checkbox-line";
    div.id = id;
    
    const checkbox_input = document.createElement("input");
    checkbox_input.id = id;
    checkbox_input.type = "checkbox";
    checkbox_input.onclick = onclick;
    checkbox_input.name = name;
    div.appendChild(checkbox_input);

    if (!title) {
        const colorBox = document.createElement("input");
        colorBox.type = "color";
        colorBox.className = "colorWell";
        colorBox.value = localStorage.getItem(id);
        div.appendChild(colorBox);
    }

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
    const isCheck = document.getElementById(e.target.parentElement.id).checked;
    toggle_course(e.target.id);
}

function changeColor(id, color) {
    localStorage.setItem(id, color);
}

function toggle_course(id, remove=false){
    if (remove || localStorage.getItem(id) === ""){
        localStorage.removeItem(id)
    }else {
        localStorage.setItem(id,"")
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.scrollbtn')) {
        document.getElementById("sbl-course").style.display = "none";
    }
}

let colorWell;
const defaultColor = "#878787";

function startupColor() {
    let colorWell = document.querySelectorAll(".colorWell")

    colorWell.forEach((colorBox) => {
        colorBox.value = localStorage.getItem(colorBox.parentElement.id);
        colorBox.addEventListener("change", updateColor, false);
        colorBox.select();
    })
}

function updateColor(e) {
    changeColor(e.target.parentElement.id, e.target.value);
}

window.addEventListener("load", startupColor, false);
