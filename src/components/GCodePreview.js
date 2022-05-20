import { GCodeViewer } from "react-gcode-viewer";

const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '500px',
    background: '#eeeeee'
}

export default function GCodePreview({bedWidth=300, bedLength=300, gcode="", ...props}) {
    const url = URL.createObjectURL(new Blob([gcode]));
    console.log(gcode)

    return (
        <GCodeViewer
        orbitControls
        showAxes
        style={style}
        layerColor="#e53935"
        topLayerColor="#e53935"
        url={url}
        visible={.6}
        floorProps={{gridWidth: bedWidth,
            gridLength: bedLength,
        }}/>
    )
}