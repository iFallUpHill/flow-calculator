import generateGcode from '../utils/generateGcode';
import { useStore } from "../stores/store";


export default function GCodeDownload({...props}) {
    const options = useStore((state) => state.options);
    const fileName = useStore((state) => state.fileName).replace(/[/\\?%*:|"<> ]/g, '_');
    const gcode = generateGcode(options);
    const url = URL.createObjectURL(new Blob([gcode], {
        type: "text/plain"
    }));

    const downloadGcode = () => {
        const element = document.createElement("a");
        element.href = url;
        const datestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, '')
        element.download = `${fileName ? fileName + '-' : ''}${datestamp}.gcode`;
        document.body.appendChild(element);
        element.click();
      };

    return (
        <> 
            <button className="w-full mt-4 h-12 px-6 text-white font-bold transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={downloadGcode}>Download GCode</button>
            <p className="mb-0 text-center">
                <a className="text-xs text-neutral-300 transition-colors duration-150 hover:text-neutral-500 text-center underline" href="https://github.com/" target="_blank" rel="noreferrer noopener nofollow">View Source on GitHub</a>
            </p>
        </>
    )
}