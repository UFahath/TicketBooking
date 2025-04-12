import { useState, useEffect } from "react";
import { TravellersClass } from "./TravellersClass";
import { useNavigate } from "react-router-dom";

const FlightSearchEngine = () => {
  const [tripMode, setTripMode] = useState("oneway");
  const [returnDate, setReturnDate] = useState(null);

  // Lifted state from child
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [fetchedData, setFetchedData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function flightData() {
      try {
        let response = await fetch("./db.json");
        let data = await response.json();
        setFetchedData(data.ticket_booking);
        console.log(data.ticket_booking)
      } catch (error) {
        console.log(error);
      }
    }
    flightData();
  }, []);

  const handleSearch = () => {
    const availableFlights = fetchedData.filter(
      (item) =>
        item.source.toLowerCase().includes(fromInput.toLowerCase()) &&
        item.destination.toLowerCase().includes(toInput.toLowerCase())
    );

    navigate("/flightresults", {
      state: {
        availableFlights,
        from: fromInput,
        to: toInput,
        departureDate,
        returnDate: tripMode === "roundedtrip" ? returnDate : null,
      },
    });
  };

  return (
    <>
      <div className="row my-4">
        <div className="col">
          <div className="btn-group" role="group">
            <button
              className={`btn ${
                tripMode === "oneway" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => {
                setTripMode("oneway");
                setReturnDate(null);
              }}
            >
              One Way
            </button>
            <button
              className={`btn ${
                tripMode === "roundedtrip"
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={() => setTripMode("roundedtrip")}
            >
              Round Trip
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <OneWayTrip
          tripMode={tripMode}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          fromInput={fromInput}
          setFromInput={setFromInput}
          toInput={toInput}
          setToInput={setToInput}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          fetchedData={fetchedData}
          handleSearch={handleSearch}
        />
      </div>
    </>
  );
};

const OneWayTrip = ({
  tripMode,
  returnDate,
  setReturnDate,
  fromInput,
  setFromInput,
  toInput,
  setToInput,
  departureDate,
  setDepartureDate,
  fetchedData,
  handleSearch,
}) => {
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromInput(value);
    setFromSuggestions(
      value === ""
        ? []
        : fetchedData.filter((item) =>
            item.source.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setToInput(value);
    setToSuggestions(
      value === ""
        ? []
        : fetchedData.filter((item) =>
            item.destination.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const selectFrom = (val) => {
    setFromInput(val);
    setFromSuggestions([]);
  };

  const selectTo = (val) => {
    setToInput(val);
    setToSuggestions([]);
  };

  return (
    <div className="container border border-5 border-warning mb-3 fs-4">
      <div className="row row-cols-1 row-cols-md-4 my-5 gy-4">
        {/* FROM input */}
        <div className="col position-relative">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="From"
              value={fromInput}
              onChange={handleFromChange}
            />
          </div>
          {fromSuggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 z-3">
              {fromSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectFrom(item.source)}
                >
                  {item.source}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TO input */}
        <div className="col position-relative">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="To"
              value={toInput}
              onChange={handleToChange}
            />
          </div>
          {toSuggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 z-3">
              {toSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectTo(item.destination)}
                >
                  {item.destination}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Departure Date */}
        <div className="col">
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>

        {/* Return Date */}
        {tripMode === "roundedtrip" && (
          <div className="col">
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                value={returnDate || ""}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
        )}

        <TravellersClass />
      </div>

      {/* Special fares */}
      <div className="row row-cols-1 row-cols-md-4 my-4 g-2">
        <div className="col">Special Fares (Optional):</div>
        {["Student", "Army", "Doctor", "Senior Citizen"].map((fare, idx) => (
          <div className="col" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="radio"
              id={fare.toLowerCase()}
            />
            <span className="ms-2">{fare}</span>
          </div>
        ))}
      </div>

      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchEngine;
