import { StyledInput } from './Inputs';
import { useStore } from "../stores/store";
import downloadGcode from '../utils/downloadGcode';


export default function GcodeDownload() {
    const fileName = useStore((state) => state.fileName);
    const setFileName = useStore((state) => state.setFileName);

    return (
        <> 
            <StyledInput type="text" value="fileName" defaultValue={fileName} label="File Name (Optional)" handleChange={(e) => {setFileName(e.target.value)}} />
            <button className="w-full mt-4 h-12 px-6 text-white font-bold transition-colors duration-150 bg-indigo-700 rounded-md focus:shadow-outline hover:bg-indigo-800" onClick={() => downloadGcode()}>Download Gcode</button>
        </>
    )
}