import React from "react";

export default function CheckboxGroup({ options, selectedOption, onChange }) {
  return (
    <div className="flex my-4">
      {options.map((option) => (
        <div key={option.value} className="mr-4">
          <input
            type="radio"
            id={option.value}
            name="tripOption"
            value={option.value}
            checked={option.value === selectedOption}
            onChange={() => onChange(option.value)}
          />
          <label
            className={`text-white text-sm ml-2 ${
              option.value === selectedOption ? "checked-label" : ""
            }`}
            htmlFor={option.value}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
