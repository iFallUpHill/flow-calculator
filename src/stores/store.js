import create from "zustand";

export const useStore = create((set) => ({
    options: {
        bedWidth: 250, // mm
        bedLength: 210, // mm
        bedMargin: 5, // mm 
        safeZPark: 10, // mm
        filamentDiameter: 1.75, // mm
        travelSpeed: 100, // mm/s
        stabilizationTime: 20, // s
        bedTemp: 60, // °C
        fanSpeed: 0, // % * 100
        primeLength: 25, // mm
        primeAmount: 20, // mm
        primeSpeed: 5, // mm/s
        wipeLength: 15, // mm
        retractionDistance: 0.8, // mm
        retractionSpeed: 35, //mm/s
        blobHeight: 10, // mm 
        extrusionAmount: 200, //mm
        direction: 1, // 1 = front to back, -1 = back to front
        flowSpacing: 50, // mm
        tempSpacing: 38, // mm
        flowStart: 8, // mm^3/s
        flowOffset: 2, // mm^3/s
        flowSteps: 4, // unitless, (end-start)/offset
        flowEnd: 14, // mm^3/s
        tempStart: 200, // °C
        tempOffset: 20, // °C
        tempSteps: 3, // unitless, (end-start)/offset
        tempEnd: 240, // °C
        customStartGCode: '', 
        customEndGCode: '', 
    },
    setOptions: (options) => set(() => ({ options: options })),
    fileName: '',
    setFileName: (fileName) => set(() => ({ fileName: fileName })),
}));