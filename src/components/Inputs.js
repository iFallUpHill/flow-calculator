import React from 'react';

const Input = (({ value, label, type, step=1, register }) => (
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
      {...register}/>
    </>
));

const StyledInput = (({ value='', label, type, step=1, defaultValue='', disabled=false, handleChange=null }) => (
  <>
    <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
    <input type={type} step={step} disabled={disabled} className={`
      mt-2
      block
      w-full
      rounded-md
      border-gray-300
      shadow-sm
      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
      ${disabled ? 'text-zinc-300 cursor-help' : ''}
      `}
      value={defaultValue}
      onChange={handleChange}/>
    </>
));


const Select = (({ value, label, options, register }) => (
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

const Info = ({ msg }) => (
  <span className={`text-xs text-zinc-400 col-start-2`}>{msg}</span>
);

const Error = ({ msg }) => (
  <span className="text-xs text-red-700 col-start-2">{msg}</span>
);

const TextArea = (({ value, label, rows=4, register }) => (
  <>
    <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
    <textarea rows={rows} className="
      font-mono
      text-xs
      whitespace-pre
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
  StyledInput,
  TextArea,
  Info,
  Error,
}

