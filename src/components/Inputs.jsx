import React from 'react';
import { LabelBadge } from './Badges';
import { useStore } from '../stores/store';

const Label = (({value, label, description="", hasVariable=false}) => {
  const showVariableNames = useStore((state) => state.showVariableNames);
  const showLabel = showVariableNames && hasVariable;

  return (
    <div>
      <label htmlFor={value} className={`text-gray-700 block ${description.length > 0 ? 'mt-2' : 'mt-4'}`}>{label} {showLabel && <LabelBadge label={value} />}</label>
      {description.length > 0 && <p className="text-xs text-zinc-400">{description}</p>}
    </div>
)});

const Input = (({ value="", label, type, step=1, unit="", description="", defaultValue=undefined, disabled=false, hasVariable=false, handleChange=null, register={} }) => (
  <>
    <Label value={value} label={label} description={description} hasVariable={hasVariable} />
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
        onChange={handleChange}
        {...register}/>
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

const Select = (({ value, label, options, description="", targetValue=undefined, hasVariable=false, handleChange=null, register={} }) => (
  <>
    <Label value={value} label={label} description={description} hasVariable={hasVariable} />
    <select className="
      mt-2
      block
      w-full
      rounded-md
      border-gray-300
      shadow-sm
      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
      "
      value={targetValue}
      onChange={handleChange}
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

const Warning = ({ msg }) => (
  <span className="text-xs text-amber-500 col-start-2">{msg}</span>
);

const TextArea = (({ value, label, rows=4, description="", register }) => (
  <>
    <Label value={value} label={label} description={description} />
    <textarea rows={rows} className="
      font-mono
      text-xs
      whitespace-pre
      mt-1
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
  Info,
  Error,
  Warning,
}

