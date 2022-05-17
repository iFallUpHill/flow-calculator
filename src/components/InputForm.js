import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Inputs'

function InputForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bedWidth: 250,
    }
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="bedWidth" className="text-gray-700 block">Bed Width (mm)</label>
      <Input type="number" placeholder="250" register={register('bedWidth', { required: true, validate: (value) => (value >= 100 && value <= 500)})}/>
      {errors.bedWidth && <p>Enter a valid bed width</p>}

      <input type="submit" />
    </form>
  );
}

export default InputForm;

