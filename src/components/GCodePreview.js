import { useState } from 'react'
import { GCodeViewer } from "react-gcode-viewer";
import generateGcode from '../utils/generateGcode';
import { useStore } from "../stores/store";
import GCodeOverlay from './GCodeOverlay';

export default function GCodePreview() {
    const [ modelOpen, setModelOpen ] = useState(false);

    const showModel = () => {
        setModelOpen(true);
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const closeModelHandler = () => {
        setModelOpen(false);
        document.body.style.overflow = 'unset';
    }

    const options = useStore((state) => state.options);
    const gcode = generateGcode(options);
    const url = URL.createObjectURL(new Blob([gcode]));

    return (
        <>
            <GCodeViewer
            orbitControls
            showAxes
            className="top-0 left-0 w-full h-80 bg-zinc-100 rounded-tl-md rounded-tr-md"
            layerColor="#ff0000"
            topLayerColor="#ff0000"
            url={url}
            floorProps={{gridWidth: options.bedWidth,
                gridLength: options.bedWidth,
            }}/>
            <button onClick={() => showModel()} className="w-full px-2 py-2 rounded-bl-md rounded-br-md mb-1 text-sky-600 font-bold transition-colors duration-150 bg-sky-200 focus:shadow-outline hover:bg-sky-300">Inspect Gcode</button>
            <GCodeOverlay isOpen={modelOpen} handleClose={() => closeModelHandler()} contents={gcode} />
            <p className="text-sm text-neutral-300"><span className="font-bold">Left Mouse</span> - Rotate</p>
            <p className="text-sm text-neutral-300"><span className="font-bold">Middle Mouse</span> - Zoom</p>
            <p className="text-sm text-neutral-300"><span className="font-bold">Right Mouse</span> - Pan</p>
        </>
    )
}