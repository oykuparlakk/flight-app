import React, { useContext } from "react";
import { FlightContext } from "../../context/FlightContext";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaSearchLocation } from "react-icons/fa";
import Filters from "./Filters";

function SearchList() {
  const { flights } = useContext(FlightContext);

  if (!flights || flights.length === 0) {
    return (
      <>
        <section className="container mx-auto h-full flex justify-center items-center px-5 py-10 ">
          <div className="text-center space-y-5">
            <div className="flex justify-center items-center">
              <FaSearchLocation className="text-5xl" />
            </div>

            <div>
              <p className="text-lg">
                Sorry, the flight with the features you were looking for was not
                found. 😔
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="container mx-auto h-full px-[120px] py-12">
        <h2 className="text-3xl">Flight Search Results</h2>

        <div>
          <Filters />
        </div>

        <div className="grid grid-cols-4 gap-6 pt-6">
          {flights.map((flight) => (
            <div key={`flight-${flight.id}`}>
              <Swiper
                effect={"flip"}
                grabCursor={true}
                pagination={true}
                modules={[EffectFlip, Pagination]}
                className="mySwiper"
                style={{}}
              >
                <div>
                  <SwiperSlide
                    key={`flight-info-${flight.id}`}
                    className="flex items-center justify-center bg-gray-400 rounded-2xl shadow-md"
                  >
                    <div className="text-black rounded-lg">
                      <div className=" flex items-center justify-center p-5">
                        <h3 className="text-2xl font-medium">
                          {flight.airline}
                        </h3>
                      </div>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <th>Departure City</th>
                            <td>{flight.departureCity}</td>
                          </tr>
                          <tr>
                            <th>Departure Airport</th>
                            <td>{flight.departureAirport}</td>
                          </tr>
                          <tr>
                            <th>Arrival City</th>
                            <td>{flight.arrivalCity}</td>
                          </tr>
                          <tr>
                            <th>Arrival Airport</th>
                            <td>{flight.arrivalAirport}</td>
                          </tr>
                          <tr>
                            <th>Duration</th>
                            <td>{flight.duration}</td>
                          </tr>
                          <tr>
                            <th>Price</th>
                            <td>{flight.price}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide
                    key={`flight-details-${flight.id}`}
                    className="flex items-center justify-center bg-gray-400 rounded-2xl shadow-md"
                  >
                    <div className="text-black rounded-lg">
                      <div className=" flex items-center justify-center p-5">
                        <h3 className="text-2xl font-medium">DETAILS</h3>
                      </div>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <th>Departure Date</th>
                            <td>{flight.departureDate}</td>
                          </tr>
                          <tr>
                            <th>Departure Time</th>
                            <td>{flight.departureTime}</td>
                          </tr>
                          <tr>
                            <th>Return Date</th>
                            <td>{flight.returnDate}</td>
                          </tr>
                          <tr>
                            <th>Return Time</th>
                            <td>{flight.returnTime}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SearchList;
