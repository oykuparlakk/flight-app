// Form.js

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import CheckboxGroup from "./CheckboxGroup";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { TbArrowsExchange } from "react-icons/tb";

export default function Form() {
  const [selectedOption, setSelectedOption] = useState("roundTrip");
  const [departureValue, setDepartureValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");

  const handleExchangeClick = () => {
    const temp = departureValue;
    setDepartureValue(destinationValue);
    setDestinationValue(temp);
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
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="departure"
            >
              Departure
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 border rounded-md outline-none text-black"
                type="text"
                id="departure"
                placeholder="Enter City"
                style={{ color: "black" }}
                value={departureValue}
                onChange={(e) => setDepartureValue(e.target.value)}
              />
              <MdOutlineFlightTakeoff className="absolute right-3 top-3 text-black" />
            </div>
          </div>

          <div className="flex items-center justify-center mt-1 text-black font-extrabold">
            <TbArrowsExchange onClick={handleExchangeClick} />
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="destination"
            >
              Arrivals
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 border rounded-md outline-none text-black"
                type="text"
                id="destination"
                placeholder="Destination"
                style={{ color: "black" }}
                value={destinationValue}
                onChange={(e) => setDestinationValue(e.target.value)}
              />
              <FaLocationDot className="absolute right-3 top-3 text-black" />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="departureDate"
            >
              Departure Date
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md outline-none text-black"
              type="date"
              id="departureDate"
            />
          </div>

          {selectedOption === "roundTrip" && (
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="arrivalDate"
              >
                Arrival Date
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md outline-none text-black"
                type="date"
                id="arrivalDate"
              />
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <button className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md">
            Search <IoSearch className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
