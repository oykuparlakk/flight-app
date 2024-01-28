const BASE_URL = "https://65b61d50da3a3c16ab0039fd.mockapi.io/api"; // Mock API adresi

export const getFlights = async (filterParams) => {
  try {
    const response = await fetch(`${BASE_URL}/flights`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let flights = await response.json();

    if (filterParams) {
      flights = flights.filter(
        (flight) =>
          (!filterParams.departureValue ||
            flight.departureCity === filterParams.departureValue) &&
          (!filterParams.destinationValue ||
            flight.arrivalCity === filterParams.destinationValue) &&
          (!filterParams.departureDateValue ||
            flight.departureDate === filterParams.departureDateValue) &&
          (!filterParams.arrivalDateValue ||
            flight.arrivalDate === filterParams.arrivalDateValue)
      );
    }

    return flights;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const getCities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cities`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
