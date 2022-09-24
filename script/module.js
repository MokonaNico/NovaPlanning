import ics from 'https://cdn.skypack.dev/ics';
import FileSaver from 'https://cdn.skypack.dev/file-saver';
window.download_ics = () => {
    const { error, value } = ics.createEvents(ics_events)

    if (error) {
        console.log(error)

    } else {
        let out = value.toString().replaceAll("\r\n\n\t","")
        let blob = new Blob([out], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "cours.ics");
    }
}

window.download_list = () => {
    let list = []
    let keys = Object.keys(localStorage);
    for(let key of keys) {
       list.push(key);
    }
    let out = JSON.stringify(list)
    let blob = new Blob([out], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "list.json");
}

window.upload_list = () => {
    let file = document.getElementById("myFile").files[0];
    console.log(file)
    if (file && file.size > 0){
        readFileContent(file).then(content => {
            let courses = JSON.parse(content)
            localStorage.clear()
            for (let course of courses){
                localStorage.setItem(course,"")
            }
            console.log(courses)
        }).catch(error => console.log(error))
    }
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}
