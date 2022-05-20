import { GCodeViewer } from "react-gcode-viewer";
import generateGcode from '../utils/generateGcode';
import { useStore } from "../stores/store";

const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '500px',
    background: '#eeeeee'
}

export default function GCodePreview({...props}) {
    const options = useStore((state) => state.options);
    const gcode = generateGcode(options);
    const url = URL.createObjectURL(new Blob([gcode]));

    return (
        <GCodeViewer
        orbitControls
        showAxes
        style={style}
        layerColor="#ff0000"
        topLayerColor="#ff0000"
        url={url}
        floorProps={{gridWidth: options.bedWidth,
            gridLength: options.bedWidth,
        }}/>
    )
}