import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

import { Input, Select, TextArea, Info, Error, Warning } from './Inputs';
import { AdvancedBadge, WarningBadge } from './Badges';
import { SlimButton } from './Buttons';
import { useStore } from '../stores/store';
import { replaceTemplateVars } from '../utils/replaceTemplateVars';
import { validMaxFlowStepsPerColumn, validMaxTempSteps } from '../utils/boundaryChecks';
import { prusaMK3SDefaults } from '../lib/presets/prusa-mk3s';
import { limits } from '../lib/limits';
import { SuccessToast } from './Toasts';

function InputForm() {
  const options = useStore((state) => state.options);
  const setOptions = useStore((state) => state.setOptions);

  const showVariableNames = useStore((state) => state.showVariableNames);
  const setShowVariableNames = useStore((state) => state.setShowVariableNames);

  const startGcodeError = useStore((state) => state.startGcodeError);
  const setStartGcodeError = useStore((state) => state.setStartGcodeError);
  const endGcodeError = useStore((state) => state.endGcodeError);
  const setEndGcodeError = useStore((state) => state.setEndGcodeError);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: options,
    mode: "all"
  });

  const updateFormData = (data) => {
    data.tempEnd = data.tempStart + (data.tempOffset * (data.tempSteps-1));
    data.flowEnd = data.flowStart + (data.flowOffset * (data.flowSteps-1));

    try { 
      replaceTemplateVars(data.startGcode, data);
      setStartGcodeError(``);
    } 
    catch (err) { console.log(err); setStartGcodeError(`Unable to parse supplied Gcode: ${err}`) } 

    try { 
      replaceTemplateVars(data.endGcode, data)
      setEndGcodeError(``);
     } 
    catch (err) { setEndGcodeError(`Unable to parse supplied Gcode: ${err}`) } 

    setOptions(data);
  }

  const onSubmit = (data) => {
    updateFormData(data);
  }

  const resetForm = () => {
    if (showVariableNames === true ) { setShowVariableNames()}
    reset(prusaMK3SDefaults);
  }

  useEffect(() => {
    const subscription = watch((data) => {
    console.log(data.bedWidth)
      updateFormData(data);
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [watch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg mt-4 font-bold">Printer Dimensions</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="bedWidth" label="Bed Width" unit="mm" hasVariable
        description="Width of print bed (i.e. X-axis length)"
        register={register("bedWidth", { required: true, valueAsNumber: true, 
          onChange: (e) => {if (e.target.value > limits.bedLengthMax) setValue("bedWidth", limits.bedWidthMax)}, 
          validate: (value) => (value >= 60 && value <= limits.bedWidthMax)})}/>
        {errors.bedWidth && <Error msg="Enter a valid bed width."/>}
        {options.bedWidth >= limits.bedWidthMax && <Warning msg="Max supported bed width is 600mm."/>}

        <Input type="number" value="bedLength" label="Bed Length" unit="mm" hasVariable
        description="Length of print bed (i.e. Y-axis length)"
        register={register("bedLength", { required: true, valueAsNumber: true, 
          onChange: (e) => {if (e.target.value > limits.bedLengthMax) setValue("bedLength", limits.bedLengthMax)}, 
          validate: (value) => (value >= 60 && value <= limits.bedLengthMax)})}/>
        {errors.bedLength && <Error msg="Enter a valid bed length."/>}
        {options.bedLength >= limits.bedLengthMax && <Warning msg="Max supported bed length is 600mm."/>}

        <Input type="number" value="bedMarginX" label="X Bed Margin" unit="mm"
        description="Safe distance from edge of bed to print on from the X axis"
        register={register("bedMarginX", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= (limits.bedWidthMax/3))})}/>
        {errors.bedMarginX && <Error msg="Enter a valid X bed Margin."/>}

        <Input type="number" value="bedMarginY" label="X Bed margin" unit="mm"
        description="Safe distance from edge of bed to print on from the X axis"
        register={register("bedMarginY", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= (limits.bedLengthMax/3))})}/>
        {errors.bedMarginY && <Error msg="Enter a valid Y bed margin."/>}

        <Select value="direction" label="Generation Direction" register={register("direction", { required: true, valueAsNumber: true })}
        description="For toolheads with large forward clearance"
          options={[
            {value: 1, label: "Front to Back"},
            {value: -1, label: "Back to Front"}
          ]}
        />
      </div>

      <h2 className="text-lg mt-4 font-bold">Printer Settings</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Select value="filamentDiameter" label="Filament Diameter" register={register("filamentDiameter", { required: true, valueAsNumber: true })}
          description="Diameter of filament used"
          options={[
            {value: 1.75, label: "1.75mm"},
            {value: 2.85, label: "2.85mm"}
          ]}
        />

        <Input type="number" value="travelSpeed" label="Travel Speed" unit="mm/s"
        description="Speed for non-printing moves"
        register={register("travelSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 2000)})}/>
        {errors.travelSpeed && <Error msg="Enter a valid travel speed."/>}

        <Input type="number" value="bedTemp" label="Bed Temperature" unit="°C" hasVariable
        description="Temperature of print bed"
        register={register("bedTemp", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 150)})}/>
        {errors.bedTemp && <Error msg="Enter a valid bed temperature."/>}

        <Input type="number" value="fanSpeed" label="Fan Speed" unit="%"  hasVariable
        description="Speed of part cooling fan"
        register={register("fanSpeed", { required: true, valueAsNumber: true, setValueAs: v => Math.round(v*255/100), validate: (value) => (value >= 0 && value <= 100)})}/>
        {errors.fanSpeed && <Error msg="Enter a valid fan speed."/>}
      </div>
      

      <h2 className="text-lg mt-4 font-bold">Retraction Settings</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" step={0.01} value="retractionDistance" label="Retraction Distance" unit="mm"
        description="Length of filament to recede during retraction"
        register={register("retractionDistance", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 10)})}/>
        {errors.retractionDistance && <Error msg="Enter a valid retraction distance."/>}

        <Input type="number" value="retractionSpeed" label="Retraction Speed" unit="mm/s"
        description="Speed that extruder drives back filament"
        register={register("retractionSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 150)})}/>
        {errors.retractionSpeed && <Error msg="Enter a valid retraction speed."/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Pattern Configuration</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="flowSpacing" label="Flow Spacing" unit="mm"
        description="Space between flow tests (i.e. Y-spacing)"
        register={register("flowSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
        {errors.flowSpacing && <Error msg="Enter a valid flow spacing."/>}

        <Input type="number" value="tempSpacing" label="Temperature Spacing" unit="mm"
        description="Space between temperature tests (i.e. X-spacing)"
        register={register("tempSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
        {errors.tempSpacing && <Error msg="Enter a valid temperature spacing."/>}

        <Input type="number" value="dwellTime" label="Dwell Time" unit="s"
        description="Pause before each prime line"
        register={register("dwellTime", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
        {errors.dwellTime && <Error msg="Enter a valid dwell time."/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Flow Test (Rows)</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="flowStart" label="Start Flow" unit="mm³/s" 
        description="Requested flow rate for first flow test in sequence"
        register={register("flowStart", { required: true, valueAsNumber: true, validate: (value) => (value > 0 && value <= 150)})}/>
        {errors.flowStart && <Error msg="Enter a valid start flow."/>}

        <Input type="number" value="flowOffset" label="Offset Flow" unit="mm³/s" 
        description="Change in requested flow rate between flow steps"
        register={register("flowOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
        {errors.flowOffset && <Error msg="Enter a valid offset flow."/>}

        <Input type="number" value="flowSteps" label="Flow Steps" 
        description="Inclusive; Number of flow steps to test"
        register={register("flowSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 100)})}/>
        {errors.flowSteps && <Error msg="Enter a valid number of flow steps."/>}
        {options.tempSteps > 1 && !errors.flowSteps && options.flowSteps > validMaxFlowStepsPerColumn() && <Warning msg="Requested flow steps exceed bed length."/>}
        {options.tempSteps === 1 && !errors.flowSteps && options.flowSteps > (validMaxFlowStepsPerColumn() * validMaxTempSteps()) && <Warning msg="Requested flow steps exceed bed size."/>}

        <Input type="number" defaultValue={options.flowEnd} label="End Flow" unit="mm³/s" disabled={true} 
        description="Requested flow rate for last flow test in sequence"/>
        <Info msg="End flow is a calculated value." />
      </div>

      <h2 className="text-lg mt-4 font-bold">Temperature Test (Columns)</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="tempStart" label="Start Temperature" unit="°C" hasVariable
        description="Hotend temperature for first temperature column"
        register={register("tempStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 140 && value <= 450)})}/>
        {errors.tempStart && <Error msg="Enter a valid start temperature."/>}

        <Input type="number" value="tempOffset" label="Offset Temperature" unit="°C"
        description="Change in temperature between temperature columns"
        register={register("tempOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= -115 && value <= 115)})}/>
        {errors.tempOffset && <Error msg="Enter a valid offset temperature."/>}

        <Input type="number" value="tempSteps" label="Temperature Steps" 
        description="Inclusive; Set to 1 to fill plate with flow steps instead"
        register={register("tempSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 10)})}/>
        {errors.tempSteps && <Error msg="Enter a valid number of temperature steps."/>}
        {options.tempSteps !== 1 && !errors.tempSteps && options.tempSteps > validMaxTempSteps() && <Warning msg="Requested temp steps exceed bed width."/>}


        <Input type="number" defaultValue={options.tempEnd} label="End Temperature" unit="°C" disabled={true} 
        description="Hotend temperature for last temperature column" />
        <Info msg="End temperature is a calculated value." />
      </div>

      <div className="flex mt-4 items-center gap-2">
        <h2 className="text-lg font-bold">Start and End Gcode</h2>
        <AdvancedBadge label="Advanced"/>
      </div>
      <div>
        <div className ="grid grid-cols-2 gap-x-8">
          <Input type="number" value="safeZPark" label="Safe Z Park Height" unit="mm" hasVariable
          description="Absolute position; Safe height to park toolhead"
          register={register("safeZPark", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
          {errors.safeZPark && <Error msg="Enter a valide safe z park height."/>}
        
          <Select value="showVariableNames" label="Show Variable Names" targetValue={showVariableNames}
            description="For use in custom start and end Gcode"
            handleChange={(e) => { setShowVariableNames(e.target.value) }}
            options={[
              {value: false, label: "Hide"},
              {value: true, label: "Show"}
            ]}
          />
        </div>


        <TextArea value="startGcode" label="Start Gcode" 
        // eslint-disable-next-line no-template-curly-in-string
        description="Variables within ${variable} will be evaluated. +, -, *, /, and Math.abs(variable) are also supported."
        register={register("startGcode")}/>
        {startGcodeError && <Error msg={startGcodeError} />}

        <TextArea value="endGcode" label="End Gcode" 
        // eslint-disable-next-line no-template-curly-in-string
        description="Variables within ${variable} will be evaluated. +, -, *, /, and Math.abs(variable) are also supported."
        register={register("endGcode")}/>
        {endGcodeError && <Error msg={endGcodeError} />}
      </div>

      <div className="flex mt-4 items-center gap-2">
        <h2 className="text-lg font-bold">Test Configuration</h2>
        <AdvancedBadge label="Advanced"/>
      </div>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="primeLength" label="Prime Line Length" unit="mm"
        description="Length of prime line before blob"
        register={register("primeLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeLength && <Error msg="Enter a valid prime line length."/>}

        <Input type="number" value="primeAmount" label="Prime Amount" unit="mm"
        description="Length of filament to extrude for prime line"
        register={register("primeAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeAmount && <Error msg="Enter a valid length to extrude."/>}

        <Input type="number" value="primeSpeed" label="Prime Speed" unit="mm/s"
        description="Speed of the prime move"
        register={register("primeSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeSpeed && <Error msg="Enter a valid prime speed."/>}

        <Input type="number" value="wipeLength" label="Wipe Length" unit="mm"
        description="Distance between prime line end and blob center"
        register={register("wipeLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.wipeLength && <Error msg="Enter a valid wipe length."/>}

        <Input type="number" value="blobHeight" label="Blob Height" unit="mm"
        description="Height of printed blob"
        register={register("blobHeight", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.blobHeight && <Error msg="Enter a valid blob height."/>}

        <Input type="number" value="extrusionAmount" label="Extrusion Amount" unit="mm"
        description="Length of filament to extrude into blob"
        register={register("extrusionAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.extrusionAmount && <Error msg="Enter a valid extrusion amount."/>}

        <Input type="number" value="primingHeight" label="Priming Height" unit="mm"
        description="The height to prime the nozzle at. As larger nozzles may need a higher priming height."
        register={register("primingHeight", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 3)})}/>
        {errors.primingHeight && <Error msg="Enter a valid priming height."/>}

        <Input type="number" value="startHeight" label="Start Height" unit="mm"
        description="The height to start the extrusion at. As larger nozzles may need a higher start height."
        register={register("startHeight", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 3)})}/>
        {errors.startHeight && <Error msg="Enter a valid start height."/>}

        <Select value="temperatureGCodeType" label="Temperature GCode Type" register={register("temperatureGCodeType", { required: true, valueAsNumber: true })}
          description="Use M104 or M109 for temperature changes"
          options={[
            {value: 104, label: "M104"},
            {value: 109, label: "M109"}
          ]}
        />

        <Input type="number" value="toolNumber" label="Tool Number"
        description="The tool number to use for multi-tool printers. Typically the first tool has number zero."
        register={register("toolNumber", { required: false, valueAsNumber: true, validate: (value) => (!value || (value >= 0 && value < 32))})}/>
        {errors.toolNumber && <Error msg="Enter a valid tool number, or leave blank."/>}

        <Input type="checkbox" value="heatBeforeDewell" label="Heat Before Dewell" register={register("heatBeforeDewell", { required: true })}
        description="Heat the nozzle before the dewell time"
        />

      </div>
      <div className="flex mt-4 items-center gap-2">
        <h2 className="text-lg font-bold">Generator Settings</h2>
        <WarningBadge label="Experimental"/>
      </div>
      <div className ="w-48">
        <SlimButton label="Reset Options" color="text-zinc-600" bgColors="bg-zinc-200 hover:bg-zinc-300" 
          handleClick={() => {
            toast.custom(
              ({visible}) => (
                <SuccessToast visible={visible} label="Options Reset" />
              ),
              { duration: 1250 }
            );
            resetForm()
            }} />
      </div>
    </form>
  );
}

export default InputForm;

