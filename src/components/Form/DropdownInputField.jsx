import React, { useState, useEffect, useRef } from "react";
import { RingLoader } from "react-spinners";

const DropdownInputField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && options.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSelectOption = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="mb-4 min-w-[220px]">
      <label className="block text-white text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <div
          className={`w-full px-3 py-2 border bg-white rounded-md outline-none text-black cursor-pointer flex items-start${
            isOpen ? "rounded-t-md" : "rounded-md"
          }`}
          onClick={handleToggleDropdown}
        >
          {value ? value : placeholder}
        </div>
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-40">
            <input
              type="text"
              placeholder={`Type to filter ${label.toLowerCase()}`}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full px-3 py-2 border-b rounded-t-md outline-none text-black "
            />
            {isLoading ? (
              <div className="spinner-border flex justify-center items-center py-4 text-black">
                <RingLoader color={"#123abc"} loading={true} />
                <span>Loading...</span>
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.name)}
                  className="px-3 py-2 cursor-pointer text-black hover:bg-gray-200 flex items-start"
                >
                  {option.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownInputField;
