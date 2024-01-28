// InputField.js
import React from "react";

const InputField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  icon,
  type,
  min,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full px-3 py-2 border rounded-md outline-none text-black"
          type={type}
          id={id}
          placeholder={placeholder}
          style={{ color: "black" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...(min && { min })}
        />
        {icon && (
          <span className="absolute right-3 top-3 text-black">{icon}</span>
        )}
      </div>
    </div>
  );
};

export default InputField;
