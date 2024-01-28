import React, { useContext } from "react";
import { FlightContext } from "../../context/FlightContext";

function SearchList() {
  const { flights } = useContext(FlightContext);

  console.log("flights", flights);

  return (
    <section>
      <h2>Flight Search Results</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <table>
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Departure</th>
                  <th>Destination</th>
               
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.departure}</td>
                  <td>{flight.destination}</td>
           
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SearchList;
