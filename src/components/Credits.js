import React from 'react';

const links = [
    { 
        link: 'https://github.com/CNCKitchen/ExtrusionSystemBenchmark',
        label: 'CNCKitchen/ExtrusionSystemBenchmark',
    },
    { 
        link: 'https://github.com/GabrielMusat/react-gcode-viewer',
        label: 'GabrielMusat/react-gcode-viewer',
    }
]

export default function Credits({...props}) {
    return (
        <>
            <h2 className="text-xl mt-4 mb-2 font-bold">Credits</h2>
            <div>
              <ul className="list-none">
                {links.map( ({link, label}) => (
                    <li key={label} className="truncate text-blue-500 underline"><a href={link} target="_blank" rel="noreferrer noopener nofollow">{label}</a></li>
                ))}
              </ul>
            </div>
        </>
    )
}