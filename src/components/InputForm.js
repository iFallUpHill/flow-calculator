import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select, TextArea, Error } from './Inputs';
import generateGcode from '../utils/generateGcode';

const prusaDefaults = {
  bedWidth: 250, // mm
  bedLength: 210, // mm
  bedMargin: 5, // mm 
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
  tempSpacing: 40, // mm
  flowStart: 2, // mm^3/s
  flowOffset: 2, // mm^3/s
  flowSteps: 8, // unitless, (end-start)/offset
  flowEnd: 16, // mm^3/s
  tempStart: 240, // °C
  tempOffset: 20, // °C
  tempSteps: 3, // unitless, (end-start)/offset
  tempEnd: 200, // °C
  customStartGCode: [], 
  customEndGCode: [], 
  fileName: '',
}

function InputForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: prusaDefaults,
  });
  const onSubmit = (data) => generateGcode(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="number" value="bedWidth" label="Bed Width (mm)" 
      register={register("bedWidth", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
      {errors.bedWidth && <Error msg="Enter a valid bed width"/>}

      <Input type="number" value="bedLength" label="Bed Length (mm)" 
      register={register("bedLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
      {errors.bedLength && <Error msg="Enter a valid bed length"/>}

      <Input type="number" value="bedLength" label="Bed Margin (mm)" 
      register={register("bedMargin", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 25)})}/>
      {errors.bedMargin && <Error msg="Enter a valid bed margin"/>}

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
      register={register("bedTemp", { required: true, valueAsNumber: true, validate: (value) => (value >= 40 && value <= 110)})}/>
      {errors.bedTemp && <Error msg="Enter a valid bed temperature"/>}

      <Input type="number" value="fanSpeed" label="Fan Speed (%)" 
      register={register("fanSpeed", { required: true, setValueAs: (v) => parseInt(Math.round(v*255/100)), validate: (value) => (value >= 0 && value <= 100)})}/>
      {errors.fanSpeed && <Error msg="Enter a valid fan speed"/>}


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

      <Input type="number" step={0.01} value="retractionDistance" label="Retraction Distance (mm)" 
      register={register("retractionDistance", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 10)})}/>
      {errors.retractionDistance && <Error msg="Enter a valid retraction distance"/>}

      <Input type="number" value="retractionSpeed" label="Retraction Speed (mm/s)" 
      register={register("retractionSpeed", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
      {errors.retractionSpeed && <Error msg="Enter a valid retraction speed"/>}

      <Input type="number" value="blobHeight" label="Blob Height (mm)" 
      register={register("blobHeight", { required: true, valueAsNumber: true, validate: (value) => (value >= 1 && value <= 50)})}/>
      {errors.blobHeight && <Error msg="Enter a valid blob height"/>}

      <Input type="number" value="extrusionAmount" label="Extrusion Amount (mm)" 
      register={register("extrusionAmount", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
      {errors.extrusionAmount && <Error msg="Enter a valid extrusion amount"/>}



      <Input type="number" value="flowSpacing" label="Flow Spacing (mm) - Rows" 
      register={register("flowSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
      {errors.flowSpacing && <Error msg="Enter a valid flow spacing"/>}

      <Input type="number" value="tempSpacing" label="Temperature Spacing (mm) - Columns" 
      register={register("tempSpacing", { required: true, valueAsNumber: true, validate: (value) => (value >= 25 && value <= 500)})}/>
      {errors.tempSpacing && <Error msg="Enter a valid temperature spacing"/>}


      <Input type="number" value="flowStart" label="Start Flow (mm³/s)" 
      register={register("flowStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 2 && value <= 100)})}/>
      {errors.flowStart && <Error msg="Enter a valid start flow"/>}

      <Input type="number" value="flowOffset" label="Offset Flow (mm³/s)" 
      register={register("flowOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 30)})}/>
      {errors.flowOffset && <Error msg="Enter a valid offset flow"/>}

      <Input type="number" value="flowSteps" label="Flow Steps" 
      register={register("flowSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 10)})}/>
      {errors.flowSteps && <Error msg="Enter a valid number of flow steps"/>}

      <Input type="number" value="flowEnd" label="End Flow (mm³/s)" 
      register={register("flowEnd", { required: true, valueAsNumber: true, validate: (value) => (value >= 2 && value <= 100)})}/>
      {errors.flowEnd && <Error msg="Enter a valid end flow"/>}


      <Input type="number" value="tempStart" label="Start Temperature (°C)" 
      register={register("tempStart", { required: true, valueAsNumber: true, validate: (value) => (value >= 155 && value <= 350)})}/>
      {errors.tempStart && <Error msg="Enter a valid start temperature"/>}

      <Input type="number" value="tempOffset" label="Offset Temperature (°C)" 
      register={register("tempOffset", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 115)})}/>
      {errors.tempOffset && <Error msg="Enter a valid offset temperature"/>}

      <Input type="number" value="tempSteps" label="Temperature Steps" 
      register={register("tempSteps", { required: true, valueAsNumber: true, validate: (value) => (value >= 0 && value <= 10)})}/>
      {errors.tempSteps && <Error msg="Enter a valid number of temperature steps"/>}

      <Input type="number" value="tempEnd" label="End Temperature (°C)" 
      register={register("tempEnd", { required: true, valueAsNumber: true, validate: (value) => (value >= 155 && value <= 350)})}/>
      {errors.tempEnd && <Error msg="Enter a valid end temperature"/>}


      <TextArea value="customStartGCode" label="Custom Start G-Code (Optional)" 
      register={register("customStartGCode", { setValueAs: (v) => v.split('\n') })}/>

      <TextArea value="customEndGCode" label="Custom End G-Code (Optional)" 
      register={register("customEndGCode", { setValueAs: (v) => v.split('\n') })}/>

      <Input type="text" value="fileName" label="File Name (Optional)" 
      register={register("fileName")}/>

      <input className="w-full mt-4 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" type="submit" value="Submit" />
    </form>
  );
}

export default InputForm;

