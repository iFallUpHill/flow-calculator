import { version } from '../lib/version'
import { replaceTemplateVars } from './replaceTemplateVars';
import { validMaxFlowStepsPerColumn } from './boundaryChecks';

export default function generateGcode(data, { addHeader=false }={}) {
    const {
        filamentDiameter,
        travelSpeed,
        dwellTime,
        primeLength,
        primeAmount,
        primeSpeed,
        wipeLength,
        retractionDistance,
        retractionSpeed,
        blobHeight,
        extrusionAmount,
        direction,
        tempSpacing,
        flowOffset,
        flowEnd,
        tempStart,
        primingHeight,
        startHeight,
        temperatureGCodeType,
        heatBeforeDewell,
        /* eslint-disable */ 
        bedWidth,
        safeZPark,
        tempEnd,
        bedTemp,
        fanSpeed,
        /* eslint-enable */
      } = data;

    let {
        bedLength,
        bedMargin,
        flowSpacing,
        flowStart,
        flowSteps,
        tempSteps,
        tempOffset,
      } = data;

    const startGcode = replaceTemplateVars(data.startGcode, data)
    const endGcode = replaceTemplateVars(data.endGcode, data); 
    
    let output = [];

    // Fill Flow Mode
    if (tempSteps === 1) {
        const maxFlowStepsPerColumn = validMaxFlowStepsPerColumn();
        if (flowSteps > maxFlowStepsPerColumn) {
            tempSteps = Math.ceil(flowSteps / maxFlowStepsPerColumn);
            flowSteps =  maxFlowStepsPerColumn;
        }
        tempOffset = 0;
    }

    if (direction === 1) {
        bedLength = 0
        bedMargin = bedMargin * -1
        flowSpacing = flowSpacing * -1
    }

    if (addHeader) {
        // Credits
        output.push(`; *** FlowTestGenerator.js (v${version}) by iFallUpHill`)
        output.push(`; *** https://github.com/iFallUpHill/flow-calculator`)
        output.push(`; *** Based on CNCKitchen's ExtrusionSystemBenchmark by Stefan Hermann`)
        output.push(`; *** https://github.com/CNCKitchen/ExtrusionSystemBenchmark`)

        output.push("")

        // Generation Settings
        output.push(";####### Settings")
        for (const [key, value] of Object.entries(data)) {
            if (key !== "startGcode" && key !== "endGcode") {
                output.push(`; ${key} = ${value}`);
            }
        }
        output.push("");
    }

    output.push(";####### Start Gcode");
    startGcode.split("\n").forEach(line => {
        output.push(line);
    })
    output.push("");

    output.push(`; [SAFETY] Force Relative Extrusion`)
    output.push(`M83 ; set extruder to relative mode`)
    output.push("");

    for (let i = 1; i <= tempSteps; i++) {
        if (tempOffset === 0 && i > 1) {
            flowStart = flowStart + flowSteps * flowOffset;
        }

        output.push(`;####### ${tempStart + (i - 1) * tempOffset}°C`);
        
        if (heatBeforeDewell) {
            output.push(`M${temperatureGCodeType} S${tempStart + (i - 1) * tempOffset}`);
            output.push(`G4 S${dwellTime}; Dwell`);
        } else {
            output.push(`G4 S${dwellTime}; Dwell`);
            output.push(`M${temperatureGCodeType} S${tempStart + (i - 1) * tempOffset}`);
        }
        output.push("");


        for (let j = 1; j <= flowSteps; j++) {
            if (tempOffset === 0 && i === tempSteps && flowStart + (j - 2) * flowOffset === flowEnd) break;

            let extrusionSpeed = Math.round((blobHeight / (extrusionAmount / ((flowStart + (j - 1) * flowOffset) / (Math.atan(1) * filamentDiameter * filamentDiameter) * 60)) + Number.EPSILON) * 100) / 100;

            output.push(`;####### ${tempStart + (i - 1) * tempOffset}°C // ${flowStart + (j - 1) * flowOffset}mm3/s`);
            output.push(`M117 ${tempStart + (i - 1) * tempOffset}C // ${flowStart + (j - 1) * flowOffset}mm3/s`);

            output.push(`G0 X${Math.abs(bedMargin) + ((i - 1) * (primeLength + wipeLength + tempSpacing))} Y${(bedLength - bedMargin) - (j - 1) * flowSpacing} Z${0.5 + blobHeight + 5} F${travelSpeed * 60}`);
            output.push(`G4 S${dwellTime} ; Dwell`);
            output.push("G0 Z${primingHeight} ; Drop down");
            output.push(`G1 X${Math.abs(bedMargin) + primeLength + ((i - 1) * (primeLength + wipeLength + tempSpacing))} E${primeAmount} F${(primeSpeed * 60)} ; Prime`);
            output.push(`G1 E${-1 * retractionDistance} F${retractionSpeed * 60} ; Retract`);
            output.push(`G0 X${Math.abs(bedMargin) + primeLength + wipeLength + ((i - 1) * (primeLength + wipeLength + tempSpacing))} F${travelSpeed * 60} ; Wipe`);
            output.push("G0 Z${startHeight}  ; Lift");
            output.push(`G1 E${retractionDistance} F${retractionSpeed * 60} ; Undo Retract`);
            output.push(`G1 Z${startHeight + blobHeight} E${extrusionAmount} F${extrusionSpeed} ; Extrude`);
            output.push(`G1 E${-1 * retractionDistance} F${retractionSpeed * 60} ; Retract`);
            output.push(`G0 Z${startHeight + blobHeight + 5}; Lift`);
            output.push(`G0 X${Math.abs(bedMargin) + ((i - 1) * (primeLength + wipeLength + tempSpacing))} Y${(bedLength - bedMargin) - (j - 1) * flowSpacing} F${travelSpeed * 60}`);
            output.push("G92 E0 ; Reset Extruder");
            output.push("");
        }
    }
    
    output.push(";####### End Gcode");
    endGcode.split("\n").forEach(line => {
        output.push(line);
    })

    return output.join("\n");
}
