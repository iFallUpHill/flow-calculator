import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select } from './Inputs'

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
  comment: '',
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
      {errors.bedWidth && <p>Enter a valid bed width</p>}

      <Input type="number" value="bedLength" label="Bed Length (mm)" 
      register={register("bedLength", { required: true, valueAsNumber: true, validate: (value) => (value >= 100 && value <= 500)})}/>
      {errors.bedLength && <p>Enter a valid bed length</p>}

      <Select value="filamentDiameter" label="Filament Diameter" register={register("filamentDiameter", { required: true, valueAsNumber: true })}
        options={[
          {value: 1.75, label: "1.75mm"},
          {value: 2.85, label: "2.85mm"}
        ]}
      />

      <Select value="direction" label="Direction" register={register("direction", { required: true, valueAsNumber: true })}
        options={[
          {value: 1, label: "Front to Back"},
          {value: -1, label: "Back to Front"}
        ]}
      />


      <input type="submit" />
    </form>
  );
}

export default InputForm;

