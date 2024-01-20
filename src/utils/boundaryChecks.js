import { useStore } from "../stores/store";

function validMaxFlowStepsPerColumn() {
    const { bedLength, bedMarginX, bedMarginY, flowSpacing} = useStore.getState().options;

    return Math.floor(((bedLength - 2 * bedMarginY) + flowSpacing)/ flowSpacing);
}

function validMaxTempSteps() {
    const { bedWidth, bedMarginX, bedMarginY, tempSpacing, primeLength, wipeLength} = useStore.getState().options;

    return Math.floor(((bedWidth - 2 * bedMarginX) + tempSpacing)/(primeLength + wipeLength + tempSpacing));
}

export {
    validMaxFlowStepsPerColumn,
    validMaxTempSteps,
}