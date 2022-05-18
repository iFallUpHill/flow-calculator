import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select, TextArea, Error } from './Inputs';

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
  tempSpacing: 40, // mm
  flowSpacing: 50, // mm
  flowStart: 2, // mm^3/s
  flowOffset: 2, // mm^3/s
  flowSteps: 8, // unitless, (end-start)/offset
  flowEnd: 16, // mm^3/s
  tempStart: 240, // °C
  tempOffset: 20, // °C
  tempSteps: 3, // unitless, (end-start)/offset
  tempEnd: 200, // °C
  customStartGCode: '', 
  customEndGCode: '', 
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
  const onSubmit = (data) => console.log(data);

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

      <TextArea value="customStartGCode" label="Custom Start G-Code" 
      register={register("customStartGCode")}/>

      <TextArea value="customEndGCode" label="Custom End G-Code" 
      register={register("customEndGCode")}/>

      <Input type="text" value="fileName" label="File Name" 
      register={register("fileName")}/>

      <input className="w-full mt-4 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" type="submit" value="Submit" />
    </form>
  );
}

export default InputForm;

