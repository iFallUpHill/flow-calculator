import React from 'react';

const Input = (({ value, label, type, step=1, register, ...rest }) => (
  <>
    <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
    <input type={type} step={step} className="
      mt-2
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
    <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
    <select className="
      mt-2
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

const Error = ({ msg }) => (
  <span className="text-xs text-red-700">{msg}</span>
);

const TextArea = (({ value, label, rows=4, register, ...rest }) => (
  <>
    <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
    <textarea rows={rows} className="
      mt-2
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


export {
  Input,
  Select,
  TextArea,
  Error,
}

