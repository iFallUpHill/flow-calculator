import { version } from '../lib/version'
import { replaceTemplateVars } from './replaceTemplateVars';
import { validMaxFlowStepsPerColumn } from './boundaryChecks';
import seedrandom from 'seedrandom';

function shuffleArray(array, prng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(prng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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
        randomizeTestOrder,
        randomizeTestOrderSeed,
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

    let tests = randomizeTestOrder ? [] : null;

    for (let i = 1; i <= tempSteps; i++) {
        if (tempOffset === 0 && i > 1) {
            flowStart = flowStart + flowSteps * flowOffset;
        }
            
        for (let j = 1; j <= flowSteps; j++) {

            if (tempOffset === 0 && i === tempSteps && flowStart + (j - 2) * flowOffset === flowEnd) break;

            let testOutput = randomizeTestOrder ? [] : output;

            if (j === 1 || randomizeTestOrder) {
                if (randomizeTestOrder) {
                    testOutput.push(`;####### ${tempStart + (i - 1) * tempOffset}°C // ${flowStart + (j - 1) * flowOffset}mm3/s`);
                    testOutput.push(`M117 ${tempStart + (i - 1) * tempOffset}C // ${flowStart + (j - 1) * flowOffset}mm3/s`);        
                }
                else {
                    testOutput.push(`;####### ${tempStart + (i - 1) * tempOffset}°C`);
                }
                testOutput.push(`G4 S0; Dwell`);
                testOutput.push(`M109 S${tempStart + (i - 1) * tempOffset}`);
                testOutput.push("");
            }

            let extrusionSpeed = Math.round((blobHeight / (extrusionAmount / ((flowStart + (j - 1) * flowOffset) / (Math.atan(1) * filamentDiameter * filamentDiameter) * 60)) + Number.EPSILON) * 100) / 100;

            if (!randomizeTestOrder) {
                testOutput.push(`;####### ${tempStart + (i - 1) * tempOffset}°C // ${flowStart + (j - 1) * flowOffset}mm3/s`);
                testOutput.push(`M117 ${tempStart + (i - 1) * tempOffset}C // ${flowStart + (j - 1) * flowOffset}mm3/s`);
            }

            testOutput.push(`G0 X${Math.abs(bedMargin) + ((i - 1) * (primeLength + wipeLength + tempSpacing))} Y${(bedLength - bedMargin) - (j - 1) * flowSpacing} Z${0.5 + blobHeight + 5} F${travelSpeed * 60}`);
            testOutput.push(`G4 S${dwellTime} ; Dwell`);
            testOutput.push("G0 Z0.3 ; Drop down");
            testOutput.push(`G1 X${Math.abs(bedMargin) + primeLength + ((i - 1) * (primeLength + wipeLength + tempSpacing))} E${primeAmount} F${(primeSpeed * 60)} ; Prime`);
            testOutput.push(`G1 E${-1 * retractionDistance} F${retractionSpeed * 60} ; Retract`);
            testOutput.push(`G0 X${Math.abs(bedMargin) + primeLength + wipeLength + ((i - 1) * (primeLength + wipeLength + tempSpacing))} F${travelSpeed * 60} ; Wipe`);
            testOutput.push("G0 Z0.5 ; Lift");
            testOutput.push(`G1 E${retractionDistance} F${retractionSpeed * 60} ; Undo Retract`);
            testOutput.push(`G1 Z${0.5 + blobHeight} E${extrusionAmount} F${extrusionSpeed} ; Extrude`);
            testOutput.push(`G1 E${-1 * retractionDistance} F${retractionSpeed * 60} ; Retract`);
            testOutput.push(`G0 Z${0.5 + blobHeight + 5}; Lift`);
            testOutput.push(`G0 X${Math.abs(bedMargin) + ((i - 1) * (primeLength + wipeLength + tempSpacing))} Y${(bedLength - bedMargin) - (j - 1) * flowSpacing} F${travelSpeed * 60}`);
            testOutput.push("G92 E0 ; Reset Extruder");
            testOutput.push("");

            if ( randomizeTestOrder ) {
                tests.push( testOutput );
            }
        }
    }
    
    if (randomizeTestOrder) {
        let prng = seedrandom(randomizeTestOrderSeed ? randomizeTestOrderSeed : null);
        shuffleArray(tests, prng);
        for (const test of tests) {
            output.push(...test);
        }
    }
    
    output.push(";####### End Gcode");
    endGcode.split("\n").forEach(line => {
        output.push(line);
    })

    return output.join("\n");
}
