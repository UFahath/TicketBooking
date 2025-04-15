import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
// import { time } from "../data/time";
import { TravelFlightBottom } from "../Pages/Travel";
import flightIcon from "../assets/images/Flightimage.jpeg";
import { Sunrise, SunDim, SunMedium, Sunset } from "lucide-react";

let filterData = {
  departureTime: ["12AM-6AM", "6AM-12PM", "12PM-6PM", "6PM-12AM"],
  arrivalTime: ["12AM-6AM", "6AM-12PM", "12PM-6PM", "6PM-12AM"],
  icons: ["Sunrise", "SunDim", "SunMedium", "Sunset"],
};

let iconComponents = {
  Sunrise: Sunrise,
  SunDim: SunDim,
  SunMedium: SunMedium,
  Sunset: Sunset,
};

const FlightResults = () => {
  const { state } = useLocation();
  let { availableFlights = [], from = "", to = "", departureDate = "" } = state || {};

  const [passengers, setPassengers] = useState("");
  const [classCategory, setClassCategory] = useState("");
  const [passengerAge, setAgeType] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(availableFlights);

  const [selectedDepartureTime, setSelectedDepartureTime] = useState("");
  const [selectedArrivalTime, setSelectedArrivalTime] = useState("");
  const [priceRange, setPriceRange] = useState(20000);
  const [stopsFilter, setStopsFilter] = useState({ nonStop: false, oneStop: false });

  let[btnColor1,setBtnColor1]=useState(null);
  let[btnColor2,setBtnColor2]=useState(null);
 
  let navigate=useNavigate();

  useEffect(() => {
    let flightOffer = document.querySelector(".flightoffer");
    let flightWingLogo = document.querySelector(".flightwinglogo");
    if (flightOffer && flightWingLogo) {
      flightOffer.remove();
      flightWingLogo.remove();
    }

    setPassengers(JSON.parse(localStorage.getItem("passengercount:") || "{}"));
  }, []);

  useEffect(() => {
    setClassCategory(passengers.classSelected || "");
    let ageSummary = "";
    for (let key in passengers) {
      if (passengers[key] !== 0 && key !== "classSelected") {
        ageSummary += passengers[key] + key + ", ";
      }
    }
    setAgeType(ageSummary);
  }, [passengers]);

  const convertTo24 = (timeStr) => {
    let hour = parseInt(timeStr);
    if (timeStr.includes("AM")) return hour === 12 ? 0 : hour;
    return hour === 12 ? 12 : hour + 12;
  };

  const applyFilters = () => {
    let result = [...availableFlights];

    // Departure Time Filter
    if (selectedDepartureTime) {
      const [startRaw, endRaw] = selectedDepartureTime.split("-");
      const start = convertTo24(startRaw);
      const end = convertTo24(endRaw);
      result = result.filter((item) => {
        const depHour = parseInt(item.departure_time.split(":")[0]);
        return depHour >= start && depHour < end;
      });
    }

    // Arrival Time Filter
    if (selectedArrivalTime) {
      const [startRaw, endRaw] = selectedArrivalTime.split("-");
      const start = convertTo24(startRaw);
      const end = convertTo24(endRaw);
      result = result.filter((item) => {
        const arrHour = parseInt(item.arrival_time.split(":")[0]);
        return arrHour >= start && arrHour < end;
      });
    }

    // Price Filter
    result = result.filter((item) => parseInt(item.price) <= priceRange);

    // Stops Filter
    if (stopsFilter.nonStop || stopsFilter.oneStop) {
      result = result.filter((item) => {
        const stops = item.stops;
        if (stopsFilter.nonStop && stops === 0) return true;
        if (stopsFilter.oneStop && stops === 1) return true;
        return false;
      });
    }

    setFilteredFlights(result);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedDepartureTime, selectedArrivalTime, priceRange, stopsFilter, availableFlights]);

  function Icons({ index }) {
    const Icon = iconComponents[filterData.icons[index]];
    return <Icon size={18} className="me-2" />;
  }

  const handleDepartureFilter = (e,index) => {
    setBtnColor1(index)
    setSelectedDepartureTime(e.target.textContent);
  };

  const handleArrivalFilter = (e,index) => {
    setBtnColor2(index)
    setSelectedArrivalTime(e.target.textContent);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handleStopsChange = (e) => {
    setStopsFilter({
      ...stopsFilter,
      [e.target.id]: e.target.checked,
    });
  };

  const resetFilters = () => {
    setBtnColor1(null);
    setBtnColor2(null);
    setSelectedDepartureTime("");
    setSelectedArrivalTime("");
    setPriceRange(20000);
    setStopsFilter({ nonStop: false, oneStop: false });
  };
  const handleSubmit = (event,flight) => {
    navigate("/flightreviewbooking",{state:flight})
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row mb-5 ms-4">
          <h4 className="text-center text-warning fw-bold fs-1 importedfont my-4">Trip Mode</h4>
          <div className="row">
            <div className="col-3 bg-warning rounded-top-4"></div>
            <div className="col-6 text-center">
              <button className="btn btn-warning">One Way</button>
              <button className="btn btn-outline-warning disabled text-dark">Rounded-trip</button>
            </div>
            <div className="col-3 bg-warning rounded-top-4"></div>
          </div>
        </div>

        <div className="row mb-5 mx-auto">
          <div className="col-md-3">
            <label className="form-label">From</label>
            <input type="text" className="form-control bg-white text-danger fw-bold" value={from} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">To</label>
            <input type="text" className="form-control bg-white text-danger fw-bold" value={to} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">Departure</label>
            <input type="text" className="form-control bg-white text-danger fw-bold" value={departureDate} disabled />
          </div>
          <div className="col-md-3">
            <label className="form-label">Passenger & Class</label>
            <input type="text" className="form-control bg-white text-danger fw-bold" value={passengerAge + classCategory} disabled />
          </div>
        </div>

        <div className="row position-relative">
          <div className="col text-center position-absolute mx-auto" style={{ bottom: "95%" }}>
            <span className="badge text-bg-warning text-white fs-3 rounded-4">Update Search</span>
          </div>
          <img src={flightIcon} alt="airline" className="img-fluid rounded-5" style={{ minWidth: "100%", maxHeight: "600px" }} />
        </div>
      </div>

      <div className="container my-5">
        <div className="mb-4">
          <h3>
            Flights from <span className="text-primary">{from}</span> to{" "}
            <span className="text-danger">{to}</span> on <strong>{departureDate}</strong>
          </h3>
        </div>

        <div className="row">
          {/* Filters */}
          <div className="col-md-3 mb-4">
            <div className="p-3 border rounded shadow-sm">
              <div className="row">
                <h5 className="fw-bold text-center">Filters</h5>
                <button className="btn btn-outline-dark" onClick={resetFilters}>Reset All</button>
              </div>
              <p className="text-secondary my-3">Showing {filteredFlights.length} Flights</p>
              <hr />

              <div className="row">
                <div className="col">
                  <h5 className="fw-bold">Departure Time</h5>
                  {filterData.departureTime.map((item, index) => (
                    <button className={`btn ${btnColor1===index?"btn-danger":"btn-outline-danger"} mx-3 my-2 rounded-4`} key={index} onClick={(event)=>handleDepartureFilter(event,index)}>
                      <Icons index={index} />{item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <h5 className="fw-bold">Arrival Time</h5>
                  {filterData.arrivalTime.map((item, index) => (
                    <button  className={`btn ${btnColor2===index?"btn-danger":"btn-outline-danger"} mx-3 my-2 rounded-4`}  key={index} onClick={(event)=>handleArrivalFilter(event,index)}>
                      <Icons index={index} />{item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <input type="range" className="form-range" min="1000" max="20000" value={priceRange} onChange={handlePriceChange} />
                <div className="d-flex justify-content-between">
                  <span>₹1,000</span>
                  <span>₹{priceRange}</span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Stops</label>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="nonStop" checked={stopsFilter.nonStop} onChange={handleStopsChange} />
                  <label className="form-check-label" htmlFor="nonStop">Non-stop</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="oneStop" checked={stopsFilter.oneStop} onChange={handleStopsChange} />
                  <label className="form-check-label" htmlFor="oneStop">1 Stop</label>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Cards */}
          <div className="col-md-9">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight, index) => (
                <div key={index} className="card mb-3 shadow-sm border-0">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0">
                        <img src={flightIcon} alt="airline" width="50" className="me-3 rounded-5" />
                        <div>
                          <h5 className="mb-1">{flight.airline || "Airline Name"}</h5>
                          <small className="text-muted">{flight.flightNumber || "XX123"}</small>
                        </div>
                      </div>
                      <div className="col-6 col-md-4 mb-3 mb-md-0">
                        <div><strong>{flight.departure_time}</strong> → <strong>{flight.arrival_time}</strong></div>
                        <small className="text-muted">{flight.travel_duration || "2h 30m"}</small>
                      </div>
                      <div className="col-6 col-md-4 text-md-end text-start">
                        <h5 className="text-success">{flight.currency} {flight.price}</h5>
                        <button className="btn btn-outline-danger mt-2 w-100 w-md-auto" onClick={(event)=>handleSubmit(event,flight)}>Book</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No flights match the selected filters.</p>
            )}
          </div>
        </div>
      </div>

      <TravelFlightBottom />
      <Footer />
    </>
  );
};

export default FlightResults;
