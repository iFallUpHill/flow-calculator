import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, StyledInput, Select, TextArea, Info, Error } from './Inputs';
import { useStore } from "../stores/store";

function InputForm() {
  const options = useStore((state) => state.options);
  const setOptions = useStore((state) => state.setOptions);

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
        <Input type="number" value="bedWidth" label="Bed Width (mm)" 
        register={register("bedWidth", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.bedWidth && <Error msg="Enter a valid bed width"/>}

        <Input type="number" value="bedLength" label="Bed Length (mm)" 
        register={register("bedLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.bedLength && <Error msg="Enter a valid bed length"/>}

        <Input type="number" value="bedLength" label="Bed Margin (mm)" 
        register={register("bedMargin", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 25)})}/>
        {errors.bedMargin && <Error msg="Enter a valid bed margin"/>}

        <Input type="number" value="safeZPark" label="Safe Z Park Height (mm, absolute above bed)" 
        register={register("safeZPark", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.retractionSpeed && <Error msg="Enter a safe z park height"/>}

        <Select value="filamentDiameter" label="Filament Diameter" register={register("filamentDiameter", { required: true, valueAsNumber: true })}
          options={[
            {value: 1.75, label: "1.75mm"},
            {value: 2.85, label: "2.85mm"}
          ]}
        />

        <Input type="number" value="travelSpeed" label="Travel Speed (mm/s)" 
        register={register("travelSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 500)})}/>
        {errors.travelSpeed && <Error msg="Enter a valid travel speed"/>}

        <Select value="direction" label="Direction" register={register("direction", { required: true, valueAsNumber: true })}
          options={[
            {value: 1, label: "Front to Back"},
            {value: -1, label: "Back to Front"}
          ]}
        />

        <Input type="number" value="stabilizationTime" label="Stabilization Time (s)" 
        register={register("stabilizationTime", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
        {errors.stabilizationTime && <Error msg="Enter a valid stabilization time"/>}

        <Input type="number" value="bedTemp" label="Bed Temperature (°C)" 
        register={register("bedTemp", { required: true, valueAsNumber: true, validate: (value) => (value >= 40 && value <= 150)})}/>
        {errors.bedTemp && <Error msg="Enter a valid bed temperature"/>}

        <Input type="number" value="fanSpeed" label="Fan Speed (%)" 
        register={register("fanSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 100)})}/>
        {errors.fanSpeed && <Error msg="Enter a valid fan speed"/>}
      </div>
      

      <h2 className="text-lg mt-4 font-bold">Extruder Configuration</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" step={0.01} value="retractionDistance" label="Retraction Distance (mm)" 
        register={register("retractionDistance", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 10)})}/>
        {errors.retractionDistance && <Error msg="Enter a valid retraction distance"/>}

        <Input type="number" value="retractionSpeed" label="Retraction Speed (mm/s)" 
        register={register("retractionSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.retractionSpeed && <Error msg="Enter a valid retraction speed"/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Extrusion Configuration</h2>
       <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="primeLength" label="Prime Length (mm)" 
        register={register("primeLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeLength && <Error msg="Enter a valid prime length"/>}

        <Input type="number" value="primeAmount" label="Prime Amount (mm)" 
        register={register("primeAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeAmount && <Error msg="Enter a valid prime amount"/>}

        <Input type="number" value="primeSpeed" label="Prime Speed (mm/s)" 
        register={register("primeSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.primeSpeed && <Error msg="Enter a valid prime speed"/>}

        <Input type="number" value="wipeLength" label="Wipe Length (mm)" 
        register={register("wipeLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.wipeLength && <Error msg="Enter a valid wipe length"/>}

        <Input type="number" value="blobHeight" label="Blob Height (mm)" 
        register={register("blobHeight", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
        {errors.blobHeight && <Error msg="Enter a valid blob height"/>}

        <Input type="number" value="extrusionAmount" label="Extrusion Amount (mm)" 
        register={register("extrusionAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
        {errors.extrusionAmount && <Error msg="Enter a valid extrusion amount"/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Spacing</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="flowSpacing" label="Flow Spacing (mm) - Rows" 
        register={register("flowSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
        {errors.flowSpacing && <Error msg="Enter a valid flow spacing"/>}

        <Input type="number" value="tempSpacing" label="Temperature Spacing (mm) - Columns" 
        register={register("tempSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
        {errors.tempSpacing && <Error msg="Enter a valid temperature spacing"/>}
      </div>

      <h2 className="text-lg mt-4 font-bold">Flow Test (Rows)</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="flowStart" label="Start Flow (mm³/s)" 
        register={register("flowStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 2 && value <= 100)})}/>
        {errors.flowStart && <Error msg="Enter a valid start flow"/>}

        <Input type="number" value="flowOffset" label="Offset Flow (mm³/s)" 
        register={register("flowOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
        {errors.flowOffset && <Error msg="Enter a valid offset flow"/>}

        <Input type="number" value="flowSteps" label="Flow Steps" 
        register={register("flowSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 30)})}/>
        {errors.flowSteps && <Error msg="Enter a valid number of flow steps"/>}

        <StyledInput type="number" defaultValue={options.flowEnd} label="End Flow (mm³/s)" disabled={true} />
        <Info msg="End flow is a calculated value." />
      </div>

      <h2 className="text-lg mt-4 font-bold">Temperature Test (Columns)</h2>
      <div className ="grid grid-cols-2 gap-x-8">
        <Input type="number" value="tempStart" label="Start Temperature (°C)" 
        register={register("tempStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 155 && value <= 450)})}/>
        {errors.tempStart && <Error msg="Enter a valid start temperature"/>}

        <Input type="number" value="tempOffset" label="Offset Temperature (°C)" 
        register={register("tempOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 115)})}/>
        {errors.tempOffset && <Error msg="Enter a valid offset temperature"/>}

        <Input type="number" value="tempSteps" label="Temperature Steps (Set to 1 for Fill Flow Mode)" 
        register={register("tempSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 10)})}/>
        {errors.tempSteps && <Error msg="Enter a valid number of temperature steps"/>}

        <StyledInput type="number" defaultValue={options.tempEnd} label="End Temperature (°C)" disabled={true} />
        <Info msg="End temperature is a calculated value." />
      </div>

      <h2 className="text-lg mt-4 font-bold">Custom Start / End GCode (Optional)</h2>
      <div>
        <TextArea value="customStartGCode" label="Custom Start GCode" 
        register={register("customStartGCode", { setValueAs: (v) => v.split('\n') })}/>

        <TextArea value="customEndGCode" label="Custom End GCode" 
        register={register("customEndGCode", { setValueAs: (v) => v.split('\n') })}/>
      </div>
    </form>
  );
}

export default InputForm;

