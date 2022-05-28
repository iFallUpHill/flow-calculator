import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, StyledInput, Select, TextArea, Info, Error } from './Inputs';
import { AdvancedBadge } from './Badges';
import { useStore } from '../stores/store';
import { replaceTemplateVars } from '../utils/replaceTemplateVars';

function InputForm() {
  const options = useStore((state) => state.options);
  const setOptions = useStore((state) => state.setOptions);

  const startGcodeError = useStore((state) => state.startGcodeError);
  const setStartGcodeError = useStore((state) => state.setStartGcodeError);
  const endGcodeError = useStore((state) => state.endGcodeError);
  const setEndGcodeError = useStore((state) => state.setEndGcodeError);

  const {
    register,
    handleSubmit,
    watch,
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
    catch (err) { console.log(err); setStartGcodeError(`Unable to parse supplied Gcode.`) } 

    try { 
      replaceTemplateVars(data.endGcode, data)
      setEndGcodeError(``);
     } 
    catch (err) { setEndGcodeError(`Unable to parse supplied Gcode.`) } 

    setOptions(data);
  }

  const onSubmit = (data) => {
    updateFormData(data);
  };

  useEffect(() => {
    const subscription = watch((data) => {
      updateFormData(data);
    })

    return () => {
      subscription.unsubscribe();
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg mt-4 font-bold">Printer Configuration</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="bedWidth" label="Bed Width" unit="mm"
        register={register("bedWidth", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.bedWidth && <Error msg="Enter a valid bed width"/>}

        <Input type="number" value="bedLength" label="Bed Length" unit="mm"
        register={register("bedLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.bedLength && <Error msg="Enter a valid bed length"/>}

        <Input type="number" value="bedLength" label="Bed Margin" unit="mm"
        register={register("bedMargin", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 50)})}/>
        {errors.bedMargin && <Error msg="Enter a valid bed margin"/>}

        <Select value="filamentDiameter" label="Filament Diameter" register={register("filamentDiameter", { required: true, valueAsNumber: true })}
          options={[
            {value: 1.75, label: "1.75mm"},
            {value: 2.85, label: "2.85mm"}
          ]}
        />

        <Input type="number" value="travelSpeed" label="Travel Speed" unit="mm/s"
        register={register("travelSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 2000)})}/>
        {errors.travelSpeed && <Error msg="Enter a valid travel speed"/>}

        <Select value="direction" label="Generation Direction" register={register("direction", { required: true, valueAsNumber: true })}
          options={[
            {value: 1, label: "Front to Back"},
            {value: -1, label: "Back to Front"}
          ]}
        />

        <Input type="number" value="stabilizationTime" label="Stabilization Time" unit="s"
        register={register("stabilizationTime", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
        {errors.stabilizationTime && <Error msg="Enter a valid stabilization time"/>}

        <Input type="number" value="bedTemp" label="Bed Temperature" unit="°C"
        register={register("bedTemp", { required: true, valueAsNumber: true, validate: (value) => (value >= 40 && value <= 150)})}/>
        {errors.bedTemp && <Error msg="Enter a valid bed temperature"/>}

        <Input type="number" value="fanSpeed" label="Fan Speed" unit="%" 
        register={register("fanSpeed", { required: true, valueAsNumber: true, setValueAs: v => Math.round(v*255/100), validate: (value) => (value >= 0 && value <= 100)})}/>
        {errors.fanSpeed && <Error msg="Enter a valid fan speed"/>}
      </div>
      

      <h2 className="text-lg mt-4 font-bold">Extruder Configuration</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" step={0.01} value="retractionDistance" label="Retraction Distance" unit="mm"
        register={register("retractionDistance", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 10)})}/>
        {errors.retractionDistance && <Error msg="Enter a valid retraction distance"/>}

        <Input type="number" value="retractionSpeed" label="Retraction Speed" unit="mm/s"
        register={register("retractionSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.retractionSpeed && <Error msg="Enter a valid retraction speed"/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Spacing</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="flowSpacing" label="Flow Spacing - Rows" unit="mm"
        register={register("flowSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
        {errors.flowSpacing && <Error msg="Enter a valid flow spacing"/>}

        <Input type="number" value="tempSpacing" label="Temperature Spacing - Columns" unit="mm"
        register={register("tempSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
        {errors.tempSpacing && <Error msg="Enter a valid temperature spacing"/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Flow Test (Rows)</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="flowStart" label="Start Flow" unit="mm³/s" 
        register={register("flowStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 2 && value <= 100)})}/>
        {errors.flowStart && <Error msg="Enter a valid start flow"/>}

        <Input type="number" value="flowOffset" label="Offset Flow" unit="mm³/s" 
        register={register("flowOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
        {errors.flowOffset && <Error msg="Enter a valid offset flow"/>}

        <Input type="number" value="flowSteps" label="Flow Steps" 
        register={register("flowSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 30)})}/>
        {errors.flowSteps && <Error msg="Enter a valid number of flow steps"/>}

        <StyledInput type="number" defaultValue={options.flowEnd} label="End Flow" unit="mm³/s" disabled={true} />
        <Info msg="End flow is a calculated value." />
      </div>

      <h2 className="text-lg mt-4 font-bold">Temperature Test (Columns)</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="tempStart" label="Start Temperature" unit="°C"
        register={register("tempStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 155 && value <= 450)})}/>
        {errors.tempStart && <Error msg="Enter a valid start temperature"/>}

        <Input type="number" value="tempOffset" label="Offset Temperature" unit="°C"
        register={register("tempOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 115)})}/>
        {errors.tempOffset && <Error msg="Enter a valid offset temperature"/>}

        <Input type="number" value="tempSteps" label="Temperature Steps (Set to 1 for Fill Flow Mode)" 
        register={register("tempSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 10)})}/>
        {errors.tempSteps && <Error msg="Enter a valid number of temperature steps"/>}

        <StyledInput type="number" defaultValue={options.tempEnd} label="End Temperature" unit="°C" disabled={true} />
        <Info msg="End temperature is a calculated value." />
      </div>

      <div className="flex mt-4 items-center gap-2">
        <h2 className="text-lg font-bold">Start and End Gcode</h2>
        <AdvancedBadge label="Advanced"/>
      </div>
      <div>
        <div className ="grid grid-cols-2 gap-x-8">
          <Input type="number" value="safeZPark" label="Safe Z Park Height (absolute above bed)" unit="mm"
          register={register("safeZPark", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
          {errors.safeZPark && <Error msg="Enter a safe z park height"/>}
        </div>

        <TextArea value="startGcode" label="Start Gcode" 
        register={register("startGcode")}/>
        {startGcodeError && <Error msg={startGcodeError} />}

        <TextArea value="endGcode" label="End Gcode" 
        register={register("endGcode")}/>
        {endGcodeError && <Error msg={endGcodeError} />}
      </div>

      <div className="flex mt-4 items-center gap-2">
        <h2 className="text-lg font-bold">Test Configuration</h2>
        <AdvancedBadge label="Advanced"/>
      </div>
       <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="primeLength" label="Prime Line Length" unit="mm"
        register={register("primeLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeLength && <Error msg="Enter a valid prime line length"/>}

        <Input type="number" value="primeAmount" label="Prime Extrude Amount" unit="mm"
        register={register("primeAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeAmount && <Error msg="Enter a valid amount to extrude for the priming"/>}

        <Input type="number" value="primeSpeed" label="Prime Speed" unit="mm/s"
        register={register("primeSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeSpeed && <Error msg="Enter a valid prime speed"/>}

        <Input type="number" value="wipeLength" label="Prime End to Blob Start Distance" unit="mm"
        register={register("wipeLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.wipeLength && <Error msg="Enter a valid wipe length"/>}

        <Input type="number" value="blobHeight" label="Blob Height" unit="mm"
        register={register("blobHeight", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.blobHeight && <Error msg="Enter a valid blob height"/>}

        <Input type="number" value="extrusionAmount" label="Extrusion Amount" unit="mm"
        register={register("extrusionAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.extrusionAmount && <Error msg="Enter a valid extrusion amount"/>}
      </div>
    </form>
  );
}

export default InputForm;

