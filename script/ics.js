import ics from 'https://cdn.skypack.dev/ics';
import FileSaver from 'https://cdn.skypack.dev/file-saver';
window.download = function (){
    const { error, value } = ics.createEvents(ics_events)

    if (error) {
        console.log(error)

    } else {
        let out = value.toString().replaceAll("\r\n\t","")
        let blob = new Blob([out], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "cours.ics");
    }
}