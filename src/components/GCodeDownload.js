import generateGcode from '../utils/generateGcode';
import { StyledInput } from './Inputs';
import { useStore } from "../stores/store";


export default function GCodeDownload() {
    const options = useStore((state) => state.options);
    const fileName = useStore((state) => state.fileName);
    const setFileName = useStore((state) => state.setFileName);

    const gcode = generateGcode(options);
    const url = URL.createObjectURL(new Blob([gcode], {
        type: "text/plain"
    }));

    const downloadGcode = () => {
        const element = document.createElement("a");
        element.href = url;
        const datestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, '')
        element.download = `${fileName ? fileName.replace(/[/\\?%*:|"<> ]/g, '_') + '-' : ''}${datestamp}.gcode`;
        document.body.appendChild(element);
        element.click();
      };

    return (
        <> 
            <StyledInput type="text" value="fileName" defaultValue={fileName} label="File Name (Optional)" handleChange={(e) => {setFileName(e.target.value)}} />
            <button className="w-full mt-4 h-12 px-6 text-white font-bold transition-colors duration-150 bg-indigo-700 rounded-md focus:shadow-outline hover:bg-indigo-800" onClick={downloadGcode}>Download GCode</button>
        </>
    )
}