import React, { useState, useCallback, useEffect, useContext } from "react";
import CheckboxGroup from "./CheckboxGroup";
import { TbArrowsExchange } from "react-icons/tb";
import InputField from "./InputField";
import FormValidator from "./FormValidator";
import DropdownInputField from "./DropdownInputField";
import Notification from "./Notification";
import { FlightContext } from "../../context/FlightContext";
import { getCities, getFlights } from "../../services/api";

export default function Form() {
  const [selectedOption, setSelectedOption] = useState("roundTrip");
  const [formData, setFormData] = useState({
    departureValue: "",
    destinationValue: "",
    departureDateValue: "",
    arrivalDateValue: "",
  });
  const [cities, setCities] = useState([]);
  const [autoSearch, setAutoSearch] = useState(false);
  const { updateFlights } = useContext(FlightContext);

  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type) => {
    setNotifications([...notifications, { message, type }]);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tripOptions = [
    { label: "One Way", value: "oneWay" },
    { label: "Round Trip", value: "roundTrip" },
  ];

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    },
    [setFormData]
  );

  const handleOptionChange = useCallback(
    (value) => {
      setSelectedOption(value);
      if (value === "oneWay") {
        setFormData((prevData) => ({
          ...prevData,
          arrivalDateValue: "",
        }));
      }
    },
    [setSelectedOption, setFormData]
  );

  const handleExchangeClick = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      departureValue: prevData.destinationValue,
      destinationValue: prevData.departureValue,
    }));
  }, [setFormData]);

  const validateForm = () => {
    const errors = {};

    if (formData.departureValue.trim() === "") {
      errors.departure = "Departure city is required";
    }

    if (formData.destinationValue.trim() === "") {
      errors.destination = "Destination city is required";
    }

    if (
      selectedOption === "roundTrip" &&
      new Date(formData.departureDateValue) >=
        new Date(formData.arrivalDateValue)
    ) {
      errors.arrivalDate = "Arrival date must be after departure date";
    }

    return errors;
  };

  const handleSearch = async () => {
    const errors = validateForm();

    const allFields =
      formData.departureValue.trim() == "" &&
      formData.destinationValue.trim() == "" &&
      !formData.departureDateValue &&
      !formData.arrivalDateValue;

    if (!allFields) {
      const atLeastFieldFilled =
        formData.departureValue.trim() !== "" &&
        formData.destinationValue.trim() !== "";

      if (!atLeastFieldFilled) {
        showNotification(
          "Departure and destination must be filled to perform the search.",
          "error"
        );
        return;
      }

      if (formData.departureDateValue > formData.arrivalDateValue) {
        showNotification(
          "Departure date must be before the arrival date.",
          "error"
        );
        return;
      }

      try {
        const flights = await getFlights({
          departureValue: formData.departureValue,
          destinationValue: formData.destinationValue,
          departureDateValue: formData.departureDateValue,
          arrivalDateValue: formData.arrivalDateValue,
        });

        updateFlights(flights);
        showNotification("Search results retrieved successfully.", "success");
        console.log("Search results:", flights);
      } catch (error) {
        showNotification(
          "Error performing search. Please try again later.",
          "error"
        );
        console.error("Error performing search:", error);
      }
      if (errors.length > 0) {
        showNotification("Validation errors: " + errors.join(", "), "error");
      }
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setAutoSearch(true);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [
    formData.departureValue,
    formData.destinationValue,
    formData.departureDateValue,
    formData.arrivalDateValue,
  ]);

  useEffect(() => {
    if (autoSearch) {
      handleSearch();
      setAutoSearch(false);
    }
  }, [autoSearch]);

  return (
    <>
      <section className="relative flex items-start mt-5 justify-center h-3/6	">
        <div className="bg-gradient-to-br from-gray-400 to-purple-400 p-8 rounded-lg shadow-md">
          <FormValidator validate={validateForm}>
            {({ validateForm, clearErrors }) => (
              <>
                <CheckboxGroup
                  options={tripOptions}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                />
                <div className="flex flex-row gap-4">
                  <DropdownInputField
                    label="Departure"
                    id="departure"
                    placeholder="City"
                    value={formData.departureValue}
                    onChange={(value) => {
                      handleInputChange("departureValue", value);
                      clearErrors();
                    }}
                    options={cities}
                  />

                  <div className="flex items-center justify-center mt-1 pr-3.5 text-black font-extrabold cursor-pointer">
                    <TbArrowsExchange onClick={handleExchangeClick} />
                  </div>

                  <DropdownInputField
                    label="Arrivals"
                    id="destination"
                    placeholder="Destination"
                    value={formData.destinationValue}
                    onChange={(value) => {
                      handleInputChange("destinationValue", value);
                      clearErrors();
                    }}
                    options={cities}
                  />

                  <InputField
                    label="Departure Date"
                    type="date"
                    id="departureDate"
                    placeholder="Departure Date"
                    value={formData.departureDateValue}
                    onChange={(value) => {
                      handleInputChange("departureDateValue", value);
                      clearErrors();
                    }}
                    min={today.toISOString().split("T")[0]}
                  />

                  {selectedOption === "roundTrip" && (
                    <>
                      <InputField
                        type="date"
                        label="Arrival Date"
                        id="arrivalDate"
                        placeholder="Arrival Date"
                        value={formData.arrivalDateValue}
                        onChange={(value) => {
                          handleInputChange("arrivalDateValue", value);
                          clearErrors();
                        }}
                        min={formData.departureDateValue}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </FormValidator>
        </div>
      </section>

      <div className="absolute top-4 right-4">
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            message={notification.message}
            type={notification.type}
            onClose={() =>
              setNotifications(notifications.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </>
  );
}
