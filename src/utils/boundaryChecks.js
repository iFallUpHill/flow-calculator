import { useStore } from "../stores/store";

function validMaxFlowStepsPerColumn() {
    const { bedLength, bedMargin, flowSpacing} = useStore.getState().options;

    return Math.floor(((bedLength - 2 * bedMargin) + flowSpacing)/ flowSpacing);
}

function validMaxTempSteps() {
    const { bedWidth, bedMargin, tempSpacing, primeLength, wipeLength } = useStore.getState().options;

    return Math.floor(((bedWidth - 2 * bedMargin) + tempSpacing)/(primeLength + wipeLength + tempSpacing));
}

export {
    validMaxFlowStepsPerColumn,
    validMaxTempSteps,
}