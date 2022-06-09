import { Input } from './Inputs';
import { useStore } from "../stores/store";
import { Button } from './Buttons';
import downloadGcode from '../utils/downloadGcode';


export default function GcodeDownload() {
    const fileName = useStore((state) => state.fileName);
    const setFileName = useStore((state) => state.setFileName);

    return (
        <> 
            <Input type="text" value="fileName" defaultValue={fileName} label="File Name (Optional)" handleChange={(e) => {setFileName(e.target.value)}} />
            <Button label="Download Gcode" bgColors="bg-indigo-700 hover:bg-indigo-800" handleClick={() => downloadGcode()} />
        </>
    )
}