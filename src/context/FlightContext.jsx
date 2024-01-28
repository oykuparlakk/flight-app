import React, { createContext, useState } from "react";

const FlightContext = createContext();

const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);

  const updateFlights = (newFlights) => {
    setFlights(newFlights);
  };

  return (
    <FlightContext.Provider value={{ flights, updateFlights }}>
      {children}
    </FlightContext.Provider>
  );
};

export { FlightProvider, FlightContext };
