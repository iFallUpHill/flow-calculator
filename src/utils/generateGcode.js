import { version } from '../lib/version'

export default function generateGcode(data, { addHeader=false }={}) {
    const {
        bedWidth,
        safeZPark,
        filamentDiameter,
        travelSpeed,
        stabilizationTime,
        bedTemp,
        fanSpeed,
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
        /* eslint-disable */ 
        tempEnd,
        customStartGcode,
        customEndGcode,
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

    const maxBedLength = bedLength;
    
    let output = [];

    // Fill Flow Mode
    if (tempSteps === 1) {
        const maxFlowStepsPerColumn = Math.floor(((bedWidth - 2 * bedMargin) + flowSpacing)/ flowSpacing);
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
            output.push(`; ${key} = ${value}`);
        }
        output.push("");
    }

    output.push(";####### Start Gcode");
    output.push(`M104 S${tempStart} ; Set Nozzle Temperature`);
    output.push(`M140 S${bedTemp} ; Set Bed Temperature`);
    output.push("G90 ; Absolute positioning");
    output.push("G28 ; Move to home position");
    output.push(`G0 Z${safeZPark} ; Lift nozzle`);
    output.push("G21 ; unit in mm");
    output.push("G92 E0 ; reset extruder");
    output.push("M83 ; set extruder to relative mode");
    if (customStartGcode !== '' && customStartGcode.length > 0) {
        output.push(";####### Custom Start Gcode Start");
        output = output.concat(customStartGcode)
        output.push(";####### Custom Start Gcode End");
    }
    output.push(`M190 S${bedTemp} ; Wait for Bed Temperature`);
    output.push(`M106 S${Math.round(fanSpeed*255/100)} ; Set Fan Speed`);
    output.push("");

    for (let i = 1; i <= tempSteps; i++) {
        if (tempOffset === 0 && i > 1) {
            flowStart = flowStart + flowSteps * flowOffset;
        }

        output.push(`;####### ${tempStart + (i - 1) * tempOffset}°C`);
        output.push(`G4 S0; Dwell`);
        output.push(`M109 S${tempStart + (i - 1) * tempOffset}`);
        output.push("");


        for (let j = 1; j <= flowSteps; j++) {
            if (tempOffset === 0 && i === tempSteps && flowStart + (j - 2) * flowOffset === flowEnd) break;

            let extrusionSpeed = Math.round((blobHeight / (extrusionAmount / ((flowStart + (j - 1) * flowOffset) / (Math.atan(1) * filamentDiameter * filamentDiameter) * 60)) + Number.EPSILON) * 100) / 100;

            output.push(`;####### ${tempStart + (i - 1) * tempOffset}°C // ${flowStart + (j - 1) * flowOffset}mm3/s`);
            output.push(`M117 ${tempStart + (i - 1) * tempOffset}°C // ${flowStart + (j - 1) * flowOffset}mm3/s`);

            output.push(`G0 X${Math.abs(bedMargin) + ((i - 1) * (primeLength + wipeLength + tempSpacing))} Y${(bedLength - bedMargin) - (j - 1) * flowSpacing} Z${0.5 + blobHeight + 5} F${travelSpeed * 60}`);
            output.push(`G4 S${stabilizationTime} ; Stabilize`);
            output.push("G0 Z0.3 ; Drop down");
            output.push(`G1 X${Math.abs(bedMargin) + primeLength + ((i - 1) * (primeLength + wipeLength + tempSpacing))} E${primeAmount} F${(primeSpeed * 60)} ; Prime`);
            output.push(`G1 E${-1 * retractionDistance} F${retractionSpeed * 60} ; Retract`);
            output.push(`G0 X${Math.abs(bedMargin) + primeLength + wipeLength + ((i - 1) * (primeLength + wipeLength + tempSpacing))} F${travelSpeed * 60} ; Wipe`);
            output.push("G0 Z0.5 ; Lift");
            output.push(`G1 E${retractionDistance} F${retractionSpeed * 60} ; Undo Retract`);
            output.push(`G1 Z${0.5 + blobHeight} E${extrusionAmount} F${extrusionSpeed} ; Extrude`);
            output.push(`G1 E${-1 * retractionDistance} F${retractionSpeed * 60} ; Retract`);
            output.push(`G0 Z${0.5 + blobHeight + 5}; Lift`);
            output.push(`G0 X${Math.abs(bedMargin) + ((i - 1) * (primeLength + wipeLength + tempSpacing))} Y${(bedLength - bedMargin) - (j - 1) * flowSpacing} F${travelSpeed * 60}`);
            output.push("G92 E0 ; Reset Extruder");
            output.push("");
        }
    }
    
    output.push(";####### End Gcode");
    output.push(`G0 X${bedWidth - Math.abs(bedMargin)} Y${maxBedLength - Math.abs(bedMargin)} ; Move to Corner`);
    if (customEndGcode !== '' && customEndGcode.length > 0) {
        output.push(";####### Custom End Gcode Start");
        output = output.concat(customEndGcode)
        output.push(";####### Custom End Gcode End");
    }
    output.push("M104 S0 T0 ; Turn Off Hotend");
    output.push("M140 S0 ; Turn Off Bed");
    output.push("M84 ; Disable Steppers");

    return output.join("\n");
}