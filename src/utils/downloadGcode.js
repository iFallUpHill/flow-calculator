import { useStore } from "../stores/store";
import generateGcode from "./generateGcode";

export default function downloadGcode() {
    const options = useStore.getState().options;
    const fileName = useStore.getState().fileName;

    let gcode = '';
    try { gcode = generateGcode(options, {addHeader: true}); }
    catch {}

    const url = URL.createObjectURL(new Blob([gcode], {
        type: "text/plain"
    }));

    const element = document.createElement("a");
    element.href = url;
    const datestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, '')
    element.download = `${fileName ? fileName.replace(/[/\\?%*:|"<> ]/g, '_') + '-' : ''}Flow_Test-${datestamp}.gcode`;
    document.body.appendChild(element);
    element.click();
}