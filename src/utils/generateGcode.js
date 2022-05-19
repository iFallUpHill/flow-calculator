export default function generateGcode(data) {
    console.log(data);
    const {
        bedWidth,
        bedLength,
        bedMargin,
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
        flowSpacing,
        tempSpacing,
        flowStart,
        flowOffset,
        flowSteps,
        flowEnd,
        tempStart,
        tempOffset,
        tempSteps,
        tempEnd,
        customStartGCode,
        customEndGCode,
        fileName,
      } = data;

    let output = [];
    console.log(customStartGCode)

    // Credits
    output.push("; *** ExtrusionSystemBenchmark.js (v0.1) - Original CNC Kitchen Auto Flow Pattern Generator 0.93 by Stefan Hermann")
    output.push("")

    //Generation Settings
    output.push(";####### Settings")
    output.push(`; bedWidth = ${bedWidth}`);
    output.push(`; bedLength = ${bedLength}`);
    output.push(`; bedMargin = ${bedMargin}`);
    output.push(`; filamentDiameter = ${filamentDiameter}`);
    output.push(`; travelSpeed = ${travelSpeed}`);
    output.push(`; stabilizationTime = ${stabilizationTime}`);
    output.push(`; bedTemp = ${bedTemp}`);
    output.push(`; fanSpeed = ${fanSpeed}`);
    output.push(`; primeLength = ${primeLength}`);
    output.push(`; primeAmount = ${primeAmount}`);
    output.push(`; primeSpeed = ${primeSpeed}`);
    output.push(`; wipeLength = ${wipeLength}`);
    output.push(`; retractionDistance = ${retractionDistance}`);
    output.push(`; retractionSpeed = ${retractionSpeed}`);
    output.push(`; blobHeight = ${blobHeight}`);
    output.push(`; extrusionAmount = ${extrusionAmount}`);
    output.push(`; direction = ${direction}`);
    output.push(`; flowSpacing = ${flowSpacing}`);
    output.push(`; tempSpacing = ${tempSpacing}`);
    output.push(`; flowStart = ${flowStart}`);
    output.push(`; flowOffset = ${flowOffset}`);
    output.push(`; flowSteps = ${flowSteps}`);
    output.push(`; flowEnd = ${flowEnd}`);
    output.push(`; tempStart = ${tempStart}`);
    output.push(`; tempOffset = ${tempOffset}`);
    output.push(`; tempSteps = ${tempSteps}`);
    output.push(`; tempEnd = ${tempEnd}`);
    output.push(`; customStartGCode = ${customStartGCode}`);
    output.push(`; customEndGCode = ${customEndGCode}`);
    output.push(`; fileName = ${fileName}`);
    output.push("");

    output.push(";####### Start G-Code");
    output.push(`M104 S${flowStart} ; Set Nozzle Temperature`);
    output.push(`M140 S${bedTemp} ; Set Bed Temperature`);
    output.push("G90");
    output.push("G28 ; Move to home position");
    output.push("G0 Z10 ; Lift nozzle");
    output.push("G21; unit in mm");
    output.push("G92 E0; reset extruder");
    output.push("M83; set extruder to relative mode");
    if (customStartGCode.length > 0) {
        output.push(";####### Custom Start G-Code Start");
        output = output.concat(customStartGCode)
        output.push(";####### Custom Start G-Code End");
    }
    output.push(`M190 S${bedTemp} ; Wait for Bed Temperature`);
    output.push(`M106 S${fanSpeed} ; Set Fan Speed`);
    output.push("");

    output.push("");
    output.push(";####### End G-Code");
    output.push(`G0 X${bedWidth - Math.abs(bedMargin)} Y${bedLength- Math.abs(bedMargin)} ; Move to Corner`);
    if (customEndGCode.length > 0) {
        output.push(";####### Custom End G-Code Start");
        output = output.concat(customEndGCode)
        output.push(";####### Custom End G-Code End");
    }
    output.push("M104 S0 T0 ; Turn Off Hotend");
    output.push("M140 S0 ; Turn Off Bed");
    output.push("M84");

    console.log(output);
}