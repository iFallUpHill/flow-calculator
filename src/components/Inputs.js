import React from 'react';

const Input = (({ value, label, type, step=1, unit='', description='', register }) => (
  <>
    <div>
      <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
      {description.length > 0 && <p className="text-xs text-zinc-400">{description}</p>}
    </div>
    <div className="flex flex-wrap items-stretch relative mt-2">
      <input type={type} step={step} className={`
        flex-shrink flex-grow flex-1
        block
        relative
        w-full
        rounded-md
        border-gray-300
        shadow-sm
        ${unit ? 'rounded-r-none' : ''}
        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:rounded-md
        `}
        {...register}/>
      {unit.length > 0 && <UnitField unit={unit} />}
    </div>

    </>
));

const StyledInput = (({ value='', label, type, step=1, unit='', description='', defaultValue='', disabled=false, handleChange=null }) => (
  <>
    <div>
      <label htmlFor={value} className="text-gray-700 block mt-4">{label}</label>
      {description.length > 0 && <p className="text-xs text-zinc-400">{description}</p>}
    </div>
    <div className="flex flex-wrap items-stretch relative mt-2">
      <input type={type} step={step} disabled={disabled} className={`
        flex-shrink flex-grow flex-1
        block
        relative
        w-full
        rounded-md
        border-gray-300
        shadow-sm
        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:rounded-md
        ${unit ? 'rounded-r-none' : ''}
        ${disabled ? 'text-zinc-300 cursor-help' : ''}
        `}
        value={defaultValue}
        onChange={handleChange}/>
      {unit.length > 0 && <UnitField unit={unit} />}	
    </div>
  </>
));

const UnitField = (({unit}) => (
    <div className="flex w-16">
        <div className="flex items-center justify-center grow bg-zinc-100 rounded-md rounded-l-none border border-l-0 border-gray-300 px-3 shadow-sm text-xs">
          <span>{unit}</span>
        </div>
    </div>
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

