import React from "react";

const Checkbox = ({ id, name, value, checked, onChange, label }) => (
  <div className="mr-4 flex items-center">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
    />
    <label
      className={`text-white text-sm ml-2 ${checked ? "checked-label" : ""}`}
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);

const CheckboxGroup = React.memo(({ options, selectedOption, onChange }) => {
  return (
    <div className="flex my-4">
      {options.map(({ label, value }) => (
        <Checkbox
          key={value}
          id={value}
          name="tripOption"
          value={value}
          checked={value === selectedOption}
          onChange={onChange}
          label={label}
        />
      ))}
    </div>
  );
});

export default CheckboxGroup;
