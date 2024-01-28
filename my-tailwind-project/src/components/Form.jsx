import React, { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { TbArrowsExchange } from "react-icons/tb";
import InputField from "./InputField";

export default function Form() {
  const [selectedOption, setSelectedOption] = useState("roundTrip");
  const [formData, setFormData] = useState({
    departureValue: "",
    destinationValue: "",
    departureDateValue: "",
    arrivalDateValue: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleExchangeClick = () => {
    setFormData({
      ...formData,
      departureValue: formData.destinationValue,
      destinationValue: formData.departureValue,
    });
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const tripOptions = [
    { label: "One Way", value: "oneWay" },
    { label: "Round Trip", value: "roundTrip" },
  ];

  return (
    <section className="flex items-start mt-5 justify-center h-screen">
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-lg shadow-md">
        <CheckboxGroup
          options={tripOptions}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />
        <div className="flex flex-row gap-4">
          <InputField
            label="Departure"
            type="text"
            id="departure"
            placeholder="Enter City"
            value={formData.departureValue}
            onChange={(value) => handleInputChange("departureValue", value)}
            icon={<MdOutlineFlightTakeoff />}
          />

          <div className="flex items-center justify-center mt-1 text-black font-extrabold cursor-pointer">
            <TbArrowsExchange onClick={handleExchangeClick} />
          </div>

          <InputField
            label="Arrivals"
            type="text"
            id="destination"
            placeholder="Destination"
            value={formData.destinationValue}
            onChange={(value) => handleInputChange("destinationValue", value)}
            icon={<FaLocationDot />}
          />

          <InputField
            label="Departure Date"
            type="date"
            id="departureDate"
            placeholder="Departure Date"
            value={formData.departureDateValue}
            onChange={(value) => handleInputChange("departureDateValue", value)}
          />

          {selectedOption === "roundTrip" && (
            <InputField
              type="date"
              label="Arrival Date"
              id="arrivalDate"
              placeholder="Arrival Date"
              value={formData.arrivalDateValue}
              onChange={(value) => handleInputChange("arrivalDateValue", value)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
