import React from 'react';

const Input = (({ value, label, type, register, ...rest }) => (
  <>
    <label htmlFor={value} className="text-gray-700 block">{label}</label>
    <input type={type} className="
      mt-2
      mb-4
      block
      w-full
      rounded-md
      border-gray-300
      shadow-sm
      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
      "
      {...register} />
    </>
));

const Select = React.forwardRef(({ value, label, options, register, ...rest }, ref) => (
  <>
    <label htmlFor={value} className="text-gray-700 block">{label}</label>
    <select className="
      mt-2
      mb-4
      block
      w-full
      rounded-md
      border-gray-300
      shadow-sm
      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
      "
      {...register}>
        {options.map(option => (
          <option value={option.value} key={option.label}>{option.label}</option>
        ))}
      </select>
    </>
));

export {
  Input,
  Select,
}

